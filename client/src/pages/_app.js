import Layout from '../layouts/MainLayout';
import '../Styles/globals.css';
// import '../styles/globals.css'; // Ensure your global styles are imported

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
