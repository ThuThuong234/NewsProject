let chai = require('chai');
let chaiHttp = require('chai-http');
let feedbacks = require('../api/routes/feedbacks');
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
                    //res.body.should.have.property('username');
                    //res.body.should.have.property('password');
                    // res.body.username.should.be.a('string');
                    //res.body.password.should.be.a('string');
                    // res.body.user.should.have.property('username').eql('daica');
                    //res.body.user.should.have.property('password').eql('123456');
                    // storage.items.should.be.a('array');
                    // storage.items.should.be.a('object');
                    // storage.items.should.have.property('username');
                    // storage.items.should.have.property('password');
                    // storage.items.username.should.be.a('string');
                    // storage.items.password.should.be.a('string');
                    // storage.items.username.should.equal('minhlun');
                    // storage.items.password.should.equal('123456');
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
                    //res.body.should.have.property('username');
                    //items.username.should.be.a('string');
                    //res.req.params.username.should.equal('dat');
                    // storage.items.should.be.a('array');
                    // storage.items[1].should.be.a('object');
                    // storage.items[1].should.have.property('username');
                    // storage.items[1].username.should.be.a('string');
                    // storage.items[1].username.should.equal('dat');
                    // storage.items[1].password.should.equal('123456');
                    done();
                });
        }).timeout(5000);
    });
});

