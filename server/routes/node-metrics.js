var express = require('express');
const router = express.Router();
const { snapshot } = require('process-list');

router.get('/', async (req, res) => {
	try {
		const tasks = await snapshot(
			'pid',
			'ppid',
			'name',
			'path',
			'threads',
			'owner',
			'priority',
			'cmdline',
			'starttime',
			'vmem',
			'pmem',
			'cpu',
			'utime',
			'stime'
		);

		var data = tasks.filter((e) => {
			return e.name === 'node';
		});
		res.status(200).send(data);
	} catch (err) {
		console.log('node-metrics', err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		var pidArg = req.params['id'];
		var x = parseInt(pidArg);
		const tasks = await snapshot('pid', 'pmem', 'cpu');
		var data = tasks.filter((e) => {
			return e.pid === x;
		});
		res.send(data);
	} catch (err) {
		console.log('node-metrics /:id', err);
	}
});

module.exports = router;
