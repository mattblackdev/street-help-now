import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, SmallFormContainer } from '../components/Form'
import { Input } from '../components/Input'
import { Submit } from '../components/Submit'
import { UnderConstruction } from '../components/UnderConstruction'
import { makeFormSchema } from '../utilities/makeFormSchema'
import { makeInputProps } from '../utilities/makeInputProps'
import { useFormErrors } from '../utilities/useFormErrors'
import { requestResource } from './api'
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
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const { error, errors, handleError } = useFormErrors({ setSubmitting })
  const form = useForm()

  const { components = [] } = resourceType
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

  const onSubmit = form.handleSubmit((components) => {
    setSubmitting(true)
    requestResource({ resourceTypeId: resourceType._id, components }).then(
      () => navigate(`/${resourceType.slug}`),
      handleError
    )
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
