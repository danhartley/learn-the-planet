'use client'
import React, { SetStateAction, Dispatch, useState } from 'react'

import { getUserLocales } from '@/api/inat/api'

import { UserLocale, ExtendedContentHandlerType } from '@/types'

type Props = {
  userLocale: UserLocale
  setUserLocale: Dispatch<SetStateAction<UserLocale>>
  type?: ExtendedContentHandlerType
}

export const LocaleSelector = ({
  userLocale,
  setUserLocale,
  type = 'inat' as unknown as ExtendedContentHandlerType,
}: Props) => {
  const [locales] = useState(getUserLocales())
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = locales.find(
      locale => locale.code === e.target.value
    ) as unknown as UserLocale
    setUserLocale(locale)
  }

  return (
    <div className="list-group">
      <h3>
        <label htmlFor="locale-select">Language</label>
      </h3>
      <div className={`form-row ${type}`}>
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
  )
}

export const Locale = ({ userLocale, setUserLocale }: Props) => {
  return (
    <div className="group-block">
      <fieldset>
        <div className="list-group">
          <h2>Choose the language of species common names</h2>
          <LocaleSelector
            userLocale={userLocale}
            setUserLocale={setUserLocale}
          />
        </div>
      </fieldset>
    </div>
  )
}
