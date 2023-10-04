import React, { useState} from "react";
import Calendar from "react-calendar";
import RedSessionWindow from "./RedSessionWindow";
import GreenSessionWindow from "./GreenSessionWindow";
import { format } from "date-fns";
import MorningRegisterForm from "./MorningRegisterForm";
import EveningRegisterForm from "./EveningRegisterForm";

function Sessions() {
  const [date, setDate] = useState(new Date());
  const [firstTimeStatus, setFirstTimeStatus] = useState(null);
  const [firstBookedStatus, setFirstBookedStatus] = useState(null);
  const [secondTimeStatus, setSecondTimeStatus] = useState(null);
  const [secondBookedStatus, setSecondBookedStatus] = useState(null);
 

  //  format the date in  "YYYY-MM-DD" format
  function formatDateForBackend(selectedDate) {
    return format(selectedDate, "yyyy-MM-dd");
  }
  //an array of objects with tim and booked propertis
  async function handleChooseTime(day) { 
    try {
      // Format the selected date before sending it to the backend
      const formattedDate = formatDateForBackend(day);
      console.log(formattedDate);
      const response = await fetch(
        `http://localhost:3000/sessions/time/${formattedDate}`
      );
      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      
      
      if (data.rows && data.rows.length >= 2) {
        setFirstTimeStatus(data[0].time);
        setFirstBookedStatus(data[0].booked);
        setSecondTimeStatus(data[1].time);
        setSecondBookedStatus(data[1].booked);
      } else {
        //  there are not enough elements in data.rows
        console.error("Not enough data rows received");
      }
      console.log(firstTimeStatus);
    } catch (error) {
      console.error("Error fetching data");
    } 
  }
  
 console.log(firstBookedStatus);
 console.log(secondBookedStatus);
  let sessionWindow = null;
  if ((firstBookedStatus && secondBookedStatus) === true) {
    sessionWindow = <RedSessionWindow />;
  } else if ((firstBookedStatus && secondBookedStatus) === false) {
    sessionWindow = <GreenSessionWindow />;
  } else if (
    (firstBookedStatus === false && firstTimeStatus === "Morning") ||
    (secondBookedStatus === false && secondTimeStatus === "Morning")
  ) {
    sessionWindow = <MorningRegisterForm />;
  } else if (
    (firstBookedStatus === false && firstTimeStatus === "Evening") ||
    (secondBookedStatus === false && secondTimeStatus === "Evening")
  ){
    sessionWindow = <EveningRegisterForm />;
  }
    return (
      <div>
        <div className="calendar-container" id="calendar">
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={(value, event) => {
              handleChooseTime(value);
            }}
          />
        </div>
        <div className="text-center">
          Selected date:{" "}
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </div>
        {sessionWindow}
      </div>
    );
}
export default Sessions;
