// src/App.js
import React from 'react';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import Navbar from './components/Navbar'; // Import your components
import Footer from './components/Footer';

i18next
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    resources: {
      en: {
        translation: require('./locales/en/translation.json'),
      },
      zh: {
        translation: require('./locales/zh/translation.json'),
      },
    },
  });

const App = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <Navbar />
      {/* Your other components */}
      <Footer />
    </I18nextProvider>
  );
};

export default App;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import MainLayout from './layouts/MainLayout';
// import HomePage from './pages/index';  // Your new home page component
// import TestPage from './pages/Test';      // Assuming Test.js is now under /pages

// function App() {
//   return (
//     <MainLayout>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         {/* <Route path="/test" element={<TestPage />} /> */}
//         {/* Add more routes as needed */}
//       </Routes>
//     </MainLayout>
//   );
// }

// export default App;
