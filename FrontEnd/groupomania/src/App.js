import { Routes, Route } from 'react-router-dom'
import Accueil from './components/accueil/Accueil'
import Home from './components/home/Home'
import Signup from './components/accueil/signup/Signup'
import Login from './components/accueil/login/Login';


function App() {
  return (
    <div className='App'>
      <Routes>
            <Route path="/" element={<Accueil />} >
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
            </Route>
            <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
