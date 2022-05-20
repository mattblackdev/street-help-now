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
    <div className="p-1 sm:p-2 pb-7 max-w-4xl xl:max-w-7xl mx-auto bg-stone-100 rounded shadow shadow-crimson">
      <div className="h-[74vh] pb-1 sm:pb-2 rounded">
        <Map markers={markers} />
      </div>
      <Table
        table_header={resourceType.title}
        rows={rows}
        columns={columns}
        should_export={false}
        bordered
        styling={tableStyles}
        show_search={false}
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
  base_bg_color: 'bg-stone-200',
  main: 'bg-stone-100',
  top: {
    title: 'hidden',
    elements: {
      main: 'hidden',
    },
  },
  table_head: {
    table_row: 'bg-stone-100',
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
