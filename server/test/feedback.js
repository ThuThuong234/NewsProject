let chai = require('chai');
let chaiHttp = require('chai-http');
let feedbacks = require('../api/routes/feedbacks');
let index = require('../api/routes/index');
let should = chai.should();
chai.use(chaiHttp);
describe('Feedbacks', function(){
    beforeEach(function(done) {
        done();
    });
    afterEach(function (done) {
        done();
    });
    describe('/POST feedbacks', () => {
        it('it should POST a feedbacks', function(done){
            chai.request(feedbacks)
                .post('/')
                .send({
                    'email':'datphan1.fitiuh@gmail.com',
                    'content':'Chúng tôi muốn làm việc với website'
                })
                .end(function(err, res){
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);
    });
    describe('/GET/:feedback_id ', function () {
        it('it should GET a email and content by the given feedback_id', function (done) {
            let feedback_id = '1543291440363';
            chai.request(feedbacks)
                .get('/' + feedback_id)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);
    });
    describe('/DELETE/:feedback_id ', function () {
        it('it should DELETE a user given the username', function (done) {
            let feedback_id = "1543291440363";
            chai.request(feedbacks)
                .delete('/' + feedback_id)
                .end(function(err, res){
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;

                    done();
                });
        }).timeout(5000);
    });
});

