let chai = require('chai');
let chaiHttp = require('chai-http');
let type = require('../api/routes/typenew');
let should = chai.should();

chai.use(chaiHttp);
describe('News', () => {
    beforeEach((done) => {
        done();
    });
    describe('/GET news', () => {
        it('it should GET all the news', (done) => {
            chai.request(news_id)
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
        it('it should POST a new', (done) => {
            let type = {
                news_id: "1",
            };
            chai.request(type)
                .post('/pets')
                .send(type)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Pet successfully added!');
                    res.body.type.should.have.property('news_id');
                    res.body.type.should.have.property('username').eql(news.username);
                    res.body.type.should.have.property('type_id').eql(news.type_id);
                    res.body.type.should.have.property('title').eql(news.title);
                    res.body.type.should.have.property('content').eql(news.content);
                    res.body.type.should.have.property('image').eql(news.image);
                    res.body.type.should.have.property('postdate').eql(news.postdate);
                    done();
                });
        });
        it('it should not POST a book without status field', (done) => {
            let news = {
                titlet: "Apple bị tố đạo công nghệ camera kép trên iPhone7 Plus,8 Plus"
            };
            chai.request(news)
                .post('/')
                .send(news)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Pet is invalid!");
                    done();
                });
        });
    });
    describe('/GET/:id type', () => {
        it('it should GET a news by the given id', (done) => {
            let news_id = "1";
            chai.request(news)
                .get('/' + title)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('news');
                    res.body.type.should.have.property('news_id');
                    res.body.type.should.have.property('username').eql(news.username);
                    res.body.type.should.have.property('type_id').eql(news.type_id);
                    res.body.type.should.have.property('title').eql(news.title);
                    res.body.type.should.have.property('content').eql(news.content);
                    res.body.type.should.have.property('image').eql(news.image);
                    res.body.type.should.have.property('postdate').eql(news.postdate);
                    done();
                    done();
                });
        });
    });
});
describe('/PUT/:title ', function(){
    this.timeout(15000);
    it('it should UPDATE a news given the news_id', function(done){
        this.timeout(15000);
        let news_id="1";
        chai.request(user)
            .put('/' + news_id)
            .send({
                "username":"dat",
                "type_id":2,
                "title": "Apple bị tố đạo công nghệ camera kép trên iPhone7 Plus,8 Plus",
                "content": "Chên bố Apple đang sử dụng công nghệ của công ty trong hệ thống camera của iPhone 7 Plus và iPhone 8 Plus. Hiện đơn kiện không nhắc gì tới iPhone X, có lẽ do thiết bị này mới chỉ chính thức được tung ra thị trường vào thứ 6 tuần trước.Tại triển lãm MWC ở Barcelona năm ngoài, chính Coreophotonics đã trình diễn công nghệ camera kép của mình. Công ty đã cho thấy các hình ảnh từ cả hai bộ cảm biến có thể được kết nối với nhau đem lại hình ảnh chi tiết hơn, ngoài ra còn bao gồm cả độ phóng tối ưu lên tới 5x.Người phát ngôn của công ty công nghệ của Israel cho biết, phía họ đã nhận được rất nhiều báo cáo tán dương và phản hồi tích cực từ phía Apple thế nhưng cả hai đã không đi tới một thỏa thuận chung nào về bằng sáng chế. Apple đã biết về các bằng sáng chế, nhưng phía đoàn đàm phán của họ nói sẽ cần nhiều năm và rất nhiều triệu USD trước khi đạt tới một thỏa thuận chung.Trở lại vào năm 2015, Apple đã từng mua lại LinX Imaging, một công ty khác của Israel chuyên về thiết bị khẩu độ camera cho các điện thoại di động. Apple hầu như đã sử dụng các công nghệ của họ trong ba thiết bị camera kép của mình.",
                "image": ["https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin1.1.jpg","https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin1.2.jpg","https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin1.2.jpg","https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin1.2.jpg","https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin1.2.jpg"],
                "postdate": "17/11/2018"
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
describe('/DELETE/:news_id ', function() {
    this.timeout(15000);
    it('it should DELETE a news given the news_id', function(done){
        this.timeout(15000);
        let title = "Apple bị tố đạo công nghệ camera kép trên iPhone7 Plus,8 Plus";
        chai.request(news)
            .delete('/' + news_id)
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
