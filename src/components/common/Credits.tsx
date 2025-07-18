import Link from 'next/link'

import { Collection, Credit } from '@/types'

type Section = {
  credit?: Credit
}

type Props = {
  collection: Collection<Section>
}

export const Credits = ({ collection }: Props) => {
  const hasCredits = (collection.items ?? []).filter(i => i.credit).length > 0

  const creditedSections = collection?.items?.filter(i => i.credit)

  const credits =
    hasCredits &&
    creditedSections?.map(section => {
      return (
        <li key={crypto.randomUUID().split('-')[0]}>
          {section?.credit && (
            <>
              {section?.credit?.authors && (
                <div>{section.credit.authors.join(', ')}</div>
              )}
              {section?.credit?.source && (
                <Link href={section.credit.source}>{section.credit.title}</Link>
              )}
            </>
          )}
        </li>
      )
    })

  return (
    hasCredits && (
      <>
        <div>
          <h2>Credits</h2>
          <ul className="list-group">{credits}</ul>
        </div>
        <hr />
      </>
    )
  )
}
