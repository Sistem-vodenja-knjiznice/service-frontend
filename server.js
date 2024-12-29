const express = require("express");
const path = require("path");
const client = require('prom-client');

const app = express();
const port = 3000;


client.collectDefaultMetrics();

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
});

app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', client.register.contentType);
        res.end(await client.register.metrics());
    } catch (err) {
        res.status(500).send('Error collecting metrics');
    }
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
