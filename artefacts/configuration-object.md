# Configuration Object

The Configuration Object approach will give you the flexibility to modify existing question types and add new ones while maintaining a clean structure. Based on our discussion, here's what this approach will achieve:

- Allow you to customize the arguments passed to the layout creation methods
- Support adding new question types with similar patterns
- Enable reuse of distractor logic across question types
- Keep the simple string interpolation for question text templates
- Maintain the implicit difficulty progression through question ordering

When you're ready to implement this, we would:

1. Define a structure for question type templates that can reference item properties
2. Create a way to pass this configuration to the TestPlanner
3. Modify the generateLayouts method to use these templates
4. Ensure the distractor generation logic is accessible to all question types

This approach strikes the right balance between flexibility and simplicity for your needs without over-engineering the solution. It also keeps the core logic in the TestPlanner while making the specific question types configurable.
