const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

const MUSTIKA_API_KEY = 'MP-hmmodz_store-1776566983';

app.post('/api/generate-qris', async (req, res) => {
    try {
        const { amount } = req.body;
        const response = await fetch(`https://api.mustika.com/v1/generate?api_key=${MUSTIKA_API_KEY}&amount=${amount}`);
        const data = await response.json();

        if (data.success || data.status === 'success') {
            res.json({ 
                success: true, 
                qr_url: data.qr_image_url || data.data.qr_url 
            });
        } else {
            res.status(400).json({ success: false, message: 'Gagal generate QRIS' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/transfer', async (req, res) => {
    try {
        const { fromUser, toUser, amount } = req.body;
        res.json({ success: true, message: 'Transfer berhasil diproses' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => console.log('Server HM STREAM Berjalan di Port 3000'));