export default function Layout(props) {
  const figureColor = {
    book: ['#266A2E', '#593E1A'],
    content: ['#593E1A', '#266A2E'],
    review: ['#266A2E', '#6B78B4'],
    photo: ['#6B78B4', '#79BEDB'],
    video: ['#79BEDB', '#f5d547'],
    login: ['#f5d547', '#e38883'],
    about: ['#e38883', '#888'],
    store: ['#888', '#266A2E'],
    search: ['#888', '#000']
  };

  return (
    <section className={`content ${props.name}`}>
      <div className='inner'>
        <figure style={{background: `linear-gradient(45deg, ${figureColor[props.name][0]}, ${figureColor[props.name][1]})`}}>
          <h2>{props.name}</h2>
        </figure>
      </div>
      {props.children}
    </section>
  );
}