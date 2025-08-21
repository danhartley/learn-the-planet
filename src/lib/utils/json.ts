import { Topic } from '@/types'

interface ArticleData {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type MessageType = 'success' | 'error'

export const exportArticleJson = (
  articleData: ArticleData,
  articleName: string
): void => {
  try {
    // Validate inputs
    if (!articleData) {
      throw new Error('Article data is required')
    }

    if (!articleName || typeof articleName !== 'string') {
      throw new Error('Article name must be provided as a string')
    }

    // Convert to JSON string
    const jsonString: string = JSON.stringify(articleData, null, 2) // Pretty formatted JSON

    // Create blob with proper MIME type
    const blob: Blob = new Blob([jsonString], {
      type: 'application/json',
    })

    // Generate safe filename
    const safeFilename: string = sanitiseFilename(articleName) + '.json'

    // Create download link
    const url: string = URL.createObjectURL(blob)
    const link: HTMLAnchorElement = document.createElement('a')
    link.href = url
    link.download = safeFilename

    // Trigger download
    document.body.appendChild(link) // Required for Firefox
    link.click()
    document.body.removeChild(link)

    // Clean up object URL
    URL.revokeObjectURL(url)

    // Success feedback
    showMessage(`Article exported successfully as ${safeFilename}`, 'success')
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Export failed:', error)
    showMessage(`Export failed: ${errorMessage}`, 'error')
  }
}

// Helper function to sanitise filename
const sanitiseFilename = (filename: string): string => {
  // Remove or replace invalid filename characters
  return filename
    .replace(/[<>:"/\\|?*]/g, '_') // Replace invalid chars with underscore
    .replace(/\s+/g, '_') // Replace spaces with underscore
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
    .substring(0, 100) // Limit length to 100 characters
}

// Helper function to show user feedback messages
const showMessage = (message: string, type: MessageType): void => {
  // Create message element
  const messageDiv: HTMLDivElement = document.createElement('div')
  messageDiv.textContent = message
  messageDiv.style.cssText =
    'position: fixed; top: 20px; right: 20px; padding: 12px 20px; ' +
    'border-radius: 4px; font-family: Arial, sans-serif; font-size: 14px; ' +
    'z-index: 10000; max-width: 300px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'

  // Style based on message type
  if (type === 'success') {
    messageDiv.style.backgroundColor = '#d4edda'
    messageDiv.style.color = '#155724'
    messageDiv.style.border = '1px solid #c3e6cb'
  } else if (type === 'error') {
    messageDiv.style.backgroundColor = '#f8d7da'
    messageDiv.style.color = '#721c24'
    messageDiv.style.border = '1px solid #f5c6cb'
  }

  // Add to page
  document.body.appendChild(messageDiv)

  // Remove after 4 seconds
  setTimeout((): void => {
    if (messageDiv.parentNode) {
      messageDiv.parentNode.removeChild(messageDiv)
    }
  }, 4000)
}

type ArticleTextFormat = string[]

export const parseArticleText = (textData: ArticleTextFormat): string => {
  if (!textData || !Array.isArray(textData)) {
    return ''
  }

  return textData
    .filter(section => section !== '' && section.length > 0)
    .join('') // Filter out empty strings
}

export const exportArticleMarkdown = (
  articleData: ArticleData,
  articleName: string
): void => {
  try {
    // Validate inputs
    if (!articleData) {
      throw new Error('Article data is required')
    }

    if (!articleName || typeof articleName !== 'string') {
      throw new Error('Article name must be provided as a string')
    }

    // Parse the text content
    const textContent = articleData.items?.map((item: Topic) => {
      return parseArticleText(item.text as string[])
    }) as string[]

    // Build Markdown content
    const markdownContent = buildMarkdownContent(
      articleData,
      textContent.filter(t => t.trim() !== '').join(', ')
    )

    // Create blob with proper MIME type for Markdown
    const blob: Blob = new Blob([markdownContent], {
      type: 'text/markdown',
    })

    // Generate safe filename with .md extension
    const safeFilename: string = sanitiseFilename(articleName) + '.md'

    // Create download link
    const url: string = URL.createObjectURL(blob)
    const link: HTMLAnchorElement = document.createElement('a')
    link.href = url
    link.download = safeFilename

    // Trigger download
    document.body.appendChild(link) // Required for Firefox
    link.click()
    document.body.removeChild(link)

    // Clean up object URL
    URL.revokeObjectURL(url)

    // Success feedback
    showMessage(`Article exported successfully as ${safeFilename}`, 'success')
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Export failed:', error)
    showMessage(`Export failed: ${errorMessage}`, 'error')
  }
}

// Helper function to build Markdown content
const buildMarkdownContent = (
  articleData: ArticleData,
  textContent: string
): string => {
  let markdown = ''
  console.log('textContent', textContent)
  // Add title as H1
  if (articleData.title || articleData.name) {
    markdown += `# ${articleData.title || articleData.name}\n\n`
  }

  // Add metadata if available
  if (articleData.author) {
    markdown += `**Author:** ${articleData.author.authors}\n\n`
  }

  if (articleData.date) {
    markdown += `**Date:** ${articleData.date}\n\n`
  }

  if (articleData.location) {
    markdown += `**Location:** ${articleData.location}\n\n`
  }

  // Add separator if metadata was added
  if (articleData.author || articleData.date) {
    markdown += '---\n\n'
  }

  // Add the main content
  markdown += textContent

  return markdown
}

// Usage example:
// exportArticleMarkdown(myArticleData, "My Amazing Article Title");
