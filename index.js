const express = require('express');
const cors = require('cors');
const app =express()
const port = process.env.PORT || 5000













app.get('/', (req, res) => {
    res.send('Job Portal Server Is Running.........')
})
app.listen(port, () => {
    console.log(`Job Portal Server Is Running On Port ${port}`);
})