const router = require('express').Router();
const FnController = require('./controller');

router.post('/library/:lib/function:name/add', FnController.load);
router.get('/library/:lib/function/:name/get', FnController.get);
router.get('/library/:name/function/list', FnController.getAll);
router.post('/library/:lib/function/:name/execute', FnController.exec);

module.exports = router;