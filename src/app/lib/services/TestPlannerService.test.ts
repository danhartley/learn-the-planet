import { describe, it, expect } from 'vitest'
import TestPlannerService from '../../lib/services/TestPlannerService'

describe('TestPlannerService', () => {
  it('getInstance should always return the same instance (singleton pattern)', () => {
    // Get the first instance
    const instance1 = TestPlannerService.getInstance()

    // Get a second instance
    const instance2 = TestPlannerService.getInstance()

    // Verify both references point to the same object in memory
    expect(instance1).toBe(instance2)

    // Additional verification: both instances should be of TestPlannerService type
    expect(instance1).toBeInstanceOf(TestPlannerService)
    expect(instance2).toBeInstanceOf(TestPlannerService)
  })
})
