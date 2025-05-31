import { expect } from 'vitest'
import {
  isCamelCase,
  splitCamelCaseSmart,
  getPropByPath,
  sortBy,
  sortAlphabeticallyBy,
  formatHyphenatedString,
  shuffle,
  getRandomItems,
  containsSourceInTargetArray,
  formatCamelCase,
  parseSlugShortId,
  createSlugShortId,
  extractShortId,
  extractSlug,
} from '@/utils/strings'

describe('Check for camel case', () => {
  it('should return true or false', () => {
    expect(isCamelCase('vernacularName')).toEqual(true)
    expect(isCamelCase('Genus species')).toEqual(false)
  })
})

describe('Split camel case', () => {
  it('should return split string', () => {
    expect(splitCamelCaseSmart('vernacularName')).toEqual('vernacular name')
  })
})

describe('getPropByPath', () => {
  it('should return undefined for null or undefined objects', () => {
    expect(getPropByPath(null, 'any.path')).toBeUndefined()
    expect(getPropByPath(undefined, 'any.path')).toBeUndefined()
  })

  it('should access simple properties without dots or brackets', () => {
    const obj = { name: 'John', age: 30 }

    expect(getPropByPath(obj, 'name')).toBe('John')
    expect(getPropByPath(obj, 'age')).toBe(30)
    expect(getPropByPath(obj, 'nonExistent')).toBeUndefined()
  })

  it('should access nested properties using dot notation', () => {
    const obj = {
      user: {
        info: {
          name: 'John',
          contact: {
            email: 'john@example.com',
          },
        },
      },
    }

    expect(getPropByPath(obj, 'user.info.name')).toBe('John')
    expect(getPropByPath(obj, 'user.info.contact.email')).toBe(
      'john@example.com'
    )
    expect(getPropByPath(obj, 'user.info.nonExistent')).toBeUndefined()
    expect(getPropByPath(obj, 'user.nonExistent.property')).toBeUndefined()
  })

  it('should access array elements using bracket notation', () => {
    const obj = {
      users: ['John', 'Jane', 'Bob'],
    }

    expect(getPropByPath(obj, 'users[0]')).toBe('John')
    expect(getPropByPath(obj, 'users[1]')).toBe('Jane')
    expect(getPropByPath(obj, 'users[2]')).toBe('Bob')
    expect(getPropByPath(obj, 'users[3]')).toBeUndefined()
  })

  it('should access nested array elements', () => {
    const obj = {
      data: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ],
    }

    expect(getPropByPath(obj, 'data[0].id')).toBe(1)
    expect(getPropByPath(obj, 'data[0].name')).toBe('John')
    expect(getPropByPath(obj, 'data[1].id')).toBe(2)
    expect(getPropByPath(obj, 'data[1].name')).toBe('Jane')
  })

  it('should access deeply nested array elements', () => {
    const obj = {
      departments: [
        {
          name: 'Engineering',
          teams: [
            {
              name: 'Frontend',
              members: [{ name: 'John', role: 'Developer' }],
            },
          ],
        },
      ],
    }

    expect(getPropByPath(obj, 'departments[0].teams[0].members[0].name')).toBe(
      'John'
    )
    expect(getPropByPath(obj, 'departments[0].teams[0].members[0].role')).toBe(
      'Developer'
    )
  })

  it('should handle invalid array indexes', () => {
    const obj = {
      users: ['John', 'Jane'],
    }

    expect(getPropByPath(obj, 'users[-1]')).toBeUndefined()
    expect(getPropByPath(obj, 'users[999]')).toBeUndefined()
    expect(getPropByPath(obj, 'users[abc]')).toBeUndefined() // NaN index
  })

  it('should handle non-array objects with bracket notation', () => {
    const obj = {
      user: 'John',
    }

    expect(getPropByPath(obj, 'user[0]')).toBeUndefined()
  })

  it('should handle complex mixed paths', () => {
    const obj = {
      users: [
        {
          name: 'John',
          addresses: [
            { type: 'home', city: 'New York' },
            { type: 'work', city: 'Boston' },
          ],
        },
        {
          name: 'Jane',
          addresses: [{ type: 'home', city: 'Los Angeles' }],
        },
      ],
      settings: {
        darkMode: true,
        notifications: {
          email: true,
          sms: false,
        },
      },
    }

    expect(getPropByPath(obj, 'users[0].addresses[1].city')).toBe('Boston')
    expect(getPropByPath(obj, 'users[1].addresses[0].city')).toBe('Los Angeles')
    expect(getPropByPath(obj, 'settings.notifications.email')).toBe(true)
  })

  it('should handle paths with special characters in key names', () => {
    const obj = {
      'user-name': 'John',
      contact: {
        'email-address': 'john@example.com',
      },
    }

    expect(getPropByPath(obj, 'user-name')).toBe('John')
    expect(getPropByPath(obj, 'contact.email-address')).toBe('john@example.com')
  })
})

