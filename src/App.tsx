import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import BtnDownload from './components/BtnDownload';

function App() {
  const handleDownload = (): void => {
    return;
  };

  return (
    <Router>
      <div className='app'>
        <header className='header'>
          <h1>A11y Root</h1>
          <BtnDownload handleDownload={handleDownload} />
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        {/* {Update Footer with copyright notice, privacy policy link, sitemap, logo, contact info, social media icons} */}
        <footer>
          <h6>A11y Root</h6>
          <nav></nav>
        </footer>
      </div>
    </Router>
  );
}

export default App;
