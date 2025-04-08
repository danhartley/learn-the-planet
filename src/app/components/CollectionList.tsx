import { Collection } from '@/types'
import { CollectionItem } from '@/components/CollectionItem'

type Props = {
  collections: Collection[]
}

export function CollectionList({ collections }: Props) {
  return (
    <div>
      <h2>Available Collections</h2>
      {collections.length === 0 ? (
        <p>No collections available</p>
      ) : (
        <ul>
          {collections.map(collection => (
            <li key={collection.id}>
              <CollectionItem collection={collection} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
