let chai = require('chai');
let chaiHttp = require('chai-http');
let type = require('../api/routes/typenew');
let should = chai.should();

chai.use(chaiHttp);
describe('TypeNew', () => {
    beforeEach((done) => {
        done();
    });
    describe('/GET type', () => {
        it('it should GET all the type', (done) => {
            chai.request(type)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(7);
                    done();
                });
        });
    });
    describe('/POST type', () => {
        it('it should POST a type', (done) => {
            let type = {
                typename: "Nhân dân",
            };
            chai.request(type)
                .post('/pets')
                .send(type)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Pet successfully added!');
                    res.body.type.should.have.property('type_id');
                    res.body.type.should.have.property('typename').eql(type.typename);
                    done();
                });
        });
        it('it should not POST a book without status field', (done) => {
            let type = {
                typename: "Nhân dân"
            };
            chai.request(type)
                .post('/')
                .send(type)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Pet is invalid!");
                    done();
                });
        });
    });
    describe('/GET/:id type', () => {
        it('it should GET a type by the given id', (done) => {
            let type_id = 1;
            chai.request(type)
                .get('/' + type_id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('type');
                    res.body.type.should.have.property('type_id').eql(type_id);
                    res.body.type.should.have.property('typename').eql(type.typename);
                    done();
                });
        });
    });
});
