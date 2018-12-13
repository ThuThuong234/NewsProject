let chai = require('chai');
let chaiHttp = require('chai-http');
let comment = require('../api/routes/comment');
let should = chai.should();
chai.use(chaiHttp);
describe('Comments', function(){
    beforeEach(function(done) {
        done();
    });
    afterEach(function (done) {
        done();
    });
    describe('/POST comment', () => {
        it('it should POST a comment', function(done){
            chai.request(comment)
                .post('/')
                .send({
                    'email': 'datphan.fitiuh@gmail.com',
                    'comments_content':'Chúng tôi muốn làm việc với các bạn',
                    'comment_time':'09/12/2018'
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
    describe('/GET/:id ', function () {
        it('it should GET a comment by the given new_id', function (done) {
            let new_id = "1544676641123";
            chai.request(comment)
                .get('/' + new_id)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);
    });
    describe('/PUT/:id ', function () {
        it('should UPDATE a comment given the id', function (done) {
            let id = '7';
            chai.request(comment)
                .put('/' + id )
                .send({
                    'news_id': id,
                    'email': 'thuong10@gmail.com',
                    'comment_time': '09/12/2018'
                })
                .end(function(err, res)
                {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);
    });
    describe('/DELETE/:id ', function () {
        it('it should DELETE a comment given the id', function (done) {
            let id = "1544290977610";
            chai.request(comment)
                .delete('/' + id)
                .end(function(err, res){
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        }).timeout(5000);
    });
});