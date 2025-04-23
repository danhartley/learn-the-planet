const formatAnswer = (answer: string) => {
  return answer?.toLowerCase().replaceAll(' ', '')
}

const removeBrackets = (text: string): string => {
  return text.replace(/\s*\([^)]*\)/g, '').trim()
}

export const markAnswer = (question: string, answer: string): boolean => {
  const isCorrect =
    formatAnswer(removeBrackets(question)) ===
    formatAnswer(removeBrackets(answer))

  return isCorrect
}
