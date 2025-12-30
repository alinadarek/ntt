const router = require('express').Router();
const SchController = require('./controller');

router.post('/sch/:name/add', SchController.add);
router.get('/sch/:name/run', SchController.run);
router.get('/sch/:name/end', SchController.end);
router.get('/sch/:name/get', SchController.get);
router.get('/sch/:name/all', SchController.all);
router.delete('/sch/:name/del', SchController.del);
router.put('/sch/:name/upd', SchController.upd);

module.exports = router;