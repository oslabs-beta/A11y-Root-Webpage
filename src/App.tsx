import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './css/App.css';
import { useEffect, useState } from 'react';
import { UserInfo } from './types';
//COMPONENTS
import AccountMenu from './components/AccountMenu';
import BtnDownload from './components/BtnDownload';
import OAuth from './components/OAuth';

//PAGES
import MainDashboard from './pages/MainDashboard';
import ProfileDashboard from './pages/ProfileDashboard';
import Home from './pages/Home';
import DirectLinkTreeDisplay from './pages/DirectLinkTreeDisplay';

const DOMAIN_NAME =
  import.meta.env.VITE_DOMAIN_NAME || 'https://localhost:3333';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleOAuthClick = () => {
    window.location.href = `${DOMAIN_NAME}/auth`;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${DOMAIN_NAME}/auth/checkstatus`, {
          credentials: 'include',
        });
        if (response.ok) {
          const userInfo = await response.json();
          setUserInfo(userInfo);
          setIsLoggedIn(true);
        } else {
          setUserInfo(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Cannot login: ', error);
        setUserInfo(null);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleDownload = (): void => {
    return;
  };

  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/dashboard';

  return (
    <div className='app'>
      <header>
        <div className='github-login'>
          {isLoggedIn && userInfo ? (
            <AccountMenu
              userInfo={userInfo}
              handleLogout={handleLogout}
            ></AccountMenu>
          ) : (
            <OAuth handleOAuthClick={handleOAuthClick}></OAuth>
          )}
        </div>
        <h1 onClick={() => navigate('/')}>A11y Root</h1>
        <BtnDownload handleDownload={handleDownload} />
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/dashboard'
          element={userInfo && <MainDashboard userInfo={userInfo} />}
        />
        <Route path='/treedirect/:pageId' element={<DirectLinkTreeDisplay />} />
        <Route path='/treedirect/' element={<DirectLinkTreeDisplay />} />
        <Route
          path='/profile'
          element={userInfo && <ProfileDashboard userInfo={userInfo} />}
        />
      </Routes>
      {/* {Update Footer with copyright notice, privacy policy link, sitemap, logo, contact info, social media icons} */}
      {showHeaderFooter && (
        <footer>
          <small>© Copyright 2024, A11y Root LLC</small>
        </footer>
      )}
    </div>
  );
}

export default App;
