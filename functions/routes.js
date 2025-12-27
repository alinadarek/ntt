const router = require('express').Router();
const FnController = require('./controller');

router.post('/library/:lib/function/:name/add', FnController.add);
router.get('/library/:lib/function/:name/get', FnController.get);
router.get('/library/:name/function/all', FnController.all);
router.post('/library/:lib/function/:name/run', FnController.run);
router.delete('/library/:lib/function/:name/del', FnController.del);
router.put('/library/:lib/function/:name/upd', FnController.upd);

module.exports = router;