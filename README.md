# Soul Plane

Documentation for front-end and back-end can be found in the README.md files in the client and server subdirectories. Read through the files for more information about accessing the front- and back-end.

## Citations
- Within our backend we used [the starter app/code](https://github.com/osu-cs340-ecampus/nodejs-starter-app) provided on eCampus to get a foundation on getting started with our node.js backend. We also used [mySQL](https://sidorares.github.io/node-mysql2/docs) docs to get our code to interact with the database, [CORS request](https://www.twilio.com/en-us/blog/add-cors-support-express-typescript-api), and used the [express docs](https://expressjs.com/en/guide/routing.html) for the rest of our needs in the creation and usage of routers. A few small changes were also adapted from the following sources: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel) for form validation, and [StackOverflow](https://stackoverflow.com/questions/69264472/axios-error-typescript-annotation-must-be-any-or-unknown-if) and [TypeScript docs](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) for type checking.

## TODO
- Review Executive Summary for typos (Matt)
- Capture screenshots of each of the UI pages on the website (especially noting delete from M:N, NULLable relationship, and M:N update) (Paul)
- Polish root README (Matt)
- Polish front end README (Matt)
- Polish back end README (Matt)
- Double check phone number formatting in forms is okay (Paul)
- Change PassengersFlights to PassengerFlights anywhere that occurs (easier to say and matches what we have been using for routes in code) (Matt)

### Completed
- Condense changes to 1 page executive summary
- Fix feedback received from Draft 5 Ed post
- Write citations where needed (and highligh original work where appropriate)
- Add clarifying comments to HTML and JS files
- Make sure queries in backend match queries in DML.sql
- Make sure DDL.sql is cleanly importable
- Add citation note about starter code to README

## Suggestions from Ed
- "When deleting a passenger, the data on the confirmation screen overflows outside of the border. (I am using Mozilla Firefox on Windows 10)" - I can't reproduce this so maybe don't worry about it?
- Delete seems to not be working for Plane Types? - can't reproduce this one either

### Completed Suggestions
- Restrict NULL fields for Airports
- Validate phone number and state in passengers and add placeholders
- Restrict NULL fields for Passengers
- Restrict NULL fields for Plane Types
- Restrict NULL fields for PassengerFlights
- Add default values for Create Flight
- Add default values for Create Plane
- Edit styles for passengers so form is a single column
- Restrict flights to and from the same airport

