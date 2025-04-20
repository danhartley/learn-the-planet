import { Collection } from '@/types'
import { CollectionItem } from '@/components/CollectionItem'

type Props<T> = {
  collections: Collection<T>[]
}

export function CollectionList<T>({ collections }: Props<T>) {
  return (
    <section className="group-block" aria-labelledby="collections">
      <h2 id="collections">Available Collections</h2>
      {collections.length === 0 ? (
        <p>No collections available</p>
      ) : (
        <ul className="block">
          {collections.map(collection => (
            <li key={collection.id}>
              <CollectionItem collection={collection} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
