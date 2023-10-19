import { brown } from "@mui/material/colors";
import React from "react";

function Header() {
  return (
    <>
      <div className="headerDiv">
        <header className="header">
          <h1>Welcome to our Farm</h1>
        </header>

        <p style={{ color: "rgb(28, 27, 27)" }}>
          Our farm needs volunteers to feed animals.
          In "Sessions" section you can register.
          In the "Sessions/Volunteers" section, you can view all the sessions
          available for volunteering on our farm. This section also displays the
          sessions that have already been booked by volunteers and the names of
          the volunteers who have made those bookings.
        </p>
      </div>
    </>
  );  
}
export default Header;