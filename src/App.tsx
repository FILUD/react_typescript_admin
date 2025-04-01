import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './components/languages/LanguageContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';
import Member from './pages/Member';
import Promotion from './pages/Promotion';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/member" element={<Member />} />
        <Route path="/promotion" element={<Promotion />} />

        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;