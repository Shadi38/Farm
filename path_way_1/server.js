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
  console.log("Successfully connected to database");
});

app.get("/", function (req, res) {
  res.status(200).json("wellcome");
});

app.get("/sessions", async function (req, res) {
  try {
    const result = await db.query("SELECT * FROM sessions ORDER BY id ");
    res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/volunteers", async function (req, res) {
  try {
    const result = await db.query("SELECT * FROM volunteers");
    res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/sessions/booked", async function (req, res) {
  try {
    const result = await db.query(
      "select s.id,day,time,b.id IS NOT NULL AS booked  FROM sessions as s left join bookings as b on s.id=b.sessions_id where b.id IS NOT NULL"
    );
    res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// bookings table
app.get("/bookings", async function (req, res) {
  try {
    const result = await db.query("SELECT * FROM bookings");
    res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

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
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }

    const newName = req.body.name;
    const newLastName = req.body.lastname;
    const newAddress = req.body.address;
    const newDay = req.body.day;
    const newTime = req.body.time;

    try {
      // Registering a new session by a new volunteer
      const volunteerQuery =
        "INSERT INTO volunteers (name, lastname, address) VALUES ($1, $2, $3) RETURNING id";

      const volunteerResult = await db.query(volunteerQuery, [
        newName,
        newLastName,
        newAddress,
      ]);
      const volunteerId = volunteerResult.rows[0].id;

      // Find a session in the sessions table based on day and time
      const sessionQuery =
        "SELECT id FROM sessions WHERE day = $1 AND time = $2";

      const sessionResult = await db.query(sessionQuery, [newDay, newTime]);

      if (sessionResult.rows.length === 0) {
        // No matching session found
        res.status(404).json({ error: "Session not found" });
      } else {
        const sessionId = sessionResult.rows[0].id;

        // Insert a booking into the bookings table and set the booked status to true
        const bookingQuery =
          "INSERT INTO bookings (sessions_id, volunteers_id) VALUES ($1, $2)";
        await db.query(bookingQuery, [sessionId, volunteerId]);

        res.status(201).json("Thanks for registering");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


// add old volunteer on one of  sessions and updating bookings table
app.post("/sessions/oldVolunteer", [
    body("day", "Day can't be empty").notEmpty(),
    body("time", "Time can't be empty").notEmpty(),
  ],async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: errors.array(),
      });
    }
  const { name, day, time } = req.body;
  try {
    const volunteerResult = await db.query("SELECT id FROM volunteers WHERE Name=$1", [name]);

    if (volunteerResult.rows.length === 0) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    const volunteerId = volunteerResult.rows[0].id;
    const sessionResult = await db.query("SELECT id FROM sessions WHERE Day = $1 AND Time = $2", [day, time]);

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    const sessionId = sessionResult.rows[0].id;
    await db.query("INSERT INTO bookings (sessions_id, volunteers_id) VALUES ($1, $2)", [sessionId, volunteerId]);

    res.status(201).json("Thanks for registering");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//returning time(morning or evening) and status of their booking(false or true)
app.get("/sessions/time/:day", async function (req, res) {
  try {
    const choosedDay = req.params.day;
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

//deleting volunteer with id
app.delete("/sessions/volunteers/:id", async function (req, res) {
  const volunteerId = req.params.id;
  try {
     await db.query("DELETE FROM bookings WHERE volunteers_id=$1", [
       volunteerId
     ]);
    res.status(200).json(volunteerId);
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(port, () => console.log(`Listening on port ${port}`));