interface TestItem {
  id: number
  name: string
  value: number
  priority: string
}

describe('sortBy', () => {
  it('should sort an array numerically by a given property in ascending order', () => {
    const items: TestItem[] = [
      { id: 3, name: 'item3', value: 30, priority: 'high' },
      { id: 1, name: 'item1', value: 10, priority: 'low' },
      { id: 2, name: 'item2', value: 20, priority: 'medium' },
    ]

    const sorted = sortBy(items, 'id')

    expect(sorted).toEqual([
      { id: 1, name: 'item1', value: 10, priority: 'low' },
      { id: 2, name: 'item2', value: 20, priority: 'medium' },
      { id: 3, name: 'item3', value: 30, priority: 'high' },
    ])
  })

  it('should sort an array numerically by a given property in descending order', () => {
    const items: TestItem[] = [
      { id: 3, name: 'item3', value: 30, priority: 'high' },
      { id: 1, name: 'item1', value: 10, priority: 'low' },
      { id: 2, name: 'item2', value: 20, priority: 'medium' },
    ]

    const sorted = sortBy(items, 'value', 'desc')

    expect(sorted).toEqual([
      { id: 3, name: 'item3', value: 30, priority: 'high' },
      { id: 2, name: 'item2', value: 20, priority: 'medium' },
      { id: 1, name: 'item1', value: 10, priority: 'low' },
    ])
  })

  it('should handle empty arrays', () => {
    const emptyArray: TestItem[] = []

    const sortedAsc = sortBy(emptyArray, 'id')
    const sortedDesc = sortBy(emptyArray, 'id', 'desc')

    expect(sortedAsc).toEqual([])
    expect(sortedDesc).toEqual([])
  })

  it('should handle arrays with one item', () => {
    const singleItem: TestItem[] = [
      { id: 1, name: 'item1', value: 10, priority: 'low' },
    ]

    const sortedAsc = sortBy(singleItem, 'id')
    const sortedDesc = sortBy(singleItem, 'id', 'desc')

    expect(sortedAsc).toEqual(singleItem)
    expect(sortedDesc).toEqual(singleItem)
  })

  it('should handle arrays with identical property values', () => {
    const items: TestItem[] = [
      { id: 1, name: 'item1', value: 10, priority: 'low' },
      { id: 1, name: 'item2', value: 20, priority: 'medium' },
      { id: 1, name: 'item3', value: 30, priority: 'high' },
    ]

    const sorted = sortBy(items, 'id')

    // With identical values, order might be preserved or not, but the length should be the same
    expect(sorted.length).toBe(items.length)
    sorted.forEach(item => {
      expect(item.id).toBe(1)
    })
  })
})

