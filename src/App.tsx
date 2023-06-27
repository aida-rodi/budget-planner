import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome';
import Budget from './pages/budget';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </Router>
  );
}

export default App;
