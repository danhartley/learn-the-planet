import {
  ContentTypeHandler,
  LearningItem,
  QuestionTemplate,
  Question,
  MultipleChoiceQuestion,
  TextEntryQuestion,
  MultipleSelectQuestion,
  MultipleChoiceTemplate,
  TextEntryTemplate,
  MultiSelectTemplate,
  Collection,
  DistractorType,
  MultipleSelectOption,
  Taxon,
  Term,
} from '@/types'

import { getPropByPath, shuffleArray, getRandomItems } from '@/utils/strings'

import { markAnswer } from '@/utils/scorer'

export class ContentHandlerBase<T extends LearningItem>
  implements ContentTypeHandler<T>
{
  /**
   * Function to generate distractors, provided during initialization
   */
  private generateItemDistractors: (
    collection: Collection<T>,
    item: T,
    count: number,
    distractorType: DistractorType
  ) => unknown[]

  /**
   * Constructor that takes a distractor generator function
   */
  constructor(
    distractorGenerator?: (
      collection: Collection<T>,
      item: T,
      count: number,
      distractorType: DistractorType
    ) => unknown[]
  ) {
    this.generateItemDistractors = distractorGenerator || (() => [])
  }

  /**
   * Creates questions from an item based on question templates
   */
  createQuestions(
    collection: Collection<T>,
    item: T,
    templates: QuestionTemplate[]
  ): Question[] {
    return templates.map(template => {
      const questionText = this.processTemplate(
        template.questionTextTemplate,
        item
      )
      switch (template.type) {
        case 'multipleChoice':
          return this.createMultipleChoiceQuestion(
            collection,
            item,
            template as MultipleChoiceTemplate,
            questionText
          )
        case 'textEntry':
          return this.createTextEntryQuestion(
            item,
            template as TextEntryTemplate,
            questionText
          )
        case 'multiSelect':
          return this.createMultiSelectQuestion(
            collection,
            item,
            template as MultiSelectTemplate,
            questionText
          )
        default:
          throw new Error(
            `Unsupported question type: ${(template as QuestionTemplate).type}`
          )
      }
    })
  }

  /**
   * Generates distractor items for multiple choice questions
   */
  generateDistractors(
    collection: Collection<T>,
    item: T,
    count: number,
    distractorType: DistractorType
  ): unknown[] {
    return this.generateItemDistractors(collection, item, count, distractorType)
  }

  /**
   * Validates an answer against a question
   */
  validateAnswer(question: Question, answer: string | string[]): boolean {
    return markAnswer(question, answer)
  }

  /**
   * Creates a multiple choice question from a template
   */
  private createMultipleChoiceQuestion(
    collection: Collection<T>,
    item: T,
    template: MultipleChoiceTemplate,
    questionText: string
  ): MultipleChoiceQuestion {
    // Get the correct answer property
    const correctAnswer = this.getPropertyByPath(
      item,
      template.correctAnswerProperty
    )

    // Generate distractors
    const distractorItems = this.generateDistractors(
      collection,
      item,
      template.distractorCount,
      template.distractorType
    )

    // Get the identifier property (binomial for Taxon, term for Term)
    const identifierProp = this.getIdentifierProperty(item)

    // Combine correct answer with distractors
    const correctOption = {
      key: identifierProp,
      value: this.getPropertyByPath(item, template.distractorType),
    }

    const options = [correctOption, ...distractorItems]

    // Shuffle options
    const shuffledOptions = this.shuffleArray(options)

    return {
      type: 'Multiple choice',
      text: questionText,
      key: correctAnswer,
      options: shuffledOptions,
    } as MultipleChoiceQuestion
  }

  /**
   * Creates a multiple choice question from a template
   */
  private createMultiSelectQuestion(
    collection: Collection<T>,
    item: T,
    template: MultiSelectTemplate,
    questionText: string
  ): MultipleSelectQuestion {
    // Get the correct answer property

    const correctAnswerArray = this.getPropertyByPath(
      item,
      template.correctAnswerProperty
    )

    const correctAnswers = this.getRandomPropertyItems(
      correctAnswerArray as unknown as string[],
      2
    )

    // Generate distractors
    const distractorItems: MultipleSelectOption[] = this.generateDistractors(
      collection,
      item,
      template.distractorCount,
      template.distractorType
    ) as MultipleSelectOption[]
    const distractors =
      distractorItems.length > 0
        ? getRandomItems(distractorItems[0].value, 2)
        : []

    const options = [...correctAnswers, ...distractors]

    // Shuffle options
    const shuffledOptions = this.shuffleArray(options)

    return {
      type: 'Multiple select',
      text: questionText,
      key: correctAnswerArray,
      options: shuffledOptions,
    } as MultipleSelectQuestion
  }

  /**
   * Creates a text entry question from a template
   */
  private createTextEntryQuestion(
    item: T,
    template: TextEntryTemplate,
    questionText: string
  ): TextEntryQuestion {
    // Get the correct answer
    const correctAnswer = this.getPropertyByPath(
      item,
      template.correctAnswerProperty
    )

    return {
      type: 'Text entry',
      text: questionText,
      key: correctAnswer,
      hint: template.placeholder || 'Enter your answer',
      contentType: template.contentType,
    } as TextEntryQuestion
  }

  /**
   * Processes a template string, replacing placeholders with actual values
   */
  private processTemplate(template: string, item: T): string {
    return template.replace(/\${([^}]+)}/g, (match, propertyPath) => {
      let value = this.getPropertyByPath(item, propertyPath)

      /* Force terms to lower case */
      if (match === '${term}')
        value = (value as unknown as string).toUpperCase()

      return value !== undefined ? String(value) : match
    })
  }

  /**
   * Helper method to get the identifier property based on the item type
   */
  private getIdentifierProperty(item: T): string {
    if ('binomial' in item) {
      return (item as unknown as Taxon).binomial
    } else if ('term' in item) {
      return ((item as unknown as Term).term as string).toLowerCase()
    }

    // Default fallback
    return String(item.id)
  }

  private getPropertyByPath(obj: unknown, path: string): unknown {
    return getPropByPath(obj, path)
  }

  private shuffleArray<A>(array: A[]): A[] {
    return shuffleArray(array)
  }

  private getRandomPropertyItems(arr: unknown[], count: number): unknown[] {
    return getRandomItems(arr, count)
  }
}
