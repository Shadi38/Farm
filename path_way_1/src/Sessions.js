import React, { useState } from "react";
import Calendar from "react-calendar";
import BookedWindow from "./BookedWindow";
import MorningEveningWindow from "./MorningEveningwindow";
import { format } from "date-fns";
// import MorningWindow from "./MorningWindow";
// import EveningWindow from "./EveningWindow";
import EveningOrMorningWindow from "./EveningOrMorningWindow";
import "react-calendar/dist/Calendar.css";


function Sessions() {
  const [date, setDate] = useState(new Date());
  const [firstTimeStatus, setFirstTimeStatus] = useState(null);
  const [firstBookedStatus, setFirstBookedStatus] = useState(null);
  const [secondTimeStatus, setSecondTimeStatus] = useState(null);
  const [secondBookedStatus, setSecondBookedStatus] = useState(null);
  const [morning, setMorning] = useState(false);
  const [evening, setEvening] = useState(false);
  const [morningText, setMorningText] = useState(false);// changing the text in MorningEvening window component

 
  //  format the date in  "YYYY-MM-DD" format
  function formatDateForBackend(selectedDate) {
    return format(selectedDate, "yyyy-MM-dd");
  }
  //an array of objects with time and booked propertis
  async function handleChooseTime(day) {
    try {
      // Format the selected date before sending it to the backend
      const formattedDate = formatDateForBackend(day);
      console.log(formattedDate);
      const response = await fetch(
        `https://pathway-project-1-server.onrender.com/sessions/time/${formattedDate}`
        //`http://localhost:3000/sessions/time/${formattedDate}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Fetch failed ");
      }
      const data = await response.json();
      console.log(data);

      if (data.length === 2) {
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
    sessionWindow = <BookedWindow />;
  }
  if (firstBookedStatus === false && secondBookedStatus === false) {
    sessionWindow = <MorningEveningWindow />;
  }
  if (
    (firstBookedStatus === false &&
      firstTimeStatus === "Morning" &&
      secondBookedStatus === true) ||
    (secondBookedStatus === false &&
      secondTimeStatus === "Morning" &&
      firstBookedStatus === true)
  ) {
    // sessionWindow = <MorningWindow evening={evening} setEvening={setEvening} />;
    setMorningText(true)
    sessionWindow = (
      <EveningOrMorningWindow
        evening={evening}
        setEvening={setEvening}
        morningText={morningText}
      />
    );
  }
  if (
    (firstBookedStatus === false &&
      firstTimeStatus === "Evening" &&
      secondBookedStatus === true) ||
    (secondBookedStatus === false &&
      secondTimeStatus === "Evening" &&
      firstBookedStatus === true)
  ) {
    // sessionWindow = <EveningWindow morning={morning} setMorning={setMorning} />;
    sessionWindow = <EveningOrMorningWindow morning={morning} morningText={morningText} setMorning={setMorning} />;
  }
  return (
    <div>
      <div className="calendar-container" id="calendar">
        <div className="my-calendar">
          <Calendar
            className="custom-calendar"
            onChange={setDate}
            value={date}
            onClickDay={(value) => {
              handleChooseTime(value);
            }}
          />
        </div>
      </div>
      {sessionWindow}
    </div>
  );
}
export default Sessions;
