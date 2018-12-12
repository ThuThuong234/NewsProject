let chai = require('chai');
let chaiHttp = require('chai-http');
let user = require('../api/routes/admin');
let should = chai.should();
chai.use(chaiHttp);
describe('Users', function(){
    beforeEach(function(done) {
        done();
    });
    afterEach(function (done) {
        done();
    });
    describe('/POST user', () => {
        it('it should POST a user', function(done){
            chai.request(user)
                .post('/')
                .send({
                    'username': 'daicaoi@gmail.com',
                    'password': '123456'
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
    describe('/GET/:username ', function () {
        it('it should GET a user by the given username', function (done) {
            let username = "daicaoi@gmail.com";
            chai.request(user)
                .get('/' + username)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);
    });
    describe('/PUT/:username ', function () {
        it('should UPDATE a user given the username', function (done) {
            let username = 'daicaoi@gmail.com';
            chai.request(user)
                .put('/' + username )
                .send({
                    'username': 'daicaoi@gmail.com',
                    'password': '123456789'
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
});