describe('sortAlphabeticallyBy', () => {
  it('should sort an array alphabetically by a given string property', () => {
    const items: TestItem[] = [
      { id: 3, name: 'banana', value: 30, priority: 'high' },
      { id: 1, name: 'apple', value: 10, priority: 'low' },
      { id: 2, name: 'cherry', value: 20, priority: 'medium' },
    ]

    const sorted = sortAlphabeticallyBy(items, 'name')

    expect(sorted).toEqual([
      { id: 1, name: 'apple', value: 10, priority: 'low' },
      { id: 3, name: 'banana', value: 30, priority: 'high' },
      { id: 2, name: 'cherry', value: 20, priority: 'medium' },
    ])
  })

  it('should handle case sensitivity correctly', () => {
    const items: TestItem[] = [
      { id: 3, name: 'Banana', value: 30, priority: 'high' },
      { id: 1, name: 'apple', value: 10, priority: 'low' },
      { id: 2, name: 'Cherry', value: 20, priority: 'medium' },
    ]

    const sorted = sortAlphabeticallyBy(items, 'name')

    // In standard string comparison, uppercase comes before lowercase
    expect(sorted).toEqual([
      { id: 3, name: 'Banana', value: 30, priority: 'high' },
      { id: 2, name: 'Cherry', value: 20, priority: 'medium' },
      { id: 1, name: 'apple', value: 10, priority: 'low' },
    ])
  })

  it('should sort an array alphabetically by a different string property', () => {
    const items: TestItem[] = [
      { id: 3, name: 'item3', value: 30, priority: 'high' },
      { id: 1, name: 'item1', value: 10, priority: 'low' },
      { id: 2, name: 'item2', value: 20, priority: 'medium' },
    ]

    const sorted = sortAlphabeticallyBy(items, 'priority')

    expect(sorted).toEqual([
      { id: 3, name: 'item3', value: 30, priority: 'high' },
      { id: 1, name: 'item1', value: 10, priority: 'low' },
      { id: 2, name: 'item2', value: 20, priority: 'medium' },
    ])
  })

  it('should handle empty arrays', () => {
    const emptyArray: TestItem[] = []

    const sorted = sortAlphabeticallyBy(emptyArray, 'name')

    expect(sorted).toEqual([])
  })

  it('should handle arrays with one item', () => {
    const singleItem: TestItem[] = [
      { id: 1, name: 'item1', value: 10, priority: 'low' },
    ]

    const sorted = sortAlphabeticallyBy(singleItem, 'name')

    expect(sorted).toEqual(singleItem)
  })

  it('should handle arrays with identical property values', () => {
    const items: TestItem[] = [
      { id: 3, name: 'same', value: 30, priority: 'high' },
      { id: 1, name: 'same', value: 10, priority: 'low' },
      { id: 2, name: 'same', value: 20, priority: 'medium' },
    ]

    const sorted = sortAlphabeticallyBy(items, 'name')

    // With identical values, order might be preserved or not, but the length should be the same
    expect(sorted.length).toBe(items.length)
    sorted.forEach(item => {
      expect(item.name).toBe('same')
    })
  })

  it('should handle special characters and numbers in strings', () => {
    const items: TestItem[] = [
      { id: 3, name: '123', value: 30, priority: 'high' },
      { id: 1, name: 'abc', value: 10, priority: 'low' },
      { id: 2, name: '!@#', value: 20, priority: 'medium' },
    ]

    const sorted = sortAlphabeticallyBy(items, 'name')

    // Special characters typically come before numbers, which come before letters
    expect(sorted).toEqual([
      { id: 2, name: '!@#', value: 20, priority: 'medium' },
      { id: 3, name: '123', value: 30, priority: 'high' },
      { id: 1, name: 'abc', value: 10, priority: 'low' },
    ])
  })
})

// Tests using Vitest
describe('formatHyphenatedString', () => {
  test('converts hyphenated string to title case format', () => {
    expect(formatHyphenatedString('repeat-failed-questions-only')).toBe(
      'Repeat failed questions only'
    )
  })

  test('handles single word', () => {
    expect(formatHyphenatedString('test')).toBe('Test')
  })

  test('handles empty string', () => {
    expect(formatHyphenatedString('')).toBe('')
  })

  test('handles multiple hyphens', () => {
    expect(formatHyphenatedString('this-is-a-test-string')).toBe(
      'This is a test string'
    )
  })

  test('preserves existing capitalization', () => {
    expect(formatHyphenatedString('camelCase-testString-example')).toBe(
      'CamelCase testString example'
    )
  })

  test('handles string with leading hyphen', () => {
    expect(formatHyphenatedString('-leading-hyphen')).toBe(' leading hyphen')
  })

  test('handles string with trailing hyphen', () => {
    expect(formatHyphenatedString('trailing-hyphen-')).toBe('Trailing hyphen ')
  })

  test('handles string with consecutive hyphens', () => {
    expect(formatHyphenatedString('multiple--consecutive---hyphens')).toBe(
      'Multiple  consecutive   hyphens'
    )
  })
})

describe('shuffle', () => {
  it('should return [] for empty array', () => {
    expect(shuffle([])).toEqual([])
  })
})

