import React from 'react'
import { Link } from 'react-router-dom'
import { Belt } from '/imports/components/Belt'
import { ResourceType } from '/imports/resources/api/collection'
import { ctl } from '/imports/utilities/ctl'

type NeedSomethingProps = {
  resourceTypes: ResourceType[]
}

export function NeedSomething({ resourceTypes }: NeedSomethingProps) {
  const requestableResources = resourceTypes.filter((rt) => rt.requestable)
  return (
    <Belt>
      <div
        className={ctl(
          `relative p-7 pt-16 bg-stone-200 text-stone-900 rounded-md shadow`
        )}
      >
        <h2 className={ctl(`text-3xl mb-16 text-center`)}>What do you need?</h2>
        <ul className={ctl(`grid md:grid-cols-3 grid-cols-2 gap-2`)}>
          {requestableResources.map((r) => (
            <li
              key={r._id}
              className={ctl(
                `border-2 border-stone-900 rounded-xl relative max-w-[144px] w-full flex flex-col justify-center items-center mx-auto`
              )}
            >
              <Link
                className={ctl(
                  `p-4 w-full rounded-lg shadow transition-all hover:bg-brightblood hover:text-stone-100 select-none flex flex-1 flex-col text-center justify-center items-center group`
                )}
                to={r.slug}
              >
                <span className={ctl(`pb-2 text-2xl`)}>{r.emoji}</span>
                <span
                  className={ctl(
                    `font-semibold lg:font-bold group-hover:underline`
                  )}
                >
                  {r.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Belt>
  )
}
