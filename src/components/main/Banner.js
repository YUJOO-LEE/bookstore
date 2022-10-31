export default function Banner({type, children}) {
  return(
    <section className={type}>
      <div className='inner'>
        {children}
      </div>
    </section>
  );
}