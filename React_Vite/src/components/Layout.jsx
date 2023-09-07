import PropTypes from 'prop-types';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <main className="" >{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes= {
  children: PropTypes.func,
}