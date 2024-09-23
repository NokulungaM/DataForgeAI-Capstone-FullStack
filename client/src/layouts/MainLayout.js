import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Signup from '@/components/signUp/signUp';


export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Signup/>
      <Footer />
    </>
  );
}
