const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Site', () => {
    it('Should have a homepage.', (done) => {
        chai.request('localhost:3000')
        .get('/')
        .end((err, res) => {
            if(err) {
                done(err)
            }
            res.status.should.be.equal(200);
            done();
        })
    })
})
