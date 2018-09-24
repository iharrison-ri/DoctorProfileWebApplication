const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.send('hey')
})

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});