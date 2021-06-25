var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/system-metrics', require('./routes/os-utils'));
app.use('/node-metrics', require('./routes/node-metrics'));
app.use('/process-list', require('./routes/process-list'));

PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
