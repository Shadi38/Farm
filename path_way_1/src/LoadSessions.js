import React from "react";
import { format, parseISO } from "date-fns";

function LoadSessions(props) {
    const {loadSessions} = props

    function formatDateForFrontEnd(selectedDate) {
      // Parse the ISO date string into a Date object
      const parsedDate = parseISO(selectedDate);
      // Format the parsed date as needed (e.g., "yyyy-MM-dd")
      return format(parsedDate, "yyyy-MM-dd");
    }
    return(
        <>
        
        {loadSessions.map((session, index) => {
               const formatedDay =formatDateForFrontEnd(session.day);
                return (
                  <div key={index} style={{ width: 400 }}>
                    <div className="volunteersDiv">
                      <div>Date: {formatedDay}</div>
                      <div>Time: {session.time}</div>
                      {/* <div>Available: {session.booked}</div> */}
                    </div>
                  </div>
                );
              })
            }
        </>
    )
}
export default LoadSessions;