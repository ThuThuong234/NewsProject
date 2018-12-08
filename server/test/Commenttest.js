let chai = require('chai');
let chaiHttp = require('chai-http');
let comment = require('../api/routes/comment');
let index = require('../api/routes/index');
let should = chai.should();

chai.use(chaiHttp);
describe('Comments', () => {
    beforeEach((done) => {
        done();
    });
    describe('/POST comment', () => {
        it('it should POST a comment ', function (done) {
            chai.request(comment)
                .post('/')
                .send({
                    "email" : "thuong@gmail.com",
                    "news_id": 1,
                    "comments_content":"Gau Meo",
                    "comment_time": "13/12/2018"]
                })
                .end(function (err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);
    });
    describe('/GET/:id ', function () {
        it('it should GET a comment by the given news_id', function (done) {
            let id = "1";
            chai.request(comment)
                .get('/' + news_id)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);
    });
