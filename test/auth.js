const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const User = require('../models/user');
const server = require('../server.js');

// TODO: Need to work on testing, tests are currently too simple


chai.use(chaiHttp);

const agent = chai.request.agent(server);

describe('User', () => {
    it('Should GET signup page at /signup', (done) => {
        agent
        .get('/signup')
        .end((err, res) => {
            if(err) {done(err)}
            res.status.should.be.equal(200);
            res.should.be.html;
            done();
        })
    })
    it('Should GET login page at /login', (done) => {
        agent
        .get('/login')
        .end((err, res) => {
            if (err) {done(err)}
            res.status.should.be.equal(200);
            res.should.be.html;
            done();
        })
    })
    it('Should create new User on POST at /signup', (done) => {
        const sampleUser = {email: 'test@test.com', username: 'test user', password: 'testUser'};
        const users = User.find({});
        const userCount = users.count;
        agent
        .post('/signup')
        .send(sampleUser)
        .end((err, res) => {
            if (err) {done(err)}
            res.status.should.be.equal(200)
            // userCount.should.be.equal(users)
            //res.body.users.should.have.property('_id')
            done();
        })
    })
    it('Should send ERROR when trying to POST user without username', (done) => {
        const sampleUser = {email: 'testing@testing.com', password: 'wrong'};
        agent
        .post('/signup')
        .send(sampleUser)
        .end((err, res) => {
            res.status.should.be.equal(400)
            // res.body.should.have.property('errors')
            done();
        })
    })

    it('Should login a user at POST /login ', (done) => {
        const sampleUser = {username: 'dude', password: 'dude'}
        agent
        .post('/login')
        .send(sampleUser)
        .end((err, res) => {
            if(err) {done(err)}
            res.status.should.be.equal(200)
            res.should.be.html;
            res.should.have.cookie('Token')
            done();
        })
    })
    it('Should be an error when wrong username or password entered', (done) => {
        const sampleUser = {username: 'wrongwrong', password: 'veryWrong123'};
        agent
        .post('/login')
        .send(sampleUser)
        .end((err, res) => {
            if(err) {done(err)}
            res.status.should.be.equal(401);
            done();
        })
    })
})
