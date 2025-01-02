import roots from '../assets/roots.svg';
import webA11yIcon from '../assets/icon-weba11y.svg';
import developers from '../assets/developers.svg';
import user from '../assets/user.svg';

const NewHome = () => {
  return (
    <main className='newhome'>
      <img src={roots} alt='' />
      <section className='home-intro'>
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Nulla gravida
          netus nulla adipiscing, consequat pellentesque finibus. Hendrerit
          quisque et semper, duis porttitor et. Rutrum amet primis condimentum
          tempus aenean etiam ut, interdum magna.
        </p>
      </section>
      <section className='home-quote'>
        <p>"BUILD APPLICATIONS ROOTED IN ACCESSIBILITY</p>
        <img src={webA11yIcon} alt='' />
      </section>
      <section className='home-a11yroot'>
        <img src={developers} alt='' />
        <h2>What Is A11y Root</h2>
        <p>
          A11y (pronounced ‘Accessibility’ or ‘Aye-eleven-why’) Lorem ipsum odor
          amet, consectetuer adipiscing elit. Nulla gravida netus nulla
          adipiscing, consequat pellentesque finibus.
        </p>
        <h2>Assistive Technologies Depend On Web Accessibility!</h2>
        <h2>What Is Web Accessibility?</h2>
        <p>
          Assistive technologies are hindered by poorly constructed
          accessibility trees (their map of the DOM). Web developers are often
          unaware of the accessibility tree and its needs during development,
          such as: semantic HTML, thoughtful DOM structure, etc. Users must then
          struggle to navigate the website and are given limited access to its
          features.
        </p>
        <img src={user} alt='' />
      </section>
    </main>
  );
};

export default NewHome;
