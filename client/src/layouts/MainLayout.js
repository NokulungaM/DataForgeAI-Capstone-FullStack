import { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function Layout({ children }) {
  const router = useRouter();
  
  // Determine the current page based on the route
  const isLandingPage = router.pathname === '/landingPage';
  const isAuthPage = router.pathname === '/auth/signin' || router.pathname === '/auth/signup';
  const isSearchPage = router.pathname === '/search';
  const isMealPlanPage = router.pathname === '/meal-plan';

  // Pass props to the Navbar to customize the buttons
  return (
    <>
      <Navbar 
        isLandingPage={isLandingPage} 
        isAuthPage={isAuthPage} 
        isSearchPage={isSearchPage}
        isMealPlanPage={isMealPlanPage}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
