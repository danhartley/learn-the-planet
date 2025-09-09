'use client'
import React, { useState, useEffect } from 'react'

import Image from 'next/image'

import { taxonUrls } from '@/api/phylopic/api'

import { IconicTaxon } from '@/types'

export const RotatingTaxonIcons = () => {
  const iconicTaxa = Object.keys(taxonUrls)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % iconicTaxa.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [iconicTaxa.length])

  const currentTaxon = iconicTaxa[currentIndex]

  return (
    <div className="iconic-taxon rotate">
      <Image
        key={currentTaxon}
        src={taxonUrls[currentTaxon as IconicTaxon]?.icon}
        alt={`${currentTaxon} icon, credit to ${taxonUrls[currentTaxon as IconicTaxon]?.credit}`}
        width={0}
        height={0}
        style={{
          width: '40px',
          height: 'auto', // This maintains aspect ratio
        }}
      />
    </div>
  )
}

export default RotatingTaxonIcons
