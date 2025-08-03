import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { SessionProvider } from 'next-auth/react'
import { Menu } from '@/components/Menu'

// Test wrapper component
const TestWrapper = ({
  children,
  session = null,
}: {
  children: React.ReactNode
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  session?: any
}) => <SessionProvider session={session}>{children}</SessionProvider>

describe('Menu', () => {
  describe('when user is not logged in', () => {
    beforeEach(() => {
      render(
        <TestWrapper>
          <Menu />
        </TestWrapper>
      )
    })

    it('should render', () => {
      expect(screen.getByText('Site Navigation')).toBeInTheDocument()
    })

    it('should contain basic navigation items', () => {
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByText('Topics')).toBeInTheDocument()
      expect(screen.getByText('Traits')).toBeInTheDocument()
      expect(screen.getByText('Taxa')).toBeInTheDocument()
      expect(screen.getByText('Terms')).toBeInTheDocument()
      expect(screen.getAllByRole('link')[0]).toBeInTheDocument()
    })

    it('should not show admin links', () => {
      expect(screen.queryByText('Flags')).not.toBeInTheDocument()
      expect(screen.queryByText('Admin')).not.toBeInTheDocument()
    })
  })

  describe('when user is admin', () => {
    const adminSession = {
      user: {
        id: '6867edcb91fda094ef1fd10d',
      },
    }

    beforeEach(() => {
      render(
        <TestWrapper session={adminSession}>
          <Menu />
        </TestWrapper>
      )
    })

    it('should show admin links', () => {
      expect(screen.getByText('Flags')).toBeInTheDocument()
      expect(screen.getByText('Admin')).toBeInTheDocument()
    })
  })
})
