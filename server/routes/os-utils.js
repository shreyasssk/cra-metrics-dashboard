var express = require('express');
var os = require('os-utils');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		var cpuStats = await new Promise((resolve) => os.cpuUsage(resolve));
		var cpuFree = await new Promise((resolve) => os.cpuFree(resolve));
		res.send({
			platform: os.platform(),
			cpu_count: os.cpuCount(),
			cpu_usage: cpuStats,
			cpu_free: cpuFree,
			free_memory: os.freemem().toString(),
			total_memory: os.totalmem(),
			process_uptime: os.processUptime(),
			sys_uptime: os.sysUptime(),
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
