export default function Layout(props) {
  return (
    <section className={`content ${props.name}`}>
      <figure></figure>
      <div className='inner'>
        <h2>{props.name}</h2>
        {props.children}
      </div>
    </section>
  );
}