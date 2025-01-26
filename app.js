import express from 'express'
const app = express()
const PORT = 3000
import path from 'path';
import Router from './routes/route.js'
import { connect } from 'mongoose'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

await connect('mongodb://localhost:27017/authentication')
.then(()=>{
    console.log('Database connected')
})
app.use(express.json())
app.use('/',Router)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve the HTML file for the home page
});

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})