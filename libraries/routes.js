const router = require('express').Router();
const LibController = require('./controller');

router.post('/library/:name/add', LibController.add);
router.get('/library/:name/get', LibController.get);
router.get('/library/all', LibController.all);
router.get('/library/:name/use', LibController.use);
router.delete('/library/:name/del', LibController.del);
router.put('/library/:name/upd', LibController.upd);

module.exports = router;