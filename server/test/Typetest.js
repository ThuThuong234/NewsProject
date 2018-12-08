
let chai = require('chai');
let chaiHttp = require('chai-http');
let typenew = require('../api/routes/typenew');
let should = chai.should();
chai.use(chaiHttp);
describe('TypeNew', function(){
    beforeEach(function(done) {
        done();
    });
    afterEach(function (done) {
        done();
    });

    describe('/GET type ', function () {
        it('it should GET new by typename', function (done) {
            let type_id = '1543291440432̣';
            chai.request(typenew)
                .get('/' + type_id)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);
    });
