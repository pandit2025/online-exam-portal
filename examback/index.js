var express = require("express");
var app = express();
var dotenv = require("dotenv");
var cn = require("./config/db");

dotenv.config();

var adminRouter = require("./routes/adminRoutes");
var questionRouter = require("./routes/questionRoutes");
var testqRouter = require("./routes/testqRoutes");
var testanswerRouter = require("./routes/testanswerRoutes");
var categoryRouter = require("./routes/categoryRoutes");
var contactRouter = require("./routes/contactRoutes");
var resultRouter = require("./routes/resultRoutes");
var testRouter = require("./routes/testRoutes");
var registerRouter = require("./routes/registerRoutes");

var cors = require("cors");


// Middleware
app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}));


// Check imported routers
console.log("adminRouter:", typeof adminRouter);
console.log("questionRouter:", typeof questionRouter);
console.log("testqRouter:", typeof testqRouter);
console.log("testanswerRouter:", typeof testanswerRouter);
console.log("categoryRouter:", typeof categoryRouter);
console.log("contactRouter:", typeof contactRouter);
console.log("resultRouter:", typeof resultRouter);
console.log("testRouter:", typeof testRouter);
console.log("registerRouter:", typeof registerRouter);


// Routes
app.use("/api/admin", adminRouter);
app.use("/api/question", questionRouter);
app.use("/api/testq", testqRouter);
app.use("/api/testanswer", testanswerRouter);
app.use("/api/category", categoryRouter);
app.use("/api/contact", contactRouter);
app.use("/api/result", resultRouter);
app.use("/api/test", testRouter);
app.use("/api/register", registerRouter);


// Start server
app.listen(process.env.PORT, () => {
    console.log("Server started at http://localhost:" + process.env.PORT);
});