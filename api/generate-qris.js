const https = require('https');

export default function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { amount } = req.body;
    // API Key Baru Kamu
    const apiKey = 'MP-wdZbcLj8Czezunp-7CjIQ5eTz85YH0as';
    const targetUrl = `https://api.mustika.com/v1/generate?api_key=${apiKey}&amount=${amount}`;

    https.get(targetUrl, (apiRes) => {
        let data = '';
        apiRes.on('data', (chunk) => { data += chunk; });
        apiRes.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                res.status(200).json(jsonData);
            } catch (e) {
                res.status(500).json({ success: false, message: "Respon API tidak valid" });
            }
        });
    }).on('error', (err) => {
        res.status(500).json({ success: false, message: err.message });
    });
}
