import React, { useRef, useEffect } from 'react'
export const ScoreDisplayNotification = ({
  isCorrect,
  history,
  isVisibleClassName,
}: {
  isCorrect: boolean
  history: any
  isVisibleClassName: string
}) => {
  const notificationDisplay = useRef(null)
  const response = isCorrect
    ? 'That is the correct answer'
    : "That's not the right answer"
  const className = isCorrect ? 'correct' : 'incorrect'

  /* The visibility of the notification is determined by the test container */
  useEffect(() => {
    if (history.length > 0) {
      const altVisibleClassName =
        isVisibleClassName === 'visible' ? 'hidden' : 'visible'
      ;(
        notificationDisplay?.current as unknown as HTMLDivElement
      ).classList.add(isVisibleClassName)
      ;(
        notificationDisplay?.current as unknown as HTMLDivElement
      ).classList.remove(altVisibleClassName)
    }
  }, [isVisibleClassName])

  return (
    <div ref={notificationDisplay} className="notification hidden">
      <div className={className}>{response}</div>
    </div>
  )
}
