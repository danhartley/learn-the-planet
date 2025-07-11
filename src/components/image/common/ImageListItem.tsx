import { NextCloudImage } from '@/types'
import { CldImage } from 'next-cloudinary'

type Prop = {
  image: NextCloudImage
  handleImageToggle?: (e: React.ChangeEvent<HTMLInputElement>) => void
  showCheckbox?: boolean
}

export const ImageListItem = ({
  image,
  handleImageToggle,
  showCheckbox = true,
}: Prop) => {
  return (
    <li key={image.src} className="form-row">
      {showCheckbox && (
        <input
          type="checkbox"
          name={image.id}
          id={image.id}
          value={image.src}
          onChange={handleImageToggle}
        />
      )}
      <CldImage
        key={image.src}
        src={image.src}
        width={75}
        height={75}
        alt={image.alt || ''}
        onClick={
          showCheckbox && handleImageToggle
            ? () => {
                const checkbox = document.getElementById(
                  image.id
                ) as HTMLInputElement | null
                if (checkbox) {
                  checkbox.checked = !checkbox.checked
                  const syntheticEvent = {
                    target: checkbox,
                    currentTarget: checkbox,
                  } as React.ChangeEvent<HTMLInputElement>
                  handleImageToggle(syntheticEvent)
                }
              }
            : undefined
        }
        style={showCheckbox ? { cursor: 'pointer' } : undefined}
      />
      <label htmlFor={image.id}>{image.caption}</label>
    </li>
  )
}
