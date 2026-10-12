// import FC from react
import { FC } from 'react';

//import router
import AppRoutes from './routes';

//import useLocation from react router
import { useLocation } from "react-router";

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: FC = () => {

  const { pathname } = useLocation();

  // halaman admin dan auth punya kerangka sendiri (tanpa navbar publik)
  const hasOwnShell = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register';

  if (hasOwnShell) {
    return <AppRoutes />;
  }

  return (
    <>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </>
  )
}

export default App;
