import {
  AnyObjectSchema,
  array as yupray,
  BaseSchema,
  boolean as yoblean,
  BooleanSchema,
  number as yumber,
  NumberSchema,
  object as yobject,
  string as yusring,
  StringSchema,
} from 'yup'
import { MixedSchema } from 'yup/lib/mixed'
import ReferenceSet from 'yup/lib/util/ReferenceSet'

export { yupray, yoblean, yumber, yobject, yusring }

export type FieldSchema = BaseSchema &
  BooleanSchema &
  NumberSchema &
  MixedSchema &
  StringSchema &
  AnyObjectSchema & {
    _whitelist: ReferenceSet
  }

export function getFieldSchema(schema: any = {}, key: string) {
  if (!key) {
    throw new Error(`Missing field key to get it's schema 🧙‍♂️`)
  }

  if (!schema) {
    throw new Error(`Missing schema to get a field from 🧙‍♂️`)
  }

  const fieldSchema: FieldSchema = key.split('.').reduce((schema, keyPart) => {
    if (schema.innerType) {
      return schema.innerType
    }
    return schema.fields[keyPart]
  }, schema)

  if (!fieldSchema) {
    throw new Error(`Schema does not exist for field "${key}"`)
  }

  return fieldSchema
}

export function squareToDotted(keyPath: string) {
  const squareIndices = Array.from(keyPath.matchAll(/\[(\d)\]/g))
  return squareIndices.reduce(
    (soFar, [squareIndex, i]) => soFar.replace(squareIndex, '.' + i),
    keyPath
  )
}
