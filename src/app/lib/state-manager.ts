import { AppState, TestPlan, Collection } from './types'

export class StateManager {
  private appState: AppState = {
    collections: [],
    testPlans: [],
    testPlanId: '',
    lessonPlanId: '',
  }

  constructor() {
    const collections: any = [] // lookup collections
    const testPlans: any = [] // lookup test plans
    const testPlanId = '' // lookup current test plan
    // const lessons: any = [] // lookup lessons
    const lessonPlanId = '' // lookup current lesson plan
    this.appState = {
      collections,
      testPlans,
      testPlanId,
      lessonPlanId,
    }
  }
}
