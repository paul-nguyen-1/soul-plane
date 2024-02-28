// Date: 2/27/2024
// Express code adapted from
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Date: 2/27/2024
// Code for interacting with MySQL database adapted from 
// Source URL: https://sidorares.github.io/node-mysql2/docs

/* SETUP */
import 'dotenv/config'
import express, { Express, Request, Response } from "express";


const app: Express = express();
const port = 55767;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Date: 2/28/2024
// Code for allowing Cross-Origin Requests (CORS) adapted from
// Source URL: https://www.twilio.com/en-us/blog/add-cors-support-express-typescript-api
import cors from 'cors'
app.use(cors());

const allowedOrigins = [
  'http://flip3.engr.oregonstate.edu',
  'http://flip2.engr.oregonstate.edu'
];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options))

// Database
import db from "./database/db-connector"

/* ROUTES */
// Get all airports
app.get("/Airports", async (req: Request, res: Response) => {
  // Define queries
  const query = 'SELECT * FROM Airports;';

  // Get results from database
  const [results] = await db.pool.query(query);

  // Send JSON back to client
  res.send(JSON.stringify(results));
});

// Get passenger flights
app.get("/PassengerFlights", async (req: Request, res: Response) => {
  // Define queries
  const query = 'SELECT * FROM Passengers_flights;';

  // Get results from database
  const [results] = await db.pool.query(query);

  // Send JSON back to client
  res.send(JSON.stringify(results));
});

// Create new airport
app.post('/Airports', async (req, res) => {
  try {
    // Define query
    let data = req.body;
    let location = data.location || 'NULL';

    let query = `INSERT INTO Airports (airport_name, airport_code, location) VALUES ('${data.airport_name}', '${data.airport_code}', '${location}')`;

    // Get results from database
    const [result] = await db.pool.query(query);

    // Send JSON back to client
    res.json({ success: true, message: 'Airport added successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Update existing Airport
app.put('/Airports/:airportId', async (req, res) => {
  try {
    // Define query
    const airportId = req.params.airportId;
    let data = req.body;
    let location = data.location || 'NULL';

    let query = `UPDATE Airports SET airport_name = '${data.airport_name}', airport_code = '${data.airport_code}', location = '${location}' WHERE airport_id = ${airportId}`;

    // Get results from database
    const [result] = await db.pool.query(query);

    // Send JSON back to client
    res.json({ success: true, message: 'Airport updated successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Delete existing Airport
app.delete('/Airports/:airportId', async (req, res) => {
  try {
    // Define query
    const airportId = req.params.airportId;
    const deleteQuery = `DELETE FROM Airports WHERE airport_id = ${airportId}`;

    // Get result from database
    const [result] = await db.pool.query(deleteQuery);

    // Send JSON back to client
    res.json({ success: true, message: 'Airport deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get("/plane-types", async (req: Request, res: Response) => {
  try {
    const selectQuery = 'SELECT * FROM Plane_types'

    const [rows] = await db.pool.query(selectQuery)

    res.json(rows)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.get("/plane-types/:id", async (req: Request, res: Response) => {
  try {
    const selectQuery = `SELECT * FROM Plane_types WHERE plane_type_id = ${req.params.id}`

    const [rows] = await db.pool.query(selectQuery)

    res.json(rows)
  } catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})

app.post("/plane-types/", async (req: Request, res: Response) => {
  try {
    const typeName = req.body.type_name
    const capacity = parseInt(req.body.capacity)
    const rangeInHours = parseInt(req.body.range_in_hrs)
    const insertQuery = `INSERT INTO Plane_types (type_name, capacity, range_in_hrs)
    VALUES (${typeName}, ${capacity}, ${rangeInHours});`

    db.pool.query(insertQuery)

    res.redirect("/plane-types")
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

app.delete("/plane-types", async (req: Request, res: Response) => {
  try {
    const planeTypeID = parseInt(req.body.id)
    const deleteQuery = `DELETE FROM Plane_types WHERE plane_type_id = ${planeTypeID}`

    db.pool.query(deleteQuery)

    res.sendStatus(204)
  } catch {
    res.sendStatus(400)
  }
})

app.put("/plane-types/:id", async (req: Request, res: Response) => {
  try {
    const planeTypeId = req.params.id
    
    const typeName = req.body.type_name
    const capacity = parseInt(req.body.capacity)
    const rangeInHours = parseInt(req.body.range_in_hrs)
    const updateQuery = `
      UPDATE Plane_types
        SET type_name = ${typeName},
        capacity = ${capacity},
        range_in_hrs = ${rangeInHours}
        WHERE plane_type_id = ${planeTypeId}
    `

    db.pool.query(updateQuery)

    res.redirect("/plane-types")
  } catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})

/* LISTENER */
app.listen(port, () => {
  console.log(
    `Express started on http://${process.env.DBHOST}:${port}; press Ctrl-C to terminate.`
  );
});
