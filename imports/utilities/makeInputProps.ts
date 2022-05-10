import { FieldPath, UseFormRegister } from 'react-hook-form'
import { AnyObjectSchema } from 'yup'
import { ValiantError } from './makeMethod'
import { getFieldSchema } from './yup'

const typeMap = {
  boolean: 'checkbox',
  number: 'number',
  string: 'text',
}

export function makeInputProps<TFieldValues>(
  key: FieldPath<TFieldValues>,
  schema: AnyObjectSchema,
  register: UseFormRegister<TFieldValues>,
  errors: ValiantError
) {
  if (!key) throw Error('Missing key for makeInputProps')
  const {
    spec: { presence, label },
    type,
  } = getFieldSchema(schema, key)

  const propsFromRegister = register(key)

  return {
    ...propsFromRegister,
    // @ts-ignore
    type: typeMap[type] || 'text',
    required: presence === 'required',
    placeholder: label,
    error: !!errors[key],
    helpText: errors[key],
  }
}

export function makeMakeInputProps<TFieldValues>(
  schema: AnyObjectSchema,
  register: UseFormRegister<TFieldValues>,
  errors: ValiantError
) {
  return (key: FieldPath<TFieldValues>) =>
    makeInputProps<TFieldValues>(key, schema, register, errors)
}
