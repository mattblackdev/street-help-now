import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { Form, SmallFormContainer } from '../components/Form'
import { Input } from '../components/Input'
import { Submit } from '../components/Submit'
import { UnderConstruction } from '../components/UnderConstruction'
import { makeFormSchema } from '../utilities/makeFormSchema'
import { makeInputProps } from '../utilities/makeInputProps'
import { useFormErrors } from '../utilities/useFormErrors'
import { ResourceType } from './collection'

type RequestResourceProps = {
  resourceTypes: ResourceType[]
}

export function RequestResource({ resourceTypes }: RequestResourceProps) {
  const { slug } = useParams<{ slug: string }>()
  const resourceType = resourceTypes.find((r) => r.slug === slug)
  if (!resourceType) return <NotFound />
  return <RequestResourceForm resourceType={resourceType} />
}

function NotFound() {
  return (
    <SmallFormContainer>
      <Form title="This resource type wasn't found." onSubmit={() => {}}>
        <div className="flex justify-center">
          <Link
            to="/need"
            className="border-2 border-stone-900 rounded-xl px-7 py-4 font-semibold"
          >
            Go to the list
          </Link>
        </div>
      </Form>
    </SmallFormContainer>
  )
}

type RequestResourceFormProps = {
  resourceType: ResourceType
}
function RequestResourceForm({ resourceType }: RequestResourceFormProps) {
  const { components = [] } = resourceType
  const [submitting, setSubmitting] = useState(false)
  const { error, errors, handleError } = useFormErrors()
  const form = useForm()
  const [schema, keys] = useMemo(
    () => [
      makeFormSchema(components),
      components.flatMap((c) => c.fields.map((f) => `${c.key}.${f.key}`)),
    ],
    [components]
  )

  const inputs = keys.map((key) => (
    <Input key={key} {...makeInputProps(key, schema, form.register, errors)} />
  ))

  const onSubmit = form.handleSubmit((formData) => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      window.alert(
        `Still working on this part. Thanks for submitting: ${JSON.stringify(
          formData,
          null,
          2
        )}`
      )
    }, 444)
  })

  return (
    <SmallFormContainer>
      <Form title={`Request ${resourceType.title}`} onSubmit={onSubmit}>
        {inputs}
        <Submit text="Submit" error={error} submitting={submitting} />
        <UnderConstruction />
      </Form>
    </SmallFormContainer>
  )
}
