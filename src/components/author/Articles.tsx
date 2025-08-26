import Link from 'next/link'

import { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { sortAlphabeticallyBy } from '@/utils/strings'

import { CollectionSummary } from '@/types'

type Props = {
  ownerId: string
  author: string
}

export const Articles = ({ ownerId, author }: Props) => {
  const { getCollectionSummariesByOwnerId } = useCollection()
  const [articles, setArticles] = useState<CollectionSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)

  type ArticleTypes = {
    topics: CollectionSummary[]
    taxa: CollectionSummary[]
    traits: CollectionSummary[]
    terms: CollectionSummary[]
  }

  const [types, setTypes] = useState<ArticleTypes>({
    topics: [],
    taxa: [],
    traits: [],
    terms: [],
  })

  useEffect(() => {
    setTypes({
      topics: sortAlphabeticallyBy(
        articles.filter(article => article.type.toString() === 'topic'),
        'name'
      ),
      taxa: sortAlphabeticallyBy(
        articles.filter(article => article.type.toString() === 'taxon'),
        'name'
      ),
      traits: sortAlphabeticallyBy(
        articles.filter(article => article.type.toString() === 'trait'),
        'name'
      ),
      terms: sortAlphabeticallyBy(
        articles.filter(article => article.type.toString() === 'term'),
        'name'
      ),
    })
  }, [articles])

  const toggleArticles = async () => {
    if (!loaded) {
      // First time - fetch data
      setLoading(true)
      try {
        const data = await getCollectionSummariesByOwnerId(ownerId)
        setArticles(data)
        setLoaded(true)
        setVisible(true)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    } else {
      // Just toggle visibility
      setVisible(!visible)
    }
  }

  const topics = types['topics'].map(article => (
    <div key={article.id} className="list-group">
      <Link href={`/collection/${article?.slug}-${article?.shortId}`}>
        {article?.name}
      </Link>
      <div>{article.date || ''}</div>
      <div>{article.location || ''}</div>
      <div>{article.status}</div>
    </div>
  ))

  const taxa = types['taxa'].map(article => (
    <div key={article.id}>
      <Link href={`/collection/${article?.slug}-${article?.shortId}`}>
        {article?.name}
      </Link>
    </div>
  ))

  const traits = types['traits'].map(article => (
    <div key={article.id}>
      <Link href={`/collection/${article?.slug}-${article?.shortId}`}>
        {article?.name}
      </Link>
    </div>
  ))

  const terms = types['terms'].map(article => (
    <div key={article.id}>
      <Link href={`/collection/${article?.slug}-${article?.shortId}`}>
        {article?.name}
      </Link>
    </div>
  ))

  return (
    <div className="column-group">
      <button className="small" onClick={toggleArticles}>
        {loading ? 'Loading...' : visible ? 'Hide articles' : 'Show articles'}
      </button>

      {visible && (
        <div className="group-block">
          <h2>Collections</h2>
          {articles.length === 0 ? (
            <div>No Collections found for {author}.</div>
          ) : (
            <>
              {topics && (
                <>
                  <h3>Articles</h3>
                  {topics}
                  <hr />
                </>
              )}
              {taxa.length > 0 && (
                <>
                  <h3>Taxa</h3>
                  {taxa}
                  <hr />
                </>
              )}
              {traits.length > 0 && (
                <>
                  <h3>Traits</h3>
                  {traits}
                  <hr />
                </>
              )}
              {terms.length > 0 && (
                <>
                  <h3>Terms</h3>
                  {terms}
                  <hr />
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
