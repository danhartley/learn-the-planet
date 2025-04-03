import { Question, Score } from './_types'

const formatAnswer = (answer: string) => {
  return answer.toLowerCase().replaceAll(' ', '')
}

export class Scorer {
  private questionCount = 0
  private correctCount = 0
  private incorrectCount = 0

  markAnswer(question: Question, answer: string): Score {
    const isCorrect =
      formatAnswer(question.correctAnswer) === formatAnswer(answer)

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
