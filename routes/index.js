const { Router } = require('express');

const authRoute  = require('./auth.route');
const commentRoute = require('./comment.route');

const router = Router();
router.get('/health', (req, res) => {
  res.send('All OK');
})

router.use('/v1/auth', authRoute);
router.use('/v1/api', commentRoute);

module.exports = router;

