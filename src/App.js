import { Route, Routes } from 'react-router-dom';
import './App.css';
import Product from './Pages/Product';

function App() {
  return (
      <Routes>
        <Route path="/product" element={<Product />} />
      </Routes>
  );
}

export default App;
