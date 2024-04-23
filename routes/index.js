const router = require('express').Router();

router.use((req, res)  => res.send('Not a valid route'));

module.exports = router;