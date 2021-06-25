var express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/system-metrics', require('./routes/os-utils'));

PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
