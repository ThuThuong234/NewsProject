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
            let id = "1544324964933";
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
            let id = '1544324964933';
            chai.request(news)
                .put('/' + id )
                .send({
                    'news_id': id,
                    'username':'thuong',
                    "type_id":3,
                    "title": "Xe bồn bê tông Việt Hàn bất chấp quyết định xử phạt vẫn 'tung chảo'",
                    "content": "Ngày 29/10/2018, báo điện tử Nhân đạo và Đời sống đã đăng tải bài viết “Hết hạn đăng kiểm, xe bồn bê tông vẫn 'tung hoành' giữa nội đô”.Những chiếc xe bồn này đã bị lực lượng chức năng xử phạt hành chính. Không những vậy, chủ nhân điều khiển chiếc xe bồn hết hạn đăng kiểm mang BKS 31F-3175 của Công ty CP xây dựng và đầu tư thương mại Việt Hàn cũng đã bị Cảnh sát Giao thông đội 6 – Công an TP Hà Nội tước quyền sử dụng giấy phép lái xe.Trong công văn số 673/TB-PC08-Đ6 được lập ngày 31/10/2018 do Thượng tá Nguyễn Chí Công ký nêu rõ: Người bị tước quyền sử dụng giấy phép lái xe là ông Nguyễn Văn Khôi đã có hành vi vi phạm, không mang giấy đăng ký xe; không mang giấy chứng nhận kiểm định ATKT và bảo vệ môi trường; không mang giấy chứng nhận bảo hiểm TNDS; có tem kiểm định ATKT và bảo vệ môi trường nhưng đã hết hạn sử dụng dưới 01 tháng.Thời hạn tước quyền sử dụng giấy phép lái xe là 2 tháng (kể từ ngày 31/10/2018 đến ngày 31/12/2018).Tuy nhiên, dù đã bị xử phạt, nhưng vào khoảng 15h15 ngày 12/11/2018 theo ghi nhận của PV, những chiếc xe bồn của Công ty Việt Hàn vẫn tiếp tục ngang nhiên hoạt động không đúng giờ quy định, như chưa hề có chuyện gì xảy ra.Phải chăng, những chế tài xử phạt chưa đủ mạnh để Công ty Việt Hàn phải tuân thủ theo pháp luật? Có hay không, việc Công ty này đang bất chấp pháp luật, bất chấp sự an toàn của người tham gia giao thông xung quanh để đạt được mục đích riêng của mình?Theo ghi nhận trước đó, dù đã hết hạn đăng kiểm nhưng chiếc xe bồn chở bê tông mang phù hiệu Bê tông Việt Hàn vô tư chạy rầm rầm cả ngày lẫn đêm không đúng giờ quy định trên đường Dương Đình Nghệ (TP. Hà Nội).Theo ghi nhận của PV, khoảng 14h20 ngày 25/10/2018, hàng chục chiếc xe bồn chở bê tông mang phù hiệu Bê tông Việt Hàn nối đuôi nhau chạy rầm rầm từ ngoại thành vào đường Dương Đình Nghệ để xây dựng công trình nhà cao tầng tại khu đô thị Dịch Vọng, quận Cầu Giấy, Hà Nội.Không những vậy, một chiếc xe bồn mang BKS 31F-3175 của Công ty CP xây dựng và đầu tư thương mại Việt Hàn có địa chỉ tại Phú Đô, Nam Từ Liêm, Hà Nội đã hết hạn đăng kiểm từ ngày 22/10 nhưng vẫn chở hàng chục khối bê tông, lưu thông trên đường của TP Hà Nội.Đến 15h cùng ngày, PV thấy lực lượng Cảnh sát Giao thông đội 6 – Công an TP Hà Nội ra đường Dương Đình Nghệ chặn chốt lập biên bản xử lý vi phạm. Tại đây, hàng chục chiếc xe bị dừng lập biên bản rồi những chiếc xe này lại tiếp tục được chạy đến chỗ công trình tại khu đô thị Dịch Vọng.",
                    "image": ["https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin22.jpg","https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin22.jpg","https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin22.jpg","https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin22.jpg","https://s3-us-west-2.amazonaws.com/newsweb11ctt/Tin22.jpg"],
                    "postdate": "17/11/2018"
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
            let id = "1544323193266";
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
            let search_data = "Co";
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
