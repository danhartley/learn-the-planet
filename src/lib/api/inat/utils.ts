type Props = {
  func: (...args: unknown[]) => Promise<unknown>
  // func: (...args: unknown[]) => Promise<unknown>
  wait: number
}

export const debounce = ({ func, wait }: Props) => {
  let timeout: string | number | NodeJS.Timeout | undefined

  return function executedFunction(...args: unknown[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
