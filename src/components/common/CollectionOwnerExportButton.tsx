'use client'

import { Collection, Topic } from '@/types'
import {
  exportArticleJson,
  parseArticleText,
  exportArticleMarkdown,
} from '@/utils/json'

type Props = {
  collection: Collection<unknown>
}

export const CollectionOwnerExportButton = ({ collection }: Props) => {
  type exportProps = {
    textOnly: boolean
    format: 'json' | 'md'
  }

  const handleExportCollection = ({
    textOnly = false,
    format = 'json',
  }: exportProps) => {
    switch (format) {
      case 'json':
        if (textOnly) {
          const items: Topic[] = collection.items as Topic[]
          const text = items?.map((item: Topic) => {
            return parseArticleText(item.text as string[])
          })
          exportArticleJson(
            text.filter(t => t.trim() !== ''),
            collection.name
          )
        } else {
          exportArticleJson(collection, collection.name)
        }
        break
      case 'md':
        exportArticleMarkdown(collection, collection.name)
    }
  }

  return collection.type.toString() === 'topic' ? (
    <div className="column-group">
      <button
        onClick={() =>
          handleExportCollection({ textOnly: false, format: 'json' })
        }
      >
        Export collection
      </button>
      <button
        onClick={() =>
          handleExportCollection({ textOnly: true, format: 'json' })
        }
      >
        Export text only
      </button>

      <button
        onClick={() =>
          handleExportCollection({ textOnly: false, format: 'md' })
        }
      >
        Export markdown
      </button>
    </div>
  ) : null
}
