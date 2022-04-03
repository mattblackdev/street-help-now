import React from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink } from '/imports/components/ExternalLink'
import { Show } from '/imports/components/Show'
import { ResourceType } from './api'

type CardListProps = { showEdit: boolean; resourceTypes: ResourceType[] }

export function CardsList({ resourceTypes, showEdit }: CardListProps) {
  const makeCard = (resourceType: ResourceType) => {
    return (
      <Card
        key={resourceType._id}
        resourceType={resourceType}
        showEdit={showEdit}
      />
    )
  }

  return (
    <ul className="pt-1 md:pt-7 p-7 gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {resourceTypes.map(makeCard)}
    </ul>
  )
}

type CardProps = { resourceType: ResourceType; showEdit: boolean }
function Card({ resourceType, showEdit }: CardProps) {
  const isExternal = Boolean(resourceType.url)
  const LinkEl = isExternal ? ExternalLink : Link
  return (
    <li
      className="relative max-w-md w-full flex flex-col justify-center items-center mx-auto"
      key={resourceType._id}
    >
      <LinkEl
        className="p-7 w-full rounded-lg bg-blood shadow-md transition-all hover:bg-brightblood hover:shadow-lg select-none flex flex-1 flex-col text-center justify-center items-center group"
        to={resourceType.url ?? resourceType.slug}
      >
        <span className="p-4 text-7xl opacity-90">{resourceType.emoji}</span>
        <span className="p-2 text-4xl font-semibold lg:font-bold group-hover:underline">
          {resourceType.title}
        </span>
      </LinkEl>
      <Show when={showEdit}>
        <div className="absolute top-0 right-0 pt-2 pr-4">
          <Link className="hover:underline" to={`${resourceType.slug}/edit`}>
            Edit
          </Link>
        </div>
      </Show>
      <Show when={isExternal}>
        <div className="absolute bottom-0 right-0 pb-2 pr-4 select-none pointer-events-none">
          <span>External</span>
        </div>
      </Show>
    </li>
  )
}
