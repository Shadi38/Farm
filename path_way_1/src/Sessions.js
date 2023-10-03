import React, { useState } from "react";
import Calendar from "react-calendar";
import OrangeSessionWindow from "./OrangeSessionWindow";
import RedSessionWindow from "./RedSessionWindow";
import GreenSessionWindow from "./GreenSessionWindow";



function Sessions() {

  const [date, setDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState(null);
  //const cellColours = ["green","orange","red"];



// function handleTileClick(tileDate) {
//     console.log(tileDate);
//     console.log(cellColours);
//     // Check the color of the tile based on the date
//     const tileColor = cellColours[tileDate.getDate() % 3];
//     console.log(tileColor); 
//     setSelectedColor(tileColor);
// }
function handleTileClick(tileDate) {
  //  the choosed tile's day 
  console.log(tileDate);

   const formattedDate = tileDate.toLocaleDateString("en-US", {
     year: "numeric",
     month: "short",
     day: "2-digit",
   });
   console.log(formattedDate);
  /////??????????i have to access the colour of the tile related
  //to tileDay and assign to  selectedColor with setSElectedColor
}


let sessionWindow = null;
if (selectedColor === "red") {
    sessionWindow = <RedSessionWindow />;  
  } else if (selectedColor === "orange") {
    sessionWindow = <OrangeSessionWindow />;
  } else if (selectedColor === "green") {
    sessionWindow = (
      <GreenSessionWindow
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    );
  }

  return (
    <div>
      <div className="calendar-container" id="calendar">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={(value, event) => {
            handleTileClick(value);
          }}
          
        />
      </div>
      <div className="text-center">
        Selected date:{" "}
        {date
          .toLocaleDateString("en-US", {
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
