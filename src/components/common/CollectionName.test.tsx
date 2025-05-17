import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CollectionName } from '@/components/common/CollectionName'

describe('CollectionName', () => {
  // Mock function
  const mockSetName = vi.fn()

  describe('initial state', () => {
    it('renders in read mode with the correct name', () => {
      // Arrange
      const testName = 'Test Collection'

      // Act
      render(
        <CollectionName
          operation="read"
          name={testName}
          setName={mockSetName}
          type="topic"
        />
      )

      // Assert
      expect(screen.getByText('Collection name:')).toBeInTheDocument()
      expect(screen.getByText(testName)).toBeInTheDocument()
    })

    it('renders form elements in create mode', () => {
      // Arrange & Act
      render(
        <CollectionName
          operation="create"
          name=""
          setName={mockSetName}
          type="topic"
        />
      )

      // Assert
      expect(screen.getByLabelText('Name')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
    })

    it('applies the correct CSS class based on type prop', () => {
      // Arrange
      const testType = 'topic'

      // Act
      render(
        <CollectionName
          operation="create"
          name=""
          setName={mockSetName}
          type={testType}
        />
      )

      // Assert
      const formRow = screen.getByLabelText('Name').closest('.form-row')
      expect(formRow).toHaveClass(testType)
    })
  })
})
