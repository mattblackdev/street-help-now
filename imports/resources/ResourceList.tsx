import { useFind } from 'meteor/react-meteor-data'
import React from 'react'
import Table, { Icolumn, ItableStyle } from 'react-tailwind-table'
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

  return (
    <div className="px-4">
      <Table
        table_header={resourceType.title}
        rows={resources}
        columns={columns}
        should_export={false}
        bordered
        styling={tableStyles}
      />
    </div>
  )
}

const tableStyles: ItableStyle = {
  base_bg_color: 'bg-stone-300',
  main: 'bg-stone-200',
  top: {
    title: 'hidden',
    elements: {
      export: 'text-blood',
      search: 'mt-0 flex-1',
      main: 'mt-0 md:mt-2',
    },
  },
  table_head: {
    table_row: 'bg-stone-300',
  },
  footer: {
    statistics: { main: 'text-stone-600 hidden' },
    page_numbers: 'text-stone-600',
  },
}
