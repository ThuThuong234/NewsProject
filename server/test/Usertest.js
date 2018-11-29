let chai = require('chai');
let chaiHttp = require('chai-http');
let user = require('../api/routes/admin');
let should = chai.should();
chai.use(chaiHttp);
describe('Users', () => {
    beforeEach((done) => {
        done();
    });
    describe('/POST user', () => {
        it('it should POST a user', (done) => {
            let user = {
                username:"minhlun",
                password:"123456"
            };
            chai.request(user)
                .post('/')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Pet successfully added!');
                    res.body.user.should.have.property('username').eql(user.username);
                    res.body.user.should.have.property('password').eql(user.password);
                    done();
                });
        });
        it('it should not POST a book without status field', (done) => {
            let pet = {
                name: "minhlun"
            };
            chai.request(user)
                .post('/')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Pet is invalid!");
                    done();
                });
        });
    });
    describe('/GET/:username ', function(){
        it('it should GET a user by the given username', function(done) {
            let username = "minh";
            chai.request(user)
                .get('/' + username)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe('/PUT/:username ', function(){
        this.timeout(15000);
        it('it should UPDATE a user given the username', function(done){
            this.timeout(15000);
            let username="dat";
            chai.request(user)
                .put('/' + username)
                .send({
                    username: "dat",
                    password: "123456789"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.user.should.have.property(user.username);
                    //res.body.user.should.have.property(user.password);
                    setTimeout(done,1500);
                });
        });
    });
    describe('/DELETE/:username ', function() {
        this.timeout(15000);
        it('it should DELETE a user given the username', function(done){
            this.timeout(15000);
            let username = "dat";
            chai.request(user)
                .delete('/' + username)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.should.have.property('result');
                    //res.body.result.should.have.property('username').eql("dat");
                    setTimeout(done,15000);
                });
        });
    });
});
