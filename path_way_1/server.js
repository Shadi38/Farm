const express = require("express")
const app = express();
const cors = require("cors");
require('dotenv').config();
// Use CORS middleware
// app.use(cors());
app.use(
  cors({
    origin: "https://pathway-project-1.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
const { body, validationResult } = require("express-validator");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3002");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const port = process.env.PORT || 3000;
const { Pool } = require("pg");

const db = new Pool({
  user: "shadifakhri", 
  host: "localhost",
  database: "database",
  password: "",
  port: 5432,
});

// const db = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   ssl: false,
// });

app.get('/sessions',async function (req,res) {
   const result = await db.query('SELECT * FROM sessions');
   try {
    if (result.rows.length === 0) {
      return res.json([]);
    }
    res.json(result.rows);
   } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
   }
})

app.get("/sessions/volunteers", async function (req, res) {
  const result = await db.query("SELECT * FROM volunteers");
  try {
    if (result.rows.length === 0) {
      return res.json([]);
    }
    res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

//adding name of the volunteer and adding day and sessions that choosed
app.post('/sessions/volunteers',[
    body("name", "text can't be empty").notEmpty(),
    body("day", "text can't be empty").notEmpty(),
    body("sessions", "sessions can't be empty").notEmpty(),
  ],function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: errors.array(),
      });
    }
const newName=req.body.name;
const newDay=req.body.day;
const newSessions=req.body.sessions;
const query ="INSERT INTO volunteers (name,day,sessions) VALUES($1, $2, $3)";
 db.query(query,[newName, newDay, newSessions], (err,result)=>{
    if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
       
        res.status(201).json({ message: "Thanks for registering" });
      }
})

})












app.listen(port, () => console.log(`Listening on port ${port}`));