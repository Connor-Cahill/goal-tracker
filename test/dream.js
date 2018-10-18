const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const Goal = require('../models/goal');
const server = require('../server.js');


chai.use(chaiHttp);

const agent = chai.request.agent(server);

const sampleGoal = {title: 'Testing Goal', type: 'longterm', description: 'This is for testing purposes'};

describe('Goals', () => {
    it('Should render new goal template', (done) => {
        agent
        .get('/goals/new')
        .end((err, res) => {
            if(err){
                done(err);
            }
            res.should.have.status(200)
            res.should.be.html;
            done();
        })

    })
    it('Should post new goal to /goals', (done) => {
        agent
        .post('/goals')
        .end((err, res) => {
            if(err){done(err)}
            res.should.have.status(200)
            res.should.be.html
            done();
        })
    })
    it('Should show single goals at GET /goals/:id ', (done) => {
        const exGoalId = '5bc0242d972d255f179d89e7'
        agent
        .get(`/goals/${exGoalId}`)
        .end((err, res) => {
            if(err) {done(err)}
            res.status.should.be.equal(200);
            res.should.be.html
            done();
        })

    })

    it('Should render edit page on GET /goals/:id/edit', (done) => {
        const exGoalId = '5bc0242d972d255f179d89e7'
        agent
        .get(`/goals/${exGoalId}/edit`)
        .end((err, res) => {
            if(err) {done(err)}
            res.status.should.be.equal(200);
            res.should.be.html;
            done();
        })
    })

    // it('Should delete goals at DELETE /goals/:id', (done) => {
    //     Goal.findOneAndRemove({title: 'Testing Goal'})
    //     agent
    //     .delete()
    // })


})
