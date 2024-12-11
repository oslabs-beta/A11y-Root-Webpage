import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BtnDownload from './components/BtnDownload';
import OAuth from './components/OAuth';
import { useEffect, useState } from 'react';
import AccountMenu from './components/AccountMenu';
import MainDashboard from './pages/MainDashboard';

interface UserInfo {
  username: string | null;
  avatarUrl: string | null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

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
          {isLoggedIn ? (
            <AccountMenu
              userInfo={userInfo}
              handleLogout={handleLogout}
            ></AccountMenu>
          ) : (
            <OAuth handleOAuthClick={handleOAuthClick}></OAuth>
          )}
        </div>
        <h1>A11y Root</h1>
        <BtnDownload handleDownload={handleDownload} />
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/maindashboard' element={<MainDashboard />} />
      </Routes>
      {/* {Update Footer with copyright notice, privacy policy link, sitemap, logo, contact info, social media icons} */}
      {showHeaderFooter && (
        <footer>
          <h6>A11y Root</h6>
        </footer>
      )}
    </div>
  );
}

export default App;
