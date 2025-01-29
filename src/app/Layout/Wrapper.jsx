"use client"
import dynamic from "next/dynamic";
import React from "react";

const Header = dynamic(() => import("../Layout/Header"));
const Footer = dynamic(() => import("../Layout/Footer"));

const Wrapper = ({ children }) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
};

export default Wrapper;