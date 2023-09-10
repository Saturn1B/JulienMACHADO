const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db');

const bodyParser = require('body-parser'); // Middleware to parse JSON request body

// Middleware to parse JSON request body
app.use(bodyParser.json());


// Serve static files (CSS, JavaScript, images, etc.)
app.use(express.static('public'));

// Define a route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Define an API endpoint to retrieve data from the database
app.get('/api/scores', (req, res) => {
  const sql = 'SELECT * FROM scores ORDER BY score DESC';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching player scores:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});

// Create a route to handle POST requests for creating a new player score
app.post('/api/scores', (req, res) => {
    // Assuming your request body contains player name and score
    const { playerName, score } = req.body;
  
    const sql = 'INSERT INTO scores (playerName, score) VALUES (?, ?)';
  db.query(sql, [playerName, score], (err, result) => {
    if (err) {
      console.error('Error creating player score:', err);
      return;
    }
    console.log('Player score created:', result);
  });
  
    // For testing purposes, you can log the received data
    console.log('Received data:', playerName, score);
  
    // Respond with a success message or any relevant response
    res.status(200).json({ message: 'Score created successfully' });
  });

  // Create a route to handle GET requests for retrieving the top 10 best player scores
app.get('/api/top-scores', (req, res) => {
    // SQL query to retrieve the top 10 scores ordered by score value
    const sql = 'SELECT playerName, score FROM scores ORDER BY score DESC LIMIT 10';
  
    // Execute the SQL query
    db.query(sql, (err, rows) => {
      if (err) {
        console.error('Error fetching top scores:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Respond with the retrieved top scores
      res.status(200).json(rows);
    });
  });

  app.delete('/api/scores/:id', (req, res) => {
    const scoreId = req.params.id; // Get the score ID from the URL parameter
  
    // SQL query to delete the score by its ID
    const sql = 'DELETE FROM scores WHERE id = ?';
  
    // Execute the SQL query
    db.query(sql, [scoreId], (err, result) => {
      if (err) {
        console.error('Error deleting score:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (result.affectedRows === 0) {
        // No score was deleted (score with given ID not found)
        return res.status(404).json({ error: 'Score not found' });
      }
  
      // Score was successfully deleted
      res.status(200).json({ message: 'Score deleted successfully' });
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});