import { EJSONable } from 'meteor/ejson'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { AnyObjectSchema, ValidationError as YupError } from 'yup'
import { User, Users } from '../users/api'
import { squareToDotted, yobject } from './yup'

type MethodArgs<Args extends EJSONable, Result> = {
  name: string
  run: (args: Args, user: User | null) => Result
  validate?: boolean
  schema?: AnyObjectSchema
  authorize?: boolean
  roles?: string[]
  userFields?: Mongo.FieldSpecifier
}

export class ValiantError {
  [path: string]: string
}

/**
 * Makes a callable Meteor Method with optional schema validation and roles-based authorization.
 *
 * @template Args the method function's first argument type
 * @template Result the method function's result type
 * @param {MethodArgs<Args, Result>} options
 * @param {string} options.name name of the meteor method
 * @param {(args: Args, user: User | null) => Result} options.run the method function business logic - runs on both client & server.
 * @param {boolean} options.validate performs validation of the function's Args argument, defaults to true if `options.schema` is provided
 * @param {AnyObjectSchema} options.schema Yum object schema of the function's Args argument
 * @param {boolean} options.authorize performs authentication (ensures user is logged in), and authorization if `options.roles` is provided, defaults to true
 * @param {string[]} options.roles array of User roles the logged-in user must have to be authorized
 * @param {Mongo.FieldSpecifier} options.userFields database fields to fetch for the logged-in user document
 *
 * @return {Promise<Result>} function that takes Args, handles transforming schema errors to `ValiantError`,
 * gets run on both client/server, handles authentication/authorization, and returns a promise of the method Result
 */
export function makeMethod<Args extends EJSONable, Result>({
  name,
  run,
  ..._options
}: MethodArgs<Args, Result>) {
  const options = {
    validate: _options.schema ? true : false,
    authorize: true,
    ..._options,
  }

  Meteor.methods({
    [name]: async function (args: Args) {
      if (options.validate && options.schema) {
        args = validate<Args>(args, options.schema)
      }

      let user = null
      if (options.authorize || options.userFields) {
        user = authorize(
          this.userId,
          name,
          options.roles,
          options.userFields,
          options.authorize
        )
      }

      return await run(args, user)
    },
  })

  const theCallableMethod = Object.assign(
    makeCallableMethod<Args, Result>(name),
    {
      schema: options.schema || yobject({}),
      roles: options.roles || [],
      methodName: name,
    }
  )

  return theCallableMethod
}

function makeCallableMethod<Args extends EJSONable, Result>(name: string) {
  return (args: Args) =>
    new Promise<Result>((resolve, reject) => {
      try {
        // Better Meteor.call saul
        return Meteor.apply(
          name,
          [args],
          { returnStubValue: true, throwStubExceptions: true },
          (error, result) =>
            error
              ? reject(error as ValiantError | Error)
              : resolve(result as Result)
        )
      } catch (err) {
        reject(err as ValiantError | Error)
      }
    })
}

export function validate<Args extends EJSONable>(
  args: Args,
  schema: AnyObjectSchema
) {
  try {
    args = schema.validateSync(args, {
      abortEarly: false,
      stripUnknown: true,
    })
  } catch (e) {
    if (YupError.isError(e)) {
      const errors = e.inner.reduce((errors, error) => {
        if (error.path) {
          const dottedPath = squareToDotted(error.path)
          errors[dottedPath] = error.message
        }
        return errors
      }, new ValiantError())
      throw errors
    } else {
      throw e
    }
  }
  return args
}

export function authorize(
  userId: string | null,
  actionName: string,
  roles: string[] = [],
  userFields: Mongo.FieldSpecifier = {},
  authenticate = true
) {
  const unauthorized = new Error('Unauthorized')

  const user = !userId
    ? null
    : Users.findOne(userId, {
        fields: { ...userFields, _id: 1, roles: 1 },
      }) ?? null

  if (!user && authenticate) throw unauthorized

  if (user && roles.length && !hasRoles(user, roles)) {
    console.warn(
      `User "${user._id}" with insufficient permission attempted "${actionName}"`
    )
    throw unauthorized
  }

  return user
}

export function hasRoles(user?: { roles?: string[] }, roles?: string[]) {
  if (!roles || !user?.roles?.length) return false
  return stringifyRoles(user.roles).includes(stringifyRoles(roles))
}

const stringifyRoles = (roles: string[]) => roles.sort().join(',')
