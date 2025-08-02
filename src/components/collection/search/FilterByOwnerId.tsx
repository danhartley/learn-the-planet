'use client'
import { useEffect, Dispatch, SetStateAction } from 'react'

import { useSession } from 'next-auth/react'

type Props = {
  ownerId: string | undefined
  setOwnerId: Dispatch<SetStateAction<string | undefined>>
  setShowOnlyByOwner: Dispatch<SetStateAction<boolean>>
}

export const FilterByOwnerId = ({
  ownerId,
  setOwnerId,
  setShowOnlyByOwner,
}: Props) => {
  const { data: session } = useSession()

  useEffect(() => {
    setOwnerId(session?.user?.id)
  }, [setOwnerId, session?.user?.id])

  const handleSelectOwnership = (e: React.FormEvent) => {
    const ownership = (e.target as HTMLInputElement).value
    setShowOnlyByOwner(ownership === 'byOwner')
  }

  return (
    <div className="group-block">
      {ownerId ? (
        <div className="group">
          <div>Collections by owner</div>
          <div className="form-row">
            <ul className="list-group">
              <li>
                <div>
                  <input
                    id="rb-by-owner-true"
                    type="radio"
                    value="byOwner"
                    name="rb-by-owner"
                    onClick={handleSelectOwnership}
                  />
                  <label htmlFor="rb-by-owner-true">Your collections</label>
                </div>
                <div>
                  <input
                    id="rb-by-owner-false"
                    type="radio"
                    value="all"
                    name="rb-by-owner"
                    onClick={handleSelectOwnership}
                  />
                  <label htmlFor="rb-by-owner-false">All collections</label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>You have to be logged in to view only your collections.</div>
      )}
    </div>
  )
}
