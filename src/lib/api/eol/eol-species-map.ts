// https://eol.org/docs/what-is-eol/classic-apis/

type LTPName = {
  vernacularName: string
  language: string
  preferred: boolean
}

type LTPSpecies = {
  eolId: number
  binomial: string
  vernacularNames: LTPName[]
}

type EOLVernacularName = {
  vernacularName: string
  language: string
  eol_preferred: boolean
}

type EOLProps = {
  identifier: number
  scientificName: string
  vernacularNames: EOLVernacularName[]
}

export const mapEolSpeciesToLTP = (input: EOLProps): LTPSpecies => {
  return {
    eolId: input.identifier,
    binomial: input.scientificName,
    vernacularNames: input.vernacularNames.map((name: EOLVernacularName) => {
      return {
        vernacularName: name.vernacularName,
        language: name.language,
        preferred: name.eol_preferred,
      }
    }),
  }
}
