import React from "react";
import Navbar from '../layout/Navbar';
import Landing from '../layout/Landing';
import Footer from '../layout/Footer';

function Home() {
  return (
    <div className="fullSize">
      <Navbar />
      <Landing/>
      <Footer/>
      {/**/}
    </div>
  );
}

export default Home;
