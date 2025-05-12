import { Question } from '@/types'
import { containsSourceInTargetArray } from '@/utils/strings'

const formatAnswer = (answer: string) => {
  return answer?.toLowerCase().replaceAll(' ', '')
}

const removeBrackets = (text: string): string => {
  return text.replace(/\s*\([^)]*\)/g, '').trim()
}

export const markAnswer = (
  question: Question,
  answer: string | string[]
): boolean => {
  if (Array.isArray(answer)) {
    return containsSourceInTargetArray(answer, question.key as string[])
  } else {
    const isCorrect =
      formatAnswer(removeBrackets(question.key as string)) ===
      formatAnswer(removeBrackets(answer))

    return isCorrect
  }
}
