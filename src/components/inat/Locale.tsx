'use client'
import React, { SetStateAction, Dispatch, useState } from 'react'

import { getUserLocales } from '@/api/inat/api'

import { UserLocale } from '@/types'

type Props = {
  userLocale: UserLocale
  setUserLocale: Dispatch<SetStateAction<UserLocale>>
}

export const Locale = ({ userLocale, setUserLocale }: Props) => {
  const [locales] = useState(getUserLocales())

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = locales.find(
      locale => locale.code === e.target.value
    ) as unknown as UserLocale
    console.log('locale', locale)
    setUserLocale(locale)
  }

  return (
    <div className="group-block">
      <fieldset>
        <div className="list-group">
          <h2>Choose the language of species common names</h2>
          <div className="form-row inat">
            <label htmlFor="locale-select">Language</label>

            <select
              id="locale-select"
              value={userLocale.code}
              onChange={handleChange}
            >
              {locales.map(locale => {
                return (
                  <option key={locale.code} value={locale.code}>
                    {locale.language}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
