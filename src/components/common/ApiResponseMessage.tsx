import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponse } from '@/types'

interface ApiResponseMessageProps {
  apiResponse: ApiResponse
  delayMs?: number
}

export const ApiResponseMessage: React.FC<ApiResponseMessageProps> = ({
  apiResponse,
  delayMs = 2000,
}) => {
  const { setApiResponse } = useCollection()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Reset visibility when apiResponse changes
    setIsVisible(true)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setApiResponse({ success: false, message: '' })
    }, delayMs)

    // Cleanup timer if component unmounts or apiResponse changes
    return () => clearTimeout(timer)
  }, [apiResponse, delayMs])

  if (!isVisible || !apiResponse.message) {
    return null
  }

  return (
    <div className={apiResponse.success ? 'correct' : 'incorrect'}>
      {apiResponse.message}
    </div>
  )
}

export default ApiResponseMessage
