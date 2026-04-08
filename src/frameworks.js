export const frameworks = [
  {
    id: 'co-star',
    name: 'CO-STAR',
    description: 'A comprehensive framework for professional and business contexts.',
    help: 'Use CO-STAR when you need a highly structured, professional output. It ensures all relevant business context is captured.',
    fields: [
      { id: 'context', label: 'Context', placeholder: 'Background information on the task...', help: 'What is the background? Why are we doing this?' },
      { id: 'objective', label: 'Objective', placeholder: 'What you want the LLM to do...', help: 'Specifically, what should the result be?' },
      { id: 'style', label: 'Style', placeholder: 'e.g., Analytical, Creative, Understated...', help: 'Whose writing style should it mimic?' },
      { id: 'tone', label: 'Tone', placeholder: 'e.g., Professional, Humorous, Urgent...', help: 'What is the emotional quality of the response?' },
      { id: 'audience', label: 'Audience', placeholder: 'Who is this for?', help: 'Who will be reading or using this output?' },
      { id: 'response', label: 'Response', placeholder: 'Format (table, list, essay)...', help: 'What format should the response take?' }
    ]
  },
  {
    id: 'risen',
    name: 'RISEN',
    description: 'Ideal for task-oriented prompts with clear constraints.',
    help: 'RISEN is excellent for complex tasks that require step-by-step execution and strict adherence to limitations.',
    fields: [
      { id: 'role', label: 'Role', placeholder: 'e.g., Senior Data Scientist...', help: 'Who should the AI act as?' },
      { id: 'instructions', label: 'Instructions', placeholder: 'Main task description...', help: 'What is the primary thing the AI needs to do?' },
      { id: 'steps', label: 'Steps', placeholder: 'Step-by-step process...', help: 'Are there specific operations to perform in sequence?' },
      { id: 'end-goal', label: 'End Goal', placeholder: 'The desired final outcome...', help: 'What does success look like?' },
      { id: 'narrowing', label: 'Narrowing', placeholder: 'Constraints and limitations...', help: 'What should the AI AVOID doing?' }
    ]
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'A flexible, simple structure for brainstorming.',
    help: 'Use this for quick iterations where you just need to set a Role and a Task.',
    fields: [
      { id: 'role', label: 'Role', placeholder: 'Who is the AI?' },
      { id: 'context', label: 'Context', placeholder: 'What do they need to know?' },
      { id: 'task', label: 'Task', placeholder: 'What should they do?' }
    ]
  }
];
