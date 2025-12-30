const router = require('express').Router();
const JobController = require('./controller');

router.post('/job/:name/add', JobController.add);
router.get('/job/:name/run', JobController.run);
router.get('/job/:name/end', JobController.end);
router.get('/job/:name/get', JobController.get);
router.get('/job/:name/all', JobController.all);
router.delete('/job/:name/del', JobController.del);
router.put('/job/:name/upd', JobController.upd);

module.exports = router;