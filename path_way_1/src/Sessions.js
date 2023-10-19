import React, { useState,useEffect,} from "react";
import Calendar from "react-calendar";
import BookedWindow from "./BookedWindow";
import MorningEveningWindow from "./MorningEveningwindow";
import { format, parseISO } from "date-fns";
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
  const [morningText, setMorningText] = useState(false); // changing the text in MorningEvening window component
  const [highlightedDates, setHighlightedDates] = useState([]);

  //  format the date in  "YYYY-MM-DD" format
  function formatDateForBackend(selectedDate) {
    return format(selectedDate, "yyyy-MM-dd");
  }

  //(in these days there is no sessions available to book and their tiles should be red )
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:3000/MorningEveningBooked"
          //"https://pathway-project-1-server.onrender.com/MorningEveningBooked"
        );
        if (!response.ok) {
          throw new Error("Fetch failed");
        }
        const data = await response.json();
        const highlightedDates = data.map((item) => {
          const date = new Date(item.day);
          return date.toISOString().split("T")[0]; // Format as "yyyy-MM-dd"
        });
        setHighlightedDates(highlightedDates);
        console.log(highlightedDates);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);
  //checking the date is i our highlightedDates array(days will have red background)
  const isDateHighlighted = (date) => {
    // Convert the calendar date  to ISO
    const formatedDateCalendar = date.toISOString().split("T")[0];

    return highlightedDates.includes(formatedDateCalendar);
  };

  //spesify className
  const tileContent = ({ date, view }) => {
    if (view === "month" && isDateHighlighted(date)) {
      return <div className="highlighted-tile"></div>;
    }

    return null;
  };

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
    setMorningText(true);
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
    sessionWindow = (
      <EveningOrMorningWindow
        morning={morning}
        morningText={morningText}
        setMorning={setMorning}
      />
    );
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
            tileContent={tileContent}
          />
        </div>
      </div>
      {sessionWindow}
    </div>
  );
}
export default Sessions;
