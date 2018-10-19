// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// const ActionItem = require('../models/action-item');
// const server = require('../server.js');
//
//
// chai.use(chaiHttp);
//
// const agent = chai.request.agent(server);
//
// const sampleItem = {item: 'Sample Item For Testing'}
// const sampleGoal = {title: 'Testing Goal', type: 'long term', description: 'for testing purposes' }
// var goalId;
// const sampleUser = {username: 'hey', password: 'hey'};
//
// describe('Users', () => {
//     before(function() {
//         agent
//         .post('/login')
//         .send(sampleUser)
//         .end((err, res) => {
//             res.status.should.be.equal(200)
//             res.should.be.html;
//         })
//     })
// })
//
// describe('Goals', () => {
//     before(function() {
//         agent
//         .post('/goals')
//         .send(sampleGoal)
//         .end((err, res) => {
//             res.status.should.be.equal(200)
//             res.should.be.html;
//             const goal = Goal.findOne({title: 'Testing Goal'});
//             goalId = goal.id
//         })
//     })
// })
// describe('ActionItems', () => {
//     after(() => {
//         ActionItem.deleteMany({item: 'Sample Item For Testing'}).exec((err, items) => {
//             console.log(items)
//             items.remove();
//         })
//     })
//
//     it('Should create a new item at POST /goals/:goalId/actionItems', (done) => {
//         agent
//         .post(`/goals/${ObjectId(goalId)}/actionItems`)
//         .send(sampleItem)
//         .end((err, res) => {
//             res.status.should.be.equal(200)
//             res.should.be.html;
//             done();
//         })
//     })
//
// })
