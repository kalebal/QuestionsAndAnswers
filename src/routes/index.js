const router = require('express').Router();

//controller modules
var questionController = require('../controllers/questionController');
var answerController = require('../controllers/answerController');


router.get('/', (req, res) => {
  res.status(200).send('Routes Connected!');
});

//Question Routes
router.get('/questions', questionController.question_list);

router.get('/questions/:product_id', questionController.question_get);

router.put('/questions/:question_id/report', questionController.question_update_report);

router.put('/questions/:question_id/helpful', questionController.question_update_helpful);



//Answer Routes
router.get('/answers', answerController.answer_list);

router.get('/answers/:question_id', answerController.answer_get);

router.put('/answers/:answer_id/report', answerController.answer_update_report);

router.put('/answers/:answer_id/helpful', answerController.answer_update_helpful);

module.exports = router;