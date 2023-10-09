import React, { useState } from "react";
import Calendar from "react-calendar";
import RedSessionWindow from "./RedSessionWindow";
import GreenSessionWindow from "./GreenSessionWindow";
import { format } from "date-fns";
import MorningRegisterForm from "./MorningRegisterForm";
import EveningRegisterForm from "./EveningRegisterForm";
//import RegisterDialog from "./RegisterDialog";


function Sessions() {
  const [date, setDate] = useState(new Date());
  const [firstTimeStatus, setFirstTimeStatus] = useState(null);
  const [firstBookedStatus, setFirstBookedStatus] = useState(null);
  const [secondTimeStatus, setSecondTimeStatus] = useState(null);
  const [secondBookedStatus, setSecondBookedStatus] = useState(null);
  const [morning, setMorning] = useState(false);
  const [evening, setEvening] = useState(false);

  // let sessionWindow = null;
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
        `https://pathway-project-1-server.onrender.com/sessions/time/${formattedDate}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Fetch failed ");
      }
      const data = await response.json();
      console.log(data);

       if (data.length === 2) {
      //   for (let i = 0; i < data.length; i++) {
      //     if (data[i].time === "Evening") {
      //       setEvening(data[i].time.booked);
      //     } else if (data[i].time.toLowerCase() === "morning") {
      //       setMorning(data[i].time.booked);
      //     }
      //   }

        // sessionWindow = (
        //   <RegisterDialog
        //     morning={morning}
        //     setMorning={setMorning}
        //     evening={evening}
        //     setEvening={setEvening}
        //   />
        // );
        setFirstTimeStatus(data[0].time);
        setFirstBookedStatus(data[0].booked);
        setSecondTimeStatus(data[1].time);
        setSecondBookedStatus(data[1].booked);
      } else {
        //  there are not enough elements in data.rows
        console.error("Not enough data rows received");
      }
    } catch (error) {
      console.log(error);
      console.error("Error fetching data");
    }
  }
  console.log(firstBookedStatus);
  console.log(secondBookedStatus);
  let sessionWindow = null;
  if ((firstBookedStatus && secondBookedStatus) === true) {
    sessionWindow = <RedSessionWindow />;
  }
  if (firstBookedStatus === false && secondBookedStatus === false) {
    sessionWindow = <GreenSessionWindow />;
  }
  if (
    (firstBookedStatus === false &&
      firstTimeStatus === "Morning" &&
      secondBookedStatus === true) ||
    (secondBookedStatus === false &&
      secondTimeStatus === "Morning" &&
      firstBookedStatus === true)
  ) {
    sessionWindow = <MorningRegisterForm morning={morning} setMorning={setMorning}/>;
  }
  if (
    (firstBookedStatus === false &&
      firstTimeStatus === "Evening" &&
      secondBookedStatus === true) ||
    (secondBookedStatus === false &&
      secondTimeStatus === "Evening" &&
      firstBookedStatus === true)
  ) {
    sessionWindow = <EveningRegisterForm evening={evening} setEvening={setEvening} />;
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
      {sessionWindow}
      {/* <RegisterDialog morning setMorning evening setEvening /> */}
    </div>
  );
}
export default Sessions;
