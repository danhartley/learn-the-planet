'use client'
import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { useCollection } from '@/contexts/CollectionContext'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import {
  Collection,
  CollectionOverview,
  CollectionSummary,
  QuestionTemplateSelection,
} from '@/types'

import { getBtnText } from '@/utils/strings'

export const CollectionLinks: React.FC<{
  collections: CollectionSummary[]
  currentCollection: Collection<unknown>
  title: string
}> = ({ collections, currentCollection, title }) => {
  const router = useRouter()
  const { getCollectionById } = useCollection()
  const { startTest } = useTestPlanner<unknown>()

  if (!collections || collections.length === 0) {
    return null
  }

  const filteredCollections = collections.filter(
    linkedCollection => linkedCollection.shortId !== currentCollection.shortId
  )

  if (filteredCollections.length === 0) {
    return null
  }

  const handleStartTest = async (slug?: string, shortId?: string) => {
    if (!slug || !shortId) return
    const collection: Collection<unknown> = (await getCollectionById(
      slug,
      shortId
    )) as Collection<unknown>
    const config = {
      questionTemplateSelections: [
        { type: 'multipleChoice', isSelected: true },
        { type: 'textEntry', isSelected: true },
      ] as QuestionTemplateSelection[],
    }

    startTest({
      collection: (collection as unknown as CollectionOverview).collection,
      config,
    })
    router.push('/test')
  }

  return (
    <>
      <hr />
      <section aria-labelledby="linked-collections" className="list-group">
        <h2 id="linked-collections">{title}</h2>
        <ul className="grid-md">
          {filteredCollections.map((linkedCollection: CollectionSummary) => (
            <li key={linkedCollection.shortId}>
              <div className="card small">
                <Link
                  href={`/collection/${linkedCollection?.slug}-${encodeURIComponent(linkedCollection?.shortId || '')}`}
                >
                  {linkedCollection.name}
                </Link>
                <button
                  id="start-test"
                  onClick={() =>
                    handleStartTest(
                      linkedCollection?.slug,
                      linkedCollection?.shortId
                    )
                  }
                >
                  {getBtnText(linkedCollection.type.toString())}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
