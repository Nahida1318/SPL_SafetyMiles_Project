// var db = require("./database.js");

// async function createIncidentTable() {
//   console.log("creating incident table");
//   try {
//     const res = await db.query(
//       "CREATE TABLE police_data (\
//                 id SERIAL PRIMARY KEY,\
//                 latitude DOUBLE PRECISION,\
//                 longitude DOUBLE PRECISION,\
//                 incident VARCHAR(255),\
//                 date_of_incident DATE\
//             );"
//     );
//     console.log(res);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     // db.end();
//   }
// }

// async function createUserTable() {
//   console.log("creating user table");
//   try {
//     const res = await db.query(
//       "CREATE TABLE user_data (\
//                 id SERIAL PRIMARY KEY,\
//                 email VARCHAR(255) UNIQUE NOT NULL,\
//                 password VARCHAR(255) NOT NULL,\
//                 );"
//     );
//     console.log(res);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     db.end();
//   }
// }

// async function createHistoryTable() {
//   console.log("creating favourite table");
//   try {
//     const res = await db.query(
//       "CREATE TABLE history (\
//                 id SERIAL PRIMARY KEY,\
//                 user_id INTEGER NOT NULL,\
//     current_latitude DOUBLE NOT NULL,\
//     current_longitude DOUBLE NOT NULL,\
//     destination_latitude DOUBLE NOT NULL,\
//     destination_longitude DOUBLE NOT NULL,\
//     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,\
//                 FOREIGN KEY (user_id) REFERENCES user_data(id)\
//             )"
//     );
//     console.log(res);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     db.end();
//   }
// }

// async function createFavouriteTable() {
//   console.log("creating favourite table");
//   try {
//     const res = await db.query(
//       "CREATE TABLE favourite (\
//                 id SERIAL PRIMARY KEY,\
//                 user_id INTEGER NOT NULL,\
//     current_latitude DOUBLE NOT NULL,\
//     current_longitude DOUBLE NOT NULL,\
//     destination_latitude DOUBLE NOT NULL,\
//     destination_longitude DOUBLE NOT NULL,\
//                 FOREIGN KEY (user_id) REFERENCES user_data(id)\
//             )"
//     );
//     console.log(res);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     db.end();
//   }
// }

// async function createHistoryTable() {
//     console.log("creating history table");
//     try {
//         const res = await db.query(
//             'CREATE TABLE history (\
//                 id SERIAL PRIMARY KEY,\
//                 user_id INTEGER NOT NULL,\
//                 lat FLOAT(10, 6) NOT NULL,\
//                 lng FLOAT(10, 6) NOT NULL,\
//                 FOREIGN KEY (user_id) REFERENCES user_data(id)\
//             )'
//         );
//         console.log(res);
//     } catch (err) {
//         console.error(err);
//     } finally {
//         db.end();
//     }
// }

// createIncidentTable();
// createUserTable();
// createFavouriteTable();
// createHistoryTable();

// module.exports = res;

const db = require("./database.js");

async function createIncidentTable() {
  console.log("creating incident table");
  try {
    const res = await db.query(
      "CREATE TABLE IF NOT EXISTS police_data (\
                id SERIAL PRIMARY KEY,\
                latitude DOUBLE PRECISION,\
                longitude DOUBLE PRECISION,\
                incident VARCHAR(255),\
                date_of_incident DATE\
            );"
    );
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async function createUserTable() {
  console.log("creating user table");
  try {
    const res = await db.query(
      "CREATE TABLE IF NOT EXISTS user_data (\
                id SERIAL PRIMARY KEY,\
                email VARCHAR(255) UNIQUE NOT NULL,\
                password VARCHAR(255) NOT NULL\
            );"
    );
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async function createHistoryTable() {
  console.log("creating history table");
  try {
    const res = await db.query(
      "CREATE TABLE IF NOT EXISTS history (\
                id SERIAL PRIMARY KEY,\
                user_id INTEGER NOT NULL,\
                current_latitude DOUBLE PRECISION NOT NULL,\
                current_longitude DOUBLE PRECISION NOT NULL,\
                destination_latitude DOUBLE PRECISION NOT NULL,\
                destination_longitude DOUBLE PRECISION NOT NULL,\
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
                FOREIGN KEY (user_id) REFERENCES user_data(id)\
            );"
    );
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async function createFavouriteTable() {
  console.log("creating favourite table");
  try {
    const res = await db.query(
      "CREATE TABLE IF NOT EXISTS favourite (\
                id SERIAL PRIMARY KEY,\
                user_id INTEGER NOT NULL,\
                current_latitude DOUBLE PRECISION NOT NULL,\
                current_longitude DOUBLE PRECISION NOT NULL,\
                destination_latitude DOUBLE PRECISION NOT NULL,\
                destination_longitude DOUBLE PRECISION NOT NULL,\
                FOREIGN KEY (user_id) REFERENCES user_data(id)\
            );"
    );
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async function createTables() {
  await createUserTable();
  await createIncidentTable();
  await createHistoryTable();
  await createFavouriteTable();
  db.end();
}

createTables();

module.exports = db;
