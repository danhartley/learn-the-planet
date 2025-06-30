interface NavigationState {
  elementIds: string[]
  currentIndex: number
}

export class ElementNavigator {
  private state: NavigationState
  private upButton: HTMLElement | null
  private downButton: HTMLElement | null

  constructor(elementIds: string[], upButtonId: string, downButtonId: string) {
    this.state = {
      elementIds,
      currentIndex: 0,
    }

    this.upButton = document.getElementById(upButtonId)
    this.downButton = document.getElementById(downButtonId)

    this.updateButtonStates()
  }

  private scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  private updateButtonStates(): void {
    if (this.upButton) {
      this.upButton.style.opacity = this.state.currentIndex === 0 ? '0.3' : '1'
      this.upButton.style.pointerEvents =
        this.state.currentIndex === 0 ? 'none' : 'auto'
    }

    if (this.downButton) {
      const isLastElement =
        this.state.currentIndex === this.state.elementIds.length - 1
      this.downButton.style.opacity = isLastElement ? '0.3' : '1'
      this.downButton.style.pointerEvents = isLastElement ? 'none' : 'auto'
    }
  }

  navigateUp(): void {
    if (this.state.currentIndex > 0) {
      this.state.currentIndex--
      const targetId = this.state.elementIds[this.state.currentIndex]
      this.scrollToElement(targetId)
      this.updateButtonStates()
    }
  }

  navigateDown(): void {
    if (this.state.currentIndex < this.state.elementIds.length - 1) {
      this.state.currentIndex++
      const targetId = this.state.elementIds[this.state.currentIndex]
      this.scrollToElement(targetId)
      this.updateButtonStates()
    }
  }

  getCurrentElementId(): string {
    return this.state.elementIds[this.state.currentIndex]
  }

  getCurrentIndex(): number {
    return this.state.currentIndex
  }
}

export const createElementIdArray = (): string[] => {
  const elements = document.querySelectorAll('.navigable')
  return Array.from(elements)
    .filter(element => element.id)
    .map(element => element.id)
}
