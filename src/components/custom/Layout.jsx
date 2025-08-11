// src/components/Layout.jsx
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <div className="pt-[70px]"> {/* space to offset fixed header */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
