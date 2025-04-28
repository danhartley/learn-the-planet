import { Collection } from '@/types'
import { CollectionItem } from '@/components/CollectionItem'

type Props<T> = {
  collections: Collection<T>[]
}

export function CollectionList<T>({ collections }: Props<T>) {
  return (
    // <section className="group-block" aria-labelledby="collections">
    <ul className="block">
      {collections.map(collection => (
        <li key={collection.id}>
          <CollectionItem<T> collection={collection} />
        </li>
      ))}
    </ul>
    // </section>
  )
}
