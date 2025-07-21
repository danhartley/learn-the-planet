// Questions

export type MultipleChoiceOption = {
  key: string
  value: string | Image | undefined
}

export type MultipleSelectOption = {
  key: string
  value: string[]
}

export type QuestionType = 'Multiple choice' | 'Text entry' | 'Multiple select'

export type MultipleChoiceQuestion = {
  type: QuestionType
  key: string
  text: string
  options: MultipleChoiceOption[]
}

export type TextEntryQuestion = {
  type: QuestionType
  key: string
  text: string
  hint?: string
  contentType?: string
}

export type MultipleSelectQuestion = {
  type: QuestionType
  key: string | string[]
  text: string
  options: string[]
}

export type Question =
  | MultipleChoiceQuestion
  | TextEntryQuestion
  | MultipleSelectQuestion

export type Score = {
  isCorrect: boolean
  questionCount: number
  correctCount: number
  incorrectCount: number
}

export type Test = {
  question: Question
  answer: string
}

// Collections and taxon items

export type Image = {
  id: number
  url: string
  licenceCode?: string
  mediumUrl?: string
  squareUrl?: string
  attribution?: string
  attributionName?: string
}

export type NextCloudImage = {
  id: string
  src: string
  url?: string
  width?: number
  height?: number
  alt?: string
  sizes?: string
  caption: string
}

export type CloudImage = {
  asset_id: string
  public_id: string
  display_name?: string
  secure_url?: string
}

export type NextCloudImageTagType = 'collection' | 'user'

export type Family = {
  genera?: number
  members?: string[]
  names: string[]
  summary?: string
  species?: number
  identification?: string
  taxon?: string
  traits?: {
    pollination?: { value: string[] }
    'leaf arrangement'?: { value: string[] }
    inflorescence?: { value: string[] }
    'petal count'?: { value: string[] }
    'fruit type'?: { value: string[] }
  }
  wiki?: string
  eol?: string
  name?: string
  iconicTaxon?: string
  taxonomy?: {
    phylum: string
    class: string
    kingdom: string
    order: string
  }
  vernacularName?: string
}

export interface LearningItem {
  id: string
  distractors?: unknown[]
}

export interface Taxon extends LearningItem {
  iconicTaxon?: string
  names?: {
    vernacularName?: string
    language?: string
    wikiSearchTerm?: string
  }[]
  binomial: string
  rank?: string
  order?: string
  genus?: string
  species?: string
  vernacularName: string
  family?: string | Family | undefined
  images?: Image[]
  image?: Image
  taxonomy?: {
    phylum?: string
    family?: string | Family
    class?: string
    kingdom?: string
    order?: string
    genus?: string
    species?: string
  }
  traits?: Record<string, unknown>
  observationURL?: string
  wikipediaUrl?: string
  inaturalistUrl?: string
  ancestorIds?: number[]
}

export interface Term extends LearningItem {
  term: string
  definition: string
  source?: string
  example?: string
  images?: NextCloudImage[]
}

export interface Trait extends LearningItem {
  trait: string
  source?: {
    name?: string
    url?: string
  }
  definition: string
  morphology?: string[]
  phenology?: string[]
  examples?: Taxon[]
}

export type CollectionSummary = {
  id?: string
  shortId?: string
  type: string
  name: string
  slug: string
  date?: string
  location?: string
  itemCount: number
  imageUrl?: string
  status: CollectionStatus
  ownerId: string
}

export type Credit = {
  title?: string
  source?: string
  authors?: string[]
}

export type TextType = 'aside' | 'article'

export interface Topic extends LearningItem {
  text?: string[]
  topic?: string
  credit?: Credit
  type?: TextType
  examples?: Taxon[]
  images?: NextCloudImage[]
}

export type Collection<T> = {
  id?: string
  shortId?: string
  type: ContentHandlerType
  name: string
  slug: string
  date?: string
  location?: string
  fieldNotes?: {
    url: string
  }
  items?: T[]
  itemCount: number
  collections?: CollectionSummary[]
  author?: Credit
  imageUrl?: string
  imageSrc?: string
  sectionOrder: string[]
  ownerId: string
}

export type GroupedCollectionSummaries = {
  [K in ContentHandlerType]: CollectionSummary[]
}

export type Layout<T> = {
  id: string
  level: string
  index: number
  question: Question
  distractorType?: DistractorType
  collection: Collection<T>
  item: T
  isActive: boolean
}

export type TestState = {
  layoutIndex: number
  collectionIndex: number
  layoutCount: number
  isEndOfTest: boolean
}

export type TestPlan<T> = {
  id: string
  collection: Collection<T>
  state: TestState
  score: Score
  layouts: Layout<T>[]
}

