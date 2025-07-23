export const LoadingCard = () => (
  <li>
    <section className="card" aria-labelledby="loading-card">
      <div
        className="collection-image"
        style={{
          height: '160px',
          width: '224px',
        }}
      >
        {''}
      </div>
      <div className="list-group">
        <h3>{''}</h3>
        <div className="collection-metadata"></div>
        <div className="breadcrumb" />
      </div>
      <div></div>
    </section>
  </li>
)

export const generateLoadingCards = (count = 5) =>
  Array.from({ length: count }, (_, index) => (
    <LoadingCard key={`loading-${index}`} />
  ))
