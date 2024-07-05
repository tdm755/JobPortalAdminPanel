import { useEffect, useState, createContext } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Employers from './pages/Employers/EmployerCards.tsx';
import CandidateDetails from './pages/Candidates/Candidatesdetails.tsx';
import EmployersPakage2 from './pages/Employers/EmployersPakage2/EmployersPakage2.jsx';
import { centralizedAuthCheck } from './utils/authUtils.js';

export const AuthContext = createContext();


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Clear JWT cookie or local storage here if needed
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await centralizedAuthCheck(navigate, pathname === '/signIn');
      setLoading(false);
    };

    checkAuthentication();
  }, [navigate, pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Routes>
        <Route
          index
          path='/SignIn'
          element={
            <>
              <SignIn />
            </>
          }
        />
        <Route
          path='/dashbordsection'
          element={
            <>
              <ECommerce />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <Chart />
            </>
          }
        />
        <Route
          path="/alerts"
          element={
            <>
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <Buttons />
            </>
          }
        />

        <Route
          path="/employersdetails"
          element={
            <>
              <Employers />
            </>
          }
        />
        <Route
          path="/candidatedetails"
          element={
            <>
              <CandidateDetails />
            </>
          }
        />
        <Route
          path="/setpakages"
          element={
            <>
              <EmployersPakage2 />
            </>
          }
        />


      </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;

