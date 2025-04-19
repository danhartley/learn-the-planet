import { Question, Score } from './types'

const formatAnswer = (answer: string) => {
  return answer?.toLowerCase().replaceAll(' ', '')
}

export class Scorer {
  private questionCount: number = 0
  private correctCount: number = 0
  private incorrectCount: number = 0

  markAnswer(question: Question, answer: string): Score {
    const isCorrect = formatAnswer(question.key) === formatAnswer(answer)

    this.questionCount++
    isCorrect ? this.correctCount++ : this.incorrectCount++

    return {
      isCorrect,
      questionCount: this.questionCount,
      correctCount: this.correctCount,
      incorrectCount: this.incorrectCount,
    }
  }
}
