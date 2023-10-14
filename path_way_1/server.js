const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());

app.use(express.json());
const { body, validationResult } = require("express-validator");

const port = process.env.PORT || 3000;
const { Pool } = require("pg");

// const db = new Pool({
//   user: "shadifakhri",
//   host: "localhost",
//   database: "farm",
//   password: "",
//   port: 5432,
// });

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

app.get("/", function (req, res) {
  res.status(200).json("wellcome");
});
// all sessions
app.get("/sessions", async function (req, res) {
  try {
    const result = await db.query("SELECT * FROM sessions ORDER BY id ");

    if (result.rows.length === 0) {
      return res.json([]);
    }

    res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
// volunteers
app.get("/volunteers", async function (req, res) {
  try {
    const result = await db.query("SELECT * FROM volunteers");
 console.log(result.rows);
    if (result.rows.length === 0) {
      return res.json([]);
    }
    res.json(result.rows);
   
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

//all sessions that booked
app.get("/sessions/booked", async function (req, res) {
  try {
    const result = await db.query(
     
      "select s.id,day,time,b.id IS NOT NULL AS booked  FROM sessions as s left join bookings as b on s.id=b.sessions_id where booked=true"
    );

    if (result.rows.length === 0) {
      return res.json([]);
    }
    res.json(result.rows);
    console.log(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// bookings table
app.get("/bookings", async function (req, res) {
  try {
    const result = await db.query("SELECT * FROM bookings");

    if (result.rows.length === 0) {
      return res.json([]);
    }
    res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
// add new volunteer on one of  sessions and updating volunteers table and bookings table
// app.post(
//   "/sessions/newVolunteer",
//   [
//     body("name", "Name can't be empty").notEmpty(),
//     body("lastname", "Last Name can't be empty").notEmpty(),
//     body("address", "Address can't be empty").notEmpty(),
//     body("day", "Day can't be empty").notEmpty(),
//     body("time", "Time can't be empty").notEmpty(),
//   ],
//   function (req, res) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).send({
//         error: errors.array(),
//       });
//     }
//     const newName = req.body.name;
//     const newLastName = req.body.lastname;
//     const newAddress = req.body.address;
//     const newDay = req.body.day;
//     const newTime = req.body.time;
   

//     //   registering new session by new volunteer
//     const volunteerQuery =
//       "INSERT INTO volunteers (name, lastname, address) VALUES ($1, $2, $3) RETURNING id";

//     db.query(
//       volunteerQuery,
//       [newName, newLastName, newAddress],
//       (volunteerErr, volunteerResult) => {
//         if (volunteerErr) {
//           console.error(volunteerErr);
//           res.status(500).json({ error: "Internal Server Error" });
//         } else {
//           const volunteerId = volunteerResult.rows[0].id;
// console.log(volunteerId);
//           //  Find a session in the sessions table based on day and time
//           const sessionQuery =
//             "SELECT id FROM sessions WHERE day = $1 AND time = $2";
// console.log(sessionQuery);
//           db.query(
//             sessionQuery,
//             [newDay, newTime],
//             (sessionErr, sessionResult) => {
//               if (sessionErr) {
//                 console.error(sessionErr);
//                 res.status(500).json({ error: "Internal Server Error" });
//               } else {
//                 if (sessionResult.rows.length === 0) {
//                   // No matching session found
//                   res.status(404).json({ error: "Session not found" });
//                 } else {
//                   const sessionId = sessionResult.rows[0].id ;

//                   //  Update the booked status of the session to true
//                   const updateSessionQuery =
//                     "UPDATE sessions SET booked = true WHERE id = $1";
                  
//                   db.query(updateSessionQuery, [sessionId], (updateErr) => {
//                     if (updateErr) {
//                       console.error(updateErr);
//                       res.status(500).json({ error: "Internal Server Error" });
//                     } else {
//                       //  Insert a booking  into the bookings table
//                       const bookingQuery =
//                         "INSERT INTO bookings (sessions_id, volunteers_id) VALUES ($1, $2)";

//                       db.query(
//                         bookingQuery,
//                         [sessionId, volunteerId],
//                         (bookingErr) => {
//                           if (bookingErr) {
//                             console.error(bookingErr);
//                             res
//                               .status(500)
//                               .json({ error: "Internal Server Error" });
//                           } else {
//                             res.status(201).json("Thanks for registering");
//                           }
//                         }
//                       );
//                     }
//                   });
//                 }
//               }
//             }
//           );
//         }
//       }
//     );
//   }
// );
// add new volunteer on one of  sessions and updating volunteers table and bookings table
app.post(
  "/sessions/newVolunteer",
  [
    body("name", "Name can't be empty").notEmpty(),
    body("lastname", "Last Name can't be empty").notEmpty(),
    body("address", "Address can't be empty").notEmpty(),
    body("day", "Day can't be empty").notEmpty(),
    body("time", "Time can't be empty").notEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: errors.array(),
      });
    }
    const newName = req.body.name;
    const newLastName = req.body.lastname;
    const newAddress = req.body.address;
    const newDay = req.body.day;
    const newTime = req.body.time;

    // Registering a new session by a new volunteer
    const volunteerQuery =
      "INSERT INTO volunteers (name, lastname, address) VALUES ($1, $2, $3) RETURNING id";

    db.query(
      volunteerQuery,
      [newName, newLastName, newAddress],
      (volunteerErr, volunteerResult) => {
        if (volunteerErr) {
          console.error(volunteerErr);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          const volunteerId = volunteerResult.rows[0].id;

          // Find a session in the sessions table based on day and time
          const sessionQuery =
            "SELECT id FROM sessions WHERE day = $1 AND time = $2";

          db.query(
            sessionQuery,
            [newDay, newTime],
            (sessionErr, sessionResult) => {
              if (sessionErr) {
                console.error(sessionErr);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                if (sessionResult.rows.length === 0) {
                  // No matching session found
                  res.status(404).json({ error: "Session not found" });
                } else {
                  const sessionId = sessionResult.rows[0].id;
console.log(sessionId);
                  // Insert a booking into the bookings table and set the booked status to true
                  const bookingQuery =
                    "INSERT INTO bookings (sessions_id, volunteers_id) VALUES ($1, $2)";

                  db.query(
                    bookingQuery,
                    [sessionId, volunteerId],
                    (bookingErr) => {
                      if (bookingErr) {
                        console.error(bookingErr);
                        res
                          .status(500)
                          .json({ error: "Internal Server Error" });
                      } else {
                        res.status(201).json("Thanks for registering");
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    );
  }
);


// add old volunteer on one of  sessions and updating bookings table
app.post(
  "/sessions/oldVolunteer",
  [
    body("day", "Day can't be empty").notEmpty(),
    body("time", "Time can't be empty").notEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: errors.array(),
      });
    }
    const name = req.body.name;
    const newDay = req.body.day;
    const newTime = req.body.time;

    const volunteerQuery = "SELECT id FROM volunteers WHERE Name=$1";

    db.query(volunteerQuery, [name], (volunteerErr, volunteerResult) => {
      if (volunteerErr) {
        console.error(volunteerErr);
        res.status(500).json({ error: "Internal Server Error" });
      }
      if (volunteerResult.rows.length === 0) {
        // No matching volunteer found
        res.status(404).json({ error: "volunteer not found" });
      } else {
        const volunteerId = volunteerResult.rows[0].id;
        //  Find a session in the sessions table based on day and time
        const sessionQuery =
          "SELECT id FROM sessions WHERE Day = $1 AND Time = $2";

        db.query(
          sessionQuery,
          [newDay, newTime],
          (sessionErr, sessionResult) => {
            if (sessionErr) {
              console.error(sessionErr);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              if (sessionResult.rows.length === 0) {
                // No matching session found
                res.status(404).json({ error: "Session not found" });
              } else {
                // const sessionId = sessionResult.rows[0].id + 2;
const sessionId = sessionResult.rows[0].id;
                //  Update the booked status of the session to true
                const updateSessionQuery =
                  "UPDATE sessions SET booked = true WHERE id = $1";

                db.query(
                  updateSessionQuery,
                  [sessionId],
                  (updateErr, updateResult) => {
                    if (updateErr) {
                      console.error(updateErr);
                      res.status(500).json({ error: "Internal Server Error" });
                    } else {
                      //  Insert a booking  into the bookings table
                      const bookingQuery =
                        "INSERT INTO bookings (sessions_id, volunteers_id) VALUES ($1, $2)";

                      db.query(
                        bookingQuery,
                        [sessionId, volunteerId],
                        (bookingErr, bookingResult) => {
                          if (bookingErr) {
                            console.error(bookingErr);
                            res.status(500).json({
                              error: "Internal Server Error",
                            });
                          } else {
                            res.status(201).json("Thanks for registering");
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          }
        );
      }
    });
  }
);

//returning time(morning or evening) and status of their booking(false or true)
app.get("/sessions/time/:day", async function (req, res) {
  try {
    const choosedDay = req.params.day;
    console.log(choosedDay);
    const result = await db.query(
      "select s.id,day,time,b.id IS NOT NULL AS booked  FROM sessions as s left join bookings as b on s.id=b.sessions_id WHERE day=($1)",
      [choosedDay]
    );

    if (result.rowCount === 0) {
      return res.status(404).json(`Day not found`);
    }

    res.json(result.rows); //  result.rows is an array of objects with time and booked propertis
  } catch (error) {
    console.error("Error finding session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// //deleting volunteer with id
// app.delete("/sessions/volunteers/:id", async function (req, res) {
//   const volunteerId = req.params.id;
//   try {
//     await db.query(
//       "UPDATE bookings SET volunteers_id = NULL WHERE volunteers_id = $1",
//       [volunteerId]
//     );
//     await db.query(
//       "UPDATE sessions SET Booked = false WHERE id IN (SELECT sessions_id FROM bookings WHERE volunteers_id = $1)",
//       [volunteerId]
//     );
//     await db.query("DELETE FROM volunteers WHERE id=$1", [volunteerId]);
//     res.status(200).json(volunteerId);
    
//     await db.query(
//       "DELETE FROM bookings WHERE sessions_id IN (SELECT sessions_id FROM bookings WHERE volunteers_id IS NULL AND sessions_id IN (SELECT sessions_id FROM bookings WHERE volunteers_id = $1))",
//       [volunteerId]
//     );

    
//   } catch (error) {
//     console.error("Error deleting volunteer:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


//deleting volunteer with id
app.delete("/sessions/volunteers/:id", async function (req, res) {
  const volunteerId = req.params.id;
  try {
    await db.query(
      "UPDATE sessions SET Booked = false WHERE id IN (SELECT sessions_id FROM bookings WHERE volunteers_id = $1)",
      [volunteerId]
    );
    await db.query("DELETE FROM volunteers WHERE id=$1", [volunteerId]);
    await db.query("SELECT sessions_id FROM bookings WHERE volunteers_id=$", [
      volunteerId,
    ]);

    await db.query(
      "UPDATE bookings SET volunteers_id = NULL WHERE volunteers_id = $1",
      [volunteerId]
    );
    
    
    res.status(200).json(volunteerId);
    
    await db.query(
      "DELETE FROM bookings WHERE sessions_id IN (SELECT sessions_id FROM bookings WHERE volunteers_id IS NULL AND sessions_id IN (SELECT sessions_id FROM bookings WHERE volunteers_id = $1))",
      [volunteerId]
    );

    
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(port, () => console.log(`Listening on port ${port}`));
