export default function PageHero({ kicker, title, lead }) {
  return (
    <section className="page-hero">
      <div className="container">
        {kicker && <span className="kicker" style={{ color: '#f0556f' }}>{kicker}</span>}
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
    </section>
  )
}
