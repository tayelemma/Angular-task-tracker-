const Goal = require("../models/goalModel");
const User = require("../models/usersModel");
const { ObjectId } = require("mongodb");


module.exports.getAllGoals = async (req, res, next) => {
  try {
    const user_id = ObjectId(req.params.user_id);
    const result = await Goal.find({ userId: user_id });
    res.json({ success: true, data: result });
    console.log(result, "all goals controller");
    console.log(user_id, "userid from get all");
  } catch (e) {
    next(e);
  }
};


module.exports.addGoal = async (req, res, next) => {
  try {
    const user_id = ObjectId(req.params.user_id);
    const goal = req.body;
    goal.userId = user_id;
    const result = await Goal.create(goal);
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.getGoalById = async (req, res, next) => {
  try {
    const goal_id = ObjectId(req.params.goal_id);
    const result = await Goal.findOne({ _id: goal_id });
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};


module.exports.updateGoalById = async (req, res, next) => {
  try {
    const { userId, title, desccription, deadline } = req.body;
    const goal_id = ObjectId(req.params.goal_id);
    const result = await Goal.updateOne(
      { _id: goal_id },
      { $set: { userId, title, desccription, deadline } }
    );
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteGoal = async (req, res, next) => {
  try {
    const goal_id = ObjectId(req.params.goal_id);
    const result = await Goal.deleteOne({ _id: goal_id });
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};


module.exports.getAllSteps = async (req, res, next) => {
  try {
    const goal_id = ObjectId(req.params.goal_id);
    console.log(goal_id, "goal id from getall steps..");
    const result = await Goal.aggregate([
      { $unwind: "$steps" },
      { $match: { _id: goal_id } },
      {
        $project: {
          _id: 0,
          _id: "$steps._id",
          title: "$steps.title",
          description: "$steps.description",
          status: "$steps.status",
          deadline: "$steps.deadline",
          dateCreated: "$steps.dateCreated"
        },
      },
    ]);
    console.log(result);
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.addStep = async (req, res, next) => {
  try {
    const goal_id = ObjectId(req.params.goal_id);
   const newStep = { ...req.body, dateCreated: Date.now() }
    const result = await Goal.updateOne(
      { _id: goal_id },
      { $push: { steps: newStep } }
    );
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};


module.exports.getStepById = async (req, res, next) => {
  try {
    const goal_id = ObjectId(req.params.goal_id);
    const step_id = ObjectId(req.params.step_id);
    const result = await Goal.aggregate([
      { $unwind: "$steps" },
      { $match: { _id: goal_id, "steps._id": step_id } },
      {
        $project: {
          _id: "$steps._id",
          title: "$steps.title",
          description: "$steps.description",
          status: "$steps.status",
          deadline: "$steps.deadline",
          dateCreated: "$steps.dateCreated"
        },
      },
    ]);

    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};


module.exports.updateStep = async (req, res, next) => {
  try {
    const goal_id = ObjectId(req.params.goal_id);
    const step_id = ObjectId(req.params.step_id);
    const step= req.body;
    const result = await Goal.updateOne({_id: goal_id, "steps._id": step_id},
        {$set: { "steps.$": step}}
    )  
    res.json({ success: true, data: result });
    console.log(result);
  } catch (e) {
    next(e);
  }
};


module.exports.deleteStep = async (req, res, next) => {
  try {
    const goal_id = ObjectId(req.params.goal_id);
    const step_id = ObjectId(req.query.step_id);
    console.log(step_id, "step id for delete");
    const result = await Goal.updateOne(
      { _id: goal_id },
      { $pull: { steps: { _id: step_id } } }
    );
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};
