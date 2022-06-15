import { FieldPath, UseFormRegister } from 'react-hook-form'
import { AnyObjectSchema, object } from 'yup'
import { ValiantError } from './makeMethod'
import { getFieldSchema } from './yup'

const typeMap: Record<string, string> = {
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
  const fieldSchema = getFieldSchema(schema, key)
  const {
    spec: { presence, label, meta },
    _whitelist,
    type,
  } = fieldSchema

  const propsFromRegister = register(key)
  const isSelect = _whitelist.list.size && type === 'string'
  const inputType = isSelect ? 'select' : typeMap[type] || 'text'

  const options: Array<{ label: string; value: string }> = []
  if (isSelect) {
    _whitelist.list.forEach((k) => {
      const value = k as string
      const label = meta.labels?.[value] || '--'
      options.push({ label, value })
    })
  }

  const inputProps = {
    ...propsFromRegister,
    type: inputType,
    required: presence === 'required',
    placeholder: label,
    error: !!errors[key],
    options,
  }

  if (errors[key]) {
    Object.assign(inputProps, { helpText: errors[key] })
  }

  return inputProps
}

export function makeMakeInputProps<TFieldValues>(
  schema: AnyObjectSchema,
  register: UseFormRegister<TFieldValues>,
  errors: ValiantError
) {
  return (key: FieldPath<TFieldValues>) =>
    makeInputProps<TFieldValues>(key, schema, register, errors)
}
