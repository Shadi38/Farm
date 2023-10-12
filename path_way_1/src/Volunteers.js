import React, { useState } from "react";

function Volunteers(props) {
  const { loadVolunteers, setLoadVolunteers } = props;

  //Deleting volunteer's information specified by id and deleting booked session related the volunteer
  function deleteClickHandler(volunteer) {
    
    fetch(
      `https://pathway-project-1-server.onrender.com/ sessions/volunteers/${volunteer.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(volunteer),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete volunteer");
        }
        return response.json();
      })
      .then(() => {
        const updatedVolunteer = loadVolunteers.filter(
          (item) => item.id !== volunteer.id
        );
        setLoadVolunteers(updatedVolunteer);
      })
      .catch((error) => {
        console.error("Error deleting volunteer:", error);
      });
  }

  return (
    <>
      
      <div className="mainVolunteersDiv">
        {loadVolunteers.map((volunteer, index) => (
          <div key={index} style={{ width: 400 }}>
            <div className="volunteersDiv">
              <div>{volunteer.name}</div>
              <div>{volunteer.lastname}</div>
              <div>{volunteer.address}</div>

              <button
                style={{
                  borderRadius: 5,
                  backgroundColor: "rgb(248, 230, 209)",
                  color: "#FC4445",
                }}
                onClick={() => deleteClickHandler(volunteer)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Volunteers;
