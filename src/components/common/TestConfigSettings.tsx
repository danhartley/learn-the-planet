import React, { Dispatch, SetStateAction } from 'react'
import { QuestionTemplateSelection, TestConfig } from '@/types'
import { formatCamelCase } from '@/utils/strings'
import { updateTemplate } from '@/utils/arrays'

type Props = {
  config: TestConfig
  setConfig: Dispatch<SetStateAction<TestConfig>>
}

export function TestConfigSettings({ config, setConfig }: Props) {
  const types: QuestionTemplateSelection[] = config.questionTemplateSelections

  if (!types) return

  const handleCheckboxChange = (template: QuestionTemplateSelection) => {
    const updatedTemplates = updateTemplate(
      config.questionTemplateSelections,
      template
    )
    setConfig({ ...config, questionTemplateSelections: updatedTemplates })
  }

  const templateTypes = types.map((selection: QuestionTemplateSelection) => {
    return (
      <li key={selection.type}>
        <input
          id={selection.type}
          type="checkbox"
          checked={selection.isSelected}
          onChange={event =>
            handleCheckboxChange({
              type: event.target.id,
              isSelected: event.target.checked,
            } as QuestionTemplateSelection)
          }
        />
        <label htmlFor={selection.type}>
          {formatCamelCase(selection.type)}
        </label>
      </li>
    )
  })

  return (
    <section aria-labelledby="template-options" className="column-group">
      <h2 id="template-options">Test type options</h2>
      <ul className="list-group">{templateTypes}</ul>
    </section>
  )
}
