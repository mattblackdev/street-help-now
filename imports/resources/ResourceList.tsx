import { useFind } from 'meteor/react-meteor-data'
import React from 'react'
import Table, { Icolumn } from 'react-tailwind-table'
import { Resources, ResourceType, Subs } from './api'
import useSubscription from '/imports/utilities/useSubscription'

type ResourceListProps = { resourceType: ResourceType }
export function ResourceList({ resourceType }: ResourceListProps) {
  useSubscription(Subs.resources, resourceType._id)
  const resources = useFind(
    () => Resources.find({ resourceTypeId: resourceType._id }),
    [resourceType._id]
  )

  const columns = (resourceType.components ?? [])
    .map<Icolumn>(({ name }) => ({ field: name, use: name.toUpperCase() }))
    .concat({ field: '_id', use_in_display: false })

  console.log({ rows: resources, columns })
  return (
    <Table
      table_header={resourceType.title}
      rows={resources}
      columns={columns}
      bordered
      styling={{
        base_bg_color: 'bg-stone-300',
        main: 'bg-stone-200',
        top: { elements: { export: 'text-blood' } },
        footer: {
          statistics: { main: 'text-stone-600' },
          page_numbers: 'text-stone-600',
        },
      }}
    />
  )
}
