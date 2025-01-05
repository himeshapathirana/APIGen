const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); 
const swaggerDocument = YAML.load('./swagger.yaml');  // Path to the Swagger YAML file

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// In-memory "database"
let items = [];
let idCounter = 1;

// Create - POST /items
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    const newItem = { id: idCounter++, name, description };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read - GET /items
app.get('/items', (req, res) => {
    res.json(items);
});

// Read - GET /items/:id
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(i => i.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
    }
    res.json(item);
});

// Update - PUT /items/:id
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const item = items.find(i => i.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
    }

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    item.name = name;
    item.description = description;
    res.json(item);
});

// Delete - DELETE /items/:id
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(i => i.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found.' });
    }

    const deletedItem = items.splice(index, 1);
    res.json(deletedItem);
});

// Start the server
app.listen(port, () => {
    console.log(`CRUD application listening at http://localhost:${port}`);
});
