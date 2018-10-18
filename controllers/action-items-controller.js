const Goal = require('../models/goal')
const Update = require('../models/update');
const ActionItem = require('../models/action-item');



module.exports = function(app) {
////post action Items
app.post('/goals/:goalId/actionItems', (req, res) => {
    const actionItem = new ActionItem(req.body);
    console.log(actionItem);

    actionItem.save().then(actionItem => {
        return Goal.findById(req.params.goalId)
    }).then(goal => {
        goal.actionItems.unshift(actionItem);
        goal.save();
    }).then(goal => {
        res.redirect(`/goals/${req.params.goalId}`)
    }).catch(err => {
        console.log(err.message);
    })
})


}
