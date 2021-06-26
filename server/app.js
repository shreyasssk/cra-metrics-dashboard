var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/system-metrics', require('./routes/os-utils'));
app.use('/node-metrics', require('./routes/node-metrics'));
app.use('/process-list', require('./routes/process-list'));

PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