describe('getRandomItems', () => {
  it('should return [] for empty array', () => {
    expect(getRandomItems([])).toEqual([])
  })
  it('should return array with one item for single item array', () => {
    expect(getRandomItems(['single item'])).toEqual(['single item'])
    expect(getRandomItems(['item one'], 3)).toEqual(['item one'])
  })
  it('should return number of requested items where available', () => {
    expect(getRandomItems(['item one', 'item two'], 2, false)).toEqual([
      'item one',
      'item two',
    ])
    expect(getRandomItems(['item one', 'item two'], 3, false)).toEqual([
      'item one',
      'item two',
    ])
    expect(getRandomItems(['item one', 'item two'], 4, false)).toEqual([
      'item one',
      'item two',
    ])
  })
  // Test length of returned array
  it('should return the correct number of items', () => {
    const array = ['a', 'b', 'c', 'd', 'e']
    expect(getRandomItems(array, 3).length).toBe(3)
  })

  // Test that returned items are from the original array
  it('should return items from the original array', () => {
    const array = ['a', 'b', 'c', 'd', 'e']
    const result = getRandomItems(array, 3)
    result.forEach(item => {
      expect(array).toContain(item)
    })
  })

  // Test that all items are unique
  it('should return unique items', () => {
    const array = ['a', 'b', 'c', 'd', 'e']
    const result = getRandomItems(array, 3)
    const uniqueItems = new Set(result)
    expect(uniqueItems.size).toBe(result.length)
  })

  // Test forcing randomization
  it('should shuffle items when forceRandom is true', () => {
    // This is inherently flaky since randomness could theoretically return the original order
    // Run multiple times to reduce likelihood of false passes
    let atLeastOneShuffled = false
    for (let i = 0; i < 10; i++) {
      const result = getRandomItems(['a', 'b', 'c', 'd'], 4, true)
      if (result.join('') !== 'abcd') {
        atLeastOneShuffled = true
        break
      }
    }
    expect(atLeastOneShuffled).toBe(true)
  })
})

describe('containsSourceInTargetArray', () => {
  it('should return false when source array is empty', () => {
    expect(containsSourceInTargetArray([], [])).toBe(false)
  })
  it('should return false when source array is greater than target array', () => {
    expect(containsSourceInTargetArray(['one', 'two'], ['one'])).toBe(false)
  })
  it('should return true when source members are all in target array', () => {
    expect(containsSourceInTargetArray(['one', 'two'], ['one', 'two'])).toBe(
      true
    )
  })
  it('should return false when not all source members are in target array', () => {
    expect(containsSourceInTargetArray(['one', 'three'], ['one', 'two'])).toBe(
      false
    )
  })
})

describe('formatCamelCase', () => {
  it('should return no change for standard text, capitalised', () => {
    expect(formatCamelCase('standard text')).toBe('Standard text')
  })
  it('should return standard text, capitalised for camel cased text', () => {
    expect(formatCamelCase('camelCaseText')).toBe('Camel case text')
  })
})

describe('parseSlugShortId', () => {
  it('should parse simple slug-shortId correctly', () => {
    const result = parseSlugShortId('simple-abc123')
    expect(result).toEqual({
      slug: 'simple',
      shortId: 'abc123',
    })
  })

  it('should parse slug with multiple dashes correctly', () => {
    const result = parseSlugShortId('test-topic-cd787506')
    expect(result).toEqual({
      slug: 'test-topic',
      shortId: 'cd787506',
    })
  })

  it('should parse complex multi-part slug correctly', () => {
    const result = parseSlugShortId('multi-part-slug-name-xyz789')
    expect(result).toEqual({
      slug: 'multi-part-slug-name',
      shortId: 'xyz789',
    })
  })

  it('should handle slug with numbers and shortId with letters', () => {
    const result = parseSlugShortId('product-123-category-456-abcdef')
    expect(result).toEqual({
      slug: 'product-123-category-456',
      shortId: 'abcdef',
    })
  })

  it('should return null for empty string', () => {
    const result = parseSlugShortId('')
    expect(result).toBeNull()
  })

  it('should return null for string without dashes', () => {
    const result = parseSlugShortId('nodashes')
    expect(result).toBeNull()
  })

  it('should return null for string starting with dash', () => {
    const result = parseSlugShortId('-invalid')
    expect(result).toBeNull()
  })

  it('should return null for string ending with dash', () => {
    const result = parseSlugShortId('invalid-')
    expect(result).toBeNull()
  })

  it('should return null for string with only dashes', () => {
    const result = parseSlugShortId('---')
    expect(result).toBeNull()
  })

  it('should return null for null input', () => {
    const result = parseSlugShortId(null)
    expect(result).toBeNull()
  })

  it('should return null for undefined input', () => {
    const result = parseSlugShortId(undefined)
    expect(result).toBeNull()
  })

  it('should return null for non-string input', () => {
    const result = parseSlugShortId(123)
    expect(result).toBeNull()
  })

  it('should handle single character parts', () => {
    const result = parseSlugShortId('a-b')
    expect(result).toEqual({
      slug: 'a',
      shortId: 'b',
    })
  })
})

