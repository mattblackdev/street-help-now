import {
  array as yupray,
  boolean as yoblean,
  number as yumber,
  object as yobject,
  string as yusring,
} from 'yup'

export { yupray, yoblean, yumber, yobject, yusring }

export function getSpec(schema: any, key: string) {
  const fieldSchema = key.split('.').reduce((schema, keyPart) => {
    if (schema.innerType) {
      return schema.innerType
    }
    return schema.fields[keyPart]
  }, schema)
  return fieldSchema.spec
}

export function squareToDotted(keyPath: string) {
  const squareIndices = Array.from(keyPath.matchAll(/\[(\d)\]/g))
  return squareIndices.reduce(
    (soFar, [squareIndex, i]) => soFar.replace(squareIndex, '.' + i),
    keyPath
  )
}
