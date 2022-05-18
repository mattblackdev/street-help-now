import { get, set } from 'lodash-es'
import { useFind } from 'meteor/react-meteor-data'
import React from 'react'
import Table, { ItableStyle } from 'react-tailwind-table'
import { Map, Markers } from '/imports/components/Map'
import {
  Resource,
  Resources,
  ResourceType,
  ResourceTypeComponent,
} from '/imports/resources/api/collection'
import { Subs } from '/imports/resources/api/subs'
import useSubscription from '/imports/utilities/useSubscription'

type ResourceListProps = { resourceType: ResourceType }
export function ResourceList({ resourceType }: ResourceListProps) {
  useSubscription(Subs.resources, resourceType._id)
  const resources = useFind(
    () => Resources.find({ resourceTypeId: resourceType._id }),
    [resourceType._id]
  )

  const columns = makeTableColumns(resourceType.components)
  const rows = makeTableRows(columns, resources)
  const markers = makeMapMarkers(resources)

  return (
    <div className="pb-7 max-w-4xl mx-auto">
      <div className="h-[74vh]">
        <Map markers={markers} />
      </div>
      <Table
        table_header={resourceType.title}
        rows={rows}
        columns={columns}
        should_export={false}
        bordered
        styling={tableStyles}
      />
    </div>
  )
}

function makeTableColumns(components: ResourceTypeComponent[] = []) {
  const columns = []
  for (const c of components) {
    for (const f of c.fields) {
      columns.push({ field: `components.${c.key}.${f.key}`, use: f.label })
    }
  }
  return columns
}

function makeTableRows(
  columns: Array<{ field: string }>,
  resources: Resource[]
) {
  const rows = []
  for (const resource of resources) {
    const row = { ...resource }
    for (const column of columns) {
      if (!get(row, column.field)) {
        set(row, column.field, '--')
      }
    }
    rows.push(row)
  }
  return rows
}

function makeMapMarkers(resources: Resource[]) {
  const markers: Markers = []
  for (const resource of resources) {
    const lat = get(resource, 'components.location.lat')
    const lng = get(resource, 'components.location.lng')
    if (lat !== undefined && lng !== undefined) {
      const tooltip = get(resource, 'components.title.title', 'Unknown')
      const key = resource._id
      markers.push({ coords: { lat, lng }, tooltip, key })
    }
  }
  return markers
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
