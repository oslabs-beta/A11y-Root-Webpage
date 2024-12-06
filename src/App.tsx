import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import OAuth from './components/OAuth';
import { useEffect, useState } from 'react';

function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	
	const handleOAuthClick = () => {
      window.location.href = 'https://localhost:3333/auth';
	}

	const handleLogout = () => {
		setIsLoggedIn(false);
	}

	useEffect(() => {
		const checkLoginStatus = async() => {
			try {
				const response = await fetch('https://api.github.com/user');
				const {loginInfo} = await response.json();
				console.log("Login response: ", response)
				console.log("Login INFO: ", loginInfo)
				setIsLoggedIn(loginInfo);
			} catch(error) {
				console.error('Cannot login: ', error)
			}
		}

		checkLoginStatus();
	}, [])

  return (
    <Router>
      <div className='app'>
        <header>
          <h1>A11y Root</h1>
					<div className='github-login'>
						{isLoggedIn ? (<button onClick={handleLogout}>LOGOUT</button>) : (<OAuth handleOAuthClick={handleOAuthClick}></OAuth>)}
					</div>
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
