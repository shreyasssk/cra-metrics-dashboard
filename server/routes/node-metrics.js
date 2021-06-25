var express = require('express');
const router = express.Router();
const { snapshot } = require('process-list');
var pidusage = require('pidusage');

router.get('/', async (req, res) => {
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
	await res.status(200).send(data);
});

router.get('/:id', async (req, res) => {
	var pidArg = req.params['id'];
	var x = parseInt(pidArg);
	const tasks = await snapshot('pid', 'pmem', 'cpu');

	var data = tasks.filter((e) => {
		return e.pid === x;
	});
	res.send(data);
});

// router.get('/:id/mem', async (req, res) => {
// 	var pidArg = req.params['id'];
// 	var x = parseInt(pidArg);
// 	const tasks = await snapshot('pid', 'pmem');

// 	var data = tasks.filter((e) => {
// 		return e.pid === x;
// 	});

// 	var memValue = data[0].pmem;
// 	res.status(200).send(memValue);
// 	console.log(typeof memValue);
// });

// router.get('/:id/cpu', async (req, res) => {
// 	var pidArg = req.params['id'];
// 	var x = parseInt(pidArg);
// 	const tasks = await snapshot('pid', 'cpu');

// 	var data = tasks.filter((e) => {
// 		return e.pid === x;
// 	});

// 	var cpuValue = data[0].cpu;
// 	res.status(200).send(cpuValue.toString());
// });

module.exports = router;
