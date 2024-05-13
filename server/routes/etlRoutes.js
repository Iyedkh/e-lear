// etlRoutes.js

const express = require('express');
const router = express.Router();
const etlScript = require('../etlScript');

router.get('/', async (req, res) => {
    try {
        // Call the ETL function from your ETL script
        await etlScript.performETL();
        res.status(200).json({ message: 'ETL process completed successfully' });
    } catch (error) {
        console.error('Error performing ETL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
