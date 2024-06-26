import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Employers from './pages/Employers/Employers.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

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
      <Routes>
        <Route
          index
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
          path="/auth/signin"
          element={
            <>
              <SignIn />
            </>
          }
        />  

        <Route
          path="/employers"
          element={
            <>
              <Employers />
            </>
          }
        />       
      </Routes>
    </>
  );
}

export default App;
