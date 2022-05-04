import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Form, SmallFormContainer } from '../components/Form'
import { UnderConstruction } from '../components/UnderConstruction'
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
  console.log(resourceType.components)
  return (
    <SmallFormContainer>
      <Form title={`Request ${resourceType.title}`} onSubmit={() => {}}>
        <UnderConstruction />
      </Form>
    </SmallFormContainer>
  )
}
