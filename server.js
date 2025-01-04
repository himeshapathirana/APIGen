const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); 
const swaggerDocument = YAML.load('./swagger.yaml');  // Path to the Swagger YAML file

const app = express();
const port = 3000;

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Simple GET route
app.get('/', (req, res) => {
    res.send('Hello world!');
});

// Start the server
app.listen(port, () => {
    console.log(`Example application listening at http://localhost:${port}`);
});
