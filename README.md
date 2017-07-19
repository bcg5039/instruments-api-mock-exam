# Getting Started

The following steps will get you up and running!

## Clone the repository
- Navigate to your preferred local code folder and using your favorite command line application execute the following command.

-  `git clone https://github.com/bcg5039/instruments-api-mock-exam.git <insert your project folder name here>`
## Install dependencies
- Navigate to the project folder that you cloned and in command line type `npm install` to install the projects dependencies

## Loading data into your database
- First make sure your .env file matches the .env-sample provided with the project
in order to populate your database with the data in load-data.js
- For a reminder the .env file should contain these values.

`COUCHDB_URL = https://<your database key>:<your database password>@<database url>`
`COUCHDB_NAME = <your database name>`
`PORT = <whichever port you want to run the database from>`

- If your .env file is ready to go and you have node installed on your pc type the following into your command line to populate your database `node load-data.js`

## Load indexes
- To load the indexes for this project type the following into your command line `node load-indexes.js`

## Start the API
- There is a script in place to help get the API up and running easily.  Within your command line type `npm start`
- you should get the following message if successful `"API running on port: <whatever you set your .env port variable to">`
- to make sure you can access the API open up a browser and in the address bar type `localhost:<your port>/test` if you were successful in starting the API your browser will say "dal is ok."

## Environment variables

An application like Postman can be used to test out each of these environment variables to see how the API operates

### POST
Add an instrument to the database of instruments
`POST /instruments`

**Request Body**

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Property</th>
      <th>Required</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>true</td>
      <td>string</td>
      <td>name of the instrument
      </td>
    </tr>
    <tr>
      <td>category</td>
      <td>true</td>
      <td>string</td>
      <td>instrument category  
      </td>
    </tr>
    <tr>
      <td>group</td>
      <td>true</td>
      <td>string</td>
      <td>what group the instrument falls in.
      </td>
    </tr>
    <tr>
      <td>retailPrice</td>
      <td>true</td>
      <td>number</td>
      <td>current retail price of instrument.
      </td>
    </tr>
    <tr>
      <td>manufacturer</td>
      <td>true</td>
      <td>string</td>
      <td>name of manufacturer.
      </td>
    </tr>
  </tbody>
</table>

**Sample Request Body JSON Data**

  ```
  {
      "name": "Tuba Delux",
      "category": "tuba",
      "group": "brass",
      "retailPrice": 300,
      "manufacturer": "Symphonic, Inc."
  }
  ```
on a successful post you should get a response that looks like this.

  **Sample Response**

  ```
  {
    "ok": true,
    "id": "instrument_tuba_tuba_delux",
    "rev": "1-c617189487fbe325d01cb7fc74acf45b"
  }
  ```
### GET
 Retrieve an instrument

`GET  /instruments/:id`  

Retrieves an instrument by the `:id` path

  **Sample Request**

  ```
  GET /instruments/instrument_tuba_tuba_delux
  ```

  **Sample Response**

  ```
  {
    "_id": "instrument_tuba_tuba_delux",
    "_rev": "1-c617189487fbe325d01cb7fc74acf45b",
    "name": "Tuba Delux",
    "category": "tuba",
    "group": "brass",
    "retailPrice": 300,
    "manufacturer": "Symphonic, Inc.",
    "type": "instrument"
  }
  ```


### PUT
used to update an instrument in the database
  `PUT /instruments/:id`

  here is an example of a put request `PUT /instruments/instrument_oboe_oboe_beethoven`

  **Request Body JSON Data**
make sure that _rev is the most recent rev value or else it will cause a conflict error
  ```
  {
      "_id": "instrument_oboe_oboe_beethoven",
      "_rev": "2-b8ed010219944478ff073b61387026c9",
      "name": "Oboe Beethoven",
      "type": "instrument",
      "category": "Oboe",
      "group": "winds",
      "retailPrice": 602,
      "manufacturer": "Symphonic, Inc."
  }
  ```

  **Sample Response**

  ```
  {
    "ok": true,
    "id": "instrument_oboe_oboe_beethoven",
    "rev": "3-7e9b8cac710e70bfe0bef2de7bb3cfdb"
  }
  ```

### DELETE
 deletes an instrument from the database based off the `:id` value

 **Sample Request**

  ```
  DELETE /instruments/instrument_tuba_tuba_delux
  ```

  **Sample Response**

  ```
  {
      "ok": true,
      "id": "instrument_tuba_tuba_delux",
      "rev": "2-fdd7fcbc62477372240862772d91c88f"
  }
  ```
