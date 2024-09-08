import './App.css';
import React, {useContext, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import AuthorContext from './utils/assets/AuthorContext';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Article from './pages/Article';
import Home from './pages/Home';

function App() {
  let {authTokens} = useContext(AuthorContext)
  
  return (   
    <div>
      {authTokens && <Navbar/>}

      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<PrivateRoute element={<Create />} />} />
        <Route path="/edit/:id" element={<PrivateRoute element={<Edit />} />} />
        <Route path="/article/:id" element={<PrivateRoute element={<Article />} />} />
      </Routes>
    </div>
    
  );
}

export default App;
