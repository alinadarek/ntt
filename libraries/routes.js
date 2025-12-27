const router = require('express').Router();
const LibController = require('./controller');

router.post('/library/create', LibController.create);
router.get('/library/:name/get', LibController.get);
router.get('/library/list', LibController.getAll);
router.get('/library/:name/use', LibController.compile);

module.exports = router;