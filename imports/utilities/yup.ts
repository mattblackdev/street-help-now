import {
  array as yupray,
  boolean as yoblean,
  number as yumber,
  object as yobject,
  string as yusring,
} from 'yup'

export { yupray, yoblean, yumber, yobject, yusring }

export function getFieldSchema(schema: any, key: string) {
  if (!key) {
    throw new Error(`Missing field key to get it's schema`)
  }

  const fieldSchema = key.split('.').reduce((schema, keyPart) => {
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
