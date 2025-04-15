export const createEOLUrl = (input: string) => {
  if (input.indexOf('inaturalist') > -1) {
    return input.replace('square', 'medium')
  }
  const baseUrl = 'https://content.eol.org/data/media/'
  const parts = input.split('.jpg')
  const path = `${parts[0]}.260x190.${parts[1]}jpg`
  return baseUrl + path
}
