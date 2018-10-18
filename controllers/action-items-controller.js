const Goal = require('../models/goal')
const Update = require('../models/update');
const ActionItem = require('../models/action-item');



module.exports = function(app) {
////post action Items
app.post('/goals/:goalId/actionItems', (req, res) => {
    if(req.user) {
        const actionItem = new ActionItem(req.body);

        actionItem.save().then(actionItem => {
            console.log('this is the saved actionItem ---> ' + actionItem);
            return Goal.findById(req.params.goalId)
        }).then(goal => {
            goal.actionItems.unshift(actionItem);
            console.log('Created actionItem --> ' + actionItem)
            goal.save();
        }).then(goal => {
            res.redirect(`/goals/${req.params.goalId}`)
        }).catch(err => {
            console.log(err.message);
        })
    } else {
        res.redirect('/');
        console.log('User is not signed in.');
    }

})

/////DELETE route // TODO: this is not working----> button clicked and error is (Cannot DELETE /(route)/ )
app.delete('/goals/:goalId/actionItems/:id', (req, res) => {
    if(req.user) {
        console.log('Hello World')
        console.log('** in the delete route **')
        Goal.findById(req.params.goalId).then(goal => {
            return ActionItem.findOneAndRemove({_id: req.params.id})
        }).then(actionItem => {
            console.log('Deleted');
            res.redirect(`/goals/${req.params.goalId}`);
        }).catch(err => {
            console.log(err.message);
        })
    } else {
        res.redirect('/');
        console.log('User is not signed in.');
    }

})




}
