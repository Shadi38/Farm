import React from "react";
import { format, parseISO } from "date-fns";
function BookedSessions(props) {
const {booked} = props;


function formatDateForFrontEnd(selectedDate) {
      // Parse the ISO date string into a Date object
      const parsedDate = parseISO(selectedDate);
      // Format the parsed date as needed (e.g., "yyyy-MM-dd"
       return format(parsedDate, "yyyy-MM-dd");
    }
    return (
      <>
        <div className="mainVolunteersDiv">
          {booked.map((bookedSessions, index) => {
          const formatedDay =formatDateForFrontEnd(bookedSessions.day)
          return (
            <div key={index} style={{ width: 400 }}>
              <div className="volunteersDiv">
                <div>{formatedDay}</div>
                <div>{bookedSessions.time}</div>
              </div>
            </div>
          );
            
})}
        </div>
      </>
    );
}
export default BookedSessions;