type Props = {
  onAddProperties: () => void
  isItemsValid: boolean
  isValid: boolean
  message: string
}

export const CollectionExtensions = ({
  onAddProperties,
  isItemsValid,
  isValid,
  message,
}: Props) => {
  return (
    <section aria-labelledby="inaturalist" className="group-block">
      <h2 id="inaturalist">iNaturalist taxa extensions</h2>
      <div className="column-group">
        <div>Add iNaturalist properties to your species, including images</div>
        <div className="form-row">
          <button
            id="add-inat-props"
            onClick={onAddProperties}
            disabled={!isItemsValid}
          >
            Add iNaturalist properties
          </button>
          <div className={isValid ? 'correct' : 'incorrect'}>{message}</div>
        </div>
      </div>
    </section>
  )
}
