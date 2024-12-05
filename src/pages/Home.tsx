import { Fragment } from 'react/jsx-runtime';
const Home = () => {
  return (
    <main className='home'>
      <section className='a11y-details'>
        <div>
          <h2 className='border-mint'>Why Build With A11y?</h2>
          <p>
            Assistive technologies are hindered by poorly constructed
            accessibility trees (their map of the DOM). Web developers are often
            unaware of the accessibility tree and its needs during development,
            such as: semantic HTML, thoughtful DOM structure, etc. Users must
            then struggle to navigate the website and are given limited access
            to its features.
          </p>
        </div>
        <div>
          <h2>DOM Structure VS A11y Tree</h2>
          <img
            src=''
            alt="side by side comparison of the browser's DOM structure and it's conversion to an A11y tree."
          />
        </div>
      </section>
      <section className='quote-rooted'>
        <h2>“a Visual Studio Code extension rooted in accessibility”</h2>
      </section>
      <section className='demo'>
        <h2>Try It Out!</h2>
        <img
          src=''
          alt='a demonstration of how to use the A11y Root extension in VS Code Studio'
        />
      </section>
    </main>
  );
};

export default Home;
