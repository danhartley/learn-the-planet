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
      <li key={selection.type} className="horizontal-group">
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
    <section aria-labelledby="template-options">
      <h3 id="template-options">Template options</h3>
      <ul>{templateTypes}</ul>
    </section>
  )
}
