import {
  ContentTypeHandler,
  Taxon,
  QuestionTemplate,
  Question,
  MultipleChoiceQuestion,
  TextEntryQuestion,
  MultipleChoiceTemplate,
  TextEntryTemplate,
  Collection,
  DistractorType,
} from '@/types'

import { generateDistractors as generateTaxonomyDistractors } from '@/utils/distractors'
import { getPropByPath } from '@/utils/strings'

export class TaxonomyContentHandler implements ContentTypeHandler<Taxon> {
  /**
   * Creates questions from a taxonomy item based on question templates
   */
  createQuestions(
    collection: Collection<Taxon>,
    item: Taxon,
    templates: QuestionTemplate[]
  ): Question[] {
    collection.items.forEach(i => {
      const [genus, species] = i.binomial.split(' ')
      i.genus = genus
      i.species = species
      i.image = i.images?.[0]
      i?.distractors?.forEach(d => {
        const [genus, species] = d.binomial.split(' ')
        d.genus = genus
        d.species = species
        d.image = d.images?.[0]
      })
    })

    return templates.map((template, index) => {
      const questionText = this.processTemplate(
        template.questionTextTemplate,
        item
      )
      console.log(template.type)
      switch (template.type) {
        case 'multipleChoice':
          return this.createMultipleChoiceQuestion(
            collection,
            item,
            template as MultipleChoiceTemplate,
            questionText,
            index
          )
        case 'textEntry':
          return this.createTextEntryQuestion(
            item,
            template as TextEntryTemplate,
            questionText,
            index
          )
        default:
          throw new Error(
            `Unsupported question type: ${(template as any).type}`
          )
      }
    })
  }

  /**
   * Generates distractor items for multiple choice questions
   */
  generateDistractors(
    collection: Collection<Taxon>,
    item: Taxon,
    count: number,
    distractorType: DistractorType
  ): any[] {
    return generateTaxonomyDistractors(collection, item, count, distractorType)
  }

  /**
   * Validates an answer against a question
   */
  validateAnswer(question: Question, answer: string): boolean {
    // Normalise both strings for comparison (lowercase, trim whitespace)
    const normalisedKey = question.key.toLowerCase().trim()
    const normalisedAnswer = answer.toLowerCase().trim()

    return normalisedKey === normalisedAnswer
  }

  /**
   * Creates a multiple choice question from a template
   */
  private createMultipleChoiceQuestion(
    collection: Collection<Taxon>,
    item: Taxon,
    template: MultipleChoiceTemplate,
    questionText: string,
    index: number
  ): MultipleChoiceQuestion {
    // Get the correct answer property
    const correctAnswer = this.getPropertyByPath(
      item,
      template.correctAnswerProperty
    )

    // Generate distractors
    const distractorItems = this.generateDistractors(
      collection, // This would normally be the whole collection
      item,
      template.distractorCount,
      template.distractorType
    )

    // Combine correct answer with distractors
    const correctOption = {
      key: item.binomial,
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
      // id: `question-${index}`,
    }
  }

  /**
   * Creates a text entry question from a template
   */
  private createTextEntryQuestion(
    item: Taxon,
    template: TextEntryTemplate,
    questionText: string,
    index: number
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
      // id: `question-${index}`,
    }
  }

  /**
   * Processes a template string, replacing placeholders with actual values
   */
  private processTemplate(template: string, item: Taxon): string {
    return template.replace(/\${([^}]+)}/g, (match, propertyPath) => {
      const value = this.getPropertyByPath(item, propertyPath)
      return value !== undefined ? String(value) : match
    })
  }

  /**
   * Gets a property value from an object using a dotted path notation
   */
  private getPropertyByPath(obj: any, path: string): any {
    return getPropByPath(obj, path)
  }

  /**
   * Shuffles an array using Fisher-Yates algorithm
   */
  private shuffleArray<T>(array: T[]): T[] {
    const result = [...array]
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
  }
}
