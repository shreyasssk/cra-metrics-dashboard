var express = require('express');
const router = express.Router();
const { snapshot } = require('process-list');

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
		return e.name !== '';
	});
	res.send(data);
});

module.exports = router;
