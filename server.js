const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
});

// Serve the React app in production
app.use(express.static(path.join(__dirname, "build")));

// Catch-all handler to allow React Router to handle other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
