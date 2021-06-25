var express = require('express');
var os = require('os-utils');
const router = express.Router();

router.get('/', async (req, res) => {
	var cpuStats = await new Promise((resolve) => os.cpuUsage(resolve));
	var cpuFree = await new Promise((resolve) => os.cpuFree(resolve));
	await res.send({
		platform: os.platform(),
		cpu_count: os.cpuCount(),
		cpu_usage: cpuStats,
		cpu_free: cpuFree,
		free_memory: os.freemem().toString(),
		total_memory: os.totalmem(),
		process_uptime: os.processUptime(),
		sys_uptime: os.sysUptime(),
	});
});

module.exports = router;
