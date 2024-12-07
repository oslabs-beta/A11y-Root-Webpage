import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BtnDownload from './components/BtnDownload';
import OAuth from './components/OAuth';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleOAuthClick = () => {
    window.location.href = 'https://localhost:3333/auth';
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      // console.log('CheckLoginStatus function is running');

      try {
        const response = await fetch(
          'https://localhost:3333/auth/checkstatus',
          {
            credentials: 'include',
          }
        );
        const userInfo = await response.json();
        // console.log("Login response: ", response)
        // console.log("User Login INFO: ", userInfo)

        setUserInfo(userInfo);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Cannot login: ', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleDownload = (): void => {
    return;
  };

  return (
    <div className='app'>
      <header>
        <div className='github-login'>
          {isLoggedIn ? (
            <button onClick={handleLogout}>LOGOUT</button>
          ) : (
            <OAuth handleOAuthClick={handleOAuthClick}></OAuth>
          )}
        </div>
        <h1>A11y Root</h1>
        <BtnDownload handleDownload={handleDownload} />
      </header>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
      {/* {Update Footer with copyright notice, privacy policy link, sitemap, logo, contact info, social media icons} */}
      <footer>
        <h6>A11y Root</h6>
      </footer>
    </div>
  );
}

export default App;
