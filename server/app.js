var express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/system-metrics', require('./routes/os-utils'));
app.use('/node-metrics', require('./routes/node-metrics'));
app.use('/process-list', require('./routes/process-list'));
app.use('/terminate', require('./routes/terminate-process'));

PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
