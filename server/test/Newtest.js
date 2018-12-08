let chai = require('chai');
let chaiHttp = require('chai-http');
let news = require('../api/routes/news');
let index = require('../api/routes/index');
let should = chai.should();

chai.use(chaiHttp);
describe('News', () => {
    beforeEach((done) => {
        done();
    });
    describe('/POST new', () => {
        it('it should POST a new', function (done) {
            chai.request(news)
                .post('/')
                .send({
                    'news_id': '1543293172800',
                    'username': 'thuong',
                    'title': 'Co ba oi',
                    'type_id': 3,
                    'content': 'Hello co ba',
                    'image': ['https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin18.jpg', 'https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin18.jpg', 'https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin18.jpg', 'https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin18.jpg', 'https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin18.jpg']
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
        it('it should GET a new by the given id', function (done) {
            let id = "1544288357496";
            chai.request(news)
                .get('/' + id)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);
    });
    describe('/PUT/:id ', function () {
        it('should UPDATE a new given the id', function (done) {
            let id = '1544288357496';
            chai.request(news)
                .put('/' + id )
                .send({
                    'news_id': '1544288357496',
                    'username':'thuong',
                    'title': 'Co tu oi',
                    'content': 'Hello co tu'
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
        it('it should DELETE a new given the id', function (done) {
            let id = "1544288357496";
            chai.request(news)
                .delete('/' + id)
                .end(function(err, res){
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        }).timeout(5000);
    });
    describe('/GET/type/:id ', function () {
        it('it should GET a new by the given type_id', function (done) {
            let type_id = 4;
            chai.request(index)
                .get('/type/' + type_id)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);
    });
    describe('/GET/:search_data ', function () {
        it('it should GET a new by the given data', function (done) {
            let search_data = "Jackman";
            chai.request(index)
                .get('/' + search_data)
                .end(function (err,res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);
    });
});
