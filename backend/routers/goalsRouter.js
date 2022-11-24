 const express = require('express');
 const router = express.Router();
 const goalController = require('../controllers/goalsController')




router.get('/:user_id/goals', goalController.getAllGoals);
router.post('/:user_id', goalController.addGoal);
router.get('/:goal_id', goalController.getGoalById);
router.patch('/:goal_id/update', goalController.updateGoalById);
router.delete('/:goal_id', goalController.deleteGoal);



router.get('/lists/:goal_id/steps', goalController.getAllSteps);
router.get('/:goal_id/steps/:step_id', goalController.getStepById);
router.patch('/:goal_id/steps/:step_id', goalController.updateStep);
router.patch('/:goal_id/add_steps', goalController.addStep);
router.delete('/:goal_id/steps', goalController.deleteStep);



module.exports = router;