describe('createSlugShortId', () => {
  it('should create slug-shortId string correctly', () => {
    const result = createSlugShortId('test-topic', 'cd787506')
    expect(result).toBe('test-topic-cd787506')
  })

  it('should create simple slug-shortId string', () => {
    const result = createSlugShortId('simple', 'abc123')
    expect(result).toBe('simple-abc123')
  })

  it('should handle slug with multiple dashes', () => {
    const result = createSlugShortId('multi-part-slug', 'xyz789')
    expect(result).toBe('multi-part-slug-xyz789')
  })

  it('should throw error for empty slug', () => {
    expect(() => createSlugShortId('', 'abc123')).toThrow(
      'Both slug and shortId are required'
    )
  })

  it('should throw error for empty shortId', () => {
    expect(() => createSlugShortId('test', '')).toThrow(
      'Both slug and shortId are required'
    )
  })

  it('should throw error for null slug', () => {
    expect(() => createSlugShortId(null, 'abc123')).toThrow(
      'Both slug and shortId are required'
    )
  })

  it('should throw error for null shortId', () => {
    expect(() => createSlugShortId('test', null)).toThrow(
      'Both slug and shortId are required'
    )
  })
})

describe('extractShortId', () => {
  it('should extract shortId from simple slug-shortId', () => {
    const result = extractShortId('simple-abc123')
    expect(result).toBe('abc123')
  })

  it('should extract shortId from complex slug-shortId', () => {
    const result = extractShortId('test-topic-cd787506')
    expect(result).toBe('cd787506')
  })

  it('should extract shortId from multi-part slug', () => {
    const result = extractShortId('multi-part-slug-name-xyz789')
    expect(result).toBe('xyz789')
  })

  it('should return null for invalid input', () => {
    const result = extractShortId('invalid')
    expect(result).toBeNull()
  })

  it('should return null for empty string', () => {
    const result = extractShortId('')
    expect(result).toBeNull()
  })

  it('should return null for string ending with dash', () => {
    const result = extractShortId('invalid-')
    expect(result).toBeNull()
  })
})

describe('extractSlug', () => {
  it('should extract slug from simple slug-shortId', () => {
    const result = extractSlug('simple-abc123')
    expect(result).toBe('simple')
  })

  it('should extract slug from complex slug-shortId', () => {
    const result = extractSlug('test-topic-cd787506')
    expect(result).toBe('test-topic')
  })

  it('should extract slug from multi-part slug', () => {
    const result = extractSlug('multi-part-slug-name-xyz789')
    expect(result).toBe('multi-part-slug-name')
  })

  it('should return null for invalid input', () => {
    const result = extractSlug('invalid')
    expect(result).toBeNull()
  })

  it('should return null for empty string', () => {
    const result = extractSlug('')
    expect(result).toBeNull()
  })

  it('should return null for string starting with dash', () => {
    const result = extractSlug('-invalid')
    expect(result).toBeNull()
  })
})

describe('round-trip functionality', () => {
  it('should maintain consistency between parse and create functions', () => {
    const original = 'test-topic-cd787506'
    const parsed = parseSlugShortId(original)

    expect(parsed).not.toBeNull()

    if (parsed) {
      const recreated = createSlugShortId(parsed.slug, parsed.shortId)
      expect(recreated).toBe(original)
    }
  })

  it('should work with complex multi-part slugs', () => {
    const original = 'very-complex-multi-part-slug-name-abc123def'
    const parsed = parseSlugShortId(original)

    expect(parsed).not.toBeNull()

    if (parsed) {
      const recreated = createSlugShortId(parsed.slug, parsed.shortId)
      expect(recreated).toBe(original)
    }
  })
})

describe('edge cases', () => {
  it('should handle slug with special characters before shortId', () => {
    const result = parseSlugShortId('my-awesome_project-abc123')
    expect(result).toEqual({
      slug: 'my-awesome_project',
      shortId: 'abc123',
    })
  })

  it('should handle shortId with mixed alphanumeric characters', () => {
    const result = parseSlugShortId('project-abc123def456')
    expect(result).toEqual({
      slug: 'project',
      shortId: 'abc123def456',
    })
  })

  it('should handle very long slugs', () => {
    const longSlug = 'this-is-a-very-long-slug-with-many-parts-and-dashes'
    const shortId = 'xyz789'
    const combined = `${longSlug}-${shortId}`

    const result = parseSlugShortId(combined)
    expect(result).toEqual({
      slug: longSlug,
      shortId: shortId,
    })
  })
})
