
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import Product_listing from './components/Product_listing';

function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='product' element={<ProtectedRoute Component={Product_listing}/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
