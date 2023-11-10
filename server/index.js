const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)

mongoose.connect('mongodb://localhost:27017/PNW_Map', { useNewUrlParser: true, useUnifiedTopology: true});

app.listen(3000, () => console.log('Server running on port 3000'));
