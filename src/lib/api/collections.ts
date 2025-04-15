import { Collection } from '@/types'

export const getCollections = (): Promise<Collection[]> => {
  const collection = {
    id: '1',
    name: 'Herbs',
    description: 'Common herbs',
    count: 10,
    index: 0,
    items: [
      {
        binomial: 'Anethum graveolens',
        iconicTaxon: 'plantae',
        names: [
          {
            vernacularName: 'dill',
            language: 'de',
          },
          {
            vernacularName: 'Gurkenkraut',
            language: 'de',
          },
          {
            vernacularName: 'dill',
            language: 'en',
            wikiSearchTerm: '',
          },
          {
            language: 'en',
            vernacularName: 'Indian Dill',
          },
          {
            language: 'es',
            vernacularName: 'Hinojo hediondo',
          },
          {
            language: 'es',
            vernacularName: 'Abesón',
          },
          {
            vernacularName: 'Aneldo',
            language: 'es',
          },
          {
            vernacularName: 'Eneldo',
            language: 'es',
          },
          {
            vernacularName: 'anís alemán',
            language: 'es',
          },
          {
            vernacularName: 'anise',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Aneth odorant',
          },
          {
            language: 'fr',
            vernacularName: 'Fenouil bâtard',
          },
          {
            language: 'it',
            vernacularName: 'Aneto',
          },
          {
            vernacularName: 'oneto',
            language: 'it',
          },
          {
            language: 'pt',
            vernacularName: 'Endro',
          },
          {
            vernacularName: 'Aneto',
            language: 'pt',
          },
        ],
        taxonomy: {
          phylum: 'Tracheophyta',
          family: 'Apiaceae',
          class: 'Magnoliopsida',
          kingdom: 'Plantae',
          order: 'Apiales',
          genus: 'Anethum',
          species: 'graveolens',
        },
        images: [
          {
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Dillflower-fleuraneth.jpg',
            title: 'Dillflower-fleuraneth.jpg',
            url: '55/44/d4/509.1046039.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:Fillflower2-fleuraneth2.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            url: '55/44/d6/509.1046066.jpg',
            title: 'Fillflower2-fleuraneth2.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
          },
          {
            url: '55/a9/74/509.12137408.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            source:
              'https://commons.wikimedia.org/wiki/File:Anethum_graveolens_EnfoqueFlores_2009-6-20_CampoCalatrava.jpg',
            photographer: '',
            title:
              'Anethum graveolens EnfoqueFlores 2009-6-20 CampoCalatrava.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
          },
          {
            starred: true,
            title:
              'Anethum graveolens Inflorescencia 2009-6-20 CampoCalatrava.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            source:
              'https://commons.wikimedia.org/wiki/File:Anethum_graveolens_Inflorescencia_2009-6-20_CampoCalatrava.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            url: '55/a9/7a/509.12137574.jpg',
            small:
              'https://content.eol.org/data/media/55/a9/7a/509.12137574.98x68.jpg',
            medium:
              'https://content.eol.org/data/media/55/a9/7a/509.12137574.260x190.jpg',
            large:
              'https://content.eol.org/data/media/55/a9/7a/509.12137574.jpg',
          },
          {
            source: 'https://commons.wikimedia.org/wiki/File:Dill_Flower.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            url: '56/6f/cf/509.16033934.jpg',
            title: 'Dill Flower.jpg',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            photographer: '',
            url: '56/a9/01/509.1715550.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            source:
              'https://commons.wikimedia.org/wiki/File:Anethumgraveolens.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Anethumgraveolens.jpg',
          },
          {
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Anethum_graveolens_(7490804904).jpg',
            title: 'Anethum graveolens (7490804904).jpg',
            url: '57/db/88/509.22751657.jpg',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:Anethum_graveolens_(7490802082).jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '57/db/8c/509.22751665.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
            title: 'Anethum graveolens (7490802082).jpg',
          },
          {
            photographer: '',
            title: 'File:Dill blÃ¼ht.jpg',
            url: '58/a4/d5/509.26142003.jpg',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Dill_bl%C3%BCht.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            title: 'Anethum graveolens (7490802574).jpg',
            url: '5c/dc/ce/509.22751669.jpg',
            photographer: '',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Anethum_graveolens_(7490802574).jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
        ],
        terms: ['Umbel', 'Seed', 'Monocarpic', 'Annual', 'Perfect'],
        genus: '',
        family: {
          genera: 400,
          members: [
            'Daucus carota subsp. sativus',
            'Coriandrum sativum',
            'Petroselinum crispum',
            'Foeniculum vulgare',
            'Anethum graveolens',
            'Conium maculatum',
            'Cuminum cyminum',
            'Carum carvi',
            'Anthriscus cerefolium',
            'Myrrhis odorata',
            'Pimpinella anisum',
            'Levisticum officinale',
            'Pastinaca sativa',
          ],
          names: [
            'Carrot or Parsley family',
            'Umbellifers',
            'Celery family',
            'Carrot family',
            'Parsley family',
          ],
          summary:
            'A family of mostly aromatic flowering plants that includes species such as carrot, celery, cumin, parsley and coriander, and the poisonous hemlocks.',
          species: 3700,
          identification:
            'Compound, terminal umbels radiating from a single point. Hollow flower stalks.',
          taxon: 'family',
          traits: {
            pollination: {
              value: ['Leafcutter Bees'],
            },
            'leaf arrangement': {
              value: ['Alternate'],
            },
            inflorescence: {
              value: ['Umbel'],
            },
          },
          wiki: 'https://en.wikipedia.org/wiki/Apiaceae',
          eol: 'http://eol.org/pages/4200/overview',
          name: 'Apiaceae',
          iconicTaxon: 'plantae',
          taxonomy: {
            phylum: 'Tracheophyta',
            class: 'Magnoliopsida',
            kingdom: 'Plantae',
            order: 'Apiales',
          },
          vernacularName: 'Carrot or Parsley family',
        },
        order: '',
        id: 584995,
        vernacularNames: ['Dill', 'Indian dill'],
        vernacularName: 'Dill',
        traits: {
          exposure: {
            value: ['Full sun'],
          },
          symbiont: {
            type: 'companion planting',
            value: ['solanum lycopersicum'],
          },
          usage: {
            value: ['herb', ' food'],
          },
          'leaf shape': {
            value: ['Filiform'],
          },
          'soil type': {
            value: ['Well-drained'],
          },
          lookalikes: [
            {
              lookalike: {
                name: 'Foeniculum vulgare',
                description:
                  'Highly aromatic and flavoursome herb similar in taste to anise. Hollow stems. Leaves are thinner than dill and up to 40cm long. An erect, glaucous green plant that can reach 2.5m. The seeds are dry and long with longitudinal grooves.',
              },
              description:
                'Slender stems and long delicate, feathery leaves. Shorter growing than fennel (40-60cm). Flowers are either white or yellow.  Long, thick, slightly curved seeds with a longitudinally ridged surface.',
            },
          ],
          name: 'Anethum graveolens',
          description: {
            value: [
              'Dill grows up to 40–60cm, with slender hollow stems and alternate, finely divided, delicate leaves 10–20cm long.\n\nThe ultimate leaf divisions are 1–2mm broad, slightly broader than the similar leaves of fennel, which are threadlike, less than 1mm broad, but harder in texture. \n\nThe flowers are white to yellow, in small umbels 2–9cm diameter. \n\nThe seeds are 4–5mm long and 1mm thick, and straight to slightly curved with a longitudinally ridged surface.\n\nThe plants are somewhat monocarpic and quickly die after "bolting" (producing seeds).',
            ],
          },
        },
      },
      {
        binomial: 'Thymus vulgaris',
        iconicTaxon: 'plantae',
        names: [
          {
            vernacularName: 'Thymian',
            language: 'de',
          },
          {
            vernacularName: 'Echter Thymian',
            language: 'de',
          },
          {
            language: 'de',
            vernacularName: 'Römischer Quendel',
          },
          {
            vernacularName: 'thyme',
            language: 'en',
          },
          {
            vernacularName: 'garden thyme',
            language: 'en',
          },
          {
            language: 'en',
            vernacularName: 'Common Thyme',
          },
          {
            language: 'en',
            vernacularName: 'Doretta Klaber Thyme',
          },
          {
            vernacularName: 'English thyme',
            language: 'en',
          },
          {
            language: 'es',
            vernacularName: 'Tomillo',
          },
          {
            vernacularName: 'tomillo común',
            language: 'es',
          },
          {
            language: 'fr',
            vernacularName: 'Thym',
          },
          {
            vernacularName: 'Farigoule',
            language: 'fr',
          },
          {
            vernacularName: 'Frigoule',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Thym commun',
          },
          {
            vernacularName: 'timo maggiore',
            language: 'it',
          },
          {
            vernacularName: 'Timo',
            language: 'it',
          },
          {
            language: 'pt',
            vernacularName: 'Tomilho',
          },
          {
            vernacularName: 'Tomilho-ordinário',
            language: 'pt',
          },
        ],
        taxonomy: {
          phylum: 'Tracheophyta',
          order: 'Lamiales',
          family: 'Lamiaceae',
          class: 'Magnoliopsida',
          kingdom: 'Plantae',
          genus: 'Thymus',
          species: 'vulgaris',
        },
        images: [
          {
            license: 'http://creativecommons.org/licenses/publicdomain/',
            source:
              'https://commons.wikimedia.org/wiki/File:Thymus_vulgaris_Habitus_2010_5_09_DehesaBoyaldePuertollano.jpg',
            photographer: '',
            url: '55/5a/ca/509.10767003.jpg',
            title:
              'Thymus vulgaris Habitus 2010 5 09 DehesaBoyaldePuertollano.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
            url: '55/d0/49/509.12681689.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Thymus_vulgaris_1_(Espagne).jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Thymus vulgaris 1 (Espagne).jpg',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Thymus vulgaris 3 (Espagne).JPG',
            url: '55/d0/50/509.12681755.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
            source:
              'https://commons.wikimedia.org/wiki/File:Thymus_vulgaris_3_(Espagne).JPG',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:Abella_en_farigola.JPG',
            title: 'Abella en farigola.JPG',
            url: '56/13/6d/509.14555862.jpg',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/publicdomain/',
          },
          {
            url: '57/70/8a/509.2066494.jpg',
            title: 'Abeille-sur-thym2.jpg',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Abeille-sur-thym2.jpg',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '59/c9/28/509.32644578.jpg',
            source: 'https://commons.wikimedia.org/wiki/File:Thymus_fasce.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
            title: 'Thymus fasce.jpg',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:Thymus_vulgaris_2_(Espagne).JPG',
            photographer: '',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            title: 'Thymus vulgaris 2 (Espagne).JPG',
            url: '5a/d1/8f/509.12681754.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            photographer: '',
            url: '5d/86/ae/509.255631.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Thymus_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-271.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title:
              'File:Thymus vulgaris - KÃ¶hlerâs Medizinal-Pflanzen-271.jpg',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            title: 'Thymian.jpg',
            starred: true,
            source: 'https://commons.wikimedia.org/wiki/File:Thymian.jpg',
            url: '63/e8/d3/509.512777.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            small:
              'https://content.eol.org/data/media/63/e8/d3/509.512777.98x68.jpg',
            medium:
              'https://content.eol.org/data/media/63/e8/d3/509.512777.260x190.jpg',
            large: 'https://content.eol.org/data/media/63/e8/d3/509.512777.jpg',
          },
          {
            title: 'Thymus vulgaris L11.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Thymus_vulgaris_L11.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '65/0b/34/509.569188.jpg',
          },
        ],
        terms: ['Evergreen', 'Revolute'],
        genus: '',
        family: {
          names: ['Mint Family', 'Labiatae', 'Deadnettles'],
          taxonomy: {
            order: 'Lamiales',
            phylum: 'Tracheophyta',
            kingdom: 'Plantae',
            class: 'Magnoliopsida',
          },
          taxon: 'family',
          genera: 236,
          summary:
            'Many aromatic perennials including basil, mint, rosemary, sage, savory, marjoram, and oregano. Readily propagated from stem cuttings or seed (chia).',
          wiki: 'https://en.wikipedia.org/wiki/Lamiaceae',
          species: 7534,
          name: 'Lamiaceae',
          traits: {
            'petal count': {
              value: ['5'],
            },
            pollination: {
              value: ['Insects', 'Bumblebees', 'Single Bees'],
            },
          },
          identification:
            'Square stems, simple and opposite leaves, often fragrant. 5 petals and sepals, fused in both cases.',
          members: ['Ocimum basilicum', 'Rosmarinus officinalis'],
          eol: 'http://eol.org/pages/4302/overview',
          iconicTaxon: 'plantae',
          vernacularName: 'Mint Family',
        },
        order: '',
        id: 484542,
        vernacularNames: [
          'Thyme',
          'Garden thyme',
          'Common thyme',
          'Doretta klaber thyme',
          'English thyme',
        ],
        vernacularName: 'Thyme',
        traits: {
          physiology: {
            value: ['evergreen'],
          },
          'leaf shape': {
            value: ['Linear', 'Ovate'],
          },
          'soil type': {
            value: ['nutrient poor', 'Loam', 'Sand', 'Chalk'],
          },
          characteristic: {
            value: ['chamaephyte'],
          },
          ph: {
            value: ['Alkaline', 'Neutral'],
          },
          name: 'Thymus vulgaris',
          'flower colour': {
            value: ['Purple', 'Pink', 'White'],
          },
          'leaf colour': {
            value: ['Grey-green'],
          },
          description: {
            value: [
              'A species of flowering plant in the mint family Lamiaceae, native to southern Europe from the western Mediterranean to southern Italy. \n\nTo 15–30cm tall by 40cm wide. \n\nIt is a bushy, woody-based evergreen subshrub with small, highly aromatic, grey-green leaves and clusters of purple or pink flowers in early summer.',
            ],
          },
          usage: {
            value: ['herb', ' medicine', ' food'],
          },
          exposure: {
            value: ['Full sun'],
          },
          inflorescence: {
            value: ['Spike'],
          },
          'leaf folding': {
            value: ['Revolute'],
          },
        },
      },
      {
        binomial: 'Origanum vulgare',
        iconicTaxon: 'plantae',
        names: [
          {
            language: 'de',
            vernacularName: 'oregano',
            wikiSearchTerm: '',
          },
          {
            vernacularName: 'Dost',
            language: 'de',
          },
          {
            language: 'de',
            vernacularName: 'Gewöhnlicher Dost',
          },
          {
            language: 'de',
            vernacularName: 'Kostets',
          },
          {
            vernacularName: 'Wilder Majoran',
            language: 'de',
          },
          {
            language: 'en',
            vernacularName: 'oregano',
          },
          {
            language: 'en',
            vernacularName: 'Compact Oregano',
          },
          {
            vernacularName: 'Greek Oregano',
            language: 'en',
          },
          {
            vernacularName: 'Oregan',
            language: 'en',
          },
          {
            vernacularName: 'Variegated Marjoram',
            language: 'en',
          },
          {
            vernacularName: 'Wild Marjoram',
            language: 'en',
          },
          {
            vernacularName: 'Orégano',
            language: 'es',
          },
          {
            vernacularName: 'Marjolaine bâtarde',
            language: 'fr',
          },
          {
            vernacularName: 'Doste',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Marazolette',
          },
          {
            vernacularName: 'Marjolaine sauvage',
            language: 'fr',
          },
          {
            vernacularName: 'Origan',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Origan commun',
          },
          {
            language: 'fr',
            vernacularName: "Origan d'Héraclée",
          },
          {
            vernacularName: 'Pelevoué',
            language: 'fr',
          },
          {
            vernacularName: 'Penevoué',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Thym de berger',
          },
          {
            vernacularName: 'Thé rouge',
            language: 'fr',
          },
          {
            language: 'it',
            vernacularName: 'origano commune',
          },
          {
            vernacularName: 'Erba acciuga',
            language: 'it',
          },
          {
            vernacularName: 'Origano',
            language: 'it',
          },
          {
            vernacularName: 'Origano comune',
            language: 'it',
          },
          {
            language: 'it',
            vernacularName: 'regano',
          },
          {
            vernacularName: 'Orégão',
            language: 'pt',
          },
          {
            vernacularName: 'Oregâos',
            language: 'pt',
          },
          {
            vernacularName: 'Orégano',
            language: 'pt',
          },
        ],
        taxonomy: {
          family: 'Lamiaceae',
          kingdom: 'Plantae',
          order: 'Lamiales',
          phylum: 'Tracheophyta',
          class: 'Magnoliopsida',
          genus: 'Origanum',
          species: 'vulgare',
        },
        images: [
          {
            photographer: '',
            source:
              'https://commons.wikimedia.org/wiki/File:Origanum_vulgare_002.JPG',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            url: '55/5a/9a/509.10763869.jpg',
            title: 'Origanum vulgare 002.JPG',
          },
          {
            url: '56/21/7a/509.14736517.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Origanum vulgare-blanc coteau-charteves 02 12072007 1.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Origanum_vulgare-blanc_coteau-charteves_02_12072007_1.jpg',
            photographer: '',
          },
          {
            photographer: '',
            url: '56/21/7b/509.14736521.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Origanum_vulgare_bray-sur-somme_80_25062007_2.jpg',
            title: 'Origanum vulgare bray-sur-somme 80 25062007 2.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            url: '56/21/7c/509.14736523.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Origanum vulgare vallee-de-grace-amiens 80 21072007 1.jpg',
            photographer: '',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Origanum_vulgare_vallee-de-grace-amiens_80_21072007_1.jpg',
          },
          {
            title: 'Origanum vulgare Aureum BotGardBln07122011C.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Origanum_vulgare_Aureum_BotGardBln07122011C.jpg',
            photographer: '',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '56/c8/38/509.17741737.jpg',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:20120715Schwetzinger_Hardt4.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '57/5d/67/509.20295391.jpg',
            title: '20120715Schwetzinger Hardt4.jpg',
            photographer: '',
          },
          {
            title: 'Origanum vulgare 2012 Saratov.jpg',
            url: '57/5e/07/509.20311318.jpg',
            photographer: '',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Origanum_vulgare_2012_Saratov.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            url: '57/62/6a/509.20412621.jpg',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            title: '20120723St Arnualer Wiesen05.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:20120723St_Arnualer_Wiesen05.jpg',
          },
          {
            title: 'Origanum vulgare2 ies.jpg',
            photographer: '',
            url: '57/b1/6f/509.2210306.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            source:
              'https://commons.wikimedia.org/wiki/File:Origanum_vulgare2_ies.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
          },
          {
            license: 'http://creativecommons.org/licenses/publicdomain/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            source:
              'https://commons.wikimedia.org/wiki/File:20130525Oregano_Saarbruecken.jpg',
            url: '58/ad/9f/509.26357730.jpg',
            title: '20130525Oregano Saarbruecken.jpg',
          },
          {
            title: 'Origanum vulgare Prague 2011 1.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Origanum_vulgare_Prague_2011_1.jpg',
            photographer: '',
            url: '5c/51/09/509.20063083.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            starred: true,
            url: '5c/51/0b/509.20063126.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            title: 'Origanum vulgare Prague 2011 3.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            source:
              'https://commons.wikimedia.org/wiki/File:Origanum_vulgare_Prague_2011_3.jpg',
            photographer: '',
            small:
              'https://content.eol.org/data/media/5c/51/0b/509.20063126.98x68.jpg',
            medium:
              'https://content.eol.org/data/media/5c/51/0b/509.20063126.260x190.jpg',
            large:
              'https://content.eol.org/data/media/5c/51/0b/509.20063126.jpg',
          },
        ],
        terms: ['Spike'],
        genus: '',
        family: {
          names: ['Mint Family', 'Labiatae', 'Deadnettles'],
          taxonomy: {
            order: 'Lamiales',
            phylum: 'Tracheophyta',
            kingdom: 'Plantae',
            class: 'Magnoliopsida',
          },
          taxon: 'family',
          genera: 236,
          summary:
            'Many aromatic perennials including basil, mint, rosemary, sage, savory, marjoram, and oregano. Readily propagated from stem cuttings or seed (chia).',
          wiki: 'https://en.wikipedia.org/wiki/Lamiaceae',
          species: 7534,
          name: 'Lamiaceae',
          traits: {
            'petal count': {
              value: ['5'],
            },
            pollination: {
              value: ['Insects', 'Bumblebees', 'Single Bees'],
            },
          },
          identification:
            'Square stems, simple and opposite leaves, often fragrant. 5 petals and sepals, fused in both cases.',
          members: ['Ocimum basilicum', 'Rosmarinus officinalis'],
          eol: 'http://eol.org/pages/4302/overview',
          iconicTaxon: 'plantae',
          vernacularName: 'Mint Family',
        },
        order: '',
        id: 579367,
        vernacularNames: [
          'Oregano',
          'Compact oregano',
          'Greek oregano',
          'Oregan',
          'Variegated marjoram',
          'Wild marjoram',
        ],
        vernacularName: 'Oregano',
        traits: {
          'leaf shape': {
            value: ['Ovate', 'Oblong'],
          },
          description: {
            value: [
              'A flowering plant in the mint family (Lamiaceae). It is native to temperate Western and Southwestern Eurasia and the Mediterranean region.\n\nOregano is a perennial herb, 20–80cm tall, with opposite leaves 1–4cm long. \n\nThe flowers are purple, 3–4mm long, produced in erect spikes. \n\nIt is sometimes called wild marjoram, and its close relative, O. majorana, is known as sweet marjoram.',
            ],
          },
          'ph value': {
            value: ['6-8'],
            unit: 'pH',
          },
          characteristic: {
            value: ['Perennial'],
          },
          name: 'Origanum vulgare',
          inflorescence: {
            value: ['Spike'],
          },
        },
      },
      {
        binomial: 'Salvia officinalis',
        iconicTaxon: 'plantae',
        names: [
          {
            language: 'de',
            vernacularName: 'Salbei',
          },
          {
            vernacularName: 'Echter Salbei',
            language: 'de',
          },
          {
            language: 'en',
            vernacularName: 'Common Sage',
          },
          {
            language: 'en',
            vernacularName: 'Berggarten Sage',
          },
          {
            vernacularName: 'Garden Sage',
            language: 'en',
          },
          {
            language: 'en',
            vernacularName: 'Golden Sage',
          },
          {
            vernacularName: "Holt's Mammoth Sage",
            language: 'en',
          },
          {
            language: 'en',
            vernacularName: 'Purple Garden Sage',
          },
          {
            language: 'en',
            vernacularName: 'Tricolor Sage',
          },
          {
            language: 'en',
            vernacularName: 'West Indian sage',
          },
          {
            language: 'en',
            vernacularName: 'kitchen sage',
          },
          {
            vernacularName: 'purple sage',
            language: 'en',
          },
          {
            vernacularName: 'sage',
            language: 'en',
          },
          {
            language: 'es',
            vernacularName: 'salvia',
          },
          {
            vernacularName: 'Mermasangre',
            language: 'es',
          },
          {
            language: 'es',
            vernacularName: 'salvia fina',
          },
          {
            vernacularName: 'salvia real',
            language: 'es',
          },
          {
            vernacularName: 'Sauge',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Sauge officinale',
          },
          {
            language: 'fr',
            vernacularName: 'Thé de la Grèce',
          },
          {
            language: 'it',
            vernacularName: 'salvia',
          },
          {
            language: 'pt',
            vernacularName: 'Salva',
          },
          {
            vernacularName: 'Betónica',
            language: 'pt',
          },
          {
            language: 'pt',
            vernacularName: 'Chá-da-Europa;',
          },
          {
            language: 'pt',
            vernacularName: 'Salva-mansa',
          },
          {
            language: 'pt',
            vernacularName: 'Salva-rubra',
          },
        ],
        taxonomy: {
          order: 'Lamiales',
          class: 'Magnoliopsida',
          kingdom: 'Plantae',
          phylum: 'Tracheophyta',
          family: 'Lamiaceae',
          genus: 'Salvia',
          species: 'officinalis',
        },
        images: [
          {
            license: 'http://creativecommons.org/licenses/by/2.0/',
            source: 'https://www.flickr.com/photos/biodivlibrary/6972241336/',
            url: '80/e3/91/542.6972241336.jpg',
            title: 'n310_w1150',
            rightsHolder: 'Biodiversity Heritage Library',
            photographer: {
              role: 'photographer',
              full_name:
                "<a href='http://www.flickr.com/photos/61021753@N02'>Biodiversity Heritage Library</a>",
              homepage: 'http://www.flickr.com/photos/61021753@N02',
            },
          },
          {
            url: '55/6b/e3/509.11046044.jpg',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Salvia_officinalis_001.JPG',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Salvia officinalis 001.JPG',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:Salvia_officinalis_003.JPG',
            url: '55/6b/e7/509.11046087.jpg',
            title: 'Salvia officinalis 003.JPG',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:Salvia_officinalis_p1150381.jpg',
            photographer: '',
            url: '56/37/79/509.1513507.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            title: 'Salvia officinalis p1150381.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            starred: true,
            title: 'Salvia officinalis serres du Luxembourg.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            url: '56/91/94/509.16708476.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Salvia_officinalis_serres_du_Luxembourg.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            small:
              'https://content.eol.org/data/media/56/91/94/509.16708476.98x68.jpg',
            medium:
              'https://content.eol.org/data/media/56/91/94/509.16708476.260x190.jpg',
            large:
              'https://content.eol.org/data/media/56/91/94/509.16708476.jpg',
          },
          {
            photographer: '',
            source:
              'https://commons.wikimedia.org/wiki/File:SalviaOfficinalis1.JPG',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '57/20/a1/509.1924724.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            title: 'SalviaOfficinalis1.JPG',
          },
          {
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Knobloch Aromagarten Bild 3.JPG',
            url: '57/64/1a/509.20428948.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            source:
              'https://commons.wikimedia.org/wiki/File:Knobloch_Aromagarten_Bild_3.JPG',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:Salvia_officinalis_faskomilo.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
            title: 'Salvia officinalis faskomilo.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '58/81/6d/509.25513192.jpg',
          },
          {
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source: 'https://commons.wikimedia.org/wiki/File:Salvia_3842.JPG',
            url: '59/c3/5e/509.32509626.jpg',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Salvia 3842.JPG',
          },
          {
            url: '59/c3/6f/509.32510663.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            title: 'Salvia in fiore3904.JPG',
            source:
              'https://commons.wikimedia.org/wiki/File:Salvia_in_fiore3904.JPG',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
          },
          {
            url: '59/c6/0a/509.32574690.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
            source: 'https://commons.wikimedia.org/wiki/File:Faskomilo.jpg',
            title: 'Faskomilo.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            photographer: '',
            title: 'Salvia officinalis 6a.jpg',
            url: '59/d8/1b/509.32950958.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            source:
              'https://commons.wikimedia.org/wiki/File:Salvia_officinalis_6a.jpg',
          },
          {
            url: '59/d8/1c/509.32950961.jpg',
            photographer: '',
            title: 'Salvia officinalis 6b.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Salvia_officinalis_6b.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            url: '59/dd/53/509.33060923.jpg',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            source:
              'https://commons.wikimedia.org/wiki/File:Varennes-Changy_-_Sauge_officinale.jpg',
            title: 'Varennes-Changy - Sauge officinale.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
          },
          {
            url: '5e/51/bf/509.2987812.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Salvia_officinalis_02_by_Line1.JPG',
            title: 'Salvia officinalis 02 by Line1.JPG',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
        ],
        genus: '',
        family: {
          names: ['Mint Family', 'Labiatae', 'Deadnettles'],
          taxonomy: {
            order: 'Lamiales',
            phylum: 'Tracheophyta',
            kingdom: 'Plantae',
            class: 'Magnoliopsida',
          },
          taxon: 'family',
          genera: 236,
          summary:
            'Many aromatic perennials including basil, mint, rosemary, sage, savory, marjoram, and oregano. Readily propagated from stem cuttings or seed (chia).',
          wiki: 'https://en.wikipedia.org/wiki/Lamiaceae',
          species: 7534,
          name: 'Lamiaceae',
          traits: {
            'petal count': {
              value: ['5'],
            },
            pollination: {
              value: ['Insects', 'Bumblebees', 'Single Bees'],
            },
          },
          identification:
            'Square stems, simple and opposite leaves, often fragrant. 5 petals and sepals, fused in both cases.',
          members: ['Ocimum basilicum', 'Rosmarinus officinalis'],
          eol: 'http://eol.org/pages/4302/overview',
          iconicTaxon: 'plantae',
          vernacularName: 'Mint Family',
        },
        order: '',
        id: 578478,
        vernacularNames: [
          'Common sage',
          'Berggarten sage',
          'Garden sage',
          'Golden sage',
          "Holt's mammoth sage",
          'Purple garden sage',
          'Tricolor sage',
          'West indian sage',
          'Kitchen sage',
          'Purple sage',
          'Sage',
        ],
        vernacularName: 'Common Sage',
        traits: {
          physiology: {
            value: ['Evergreen'],
          },
          name: 'Salvia officinalis',
          width: {
            value: ['.6'],
            unit: 'm',
          },
          height: {
            unit: 'm',
            value: ['.6'],
          },
          'leaf colour': {
            value: ['Grey-white', 'Grey-green'],
          },
          exposure: {
            value: ['Full sun'],
          },
          'leaf above surface': {
            value: ['Rugose'],
          },
          characteristic: {
            value: ['Perennial'],
          },
          description: {
            value: [
              'A perennial, evergreen subshrub, with woody stems, gray leaves, and blue to purple flowers.\n\nIt is a member of the mint family Lamiaceae and native to the Mediterranean region, though it has naturalised in many places throughout the world.\n\nThe leaves are oblong, ranging in size up to 6.4cm long by 2.5cm wide. Leaves are grey-green, rugose on the upper side, and nearly white underneath due to the many short soft hairs.\n\nFlowers in late spring or summer.',
            ],
          },
          'flower colour': {
            value: ['Blue', 'Purple', 'White'],
          },
          'leaf below surface': {
            value: ['Pubescent'],
          },
          'leaf length': {
            unit: 'cm',
            value: ['<6.4'],
          },
          'leaf shape': {
            value: ['Oblong'],
          },
          'leaf below colour': {
            value: ['White'],
          },
          'leaf width': {
            value: ['<2.5'],
            unit: 'cm',
          },
        },
      },
      {
        binomial: 'Petroselinum crispum',
        iconicTaxon: 'plantae',
        names: [
          {
            language: 'en',
            vernacularName: 'parsley',
            wikiSearchTerm: '',
          },
          {
            vernacularName: 'Common garden parsley',
            language: 'en',
          },
          {
            vernacularName: 'Curled Parsley',
            language: 'en',
          },
          {
            vernacularName: 'Garden Parsley',
            language: 'en',
          },
          {
            vernacularName: 'Hamburg Parsley',
            language: 'en',
          },
          {
            vernacularName: 'Plainleaf Parsley',
            language: 'en',
          },
          {
            language: 'de',
            vernacularName: 'Garten-Petersilie',
          },
          {
            vernacularName: 'Perejil',
            language: 'es',
          },
          {
            language: 'fr',
            vernacularName: 'Persil cultivé',
          },
          {
            vernacularName: 'Prezzemolo',
            language: 'it',
          },
          {
            language: 'pt',
            vernacularName: 'Salsa',
          },
        ],
        taxonomy: {
          family: 'Apiaceae',
          order: 'Apiales',
          phylum: 'Tracheophyta',
          kingdom: 'Plantae',
          class: 'Magnoliopsida',
          genus: 'Petroselinum',
          species: 'crispum',
        },
        images: [
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Petroselinum crispum 003.JPG',
            starred: true,
            photographer: '',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Petroselinum_crispum_003.JPG',
            url: '55/5b/92/509.10776444.jpg',

            small:
              'https://content.eol.org/data/media/55/5b/92/509.10776444.98x68.jpg',
            medium:
              'https://content.eol.org/data/media/55/5b/92/509.10776444.260x190.jpg',
            large:
              'https://content.eol.org/data/media/55/5b/92/509.10776444.jpg',
          },
          {
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Petroselinum neapolitanum flower.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Petroselinum_neapolitanum_flower.jpg',
            url: '55/84/96/509.1140179.jpg',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
          },
          {
            photographer: '',
            url: '58/67/6c/509.25147862.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Syrphe_hoverfly_(3712346750).jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Syrphe hoverfly (3712346750).jpg',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Krause Petersilie.JPG',
            photographer: '',
            url: '5a/a0/73/509.11932210.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Krause_Petersilie.JPG',
          },
          {
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Chimichurri Sauce Recipe (13294643914).jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Chimichurri_Sauce_Recipe_(13294643914).jpg',
            url: '5f/53/dc/509.35375333.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
          },
          {
            url: '5f/b4/51/509.37547764.jpg',
            title: 'Petrocelium crispum-yercaud-salem-India.JPG',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Petrocelium_crispum-yercaud-salem-India.JPG',
            photographer: '',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:PETROSELINUM_CRISPUM_-_AGUDA_-_IB-014_(Julivert).JPG',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            url: '5f/c1/24/509.37867879.jpg',
            title: 'PETROSELINUM CRISPUM - AGUDA - IB-014 (Julivert).JPG',
          },
        ],
        terms: ['Taproot', 'Chamaephyte'],
        genus: '',
        family: {
          genera: 400,
          members: [
            'Daucus carota subsp. sativus',
            'Coriandrum sativum',
            'Petroselinum crispum',
            'Foeniculum vulgare',
            'Anethum graveolens',
            'Conium maculatum',
            'Cuminum cyminum',
            'Carum carvi',
            'Anthriscus cerefolium',
            'Myrrhis odorata',
            'Pimpinella anisum',
            'Levisticum officinale',
            'Pastinaca sativa',
          ],
          names: [
            'Carrot or Parsley family',
            'Umbellifers',
            'Celery family',
            'Carrot family',
            'Parsely family',
          ],
          summary:
            'A family of mostly aromatic flowering plants that includes species such as carrot, celery, cumin, parsley and coriander, and the posionouse hemlocks.',
          species: 3700,
          identification:
            'Compound, termial umbels radiating from a single point. Hollow flower stalks.',
          taxon: 'family',
          traits: {
            pollination: {
              value: ['Leafcutter Bees'],
            },
            'leaf arrangement': {
              value: ['Alternate'],
            },
            inflorescence: {
              value: ['Umbel'],
            },
          },
          wiki: 'https://en.wikipedia.org/wiki/Apiaceae',
          eol: 'http://eol.org/pages/4200/overview',
          name: 'Apiaceae',
          iconicTaxon: 'plantae',
          taxonomy: {
            phylum: 'Tracheophyta',
            class: 'Magnoliopsida',
            kingdom: 'Plantae',
            order: 'Apiales',
          },
          vernacularName: 'Carrot or Parsley family',
        },
        order: '',
        id: 581421,
        vernacularNames: [
          'Parsley',
          'Common garden parsley',
          'Curled parsley',
          'Garden parsley',
          'Hamburg parsley',
          'Plainleaf parsley',
        ],
        vernacularName: 'Parsley',
        traits: {
          usage: {
            value: ['herb', ' food'],
          },
          symbiont: {
            type: 'companion planting',
            value: ['solanum lycopersicum'],
          },
          germination: {
            unit: 'WW',
            value: ['4-6'],
          },
          description: {
            value: [
              'A species of flowering plant in the family Apiaceae that is native to the central Mediterranean region, but has naturalised elsewhere in Europe.\n\nGarden parsley is a bright green, biennial plant in temperate climates, or an annual herb in subtropical and tropical areas.\n\nWhere it grows as a biennial, in the first year, it forms a rosette of tripinnate leaves 10–25cm long with numerous 1–3cm leaflets, and a taproot used as a food store over the winter. In the second year, it grows a flowering stem to 75cm tall with sparser leaves and flat-topped 3–10cm diameter umbels with numerous 2mm diameter yellow to yellow-green flowers.\n\nThe seeds are ovoid, 2–3mm long, with prominent style remnants at the apex. One of the compounds of the essential oil is apiol. The plant normally dies after seed maturation.',
            ],
          },
          exposure: {
            value: ['Full sun'],
          },
          'umbel diameter': {
            unit: 'cm',
            value: ['3-10'],
          },
          'leaf shape': {
            value: ['Palmatifid', 'Cuneate'],
          },
          'leaf division': {
            value: ['Tripinnate'],
          },
          inflorescence: {
            value: ['Umbel'],
          },
          characteristic: {
            value: ['Taproot system'],
          },
          'leaf length': {
            value: ['10-25'],
            unit: 'cm',
          },
          'flower diameter': {
            unit: 'mm',
            value: ['2'],
          },
          name: 'Petroselinum crispum',
          'flower colour': {
            value: ['Yellow', 'Yellow-green'],
          },
        },
      },
      {
        binomial: 'Coriandrum sativum',
        iconicTaxon: 'plantae',
        names: [
          {
            vernacularName: 'Koriander',
            language: 'de',
          },
          {
            vernacularName: 'Chinesische Petersilie',
            language: 'de',
          },
          {
            vernacularName: 'Indische Petersilie',
            language: 'de',
          },
          {
            language: 'de',
            vernacularName: 'Wanzenkümmel',
          },
          {
            language: 'en',
            wikiSearchTerm: '',
            vernacularName: 'coriander',
          },
          {
            vernacularName: 'Chinese parsley',
            language: 'en',
          },
          {
            vernacularName: 'Cilantro',
            language: 'en',
          },
          {
            vernacularName: 'Indian parsley',
            language: 'en',
          },
          {
            language: 'es',
            vernacularName: 'Cilantro',
          },
          {
            language: 'es',
            vernacularName: 'Coriandro',
          },
          {
            vernacularName: 'Coriandre',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Coriandre cultivée',
          },
          {
            language: 'fr',
            vernacularName: 'Persil arabe',
          },
          {
            language: 'fr',
            vernacularName: 'Punaise mâle',
          },
          {
            vernacularName: 'Coriandolo',
            language: 'it',
          },
          {
            language: 'pt',
            vernacularName: 'Coentro',
          },
        ],
        taxonomy: {
          kingdom: 'Plantae',
          order: 'Apiales',
          class: 'Magnoliopsida',
          phylum: 'Tracheophyta',
          family: 'Apiaceae',
          genus: 'Coriandrum',
          species: 'sativum',
        },
        images: [
          {
            title: 'A scene of Coriander leaves.JPG',
            source:
              'https://commons.wikimedia.org/wiki/File:A_scene_of_Coriander_leaves.JPG',
            photographer: '',
            url: '5b/d0/47/509.17870796.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            url: '55/75/14/509.11171049.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Bloeiende koriander.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            source:
              'https://commons.wikimedia.org/wiki/File:Bloeiende_koriander.jpg',
            photographer: '',
          },
          {
            photographer: '',
            title: 'Coriander NP.JPG',
            url: '58/ac/43/509.26320860.jpg',
            source: 'https://commons.wikimedia.org/wiki/File:Coriander_NP.JPG',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            starred: true,
            license: 'http://creativecommons.org/licenses/by/3.0/',
            title: 'Kottimiri.JPG',
            source: 'https://commons.wikimedia.org/wiki/File:Kottimiri.JPG',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '59/02/5e/509.27916713.jpg',
            photographer: '',

            small:
              'https://content.eol.org/data/media/59/02/5e/509.27916713.98x68.jpg',
            medium:
              'https://content.eol.org/data/media/59/02/5e/509.27916713.260x190.jpg',
            large:
              'https://content.eol.org/data/media/59/02/5e/509.27916713.jpg',
          },
          {
            license: 'http://creativecommons.org/licenses/by/3.0/',
            title: 'JfCamachilesMabalacatCoriandrumsativump495fvf.JPG',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            source:
              'https://commons.wikimedia.org/wiki/File:JfCamachilesMabalacatCoriandrumsativump495fvf.JPG',
            url: '5f/cc/3b/509.38177351.jpg',
          },
          {
            url: '5f/cc/3e/509.38177355.jpg',
            title: 'JfCamachilesMabalacatCoriandrumsativump498fvf.JPG',
            source:
              'https://commons.wikimedia.org/wiki/File:JfCamachilesMabalacatCoriandrumsativump498fvf.JPG',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            title: 'JfCamachilesMabalacatCoriandrumsativump499fvf.JPG',
            url: '5f/cc/3f/509.38177356.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:JfCamachilesMabalacatCoriandrumsativump499fvf.JPG',
          },
          {
            photographer: '',
            source:
              'https://commons.wikimedia.org/wiki/File:Flor_de_Coentro.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            url: '5f/fc/dc/509.3884615.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Flor de Coentro.jpg',
          },
          {
            photographer: '',
            title: 'Coriandrum sativum sl1.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Coriandrum_sativum_sl1.jpg',
            url: '60/99/1c/509.41170030.jpg',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source: 'https://commons.wikimedia.org/wiki/File:Koriander_A.jpg',
            url: '60/9f/bb/509.41281320.jpg',
            photographer: '',
            title: 'Koriander A.jpg',
          },
        ],
        terms: ['Schizocarp', 'Umbel'],
        genus: '',
        family: {
          genera: 400,
          members: [
            'Daucus carota subsp. sativus',
            'Coriandrum sativum',
            'Petroselinum crispum',
            'Foeniculum vulgare',
            'Anethum graveolens',
            'Conium maculatum',
            'Cuminum cyminum',
            'Carum carvi',
            'Anthriscus cerefolium',
            'Myrrhis odorata',
            'Pimpinella anisum',
            'Levisticum officinale',
            'Pastinaca sativa',
          ],
          names: [
            'Carrot or Parsley family',
            'Umbellifers',
            'Celery family',
            'Carrot family',
            'Parsely family',
          ],
          summary:
            'A family of mostly aromatic flowering plants that includes species such as carrot, celery, cumin, parsley and coriander, and the posionouse hemlocks.',
          species: 3700,
          identification:
            'Compound, termial umbels radiating from a single point. Hollow flower stalks.',
          taxon: 'family',
          traits: {
            pollination: {
              value: ['Leafcutter Bees'],
            },
            'leaf arrangement': {
              value: ['Alternate'],
            },
            inflorescence: {
              value: ['Umbel'],
            },
          },
          wiki: 'https://en.wikipedia.org/wiki/Apiaceae',
          eol: 'http://eol.org/pages/4200/overview',
          name: 'Apiaceae',
          iconicTaxon: 'plantae',
          taxonomy: {
            phylum: 'Tracheophyta',
            class: 'Magnoliopsida',
            kingdom: 'Plantae',
            order: 'Apiales',
          },
          vernacularName: 'Carrot or Parsley family',
        },
        order: '',
        id: 581687,
        vernacularNames: [
          'Coriander',
          'Chinese parsley',
          'Cilantro',
          'Indian parsley',
        ],
        vernacularName: 'Coriander',
        traits: {
          name: 'Coriandrum sativum',
          description: {
            value: [
              'An annual herb in the family Apiaceae. \n\nCoriander is native to regions spanning from Southern Europe and Northern Africa to Southwestern Asia. \n\nA soft plant to 50cm. \n\nThe leaves are variable in shape, broadly lobed at the base of the plant, and slender and feathery higher on the flowering stems. \n\nThe flowers are borne in small umbels, white or very pale pink, asymmetrical, with the petals pointing away from the centre of the umbel longer (5–6mm) than those pointing toward it 1–3mm long). \n\nThe fruit is a globular, dry schizocarp 3–5mm in diameter. Pollen size is approximately 33 microns.',
            ],
          },
        },
      },
      {
        binomial: 'Artemisia dracunculus',
        iconicTaxon: 'plantae',
        names: [
          {
            language: 'en',
            vernacularName: 'wild tarragon',
          },
          {
            vernacularName: 'wild tarragon',
            language: 'en',
          },
          {
            language: 'it',
            vernacularName: 'Dragoncello o estragone',
          },
          {
            vernacularName: 'Estragon',
            language: 'de',
          },
          {
            vernacularName: 'Estragon',
            language: 'fr',
          },
          {
            vernacularName: 'tarragon',
            language: 'en',
          },
          {
            language: 'en',
            vernacularName: 'tarragon',
          },
        ],
        taxonomy: {
          kingdom: 'Plantae',
          phylum: 'Tracheophyta',
          family: 'Asteraceae',
          order: 'Asterales',
          class: 'Magnoliopsida',
          genus: 'Artemisia',
          species: 'dracunculus',
        },
        images: [
          {
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            source:
              'https://commons.wikimedia.org/wiki/File:Artemisia_dracunculus_5.jpg',
            photographer: '',
            url: '55/44/9c/509.10457950.jpg',
            title: 'Artemisia dracunculus 5.jpg',
          },
          {
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Artemisia dracunculus 6.jpg',
            url: '55/44/9d/509.10457952.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Artemisia_dracunculus_6.jpg',
          },
          {
            title: 'Artemisia dracunculus 8.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '55/44/9f/509.10457958.jpg',
            photographer: '',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Artemisia_dracunculus_8.jpg',
          },
          {
            title: 'Artemisia dracunculus1.jpg',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            source:
              'https://commons.wikimedia.org/wiki/File:Artemisia_dracunculus1.jpg',
            url: '57/ac/1f/509.2200786.jpg',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            source:
              'https://commons.wikimedia.org/wiki/File:Artemisia_dracunculus2.jpg',
            url: '57/ac/20/509.2200787.jpg',
            title: 'Artemisia dracunculus2.jpg',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            photographer: '',
          },
          {
            license: 'http://creativecommons.org/licenses/by/3.0/',
            url: '57/da/1e/509.22748651.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Artemisia_dracunculus_(8186674150).jpg',
            photographer: '',
            title: 'Artemisia dracunculus (8186674150).jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            title: 'Artemisia dracunculus (5021066066).jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Artemisia_dracunculus_(5021066066).jpg',
            url: '57/e2/ae/509.22759942.jpg',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            url: '57/e2/b4/509.22759973.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Artemisia_dracunculus_(5021063648).jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            title: 'Artemisia dracunculus (5021063648).jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            starred: true,
            photographer: '',
            title: 'Artemisia dracunculus3.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Artemisia_dracunculus3.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            url: '58/74/e3/509.2528916.jpg',

            small:
              'https://content.eol.org/data/media/58/74/e3/509.2528916.98x68.jpg',
            medium:
              'https://content.eol.org/data/media/58/74/e3/509.2528916.260x190.jpg',
            large:
              'https://content.eol.org/data/media/58/74/e3/509.2528916.jpg',
          },
          {
            title: 'Artemisia dracunculus 5.jpg',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '5a/45/dc/509.10457950.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Artemisia_dracunculus_5.jpg',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
          },
          {
            title: 'Asterales - Artemisia dracunculus - 1.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Asterales_-_Artemisia_dracunculus_-_1.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            url: '63/18/1d/509.48202144.jpg',
            photographer: '',
          },
          {
            title: 'Artemisia dracunculus HRM.jpg',
            photographer: '',
            source:
              'https://commons.wikimedia.org/wiki/File:Artemisia_dracunculus_HRM.jpg',
            url: '67/76/f6/509.6774964.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by/3.0/',
          },
        ],
        terms: ['Polymorphism', 'Pseudanthium', 'Rhizome'],
        genus: '',
        family: {
          names: [
            'Daisies',
            'Compositae',
            'Aster',
            'Composite',
            'Sunflower family',
          ],
          wiki: 'https://en.wikipedia.org/wiki/Asteraceae',
          traits: {
            'fruit type': {
              value: ['Achene'],
            },
            pollination: {
              value: ['Insects', 'Wind', 'Asexual'],
            },
          },
          taxon: 'family',
          iconicTaxon: 'plantae',
          eol: 'http://eol.org/pages/4206/overview',
          identification:
            'Composite flowers with either disk or ray flowers, or both.',
          species: 32913,
          members: ['Cynara cardunculus', 'Helianthus annuus'],
          genera: 1911,
          name: 'Asteraceae',
          taxonomy: {
            class: 'Magnoliopsida',
            phylum: 'Tracheophyta',
            kingdom: 'Plantae',
            order: 'Asterales',
          },
          summary:
            'Worldwide distribution, second only to the orchids in size. Economically important, products include cooking oils, lettuce, sunflower seeds, and artichokes. The head may track the sun which maximizes reflectivity thereby attracting more pollinators.',
          vernacularName: 'Daisies',
        },
        order: '',
        id: 577604,
        vernacularNames: [
          'Wild tarragon',
          'Wild tarragon',
          'Tarragon',
          'Tarragon',
        ],
        vernacularName: 'Wild Tarragon',
        traits: {
          'leaf width': {
            value: ['2-10'],
            unit: 'mm',
          },
          'leaf shape': {
            value: ['Lanceolate'],
          },
          height: {
            value: ['120-150'],
            unit: 'cm',
          },
          propagation: {
            value: ['Rhizomes'],
          },
          'leaf margin': {
            value: ['Entire'],
          },
          characteristic: {
            value: ['Polymorphic'],
          },
          description: {
            value: [
              'A polymorphic species of perennial herb in the sunflower family. It is widespread in the wild across much of Eurasia and North America.\n\nThe subspecies, Artemisia dracunculus var. sativa, is cultivated for use of the leaves as an aromatic culinary herb.\n\nTarragon grows to 120–150cm, with slender branches. \n\nThe leaves are lanceolate, 2–8cm by 2–10mm, broad, glossy green, with an entire margin.\n\nThe flowers are produced in small capitula 2–4mm in diameter, each capitulum containing up to 40 yellow or green-yellow florets.\n\nTarragon has rhizomatous roots that it uses to spread and readily reproduce.\n\nThe species is polymorphic. Informal names for distinguishing the variations include "French tarragon", "Russian tarragon", and "wild tarragon".',
            ],
          },
          name: 'Artemisia dracunculus',
          'leaf length': {
            value: ['2-8'],
            unit: 'cm',
          },
        },
      },
      {
        binomial: 'Ocimum basilicum',
        iconicTaxon: 'plantae',
        names: [
          {
            language: 'de',
            vernacularName: 'Basilikum',
          },
          {
            vernacularName: 'Basilienkraut',
            language: 'de',
          },
          {
            vernacularName: 'Königskraut',
            language: 'de',
          },
          {
            language: 'en',
            wikiSearchTerm: '',
            vernacularName: 'basil',
          },
          {
            vernacularName: "Saint-Joseph's-wort",
            language: 'en',
          },
          {
            language: 'en',
            vernacularName: 'common basil',
          },
          {
            vernacularName: 'sweet basil',
            language: 'en',
          },
          {
            vernacularName: 'albahaca',
            language: 'es',
          },
          {
            language: 'es',
            vernacularName: 'Albacar',
          },
          {
            language: 'es',
            vernacularName: 'Alfábega',
          },
          {
            vernacularName: 'albahaca de puerco',
            language: 'es',
          },
          {
            vernacularName: 'Basilic',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Basilic commun',
          },
          {
            language: 'fr',
            vernacularName: 'Basilic à épis nombreux',
          },
          {
            language: 'fr',
            vernacularName: 'Herbe royale',
          },
          {
            vernacularName: 'petit framboisin',
            language: 'fr',
          },
          {
            language: 'it',
            vernacularName: 'Basilico',
          },
          {
            vernacularName: 'Manjericão',
            language: 'pt',
          },
          {
            vernacularName: 'Alfavaca',
            language: 'pt',
          },
        ],
        taxonomy: {
          family: 'Lamiaceae',
          kingdom: 'Plantae',
          order: 'Lamiales',
          class: 'Magnoliopsida',
          phylum: 'Tracheophyta',
          genus: 'Ocimum',
          species: 'basilicum',
        },
        images: [
          {
            photographer: {
              full_name:
                "<a href='http://www.flickr.com/photos/12303842@N00'>John Rusk</a>",
              role: 'photographer',
              homepage: 'http://www.flickr.com/photos/12303842@N00',
            },
            source: 'https://www.flickr.com/photos/john_d_rusk/27605914044/',
            url: '7f/15/b4/542.27605914044.jpg',
            rightsHolder: 'John Rusk',
            title: '2016-07-09-11.07.58 ZS PMax Ocimum basilicum-1-1',
            license: 'http://creativecommons.org/licenses/by/2.0/',
          },
          {
            title: 'J20160709-0013Ocimum basilicum',
            source: 'https://www.flickr.com/photos/john_d_rusk/28118020912/',
            photographer: {
              homepage: 'http://www.flickr.com/photos/12303842@N00',
              full_name:
                "<a href='http://www.flickr.com/photos/12303842@N00'>John Rusk</a>",
              role: 'photographer',
            },
            rightsHolder: 'John Rusk',
            license: 'http://creativecommons.org/licenses/by/2.0/',
            url: '7f/1c/e7/542.28118020912.jpg',
          },
          {
            title: 'Basil leaves.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            source: 'https://commons.wikimedia.org/wiki/File:Basil_leaves.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
            url: '55/2f/43/509.1008187.jpg',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:2006-10-16-Ocimum02.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            title: '2006-10-16-Ocimum02.jpg',
            url: '56/05/ae/509.1406078.jpg',
            photographer: '',
          },
          {
            title: 'Basilico.JPG',
            source: 'https://commons.wikimedia.org/wiki/File:Basilico.JPG',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            url: '57/13/dd/509.19013504.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            starred: true,

            small:
              'https://content.eol.org/data/media/57/13/dd/509.19013504.98x68.jpg',
            medium:
              'https://content.eol.org/data/media/57/13/dd/509.19013504.260x190.jpg',
            large:
              'https://content.eol.org/data/media/57/13/dd/509.19013504.jpg',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            url: '57/63/15/509.20419458.jpg',
            title:
              'File:Basilic Ã  feuille de laitue Vilmorin-Andrieux 1904.png',
            photographer: '',
            source:
              'https://commons.wikimedia.org/wiki/File:Basilic_%C3%A0_feuille_de_laitue_Vilmorin-Andrieux_1904.png',
          },
          {
            license: 'http://creativecommons.org/licenses/publicdomain/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Basilic anis.JPG',
            source: 'https://commons.wikimedia.org/wiki/File:Basilic_anis.JPG',
            url: '57/92/16/509.21313601.jpg',
            photographer: '',
          },
          {
            photographer: '',
            title:
              'Ocimum basilicum - Agri-Horticultural Society of India - Alipore - Kolkata 2013-01-05 2276.JPG',
            source:
              'https://commons.wikimedia.org/wiki/File:Ocimum_basilicum_-_Agri-Horticultural_Society_of_India_-_Alipore_-_Kolkata_2013-01-05_2276.JPG',
            url: '58/15/b9/509.23839616.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            photographer: '',
            title: 'File:BasilikumGenovesergroÃblÃ¤ttriger.jpg',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            url: '59/7d/f0/509.3107062.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            source:
              'https://commons.wikimedia.org/wiki/File:BasilikumGenovesergro%C3%9Fbl%C3%A4ttriger.jpg',
          },
          {
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
            title: 'Ocimum Basilicum - Basilica (2842866456).jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Ocimum_Basilicum_-_Basilica_(2842866456).jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '59/ba/e1/509.32319643.jpg',
          },
          {
            url: '59/e4/29/509.33232479.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Ocimum_basilicum_111.JPG',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            title: 'Ocimum basilicum 111.JPG',
            license: 'http://creativecommons.org/licenses/by/3.0/',
          },
          {
            license: 'http://creativecommons.org/licenses/by/3.0/',
            title: 'Ocimum basilicum 002.JPG',
            source:
              'https://commons.wikimedia.org/wiki/File:Ocimum_basilicum_002.JPG',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '5a/5a/7e/509.10740982.jpg',
          },
          {
            url: '5a/bb/9b/509.12387887.jpg',
            title: 'Gardenology-IMG 8038 hunt10aug.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Gardenology-IMG_8038_hunt10aug.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
          },
          {
            title: '2006-10-16-Ocimum02.jpg',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '5b/06/ee/509.1406078.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:2006-10-16-Ocimum02.jpg',
          },
        ],
        terms: [
          'Spike',
          'Entomophily',
          'Achene',
          'Bilabiate',
          'Calyx',
          'Zygomorphic',
        ],
        genus: '',
        family: {
          names: ['Mint Family', 'Labiatae', 'Deadnettles'],
          taxonomy: {
            order: 'Lamiales',
            phylum: 'Tracheophyta',
            kingdom: 'Plantae',
            class: 'Magnoliopsida',
          },
          taxon: 'family',
          genera: 236,
          summary:
            'Many aromatic perennials including basil, mint, rosemary, sage, savory, marjoram, and oregano. Readily propagated from stem cuttings or seed (chia).',
          wiki: 'https://en.wikipedia.org/wiki/Lamiaceae',
          species: 7534,
          name: 'Lamiaceae',
          traits: {
            'petal count': {
              value: ['5'],
            },
            pollination: {
              value: ['Insects', 'Bumblebees', 'Single Bees'],
            },
          },
          identification:
            'Square stems, simple and opposite leaves, often fragrant. 5 petals and sepals, fused in both cases.',
          members: ['Ocimum basilicum', 'Rosmarinus officinalis'],
          eol: 'http://eol.org/pages/4302/overview',
          iconicTaxon: 'plantae',
          vernacularName: 'Mint Family',
        },
        order: '',
        id: 579364,
        vernacularNames: [
          'Basil',
          "Saint-joseph's-wort",
          'Common basil',
          'Sweet basil',
        ],
        vernacularName: 'Basil',
        traits: {
          'leaf shape': {
            value: ['Ovate', 'Lanceolate'],
          },
          'flower colour': {
            value: ['White'],
          },
          description: {
            value: [
              'A culinary herb in the family Lamiaceae.\n\nBasil is native to tropical regions from central Africa to Southeast Asia.\n\nIt is a tender plant. Depending on the species and cultivar, the leaves may taste like anise, with a strong, pungent, often sweet smell.\n\nBasil is an annual, or sometimes perennial, herb.\n\nDepending on the variety, plants can reach between 30cm and 150cm. \n\nIts leaves are richly green and ovate, but otherwise come in a wide variety of sizes and shapes depending on the cultivar.\n\nLeaf sizes range from 3cm to 11cm long, and 1cm to 6cm wide.\n\nBasil grows a thick, central taproot.\n\nIts flowers are small and white, and grow from a central inflorescence that emerges from the central stem atop the plant.',
            ],
          },
          inflorescence: {
            value: ['Spike'],
          },
          name: 'Ocimum basilicum',
          'flower shape': {
            value: ['Bilabiate', 'Zygomorphic'],
          },
          characteristic: {
            value: ['annual', ' perennial', 'Polymorphic'],
          },
          pollination: {
            value: ['Entomophily'],
          },
          usage: {
            value: ['herb', ' food'],
          },
          role: {
            type: 'parasitism',
            value: ['peronospora belbahrii'],
          },
          climate: {
            value: ['hot', ' dry'],
          },
          symbiont: {
            value: ['solanum lycopersicum'],
            type: 'companion planting',
          },
        },
      },
      {
        binomial: 'Mentha spicata',
        iconicTaxon: 'plantae',
        names: [
          {
            wikiSearchTerm: '',
            language: 'en',
            vernacularName: 'spearmint',
          },
          {
            language: 'en',
            vernacularName: 'Curled Mint',
          },
          {
            vernacularName: 'Garden mint',
            language: 'en',
          },
          {
            language: 'en',
            vernacularName: 'bush mint',
          },
          {
            vernacularName: 'bush mint (spearmint)',
            language: 'en',
          },
          {
            vernacularName: 'horse mint',
            language: 'en',
          },
          {
            vernacularName: 'wild mint',
            language: 'en',
          },
          {
            vernacularName: 'Menthe à longues feuilles',
            language: 'fr',
          },
          {
            vernacularName: 'Baume',
            language: 'fr',
          },
          {
            vernacularName: 'Menthe',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Menthe en grappe',
          },
          {
            vernacularName: 'Menthe en épi, Menthe verte',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Menthe glabre',
          },
          {
            vernacularName: 'Menthe velue',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Menthe verte',
          },
          {
            vernacularName: 'baume vert',
            language: 'fr',
          },
          {
            vernacularName: 'menthe romaine',
            language: 'fr',
          },
          {
            vernacularName: 'menthe à épis',
            language: 'fr',
          },
          {
            language: 'it',
            vernacularName: 'Mentastro verde',
          },
          {
            language: 'pt',
            vernacularName: 'Hortelã-verde',
          },
        ],
        taxonomy: {
          phylum: 'Tracheophyta',
          family: 'Lamiaceae',
          order: 'Lamiales',
          class: 'Magnoliopsida',
          kingdom: 'Plantae',
          genus: 'Mentha',
          species: 'spicata',
        },
        images: [
          {
            source: 'https://commons.wikimedia.org/wiki/File:FreshMint.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            title: 'FreshMint.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            url: '55/51/39/509.10631792.jpg',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            url: '55/e6/ac/509.13062318.jpg',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            title:
              'Flowering Spear Mint (Mentha spicata) - geograph.org.uk - 539690.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Flowering_Spear_Mint_(Mentha_spicata)_-_geograph.org.uk_-_539690.jpg',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:Mentha_viridis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-096.jpg',
            url: '58/83/67/509.255375.jpg',
            photographer: '',
            title: 'File:Mentha viridis - KÃ¶hlerâs Medizinal-Pflanzen-096.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:Ants_on_spearmint_flowers_001.jpg',
            title: 'Ants on spearmint flowers 001.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '58/c6/37/509.26889605.jpg',
          },
          {
            photographer: '',
            url: '59/bb/9c/509.32331202.jpg',
            title: 'Mentha spicata Jammu India.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Mentha_spicata_Jammu_India.jpg',
          },
          {
            url: '5a/20/d8/509.34240722.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            source:
              'https://commons.wikimedia.org/wiki/File:20140727Mentha_spicata2.jpg',
            title: '20140727Mentha spicata2.jpg',
            license: 'http://creativecommons.org/licenses/publicdomain/',
          },
          {
            url: '5a/20/dd/509.34240738.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:20140727Mentha_spicata5.jpg',
            title: '20140727Mentha spicata5.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            license: 'http://creativecommons.org/licenses/publicdomain/',
          },
          {
            url: '5f/36/13/509.34674320.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            source:
              'https://commons.wikimedia.org/wiki/File:20140809Mentha_spicata1.jpg',
            photographer: '',
            license: 'http://creativecommons.org/licenses/publicdomain/',
            title: '20140809Mentha spicata1.jpg',
          },
          {
            license: 'http://creativecommons.org/licenses/publicdomain/',
            title: '20141101Mentha spicata2.jpg',
            photographer: '',
            starred: true,
            url: '5f/7f/d6/509.36618670.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:20141101Mentha_spicata2.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',

            small:
              'https://content.eol.org/data/media/5f/7f/d6/509.36618670.98x68.jpg',
            medium:
              'https://content.eol.org/data/media/5f/7f/d6/509.36618670.260x190.jpg',
            large:
              'https://content.eol.org/data/media/5f/7f/d6/509.36618670.jpg',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:Mentha_spicata1.jpg',
            photographer: '',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            title: 'Mentha spicata1.jpg',
            url: '61/42/8c/509.4343707.jpg',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            url: '64/8f/db/509.54569001.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Spearmint_in_Bangladesh_09.jpg',
            title: 'Spearmint in Bangladesh 09.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            photographer: '',
          },
        ],
        genus: '',
        family: {
          names: ['Mint Family', 'Labiatae', 'Deadnettles'],
          taxonomy: {
            order: 'Lamiales',
            phylum: 'Tracheophyta',
            kingdom: 'Plantae',
            class: 'Magnoliopsida',
          },
          taxon: 'family',
          genera: 236,
          summary:
            'Many aromatic perennials including basil, mint, rosemary, sage, savory, marjoram, and oregano. Readily propagated from stem cuttings or seed (chia).',
          wiki: 'https://en.wikipedia.org/wiki/Lamiaceae',
          species: 7534,
          name: 'Lamiaceae',
          traits: {
            'petal count': {
              value: ['5'],
            },
            pollination: {
              value: ['Insects', 'Bumblebees', 'Single Bees'],
            },
          },
          identification:
            'Square stems, simple and opposite leaves, often fragrant. 5 petals and sepals, fused in both cases.',
          members: ['Ocimum basilicum', 'Rosmarinus officinalis'],
          eol: 'http://eol.org/pages/4302/overview',
          iconicTaxon: 'plantae',
          vernacularName: 'Mint Family',
        },
        order: '',
        id: 579697,
        vernacularNames: [
          'Spearmint',
          'Curled mint',
          'Garden mint',
          'Bush mint',
          'Bush mint (spearmint)',
          'Horse mint',
          'Wild mint',
        ],
        vernacularName: 'Spearmint',
        traits: {
          'leaf width': {
            unit: 'cm',
            value: ['1.5-3'],
          },
          exposure: {
            value: ['Partial shade', 'Full sun'],
          },
          name: 'Mentha spicata',
          description: {
            value: [
              'Native to Europe and southern temperate Asia, extending from Ireland in the west to southern China in the east. It is naturalised in many other temperate parts of the world.\n\nSpearmint is a perennial herbaceous plant 30–100cm tall, with variably hairless to hairy stems and foliage, and a wide-spreading fleshy underground rhizome from which it grows.\n\nThe leaves are 5–9cm by 1.5–3cm, with a serrated margin.\n\nThe stem is square-shaped, a trademark of the mint family of herbs.\n\nSpearmint produces flowers in slender spikes, each flower pink or white in colour, 2.5–3mm long, and broad.\n\nSpearmint flowers in the summer and has relatively large seeds.\n\nMentha spicata varies considerably in leaf blade dimensions, the prominence of leaf veins, and pubescence.',
            ],
          },
          'flower colour': {
            value: ['White', 'Pink'],
          },
          height: {
            unit: 'cm',
            value: ['30-100'],
          },
          inflorescence: {
            value: ['Spike'],
          },
          characteristic: {
            value: ['Perennial', 'Herbaceous'],
          },
          'ph value': {
            value: ['6-7.5'],
            unit: 'pH',
          },
          'soil type': {
            value: ['Well-drained'],
          },
          'leaf length': {
            unit: 'cm',
            value: ['5-9'],
          },
          'leaf shape': {
            value: ['Oblong', 'Lanceolate'],
          },
          propagation: {
            value: ['Rhizomes'],
          },
        },
      },
      {
        binomial: 'Rosmarinus officinalis',
        iconicTaxon: 'plantae',
        names: [
          {
            vernacularName: 'Rosmarin',
            language: 'de',
          },
          {
            vernacularName: 'rosemary',
            wikiSearchTerm: '',
            language: 'en',
          },
          {
            vernacularName: 'Old Man',
            language: 'en',
          },
          {
            language: 'en',
            vernacularName: 'Prostrate Rosemary',
          },
          {
            vernacularName: 'Romero',
            language: 'en',
          },
          {
            language: 'es',
            vernacularName: 'yerba de la niña',
          },
          {
            vernacularName: 'Romarin',
            language: 'fr',
          },
          {
            language: 'fr',
            vernacularName: 'Ecensier',
          },
          {
            language: 'fr',
            vernacularName: 'Romarin officinal',
          },
          {
            language: 'fr',
            vernacularName: 'Rosmarin encens',
          },
          {
            vernacularName: 'Ramerino',
            language: 'it',
          },
          {
            vernacularName: 'Rosmarino',
            language: 'it',
          },
          {
            vernacularName: 'Alecrim',
            language: 'pt',
          },
          {
            vernacularName: 'alecrim-do-jardim',
            language: 'pt',
          },
          {
            vernacularName: 'erva-coroada',
            language: 'pt',
          },
          {
            language: 'pt',
            vernacularName: 'rosa-marinha',
          },
          {
            vernacularName: 'rosmarinho',
            language: 'pt',
          },
        ],
        taxonomy: {
          family: 'Lamiaceae',
          phylum: 'Tracheophyta',
          order: 'Lamiales',
          kingdom: 'Plantae',
          class: 'Magnoliopsida',
          genus: 'Rosmarinus',
          species: 'officinalis',
        },
        images: [
          {
            title: '2015-01-03-15.34.28 ZS PMax-Rosmarinus officinalis-1',
            photographer: {
              homepage: 'http://www.flickr.com/photos/12303842@N00',
              full_name:
                "<a href='http://www.flickr.com/photos/12303842@N00'>John Rusk</a>",
              role: 'photographer',
            },
            license: 'http://creativecommons.org/licenses/by/2.0/',
            source: 'https://www.flickr.com/photos/john_d_rusk/16003508409/',
            url: '7e/ab/db/542.16003508409.jpg',
            rightsHolder: 'John Rusk',
          },
          {
            starred: true,
            photographer: {
              role: 'photographer',
              full_name:
                "<a href='http://www.flickr.com/photos/33590535@N06'>Drew Avery</a>",
              homepage: 'http://www.flickr.com/photos/33590535@N06',
            },
            rightsHolder: 'Drew Avery',
            license: 'http://creativecommons.org/licenses/by/2.0/',
            source: 'https://www.flickr.com/photos/33590535@N06/3455879598/',
            title: 'Rosemary Gorizia',
            url: '7f/86/96/542.3455879598.jpg',

            small:
              'https://content.eol.org/data/media/7f/86/96/542.3455879598.98x68.jpg',
            medium:
              'https://content.eol.org/data/media/7f/86/96/542.3455879598.260x190.jpg',
            large:
              'https://content.eol.org/data/media/7f/86/96/542.3455879598.jpg',
          },
          {
            title: 'Rosmarinus officinalis 0001.JPG',
            source:
              'https://commons.wikimedia.org/wiki/File:Rosmarinus_officinalis_0001.JPG',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            url: '55/6a/83/509.11026897.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
          },
          {
            title: 'Rosmarinus officinalis 0003.JPG',
            source:
              'https://commons.wikimedia.org/wiki/File:Rosmarinus_officinalis_0003.JPG',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            url: '55/6a/85/509.11026931.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            license: 'http://creativecommons.org/licenses/by-sa/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Rosmarinus_officinalis2.jpg',
            url: '55/74/c6/509.111643.jpg',
            photographer: '',
            title: 'Rosmarinus officinalis2.jpg',
          },
          {
            url: '55/d6/3d/509.12735177.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Rosmarinus officinalis 1 (Corse).JPG',
            photographer: '',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            source:
              'https://commons.wikimedia.org/wiki/File:Rosmarinus_officinalis_1_(Corse).JPG',
          },
          {
            license: 'http://creativecommons.org/licenses/by/3.0/',
            title: 'Rosmarinus officinalis 2 (Corse).JPG',
            url: '55/d6/3e/509.12735178.jpg',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            source:
              'https://commons.wikimedia.org/wiki/File:Rosmarinus_officinalis_2_(Corse).JPG',
          },
          {
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            photographer: '',
            url: '56/1c/aa/509.14669120.jpg',
            source:
              'https://commons.wikimedia.org/wiki/File:Romarin_Rosmarinus_officinalis_2.jpg',
            title: 'Romarin Rosmarinus officinalis 2.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:ChristianBauer_flowering_rosemary.jpg',
            url: '57/71/e9/509.20696.jpg',
            photographer: '',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'ChristianBauer flowering rosemary.jpg',
          },
          {
            source:
              'https://commons.wikimedia.org/wiki/File:Rosemary_(Rosmarinus_officinalis)_3.jpg',
            url: '5a/15/32/509.33944832.jpg',
            license: 'http://creativecommons.org/licenses/by/3.0/',
            rightsHolder:
              'licensed media from Wikimedia Commons in DwCA without owner',
            title: 'Rosemary (Rosmarinus officinalis) 3.jpg',
            photographer: '',
          },
        ],
        genus: '',
        family: {
          names: ['Mint Family', 'Labiatae', 'Deadnettles'],
          taxonomy: {
            order: 'Lamiales',
            phylum: 'Tracheophyta',
            kingdom: 'Plantae',
            class: 'Magnoliopsida',
          },
          taxon: 'family',
          genera: 236,
          summary:
            'Many aromatic perennials including basil, mint, rosemary, sage, savory, marjoram, and oregano. Readily propagated from stem cuttings or seed (chia).',
          wiki: 'https://en.wikipedia.org/wiki/Lamiaceae',
          species: 7534,
          name: 'Lamiaceae',
          traits: {
            'petal count': {
              value: ['5'],
            },
            pollination: {
              value: ['Insects', 'Bumblebees', 'Single Bees'],
            },
          },
          identification:
            'Square stems, simple and opposite leaves, often fragrant. 5 petals and sepals, fused in both cases.',
          members: ['Ocimum basilicum', 'Rosmarinus officinalis'],
          eol: 'http://eol.org/pages/4302/overview',
          iconicTaxon: 'plantae',
          vernacularName: 'Mint Family',
        },
        order: '',
        id: 579379,
        vernacularNames: [
          'Rosemary',
          'Old man',
          'Prostrate rosemary',
          'Romero',
        ],
        vernacularName: 'Rosemary',
        traits: {
          height: {
            value: ['1.5'],
            unit: 'm',
          },
          name: 'Rosmarinus officinalis',
          'leaf width': {
            value: ['2-5'],
            unit: 'mm',
          },
          description: {
            value: [
              'Rosemary, is a woody, perennial herb with fragrant, evergreen, needle-like leaves and white, pink, purple, or blue flowers, native to the Mediterranean region.\n\nRosemary is an aromatic evergreen shrub with leaves similar to hemlock needles.\n\nIt is reasonably hardy in cool climates. It can withstand droughts, surviving a severe lack of water for lengthy periods. \n\nThe seeds are often difficult to start, with a low germination rate and relatively slow growth, but the plant can live as long as 30 years.\n\nForms range from upright to trailing; the upright forms can reach 1.5m tall, rarely 2m.\n\nThe leaves are evergreen, 2–4cm long and 2–5mm broad, green above, and white below, with dense, short, woolly hair.\n\nThe plant flowers in spring and summer in temperate climates, but the plants can be in constant bloom in warm climates; flowers are white, pink, purple or deep blue. Rosemary also has a tendency to flower outside its normal flowering season.',
            ],
          },
          usage: {
            value: ['herb', ' pest control', ' tea'],
          },
          'leaf colour below': {
            value: ['White'],
          },
          'leaf colour above': {
            value: ['Green'],
          },
          'leaf margin': {
            value: ['Entire'],
          },
          'flower colour': {
            value: ['White', 'Pink', 'Purple', 'Blue'],
          },
          'leaf length': {
            value: ['2-4'],
            unit: 'cm',
          },
          'life span': {
            unit: 'YY',
            value: ['30'],
          },
          'leaf folding': {
            value: ['Revolute'],
          },
          characteristic: {
            value: ['chamaephyte', ' perennial', 'Fibrous root system'],
          },
          'leaf shape': {
            value: ['Acicular'],
          },
          ph: {
            value: ['Neutral', 'Alkaline'],
          },
          climate: {
            value: ['temperate', ' cool'],
          },
          'ph value': {
            unit: 'pH',
            value: ['7-7.8'],
          },
          'soil type': {
            value: ['nutrient poor', 'Well-drained'],
          },
          'leaf texture': {
            value: ['Wooly'],
          },
          exposure: {
            value: ['Full sun'],
          },
          physiology: {
            value: ['Evergreen'],
          },
        },
      },
    ],
  }

  const collection2 = {
    id: '2',
    name: 'Hike',
    description: 'Plants seen along the way',
    count: 11,
    index: 1,
    items: [
      {
        id: 52592,
        iconicTaxon: 'Insecta',
        names: [
          {
            vernacularName: 'Speckled Wood',
            language: 'en',
            wikiSearchTerm:
              'http://en.wikipedia.org/wiki/Speckled_wood_(butterfly)',
          },
        ],
        binomial: 'Pararge aegeria',
        rank: 'species',
        vernacularName: 'Speckled Wood',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/398125894/square.jpeg',
          },
        ],
        image: {
          id: 102255693,
          license_code: 'cc-by-nc',
          attribution:
            '(c) Felipe Hidalgo, some rights reserved (CC BY-NC), uploaded by Felipe Hidalgo',
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/102255693/square.jpg',
          original_dimensions: {
            height: 1200,
            width: 951,
          },
          flags: [],
          square_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/102255693/square.jpg',
          medium_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/102255693/medium.jpg',
        },
      },
      {
        id: 58127,
        iconicTaxon: 'Plantae',
        names: [
          {
            vernacularName: 'Fat-hen',
            language: 'en',
            wikiSearchTerm: 'http://en.wikipedia.org/wiki/Chenopodium_album',
          },
        ],
        binomial: 'Chenopodium album',
        rank: 'species',
        vernacularName: 'Fat-hen',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/394844909/square.jpeg',
          },
        ],
        image: {
          id: 45792371,
          license_code: null,
          attribution:
            '(c) Mandy Rude, all rights reserved, uploaded by Mandy Rude',
          url: 'https://static.inaturalist.org/photos/45792371/square.jpg',
          original_dimensions: {
            height: 2048,
            width: 1536,
          },
          flags: [],
          square_url:
            'https://static.inaturalist.org/photos/45792371/square.jpg',
          medium_url:
            'https://static.inaturalist.org/photos/45792371/medium.jpg',
        },
      },
      {
        id: 55801,
        iconicTaxon: 'Plantae',
        names: [
          {
            vernacularName: 'European Hornbeam',
            language: 'en',
            wikiSearchTerm: 'http://en.wikipedia.org/wiki/Carpinus_betulus',
          },
        ],
        binomial: 'Carpinus betulus',
        rank: 'species',
        vernacularName: 'European Hornbeam',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/391066130/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/391066230/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/391066236/square.jpeg',
          },
        ],
        image: {
          id: 46763976,
          license_code: null,
          attribution:
            '(c) Joao Tiago Tavares, all rights reserved, uploaded by Joao Tiago Tavares',
          url: 'https://static.inaturalist.org/photos/46763976/square.jpeg',
          original_dimensions: {
            height: 1365,
            width: 2048,
          },
          flags: [],
          square_url:
            'https://static.inaturalist.org/photos/46763976/square.jpeg',
          medium_url:
            'https://static.inaturalist.org/photos/46763976/medium.jpeg',
        },
      },
      {
        id: 43151,
        iconicTaxon: 'Mammalia',
        names: [
          {
            vernacularName: 'European Rabbit',
            language: 'en',
            wikiSearchTerm: 'http://en.wikipedia.org/wiki/European_rabbit',
          },
        ],
        binomial: 'Oryctolagus cuniculus',
        rank: 'species',
        vernacularName: 'European Rabbit',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/391063785/square.jpeg',
          },
        ],
        image: {
          id: 479605587,
          license_code: 'cc-by-nc-nd',
          attribution: '(c) fra298, some rights reserved (CC BY-NC-ND)',
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/479605587/square.jpg',
          original_dimensions: {
            height: 1365,
            width: 2048,
          },
          flags: [],
          square_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/479605587/square.jpg',
          medium_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/479605587/medium.jpg',
        },
      },
      {
        id: 121763,
        iconicTaxon: 'Plantae',
        names: [
          {
            vernacularName: 'Sweet Chestnut',
            language: 'en',
            wikiSearchTerm: 'http://en.wikipedia.org/wiki/Castanea_sativa',
          },
        ],
        binomial: 'Castanea sativa',
        rank: 'species',
        vernacularName: 'Sweet Chestnut',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388502816/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388504750/square.jpeg',
          },
        ],
        image: {
          id: 12739074,
          license_code: null,
          attribution:
            '(c) catherwoods, all rights reserved, uploaded by catherwoods',
          url: 'https://static.inaturalist.org/photos/12739074/square.jpg',
          original_dimensions: {
            height: 1536,
            width: 2048,
          },
          flags: [],
          square_url:
            'https://static.inaturalist.org/photos/12739074/square.jpg',
          medium_url:
            'https://static.inaturalist.org/photos/12739074/medium.jpg',
        },
      },
      {
        id: 55801,
        iconicTaxon: 'Plantae',
        names: [
          {
            vernacularName: 'European Hornbeam',
            language: 'en',
            wikiSearchTerm: 'http://en.wikipedia.org/wiki/Carpinus_betulus',
          },
        ],
        binomial: 'Carpinus betulus',
        rank: 'species',
        vernacularName: 'European Hornbeam',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388502806/square.jpeg',
          },
        ],
        image: {
          id: 46763976,
          license_code: null,
          attribution:
            '(c) Joao Tiago Tavares, all rights reserved, uploaded by Joao Tiago Tavares',
          url: 'https://static.inaturalist.org/photos/46763976/square.jpeg',
          original_dimensions: {
            height: 1365,
            width: 2048,
          },
          flags: [],
          square_url:
            'https://static.inaturalist.org/photos/46763976/square.jpeg',
          medium_url:
            'https://static.inaturalist.org/photos/46763976/medium.jpeg',
        },
      },
      {
        id: 56152,
        iconicTaxon: 'Plantae',
        names: [
          {
            vernacularName: 'Ramsons',
            language: 'en',
            wikiSearchTerm: 'https://en.wikipedia.org/wiki/Allium_ursinum',
          },
        ],
        binomial: 'Allium ursinum',
        rank: 'species',
        vernacularName: 'Ramsons',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388502802/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388503894/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388503897/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388503898/square.jpeg',
          },
        ],
        image: {
          id: 10674,
          license_code: 'cc-by',
          attribution: '(c) Ulrika, some rights reserved (CC BY)',
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/square.jpg',
          original_dimensions: {
            height: 2048,
            width: 1533,
          },
          flags: [],
          square_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/square.jpg',
          medium_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/medium.jpg',
        },
      },
      {
        id: 56152,
        iconicTaxon: 'Plantae',
        names: [
          {
            vernacularName: 'Ramsons',
            language: 'en',
            wikiSearchTerm: 'https://en.wikipedia.org/wiki/Allium_ursinum',
          },
        ],
        binomial: 'Allium ursinum',
        rank: 'species',
        vernacularName: 'Ramsons',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386375257/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388504439/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388504498/square.jpeg',
          },
        ],
        image: {
          id: 10674,
          license_code: 'cc-by',
          attribution: '(c) Ulrika, some rights reserved (CC BY)',
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/square.jpg',
          original_dimensions: {
            height: 2048,
            width: 1533,
          },
          flags: [],
          square_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/square.jpg',
          medium_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/medium.jpg',
        },
      },
      {
        id: 61906,
        iconicTaxon: 'Plantae',
        names: [
          {
            vernacularName: 'bristly oxtongue',
            language: 'en',
            wikiSearchTerm:
              'http://en.wikipedia.org/wiki/Helminthotheca_echioides',
          },
        ],
        binomial: 'Helminthotheca echioides',
        rank: 'species',
        vernacularName: 'bristly oxtongue',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386375225/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386377195/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386377196/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386377199/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386377203/square.jpeg',
          },
        ],
        image: {
          id: 231490858,
          license_code: 'cc-by-nc',
          attribution:
            '(c) Σάββας Ζαφειρίου (Savvas Zafeiriou), some rights reserved (CC BY-NC), uploaded by Σάββας Ζαφειρίου (Savvas Zafeiriou)',
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/231490858/square.jpg',
          original_dimensions: {
            height: 1353,
            width: 2048,
          },
          flags: [],
          square_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/231490858/square.jpg',
          medium_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/231490858/medium.jpg',
        },
      },
      {
        id: 51610,
        iconicTaxon: 'Plantae',
        names: [
          {
            vernacularName: 'Germander Speedwell',
            language: 'en',
            wikiSearchTerm: 'http://en.wikipedia.org/wiki/Veronica_chamaedrys',
          },
        ],
        binomial: 'Veronica chamaedrys',
        rank: 'species',
        vernacularName: 'Germander Speedwell',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386372440/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386374107/square.jpeg',
          },
        ],
        image: {
          id: 92414767,
          license_code: null,
          attribution:
            '(c) Mireille Mourzelas, all rights reserved, uploaded by Mireille Mourzelas',
          url: 'https://static.inaturalist.org/photos/92414767/square.jpeg',
          original_dimensions: {
            height: 2048,
            width: 1536,
          },
          flags: [],
          square_url:
            'https://static.inaturalist.org/photos/92414767/square.jpeg',
          medium_url:
            'https://static.inaturalist.org/photos/92414767/medium.jpeg',
        },
      },
      {
        id: 204339,
        iconicTaxon: 'Plantae',
        names: [
          {
            vernacularName: 'yellow archangel',
            language: 'en',
            wikiSearchTerm: 'http://en.wikipedia.org/wiki/Lamium_galeobdolon',
          },
        ],
        binomial: 'Lamium galeobdolon',
        rank: 'species',
        vernacularName: 'yellow archangel',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386372434/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386373403/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386373407/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386373409/square.jpeg',
          },
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386373413/square.jpeg',
          },
        ],
        image: {
          id: 72097716,
          license_code: 'cc-by-nc',
          attribution:
            '(c) Marian Talar, some rights reserved (CC BY-NC), uploaded by Marian Talar',
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/72097716/square.jpg',
          original_dimensions: {
            height: 2008,
            width: 1775,
          },
          flags: [],
          square_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/72097716/square.jpg',
          medium_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/72097716/medium.jpg',
        },
      },
    ],
  }

  return new Promise((resolve, reject) => {
    resolve([collection, collection2])
  })
}
