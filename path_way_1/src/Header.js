import { brown } from "@mui/material/colors";
import React from "react";

function Header() {
  return (
    <>
      <div className="headerDiv">
        <header className="header">
          <h1>Welcome to our Farm</h1>
        </header>

        <h2 style={{ color: "rgb(28, 27, 27)" }}>
          Our farm needs volunteers to feed animals. You can register in our
          available sessions:
        </h2>
      </div>
    </>
  );  
}
export default Header;