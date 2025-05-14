import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestConfigSettings } from '@/components/common/TestConfigSettings'

import { TestConfig, QuestionTemplateSelection } from '@/types'

describe('TestConfigSettings', () => {
  it('renders all question template types', () => {
    // Mock the config prop
    const mockConfig: TestConfig = {
      questionTemplateSelections: [
        { type: 'multipleChoice', isSelected: true },
        { type: 'textEntry', isSelected: true },
        { type: 'multiSelect', isSelected: true },
      ] as QuestionTemplateSelection[],
    }

    // Mock the setConfig function
    const mockSetConfig = vi.fn()

    render(<TestConfigSettings config={mockConfig} setConfig={mockSetConfig} />)

    expect(screen.getByText('Test type options')).toBeInTheDocument()
    expect(screen.getByText('Multiple choice')).toBeInTheDocument()
    expect(screen.getByText('Text entry')).toBeInTheDocument()
    expect(screen.getByText('Multi select')).toBeInTheDocument()

    // Check if checkboxes are rendered and checked
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked()
    })
  })
})
