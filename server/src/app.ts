/* SETUP */
import 'dotenv/config'
import express, { Express, Request, Response } from "express";
const app: Express = express();
const port = 9124;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Database
import db from "./database/db-connector"

/* ROUTES */
app.get("/", async (req: Request, res: Response) => {
  // Define queries
  const query = 'SELECT * FROM airports;';

  // Get results from database
  const [results] = await db.pool.query(query);

  // Send JSON back to client
  res.send(JSON.stringify(results));
});

/* LISTENER */
app.listen(port, () => {
  console.log(
    "Express started on http://localhost:" +
      port +
      "; press Ctrl-C to terminate."
  );
});
