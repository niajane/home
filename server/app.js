const express = require('express');
const cors = require('cors');
const app = express();
require('./db/db');
app.use(express.json());
app.use(cors());

app.use('/posts', require('./routes/posts'));
app.use('/todos', require('./routes/todos'));

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Connected to post: ${PORT}`);
});
