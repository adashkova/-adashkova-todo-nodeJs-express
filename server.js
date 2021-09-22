const express = require('express');
const cors = require('cors');


const app = express();

var corsOptions = {
  origin: 'http://localhost:4000',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our application.' });
});

const PORT = process.env.PORT || 4000;

require("./app/routes/todos.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
