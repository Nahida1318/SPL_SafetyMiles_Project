const  express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
router.use(bodyParser.json());

const db= require('./database.js')


router.get('/all',async (req, res) => {
    

    try {
        const result = await db.query(
            'SELECT * FROM police_data\
            order by id'
              );
            
        console.log(result.rows);
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.send(err);

    }



    

    
})


router.delete('/deleteAll', async (req, res) => {
    try {
        const result = await db.query(
            'DELETE FROM police_data RETURNING *'
        );

        if (result.rowCount === 0) {
            res.status(404).send({ message: 'No records found to delete' });
        } else {
            console.log(`Deleted all records`);
            res.send({ message: 'All records deleted successfully', records: result.rows });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


router.post('/new', async (req, res) => {
    const newProduct = req.body
    
    try {

       
        
        const result = await db.query(
            "INSERT INTO police_data (latitude, longitude, incident, date_of_incident)\
            VALUES (23.7504569,90.4203698,'Assault', '2022-01-04'),\
            (23.7504569,90.4203698,'Theft', '2023-05-03'),\
            (23.7504569,90.4203698,'Snatching', '2024-05-03'),\
            (23.7504644,90.4210764,'Robbery', '2024-03-01'),\
            (23.7504644,90.4210764,'Theft', '2022-01-04'),\
            (23.7342718,90.3924343,'Robbery', '2024-05-03'),\
            (23.7342718,90.3924343,'Robbery', '2021-05-03'),\
            (23.7338886,90.3925475,'Theft', '2022-05-03'),\
            (23.7338646,90.3943726,'Assault', '2020-05-03'),\
            (23.7338646,90.3943726,'Robbery', '2024-05-03'),\
            (23.7338646,90.3943726,'Robbery', '2024-05-03'),\
            (23.7273183,90.4026561,'Robbery', '2021-05-03'),\
            (23.7273183,90.4026561,'Snatching', '2023-05-03'),\
            (23.7279987,90.3985509,'Robbery', '2022-05-03'),\
            (23.7279987,90.3985509,'Theft', '2021-05-03'),\
            (23.7279987,90.3985509,'Robbery', '2023-05-03'),\
            (23.7280853,90.3982223,'Robbery', '2022-05-03'),\
            (23.7439057,90.4223393,'Theft','2024-05-03'),\
            (23.7439057,90.4223393,'Snatching','2024-05-03'),\
            (23.7439057,90.4223393,'Robbery','2024-05-03'),\
            (23.7289798,90.3987676,'Theft','2022-09-09'),\
            (23.7289798,90.3987676,'Robbery','2023-10-09'),\
            (23.7289797,90.3987676,'Snatching','2024-10-09'),\
            (23.7289797,90.3987676,'Theft','2022-09-09'),\
            (23.7289797,90.3987676,'Robbery','2023-10-09'),\
            (23.7289797,90.3987676,'Snatching','2024-10-09');");
            
            ;
            
        console.log(result);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.send(err);

    } 

})

// router.post('/userinput', async (req, res) => {
//     const { current_lat, current_lng, incident, date } = req.body;

//     if ( ! current_lat || ! current_lng || ! incident || ! date ) {
//         return res.status(400).json({ error: 'all information are required' });
//     }

//     try {
//         // Query to find the user by email
//         const result = await db.query(
//             'INSERT INTO police_data (latitude, longitude, incident, date_of_incident) VALUES ($1, $2, $3, $4) RETURNING *',
//             [current_lat, current_lng, incident, date]
//         );
//         // Successfully authenticated
//         // Here you would typically assign a token or start a session
//         res.status(200).json({ message: 'successful', result:result.rows[0]});
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

const sendNotification = require('./mailer');

router.post('/userinput', async (req, res) => {
  const { current_lat, current_lng, incident, date } = req.body;

  if (!current_lat || !current_lng || !incident || !date) {
    return res.status(400).json({ error: 'All information is required' });
  }

  try {
    // Insert the new incident
    const result = await db.query(
      'INSERT INTO police_data (latitude, longitude, incident, date_of_incident) VALUES ($1, $2, $3, $4) RETURNING *',
      [current_lat, current_lng, incident, date]
    );

    // Check for matching favorite routes
    const favorites = await db.query(
      'SELECT u.email, f.current_latitude, f.current_longitude, f.destination_latitude, f.destination_longitude \
       FROM favourite f \
       JOIN user_data u ON f.user_id = u.id \
       WHERE f.current_latitude = $1 OR f.current_longitude = $2 OR f.destination_latitude = $1 OR f.destination_longitude = $2',
      [current_lat, current_lng]
    );

    // Send notifications
    favorites.rows.forEach(favorite => {
      const emailText = `A new incident (${incident}) has been reported at (${current_lat}, ${current_lng}) on ${date}. This location matches one of your favorite routes.`;
      sendNotification(favorite.email, 'New Incident Alert', emailText);
    });

    res.status(200).json({ message: 'Incident added successfully', result: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router