// https://eol.org/docs/what-is-eol/classic-apis/

type EOLSpecies = {
  eolId: number
  binomial: string
  vernacularNames: {
    vernacularName: string
    language: string
    preferred: boolean
  }
}

export const mapEolSpeciesToLTP = (input: any): EOLSpecies => {
  return {
    eolId: input.identifier,
    binomial: input.scientificName,
    vernacularNames: input.vernacularNames.map((name: any) => {
      return {
        vernacularName: name.vernacularName,
        language: name.language,
        preferred: name.eol_preferred,
      }
    }),
  }
}

const input = {
  identifier: 1114974,
  scientificName: 'Hyparrhenia hirta (L.) Stapf',
  vernacularNames: [
    {
      vernacularName: 'tratching grass',
      language: 'en',
      eol_preferred: false,
    },
    {
      vernacularName: 'zacate jaragua bermeja',
      language: 'es',
      eol_preferred: true,
    },
    {
      vernacularName: 'thatching grass',
      language: 'en',
      eol_preferred: false,
    },
    {
      vernacularName: 'Gajiri',
      language: 'ha',
      eol_preferred: true,
    },
    {
      vernacularName: 'albellatge',
      language: 'ca',
      eol_preferred: true,
    },
    {
      vernacularName: 'thatching grass',
      language: 'en',
      eol_preferred: true,
    },
    {
      vernacularName: 'vousatice chlupatá',
      language: 'cs',
      eol_preferred: true,
    },
    {
      vernacularName: 'זקנן שעיר',
      language: 'he',
      eol_preferred: true,
    },
    {
      vernacularName: 'حمرور أشعر',
      language: 'ar',
      eol_preferred: true,
    },
    {
      vernacularName: 'حمرور اشعر',
      language: 'arz',
      eol_preferred: true,
    },
    {
      vernacularName: 'نریشت',
      language: 'fa',
      eol_preferred: true,
    },
    {
      vernacularName: 'ヒパルレニア・ヒルタ',
      language: 'jp',
      eol_preferred: true,
    },
    {
      vernacularName: '紅鞘草',
      language: 'zh',
      eol_preferred: true,
    },
    {
      vernacularName: '紅鞘草',
      language: 'zh-tw',
      eol_preferred: true,
    },
    {
      vernacularName: '红鞘草',
      language: 'zh',
      eol_preferred: false,
    },
    {
      vernacularName: 'Thatching grass',
      language: 'en',
      eol_preferred: false,
    },
    {
      vernacularName: 'Thatching grass',
      language: 'en',
      eol_preferred: false,
    },
    {
      vernacularName: 'Barbon hérissé',
      language: 'fr',
      eol_preferred: true,
    },
    {
      vernacularName: 'Barboncino mediterraneo',
      language: 'it',
      eol_preferred: true,
    },
    {
      vernacularName: 'Behaartes Bartgras',
      language: 'de',
      eol_preferred: true,
    },
    {
      vernacularName: 'Common Thatching Grass',
      language: 'en',
      eol_preferred: true,
    },
    {
      vernacularName: 'Coolatai grass',
      language: 'en',
      eol_preferred: false,
    },
    {
      vernacularName: 'Gewone Dekgras',
      language: 'af',
      eol_preferred: true,
    },
    {
      vernacularName: 'Mofula-Tsephe',
      language: 'en',
      eol_preferred: false,
    },
    {
      vernacularName: 'Palha-da-Guiné',
      language: 'pt',
      eol_preferred: true,
    },
    {
      vernacularName: 'Thatch Grass',
      language: 'en',
      eol_preferred: false,
    },
    {
      vernacularName: 'Tvillingskæggræs',
      language: 'da',
      eol_preferred: true,
    },
    {
      vernacularName: 'albellatge',
      language: 'ca',
      eol_preferred: true,
    },
    {
      vernacularName: 'boesmangras',
      language: 'af',
      eol_preferred: false,
    },
    {
      vernacularName: 'dektamboekiegras',
      language: 'af',
      eol_preferred: false,
    },
    {
      vernacularName: 'jaragua gris',
      language: 'es',
      eol_preferred: true,
    },
    {
      vernacularName: 'thatching grass',
      language: 'en',
      eol_preferred: false,
    },
    {
      vernacularName: 'vaalgras',
      language: 'af',
      eol_preferred: false,
    },
    {
      vernacularName: 'vousatice chlupatá',
      language: 'cs',
      eol_preferred: true,
    },
    {
      vernacularName: 'välimerenpartaheinä',
      language: 'fi',
      eol_preferred: true,
    },
    {
      vernacularName: 'Гипаррения волосистая',
      language: 'ru',
      eol_preferred: true,
    },
    {
      vernacularName: 'זקנן שעיר',
      language: 'he',
      eol_preferred: true,
    },
    {
      vernacularName: '红鞘草',
      language: 'zh-cn',
      eol_preferred: true,
    },
  ],
}

const species = mapEolSpeciesToLTP(input)
