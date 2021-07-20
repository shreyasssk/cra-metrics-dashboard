var express = require('express');
const router = express.Router();
const fkill = require('fkill');

router.get('/:id', async (req, res) => {
	var pidArg = req.params['id'];
	var pidValue = parseInt(pidArg);

	try {
		await fkill(pidValue, {
			tree: true,
			ignoreCase: true,
		});
		console.log('Process terminated!');
		res.status(201).send('Process terminated!');
	} catch (err) {
		console.error(
			err.message
				.split(/(\r\n|\n|\r)/gm)
				.filter((str) => str.includes('Error'))
				.toString()
		);
		res.status(400).send(
			err.message
				.split(/(\r\n|\n|\r)/gm)
				.filter((str) => str.includes('Error'))
				.toString()
		);
	}
});

module.exports = router;
