let chai = require('chai');
let chaiHttp = require('chai-http');
let feedback = require('../api/routes/feedbacks');
let should = chai.should();

chai.use(chaiHttp);
describe('Feedbacks', () => {
    beforeEach((done) => {
        done();
    });
    describe('/GET feedbacks', () => {
        it('it should GET all the feedbacks', (done) => {
            chai.request(feedback)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(7);
                    done();
                });
        });
    });
    describe('/POST user', () => {
        it('it should POST a user', (done) => {
            let feedback = {
                email: "datphan.fitiuh@gmail.com",
                content: "Chúng tôi muốn làm việc với website"
            };
            chai.request(feedback)
                .post('/')
                .send(feedback)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Pet successfully added!');
                    res.body.user.should.have.property('email').eql(user.email);
                    res.body.user.should.have.property('content').eql(user.content);
                    done();
                });
        });
        it('it should not POST a book without status field', (done) => {
            let pet = {
                name: "minhlun"
            };
            chai.request(feedback)
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
    describe('/GET/:email ', function () {
        it('it should GET a feedbacks by the given email', function (done) {
            let email = "datphan.fitiuh@gmail.com";
            chai.request(feedback)
                .get('/' + email)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe('/PUT/:email ', function () {
        this.timeout(15000);
        it('it should UPDATE a feedback given the email', function (done) {
            this.timeout(15000);
            let email = "datphan.fitiuh@gmail.com";
            chai.request(feedback)
                .put('/' + username)
                .send({
                    "email": "datphan.fitiuh@gmail.com",
                    "content": "Chúng tôi muốn làm việc với website"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.user.should.have.property(user.username);
                    //res.body.user.should.have.property(user.password);
                    setTimeout(done, 1500);
                });
        });
    });
});
