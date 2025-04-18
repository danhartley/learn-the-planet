import { expect } from 'vitest'
import {
  isCamelCase,
  splitCamelCaseSmart,
  getPropByPath,
  sortBy,
  sortAlphabeticallyBy,
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
