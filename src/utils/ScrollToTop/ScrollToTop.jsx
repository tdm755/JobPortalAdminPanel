import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    // useLocation hook provides the current location object
    const { pathname } = useLocation();

    // useEffect hook runs the function inside it whenever the pathname changes
    useEffect(() => {
        // Scroll the window to the top-left corner of the page
        window.scrollTo(0, 0);
    }, [pathname]); // Dependency array containing pathname

    return null;
};

export default ScrollToTop;
