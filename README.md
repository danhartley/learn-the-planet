# Learn the Planet App Overview

## Application Overview

"Learn the Planet" is an educational Next.js application that focuses on testing users' knowledge of natural world elements, particularly taxonomy (species identification). The application allows users to:

1. Browse available collections of species or items
2. Start tests based on these collections
3. Answer different types of quiz questions (multiple choice, text entry)
4. Track their scores and progress

## Core Architecture

The application is built with Next.js (React framework) and follows a typical React component structure with:

- Pages (`page.tsx`) that serve as route endpoints
- Components for UI elements
- Hooks for state management
- Services for business logic
- TypeScript types for type safety

## Key Components and Flow

### 1. Layout and Navigation

- The application has a root layout (`layout.tsx`) that provides the basic structure with header, main content area, and footer
- The footer includes a `ScoreDisplay` component showing the user's current test progress
- The home page (`page.tsx`) provides links to different sections: About, Flags, and Collections

### 2. Collections System

- The app maintains collections of items (species) that users can learn about
- Collections are fetched via the `getCollections()` function
- Each collection contains items with properties like:
  - `binomial` (scientific name, e.g., "Genus species")
  - `vernacularName` (common name)
  - `images` (visual representation)
  - `genus` and `species` (parsed from binomial)

### 3. Testing System

The test system is the core functionality, implemented through:

#### Test Planner Logic

- `TestPlannerService` - A singleton service that manages the active test
- `TestPlanner` class - Creates test plans from collections and templates
- `useTestPlanner` hook - React hook for components to interact with the test system

#### Test Flow:

1. User selects a collection on the Collections page
2. User clicks "Start Test" on a `CollectionItem`
3. `startTest()` is called with the collection and question templates
4. The TestPlanner generates question layouts from templates
5. User is redirected to the test page showing the first question
6. User answers questions through different UI components based on question type
7. Answers are marked, scores are tracked, and user progresses through layouts
8. After completing all questions, user is redirected to results page

### 4. Question Types and Templates

The system supports different question types:

- **Multiple Choice**: The user selects from options (4 options including the correct one)
- **Text Entry**: The user types the answer

Question templates (`questionTemplates.ts`) define the structure of questions:

- "Select the correct vernacular name for [scientific name]"
- "Select the correct image for [common name]"
- "Enter the genus for [species]"
- etc.

### 5. Scoring System

- The `Scorer` class tracks:
  - Total questions answered
  - Correct answers
  - Incorrect answers
- Scores are displayed in the footer through `ScoreDisplay`
- The system uses an event emitter to notify components of changes

## State Management: Service Pattern and Event Emitters

The application uses a sophisticated state management approach combining the service pattern with event emitters, which creates a clean separation between business logic and UI components.

### Service Pattern Implementation

The `TestPlannerService` class is the core of this pattern:

1. **Singleton Pattern**: The service is implemented as a singleton to ensure only one instance exists throughout the application:

```typescript
class TestPlannerService {
  private static instance: TestPlannerService

  private constructor() {}

  static getInstance(): TestPlannerService {
    if (!TestPlannerService.instance) {
      TestPlannerService.instance = new TestPlannerService()
    }
    return TestPlannerService.instance
  }

  // Service methods...
}
```

2. **Core Business Logic**: The service encapsulates all test-related operations:

   - Starting tests
   - Getting current question layouts
   - Marking answers
   - Moving between questions
   - Resetting tests

3. **State Encapsulation**: The service maintains internal state through the `TestPlanner` instance:

```typescript
private testPlanner: TestPlanner | null = null
```

### Event-Based Communication System

The service uses Node.js's `EventEmitter` to implement a publish-subscribe pattern:

1. **Event Types**: The application defines specific event types in an enum:

```typescript
// From TestPlannerEvent enum
TEST_STARTED
ANSWER_MARKED
QUESTION_CHANGED
STATE_CHANGED
TEST_RESET
```

2. **Event Emission**: The service emits events when state changes:

```typescript
markAnswer(answer: string): Score | null {
  if (!this.testPlanner) return null
  const score = this.testPlanner.markAnswer(answer)
  this.emitter.emit(TestPlannerEvent.ANSWER_MARKED, { answer, score })
  this.emitter.emit(TestPlannerEvent.STATE_CHANGED)
  return score
}
```

3. **Subscription System**: Components can subscribe to events:

```typescript
subscribe(callback: () => void): () => void {
  this.emitter.on(TestPlannerEvent.STATE_CHANGED, callback)
  return () => this.emitter.off(TestPlannerEvent.STATE_CHANGED, callback)
}

subscribeToEvent(
  eventName: string,
  callback: (data?: any) => void
): () => void {
  this.emitter.on(eventName, callback)
  return () => this.emitter.off(eventName, callback)
}
```

4. **Cleanup Functions**: Each subscription method returns an unsubscribe function to prevent memory leaks.

### React Integration via Custom Hook

The `useTestPlanner` hook connects React components to the service:

1. **Service Access**: The hook gets the singleton instance:

```typescript
const service = TestPlannerService.getInstance()
```

2. **Local State**: The hook maintains React state for UI components:

```typescript
const [layout, setLayout] = useState<Layout | null>(service.getCurrentLayout())
const [isActive, setIsActive] = useState<boolean>(service.isTestActive())
const [lastScore, setLastScore] = useState<Score | null>(null)
```

3. **Subscription Setup**: The hook subscribes to service events with `useEffect`:

```typescript
useEffect(() => {
  // Update state when service emits changes
  const unsubscribe = service.subscribe(() => {
    setLayout(service.getCurrentLayout())
    setIsActive(service.isTestActive())
  })

  const unsubscribeFromAnswerMarked = service.subscribeToEvent(
    TestPlannerEvent.ANSWER_MARKED,
    ({ answer, score }) => {
      setLastScore(score)
    }
  )

  // Cleanup subscription
  return () => {
    unsubscribe()
    unsubscribeFromAnswerMarked()
  }
}, [])
```

4. **API Exposure**: The hook exposes methods for components to use:

```typescript
return {
  startTest: (collection, questionTemplates) =>
    service.startTest(collection, questionTemplates),
  currentLayout: layout,
  markAnswer: answer => service.markAnswer(answer),
  moveToNextQuestion: () => service.moveToNextQuestion(),
  isActive,
  resetTest: () => service.resetTest(),
  lastScore,
}
```

### Benefits of This Approach

1. **Separation of Concerns**: Business logic is separated from UI components
2. **Centralized State**: Test state is managed in one place
3. **Reactive Updates**: Components react to state changes through event subscriptions
4. **Reusability**: Multiple components can share the same state
5. **Testability**: Service can be tested independently of React components
6. **Memory Management**: Proper subscription cleanup prevents memory leaks

This pattern is particularly valuable for the app's quiz system where multiple components need to react to the same state changes (current question, score updates, test completion) without tightly coupling them together.

## License

This code is released for **non-commercial use only** under a custom license.  
You may view and use it for personal or educational purposes.  
Commercial use or redistribution is prohibited without permission.

If you wish to license this software commercially, please contact [danhartleybcn@gmail.com](mailto:danhartleybcn@gmail.com).