export type QuestionTemplateType =
  | 'multipleChoice'
  | 'textEntry'
  | 'multiSelect'

export type QuestionTemplateSelection = {
  type: QuestionTemplateType
  isSelected: boolean
}

interface BaseQuestionTemplate {
  type: QuestionTemplateType
  level: string
  questionTextTemplate: string // Uses ${property} syntax for interpolation
  contentType?: string
}

export type TestConfig = {
  questionTemplateSelections: QuestionTemplateSelection[]
}

export type DistractorType =
  | 'vernacularName'
  | 'binomial'
  | 'genus'
  | 'species'
  | 'image'
  | 'term'
  | 'trait'
  | 'name'
  | 'description'
  | 'definition'
  | 'morphology'
  | 'phenology'

export interface MultipleChoiceTemplate extends BaseQuestionTemplate {
  type: 'multipleChoice'
  correctAnswerProperty: string // Property path on Taxon to get correct answer
  distractorCount: number
  distractorType: DistractorType
}

export interface TextEntryTemplate extends BaseQuestionTemplate {
  type: 'textEntry'
  correctAnswerProperty: string
  placeholder: string
}

export interface MultiSelectTemplate extends BaseQuestionTemplate {
  type: 'multiSelect'
  correctAnswerProperty: string
  distractorCount: number
  distractorType: DistractorType
}

export type QuestionTemplate =
  | MultipleChoiceTemplate
  | TextEntryTemplate
  | MultiSelectTemplate /* other types */

export interface ContentTypeHandler<T> {
  // Transform items into questions based on templates
  createQuestions(
    collection: Collection<T>,
    item: T,
    templates: QuestionTemplate[]
  ): Question[]

  // Generate distractors for this content type
  generateDistractors(
    collection: Collection<T>,
    item: T,
    count: number,
    distractorType: DistractorType
  ): unknown[]

  // Validate answers for this content type
  validateAnswer(question: Question, answer: string | string[]): boolean
}

export type ContentHandlerType = 'taxon' | 'term' | 'topic' | 'trait'

export type HistoryItem<T> = {
  id: string
  isCorrect: boolean
  item: T | undefined
  question: string | undefined
  type: QuestionType | undefined
  answer: string | string[] | undefined
  layoutId: string
}

export type TestStrategy =
  | 'repeat-failed-questions-only'
  | 'repeat-the-test-in-full'

export const isDefined = <T>(value: T | undefined): value is T =>
  value !== undefined

export type Operation =
  | 'create'
  | 'read'
  | 'update'
  | 'linked-collections'
  | 'update-items'
  | 'add-item'
  | 'add-raw-data'
  | 'edit-state'
  | 'upload-images'

export type ContentType = {
  key: string
  value: ContentHandlerType
  description?: string
}

export interface ValidationResult<LearningItem> {
  isValid: boolean
  parsedData?: LearningItem[]
  errors: string[]
}

export type ApiResponse = {
  success: boolean
  message: string
}

export type UpdateCollectionFieldsOptions = {
  name: string
  slug: string
  imageUrl?: string
  date?: string
  location?: string
  author?: Credit
}

export type CollectionStatus = 'private' | 'public'

export type TopicSectionType = 'text' | 'image' | 'taxon' | 'credit'
export type TraitSectionType = 'morphology' | 'phenology' | 'taxon'

export type SectionTypeOption = {
  key: TopicSectionType | TraitSectionType
  value: string
  description: string
}

export type SessionState = {
  user: {
    id: string
    name: string
    email: string
    image: string
    emailVerified?: boolean
  }
  id: string
  sessionToken: string
  userId: string
  expires: string
}

export interface CloudinaryResource {
  public_id: string
  format: string
  version: number
  resource_type: string
  type: string
  created_at: string
  bytes: number
  width: number
  height: number
  url: string
  secure_url: string
}

export interface ImageResponse {
  success: boolean
  data?: CloudinaryResource | CloudinaryResource[]
  error?: string
  pagination?: {
    next_cursor?: string
    total_count?: number
  }
}

export type IconicTaxon =
  | 'plantae'
  | 'insecta'
  | 'mammalia'
  | 'reptilia'
  | 'aves'
  | 'amphibia'
  | 'actinopterygii'
  | 'mollusca'
  | 'fungi'
  | 'animalia'
  | 'arachnida'

export type inatPhoto = {
  id: number
  license_code: string
  attribution: string
  url: string
  attribution_name: string
  square_url: string
  medium_url: string
}

export type iNaturalistTaxon = {
  id: string
  rank: string
  iconic_taxon_name: string
  name: string
  default_photo?: inatPhoto
  observations_count: number
  taxon_photos: []
  wikipedia_url: string
  preferred_common_name: string
  english_common_name: string
  ancestor_ids: number[]
}
