import React, { useState } from "react";
import Calendar from "react-calendar"; 
function Sessions() {
    
    const [date, setDate] = useState(new Date());
  
    
    return (
        <div>
            
                
                    <div className="calendar-container" id="calendar">
                        <Calendar onChange={setDate} value={date} />
                    </div>
                    <div className="text-center">Selected date: {date.toDateString()}</div>
               
            
        </div>
    );
  }
export default Sessions;
