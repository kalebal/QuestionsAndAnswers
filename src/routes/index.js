const router = require('express').Router();

//controller modules
var questionController = require('../controllers/questionController');
var answerController = require('../controllers/answerController');


router.get('/', (req, res) => {
  res.status(200).send('Routes Connected!');
});

//Question Routes
router.get('/questions', questionController.question_get);

router.post('/questions', questionController.add_question);

router.put('/questions/:question_id/report', questionController.question_update_report);

router.put('/questions/:question_id/helpful', questionController.question_update_helpful);



//Answer Routes
router.get('/questions/:question_id/answers', answerController.answer_get);

router.post('/questions/:question_id/answers', answerController.add_answer);

router.put('/answers/:answer_id/report', answerController.answer_update_report);

router.put('/answers/:answer_id/helpful', answerController.answer_update_helpful);

module.exports = router;