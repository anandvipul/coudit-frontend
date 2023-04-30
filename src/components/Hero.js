export default function Hero(props) {
  return (
    <>
      <section className="hero safe-side">
        <h1 className="blog-title">{props.title}</h1>
        <p className="blog-punch">{props.sub}</p>
      </section>
    </>
  );
}
