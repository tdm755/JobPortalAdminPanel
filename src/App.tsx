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
import ContactUs from './pages/ContactUs/ContactUs';
import { centralizedAuthCheck } from './utils/authUtils.js';
import EmployerProfile from './pages/Employers/EmployerProfile/EmployerProfile.jsx';
import CandidateProfile from './pages/Candidates/CandidateProfile/CandidateProfile.jsx';
import ForgotPassword from './pages/Authentication/ForgotPassword.tsx';
import ResetPassword from './pages/Authentication/ResetPassword.tsx';
import UpdateFeatures from './pages/UpdateFeatures/UpdateFeatures.jsx';
import UpdateFeturesComponent from './pages/UpdateFeatures/updateCategories/updateCategories.jsx';
import { fetchCandidateData, fetchDetailsOfFeatures } from './api/api.js';
import UpdateLocation from './pages/UpdateFeatures/UpdateLocation/UpdateLocation.jsx';
import ManageAds from './pages/ManageAdds/ManageAdds.jsx';

export const AuthContext = createContext(null);

export const FeaturesOfCatType = createContext(null);



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [FeatureData, setFeatureData] = useState({});
  

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
      const bypassAuthCheck = pathname === '/forgot-password' || pathname === '/reset-password';
      await centralizedAuthCheck(navigate, pathname === '/signIn', bypassAuthCheck);
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
     <ToastContainer />
     <FeaturesOfCatType.Provider value={{FeatureData, setFeatureData}}>
      <Routes>
        <Route
          index
          // path=''
          element={
            <>
              <SignIn />
            </>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/reset-password" element={<ResetPassword />}/>
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

          <Route path="/employersdetails" element={<Employers />} />
          <Route path="/viewandeditdetails/:profileId" element={<EmployerProfile />} />
          <Route path="/viewandeditdetailsofcandidate/:profileId" element={<CandidateProfile />} />

          <Route path='updatefeatures' element={<UpdateFeatures />} />

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

          <Route
            path="/updateFeature/:id"
            element={
              <>
                <UpdateFeturesComponent />
              </>
            }
          />

          <Route
<<<<<<< HEAD
            path="/updatelocation"
            element={
              <>
                <UpdateLocation />
              </>
            }
          />

          <Route
            path="/manageadvertisement"
            element={
              <>
                <ManageAds />
=======
            path="/contactus"
            element={
              <>
                <ContactUs />
>>>>>>> 9b389de3ba92f73323995ba1217346696860103e
              </>
            }
          />


        </Routes>
        </FeaturesOfCatType.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;

