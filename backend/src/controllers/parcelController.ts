import express from 'express';
import { generateParcels } from '../services/parcelService';
import { orders } from '../utils/data';

const router = express.Router();

router.get('/generateParcels', async (req, res) => {
    try {
        const parcels = await generateParcels(orders);
        res.json(parcels);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});


export default router;
