import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <header>
          <h1>A11y Root</h1>
        </header>
        <Routes>{/* <Route path='/' element={} /> */}</Routes>
        <footer></footer>
      </div>
    </Router>
  );
}

export default App;
