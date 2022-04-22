import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Form, SmallFormContainer } from '../components/Form'
import { Input } from '../components/Input'
import { Submit } from '../components/Submit'
import { UnderConstruction } from '../components/UnderConstruction'
import { ValiantError } from '../utilities/validatedMethod'
import { ResourceType, ResourceTypeUpdate, resourceTypeUpdate } from './api'

type ResourceTypeUpdateProps = {
  resourceType: ResourceType
}

type FormType = Omit<ResourceTypeUpdate, '_id'>

export function EditResourceType({ resourceType }: ResourceTypeUpdateProps) {
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<ValiantError>({})
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm<FormType>({
    defaultValues: { ...resourceType },
  })
  const navigate = useNavigate()

  const onSubmit = handleSubmit((formData) => {
    setSubmitting(true)
    resourceTypeUpdate({ _id: resourceType._id, ...formData }, (error) => {
      setSubmitting(false)
      if (error) {
        if (error instanceof ValiantError) {
          setErrors(error)
        } else {
          setError(error.message)
        }
      } else {
        navigate('/')
      }
    })
  })

  const formTitle = `Edit ${resourceType.title}`

  const makeInputProps = (key: keyof FormType) => {
    const { presence, label } =
      resourceTypeUpdate.schema.fields[key]?.spec ?? {}

    const propsFromRegister = register(key)

    return {
      ...propsFromRegister,
      required: presence === 'required',
      placeholder: label,
      error: !!errors[key],
      helpText: errors[key],
    }
  }

  return (
    <SmallFormContainer>
      <Form onSubmit={onSubmit} title={formTitle}>
        <Input {...makeInputProps('title')} />
        <Input {...makeInputProps('emoji')} />
        <Input {...makeInputProps('slug')} />
        <Input {...makeInputProps('url')} />
        <Submit text="Save" submitting={submitting} error={error} />
        <UnderConstruction />
      </Form>
    </SmallFormContainer>
  )
}
