const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { amount } = req.body;
    const apiKey = 'MP-hmmodz_store-1776566983';
    const targetUrl = `https://api.mustika.com/v1/generate?api_key=${apiKey}&amount=${amount}`;

    try {
        const response = await fetch(targetUrl);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
