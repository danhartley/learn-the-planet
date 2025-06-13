import { Topic } from '@/types'

type Props = {
  section: Topic
}
export const CollectionTopicSection = ({ section }: Props) => {
  const getText = (text: string[] | undefined) => {
    return text ? `${text[0].slice(0, 100)}…` : ''
  }

  return (
    <div className="group-block">
      <div key={section.id}>{getText(section.text)}</div>
      <button type="button" id="edit-section">
        Edit
      </button>
    </div>
  )
}
