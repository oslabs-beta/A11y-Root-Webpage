import '../css/Home.css';
import roots from '../assets/roots.svg';
// import webA11yIcon from '../assets/icon-weba11y.svg';
import quote1 from '../assets/quote-with-icon-weba11y.svg';
import developers from '../assets/developers.svg';
import user from '../assets/user.svg';

const NewHome = () => {
  return (
    <main className='newhome'>
      <img id='sect-0' src={roots} alt='' />

      <section id='sect-1' className='home-intro'>
        <p>
          Transform your web projects with real-time insights into WCAG A-level
          compliance. Our tool simplifies accessibility debugging for
          developers, ensuring no user is left behind.
        </p>
      </section>

      <section id='sect-2' className='home-quote'>
        {/* <p id='s2-item-1'>"BUILD APPLICATIONS ROOTED IN ACCESSIBILITY"</p>
        <img id='s2-item-2' src={webA11yIcon} alt='' /> */}
        <img src={quote1} alt='build applications rooted in accessibility' />
      </section>

      <section id='sect-3' className='home-a11yroot'>
        <img id='s3-item-1' src={developers} alt='' />
        <div id='sect-3-details'>
          <h2 id='s3-item-2'>What Is A11y Root?</h2>
          <p id='s3-item-3'>
            A11y (pronounced ‘Accessibility’ or ‘Aye-eleven-why’) Root is a VS
            Code Extension paired with a Companion Web Dashboard.
            <br />
            <br />
            It streamlines accessibility analysis and fosters collaboration
            across development teams by exposing accessibility insights and
            enabling seamless communication between developers, designers, and
            stakeholders.
          </p>
        </div>
      </section>

      <section id='sect-4' className='home-quote'>
        <h2>Assistive Technologies Depend On Web Accessibility!</h2>
      </section>

      <section id='sect-5' className='home-weba11y'>
        <div id='sect-5-details'>
          <h2>What Is Web Accessibility?</h2>
          <p>
            Assistive technologies are hindered by poorly constructed
            accessibility trees (their map of the DOM).
            <br />
            <br />
            Web developers are often unaware of the accessibility tree and its
            needs during development, such as: semantic HTML, thoughtful DOM
            structure, etc.
            <br />
            <br />
            Users must then struggle to navigate the website and are given
            limited access to its features.
          </p>
        </div>
        <img src={user} alt='' />
      </section>
    </main>
  );
};

export default NewHome;
