import { CollectionSummary } from '@/types'
import { CollectionItem } from '@/components/CollectionItem'

type Props = {
  collections: CollectionSummary[]
}

export function CollectionList({ collections }: Props) {
  return (
    <div className="block-container">
      <ul className="grid-md">
        {collections.map(collectionSummary => (
          <li key={collectionSummary.shortId}>
            <CollectionItem collectionSummary={collectionSummary} />
          </li>
        ))}
      </ul>
    </div>
  )
}
