
import './App.css';

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Services from './pages/Services';
import Contactus from './pages/Contactus';
import Register from './pages/Register';
import Login from './pages/Login';
import Adminlogin from './pages/Adminlogin';

import Tests from './pages/Tests';
import Appeartest from './pages/Appeartest';
import Result from './pages/Result';

import Addcategory from './pages/Addcategory';
import Addquestions from './pages/Addquestions';
import Preparetest from './pages/Preparetest';
import Contactdetails from './pages/Contactdetails';

import Testpaper from './pages/Testpaper';
import AdminResult from './pages/AdminResult';


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="" element={<Navbar />}>

          {/* Home */}
          <Route
            index
            element={<Home />}
          />

          {/* Public Pages */}
          <Route
            path="services"
            element={<Services />}
          />

          <Route
            path="contact"
            element={<Contactus />}
          />

          <Route
            path="register"
            element={<Register />}
          />

          <Route
            path="login"
            element={<Login />}
          />

          <Route
            path="adminlogin"
            element={<Adminlogin />}
          />


          {/* Student Pages */}

          <Route
            path="tests"
            element={<Tests />}
          />

          <Route
            path="appeartest"
            element={<Appeartest />}
          />

          <Route
            path="result"
            element={<Result />}
          />

          <Route
            path="testpaper/:testno"
            element={<Testpaper />}
          />


          {/* Admin Pages */}

          <Route
            path="addcategory"
            element={<Addcategory />}
          />

          <Route
            path="addquestions"
            element={<Addquestions />}
          />

          <Route
            path="preparetest"
            element={<Preparetest />}
          />

          <Route
            path="adminresult"
            element={<AdminResult />}
          />

          <Route
            path="contactdetails"
            element={<Contactdetails />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;