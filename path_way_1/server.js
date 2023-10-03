const express = require("express")
const app = express();
const cors = require("cors");
require('dotenv').config();

 app.use(cors());

app.use(express.json());
const { body, validationResult } = require("express-validator");

const port = process.env.PORT || 3000;
const { Pool } = require("pg");

// const db = new Pool({
//   user: "shadifakhri", 
//   host: "localhost",
//   database: "database",
//   password: "",
//   port: 5432,
// });

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("connected");
})

app.get("/",function (req,res) {
res.status(200).json("wellcome")
})
// all sessions
app.get('/sessions',async function (req,res) {
  try {
    const result = await db.query("SELECT * FROM sessions ORDER BY id ");

    if (result.rows.length === 0) {
      return res.json([]);
    }
    res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
})
// volunteers
app.get("/volunteers", async function (req, res) {
 try {
   const result = await db.query("SELECT * FROM volunteers");

   if (result.rows.length === 0) {
     return res.json([]);
   }
   res.json(result.rows);
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
// add new volunteer on one of  sessions and updating bookings table
app.post(
  "/sessions/volunteers",
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

    //  Insert the new volunteer into the volunteers table
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

          //  Find a session in the sessions table based on day and time
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
                  
                 console.log( sessionId);
                  //  Update the booked status of the session to true
                  const updateSessionQuery =
                    "UPDATE sessions SET booked = true WHERE id = $1";

                  db.query(
                    updateSessionQuery,
                    [sessionId],
                    (updateErr, updateResult) => {
                      if (updateErr) {
                        console.error(updateErr);
                        res
                          .status(500)
                          .json({ error: "Internal Server Error" });
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

// //deleting volunteer with id
// app.delete("/sessions/volunteers/:id", async function (req, res) {
//   const volunteerId = req.params.id;
//   try {
//     const result = await db.query("DELETE FROM volunteers WHERE id=$1", [volunteerId]);
//     if (result.rowCount === 0) {
//       return res.status(404).json(`Volunteer with id ${volunteerId} not found`);
//     }
//     res.json(volunteerId);
//   } catch (error) {
//     console.error("Error deleting volunteer:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


app.listen(port, () => console.log(`Listening on port ${port}`));