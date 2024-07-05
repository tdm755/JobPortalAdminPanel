import { toast } from "react-toastify";
import { checkAuth } from "../api/api";

let isAuthChecking = false;
let lastAuthCheckTime = 0;
const AUTH_CHECK_COOLDOWN = 5000; // 5 seconds cooldown
let isFirstVisit = true; // Add this flag

export const centralizedAuthCheck = async (navigate, isSignInPage = false) => {
  const currentTime = Date.now();

  if (isAuthChecking || (currentTime - lastAuthCheckTime) < AUTH_CHECK_COOLDOWN) {
    return;
  }

  isAuthChecking = true;

  try {
    await checkAuth();
    isAuthChecking = false;
    lastAuthCheckTime = currentTime;
    if (isSignInPage) {
      navigate("/dashbordsection");
    }
    isFirstVisit = false; // Set to false after successful auth
  } catch (error) {
    console.error("Authentication failed:", error);
    isAuthChecking = false;
    lastAuthCheckTime = currentTime;

    if (!isSignInPage && !isFirstVisit) { // Only show message if not first visit
      toast.info("Please login to access the job portal", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/");
    } else if (!isSignInPage) {
      navigate("/"); // Still navigate to sign in page on first visit, but without message
    }
    isFirstVisit = false; // Set to false after first auth check
  }
};