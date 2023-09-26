import express from 'express';
import parcelController from './controllers/parcelController';
import {generateParcels} from "./services/parcelService";
import { orders } from "./utils/data";
import cors from 'cors';
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../frontend/dist/frontend')));

app.use('/api', parcelController);
app.get('/parcels', async (req, res) => {
    try {
        const parcels = await generateParcels(orders);
        res.json(parcels);
    } catch (error) {
        res.status(500).send('error when generating parcels');
    }
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});