import { NextCloudImage } from '@/types'
import { CldImage } from 'next-cloudinary'

type Prop = {
  image: NextCloudImage
  imageUrl: string
  handleImageToggle?: (e: React.ChangeEvent<HTMLInputElement>) => void
  showCheckbox?: boolean
}

export const ImageListItemRadio = ({
  image,
  imageUrl,
  handleImageToggle,
  showCheckbox = true,
}: Prop) => {
  const isChecked = image.url === imageUrl

  return (
    <li key={image.url} className="form-row">
      {showCheckbox && (
        <input
          type="radio"
          name="rb-selected-image-url"
          id={image.id}
          value={image.url}
          checked={isChecked}
          onChange={handleImageToggle}
        />
      )}
      <figure className="inat">
        <CldImage
          key={image.url}
          src={image.url || ''}
          width={75}
          height={75}
          alt={image.alt || ''}
          onClick={
            showCheckbox && handleImageToggle
              ? () => {
                  const radioButton = document.getElementById(
                    image.id
                  ) as HTMLInputElement | null
                  if (radioButton && !radioButton.checked) {
                    radioButton.checked = true
                    const syntheticEvent = {
                      target: radioButton,
                      currentTarget: radioButton,
                    } as React.ChangeEvent<HTMLInputElement>
                    handleImageToggle(syntheticEvent)
                  }
                }
              : undefined
          }
          style={showCheckbox ? { cursor: 'pointer' } : undefined}
        />
      </figure>
      <label htmlFor={image.id}>{image.caption}</label>
    </li>
  )
}
