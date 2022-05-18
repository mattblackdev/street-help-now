import { useFind } from 'meteor/react-meteor-data'
import React from 'react'
import Table, { Icolumn, ItableStyle } from 'react-tailwind-table'
import { Map } from '/imports/components/Map'
import { Resources, ResourceType } from '/imports/resources/api/collection'
import { Subs } from '/imports/resources/api/subs'
import useSubscription from '/imports/utilities/useSubscription'

type ResourceListProps = { resourceType: ResourceType }
export function ResourceList({ resourceType }: ResourceListProps) {
  useSubscription(Subs.resources, resourceType._id)
  const resources = useFind(
    () => Resources.find({ resourceTypeId: resourceType._id }),
    [resourceType._id]
  )

  const columns = (resourceType.components ?? [])
    .flatMap((c) =>
      c.fields.map((f) => ({
        ...f,
        path: `components.${c.key}.${f.key}`,
      }))
    )
    .map<Icolumn>(({ path, label }) => ({ field: path, use: label }))
    .concat({ field: '_id', use_in_display: false })

  return (
    <div className="pb-7 max-w-4xl mx-auto">
      <div className="h-[74vh]">
        <Map />
      </div>
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
  table_body: {
    main: '',
    table_row: 'bg-stone-100 hover:bg-stone-200',
  },
  footer: {
    statistics: { main: 'text-stone-600 hidden' },
    page_numbers: 'text-stone-600',
  },
}
