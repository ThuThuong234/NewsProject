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
                    'username': 'dacia',
                    'password': '123456'
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
    describe('/GET/:username ', function () {
        it('it should GET a user by the given username', function (done) {
            let username = "thuong";
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
            let username = 'dat';
            chai.request(user)
                .put('/' + username )
                .send({
                    'username': 'dat',
                    'password': '123456789'
                })
                .end(function(err, res)
                {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    // res.body.should.have.property('username');
                    // res.body.should.have.property('password');
                    // res.body.username.should.be.a('string');
                    // res.body.password.should.be.a('string');
                    //res.body.username.should.equal('dat');
                    // storage.items.should.be.a('array');
                    // storage.items[1].should.be.a('object');
                    // storage.items[1].should.have.property('password');
                    // storage.items[1].should.have.property('username');
                    // storage.items[1].password.should.be.a('string');
                    // storage.items[1].username.should.be.a('string');
                    // storage.items[1].username.should.equal('dat');
                    done();
                });
        }).timeout(5000);
    });
    describe('/DELETE/:username ', function () {
        it('it should DELETE a user given the username', function (done) {
            let username = "dat";
            chai.request(user)
                .delete('/' + username)
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
