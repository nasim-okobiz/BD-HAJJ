import React from "react";
import UpperHeader from "./UpperHeader";
import BottomHeader from "./BottomHeader";
import MiddleHeader from "./MiddleHeader";

const Navbar = () => {
  return (
    <>
      <UpperHeader />
      <MiddleHeader/>
      <BottomHeader/>
    </>
  );
};

export default Navbar;
