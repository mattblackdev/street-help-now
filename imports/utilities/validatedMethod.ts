import { EJSONable } from 'meteor/ejson'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { SchemaOf, ValidationError as YupError } from 'yup'
import { User, Users } from '../users/api'

type ValidatedMethodArgs<Args extends EJSONable> = {
  name: string
  schema: SchemaOf<Args>
  roles?: string[]
  userFields?: Mongo.FieldSpecifier
  fun(args: Args, user: User | null): {}
}

export class ValiantError {
  [path: string]: string
}

export function validatedMethod<Args extends EJSONable>({
  name,
  schema,
  roles,
  userFields = {},
  fun,
}: ValidatedMethodArgs<Args>) {
  Meteor.methods({
    [name]: function (args: Args) {
      try {
        // @ts-ignore
        args = schema.validateSync(args, { abortEarly: false })
      } catch (e) {
        if (YupError.isError(e)) {
          const errors = e.inner.reduce((errors, error) => {
            if (error.path) errors[error.path] = error.message
            return errors
          }, new ValiantError())
          throw errors
        } else {
          throw e
        }
      }

      const user = !this.userId
        ? null
        : Users.findOne(this.userId, {
            fields: { ...userFields, _id: 1, roles: 1 },
          }) ?? null

      if (roles?.length) {
        const unauthorized = new Error('Unauthorized')
        if (!user) throw unauthorized
        if (!hasRoles(user, roles)) {
          console.warn(
            `User "${user._id}" with insufficient permission attempted "${name}"`
          )
          throw unauthorized
        }
      }

      return fun(args, user)
    },
  })

  function theCallableMethod(
    args: Args,
    callback?: (
      error: ValiantError | Error | undefined,
      result?: unknown
    ) => void
  ) {
    try {
      // Better Meteor.call saul
      return Meteor.apply(
        name,
        [args],
        { returnStubValue: true, throwStubExceptions: true },
        callback
      )
    } catch (err) {
      if (callback) {
        callback(err as ValiantError | Error)
      } else {
        throw err
      }
    }
  }

  theCallableMethod.schema = schema
  theCallableMethod.roles = roles
  theCallableMethod.methodName = name

  return theCallableMethod
}

function stringifyRoles(roles: string[]) {
  return roles.sort().join(',')
}

function hasRoles(user?: { roles?: string[] }, roles?: string[]) {
  if (!roles || !user?.roles?.length) return false
  return stringifyRoles(user.roles).includes(stringifyRoles(roles))
}
