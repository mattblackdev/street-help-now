import React, { useState } from 'react'
import {
  FieldPath,
  useFieldArray,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Accordion, Panel } from '../components/Accordion'
import { ActionButton } from '../components/ActionButton'
import { Form, SmallFormContainer } from '../components/Form'
import { Input } from '../components/Input'
import { Submit } from '../components/Submit'
import { UnderConstruction } from '../components/UnderConstruction'
import { ValiantError } from '../utilities/validatedMethod'
import { getSpec } from '../utilities/yup'
import { ResourceTypeUpdate, resourceTypeUpdate } from './api'
import { ResourceType } from './collection'

type ResourceTypeUpdateProps = {
  resourceType: ResourceType
}

type FormType = Omit<ResourceTypeUpdate, '_id'>

export function EditResourceType({ resourceType }: ResourceTypeUpdateProps) {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<ValiantError>({})
  const [error, setError] = useState('')
  const form = useForm<FormType>({
    defaultValues: { ...resourceType },
  })
  const { register, handleSubmit } = form

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

  function makeInputProps(key: FieldPath<FormType>) {
    if (!key) throw Error('Missing key for makeInputProps')
    const { presence, label } = getSpec(resourceTypeUpdate.schema, key)
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
        <ComponentsInput makeInputProps={makeInputProps} form={form} />
        <Submit text="Save" submitting={submitting} error={error} />
        <UnderConstruction />
      </Form>
    </SmallFormContainer>
  )
}

type ComponentsInputProps = {
  makeInputProps: Function
  form: UseFormReturn<FormType>
}

function ComponentsInput({ makeInputProps, form }: ComponentsInputProps) {
  const { fields, append, remove, move } = useFieldArray({
    name: 'components',
    control: form.control,
  })

  return (
    <>
      <h2 className="text-2xl mt-7 mb-4">Components</h2>
      <Accordion>
        {fields.map((field, index) => {
          const getKey = (key: string) => `components.${index}.${key}`

          return (
            <Panel
              key={field.id}
              panelKey={field.id}
              title={field.label || '--'}
              open={!field.label}
            >
              <div className="mb-10">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <Input {...makeInputProps(getKey('label'))} />
                  </div>
                  <div className="flex items-center pb-7 px-4">
                    {index > 0 ? (
                      <ActionButton onClick={() => move(index, index - 1)}>
                        ^
                      </ActionButton>
                    ) : null}
                    {fields.length > 1 && index < fields.length - 1 ? (
                      <ActionButton onClick={() => move(index, index + 1)}>
                        ⌄
                      </ActionButton>
                    ) : null}
                    <ActionButton
                      onClick={() => {
                        if (
                          !field.label ||
                          window.confirm(`Delete "${field.label}" component?`)
                        ) {
                          remove(index)
                        }
                      }}
                    >
                      x
                    </ActionButton>
                  </div>
                </div>
                <Input {...makeInputProps(getKey('key'))} />
                <ComponentFieldsInput
                  makeInputProps={makeInputProps}
                  componentIndex={index}
                  form={form}
                />
              </div>
            </Panel>
          )
        })}
      </Accordion>
      <div className="my-4">
        <button
          className="bg-stone-800 text-stone-100 border-2 px-2 rounded-md"
          onClick={() => append({ key: '', label: '', fields: [] })}
        >
          Add Component
        </button>
      </div>
    </>
  )
}

type ComponentFieldsInputProps = ComponentsInputProps & {
  componentIndex: number
}

function ComponentFieldsInput({
  makeInputProps,
  componentIndex,
  form,
}: ComponentFieldsInputProps) {
  const { fields, append, remove, move } = useFieldArray({
    name: `components.${componentIndex}.fields`,
    control: form.control,
  })

  return (
    <>
      <h3 className="text-2xl mt-4 mb-2">Fields</h3>
      {fields.map((field, index) => {
        const getKey = (key: string) =>
          `components.${componentIndex}.fields.${index}.${key}`

        return (
          <div
            key={field.id}
            className="border-2 border-stone-400 p-2 rounded pr-4 mb-4"
          >
            <div className="flex justify-between">
              <div className="flex-1">
                <Input {...makeInputProps(getKey('label'))} />
              </div>
              <div className="flex items-center pb-7 pl-4">
                {index > 0 ? (
                  <ActionButton onClick={() => move(index, index - 1)}>
                    ^
                  </ActionButton>
                ) : null}
                {fields.length > 1 && index < fields.length - 1 ? (
                  <ActionButton onClick={() => move(index, index + 1)}>
                    ⌄
                  </ActionButton>
                ) : null}
                <ActionButton
                  onClick={() => {
                    if (
                      !field.label ||
                      window.confirm(`Delete "${field.label}" field?`)
                    ) {
                      remove(index)
                    }
                  }}
                >
                  x
                </ActionButton>
              </div>
            </div>
            <Input {...makeInputProps(getKey('key'))} />
            <Input {...makeInputProps(getKey('type'))} />
            <Input {...makeInputProps(getKey('matches'))} />
          </div>
        )
      })}
      <div>
        <button
          className="bg-stone-800 text-stone-100 border-2 px-2 rounded-md"
          onClick={() => append({ key: '', label: '', type: 'string' })}
        >
          Add Field
        </button>
      </div>
    </>
  )
}
