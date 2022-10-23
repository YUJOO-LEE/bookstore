export default function Layout(props) {
  const figureColor = {
    book: ['#266A2E', '#593E1A'],
    review: ['#593E1A', '#6B78B4'],
    photo: ['#6B78B4', '#79BEDB'],
    video: ['#79BEDB', '#f5d547'],
    login: ['#f5d547', '#e38883'],
    about: ['#e38883', '#888'],
    store: ['#888', '#266A2E']
  };

  return (
    <section className={`content ${props.name}`}>
      <div className='inner'>
        <figure style={{background: `linear-gradient(45deg, ${figureColor[props.name][0]}, ${figureColor[props.name][1]})`}}>
          <h2>{props.name}</h2>
        </figure>
        {props.children}
      </div>
    </section>
  );
}