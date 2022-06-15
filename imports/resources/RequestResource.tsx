import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Belt } from '/imports/components/Belt'
import { Form } from '/imports/components/Form'
import { Input } from '/imports/components/Input'
import { Submit } from '/imports/components/Submit'
import { UnderConstruction } from '/imports/components/UnderConstruction'
import { ResourceType } from '/imports/resources/api/collection'
import { requestResource } from '/imports/resources/api/requestResource'
import { makeFormSchema } from '/imports/utilities/makeFormSchema'
import { makeInputProps } from '/imports/utilities/makeInputProps'
import { useFormState } from '/imports/utilities/useFormState'

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
    <Belt>
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
    </Belt>
  )
}

type RequestResourceFormProps = {
  resourceType: ResourceType
}
function RequestResourceForm({ resourceType }: RequestResourceFormProps) {
  const navigate = useNavigate()
  const { error, errors, submitting, setSubmitting, handleError } =
    useFormState()

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
    <Belt>
      <Form title={`Request ${resourceType.title}`} onSubmit={onSubmit}>
        {inputs}
        <Submit text="Submit" error={error} submitting={submitting} />
        <UnderConstruction />
      </Form>
    </Belt>
  )
}
