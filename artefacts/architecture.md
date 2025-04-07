# Architecture

1. Create a TestPlannerService Singleton
   This will be a client-side singleton that manages the TestPlanner instance and provides reactive state updates
   The service would encapsulate the TestPlanner and expose methods to start tests, answer questions, and get the current layout. It would use a simple event emitter or callback system to notify components of state changes.  
    e.g. // /lib/services/TestPlannerService.ts

2. Create a React Hook for Components
   To make the state reactive, you'd create a custom hook that connects to the service.
   This hook would subscribe to state changes from the service and trigger re-renders when needed.  
   e.g. // /lib/hooks/useTestPlanner.ts

3. Client Components Structure
   For a typical user flow:

   - /app/collections/page.tsx (shows collections)

     - CollectionList.tsx (client component)
       - CollectionItem.tsx (with "Start Test" button)

   - /app/test/page.tsx (shows the active test)
     - TestContainer.tsx (client component that uses useTestPlanner)
       - QuestionDisplay.tsx (shows current question)
       - AnswerInput.tsx (for submitting answers)
       - TestProgress.tsx (optional)

4. Usage Flow

   User selects a collection and clicks "Start Test"
   The app navigates to the test page
   The test page initializes the TestPlannerService with the selected collection
   Components use the useTestPlanner hook to display the current question and handle answers
   The TestPlannerService updates the state based on user interactions
   When the test is completed, the app can navigate to a results page or show a summary

5. Server Component Integration (Brief Discussion)
   While your core test functionality would run client-side, Server Components could be used for:

   Initial data fetching: Loading collections from a database
   SEO-friendly content: Static metadata and initial page structure
   Caching test content: Preloading collection data for faster startup

   Server Components would handle the data provisioning, while Client Components would manage the interactive test state.

## Implementation Considerations

State Initialization: Since Next.js client components might mount multiple times, ensure your singleton properly handles initialization/reinitialization.
Navigation: Use Next.js router events to properly clean up test state when navigating away.
TypeScript Integration: Make sure your service and hooks are properly typed for good developer experience.
Error Boundaries: Implement React error boundaries to gracefully handle any issues in the test logic.
