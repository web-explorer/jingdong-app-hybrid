var express = require('express');
var router = express.Router();

router.get('/homeData', function(req, res, next) {
    var responseData = {
        code: 0,
        msg: 'success',
        data: {
            sliderList: [
                {
                    linkUrl: 'javascript:;',
                    picUrl: 'images/swiper-1.jpg'
                },
                {
                    linkUrl: 'javascript:;',
                    picUrl: 'images/swiper-2.jpg'
                },
                {
                    linkUrl: 'javascript:;',
                    picUrl: 'images/swiper-3.jpg'
                },
                {
                    linkUrl: 'javascript:;',
                    picUrl: 'images/swiper-4.jpg'
                },
                {
                    linkUrl: 'javascript:;',
                    picUrl: 'images/swiper-5.jpg'
                },
                {
                    linkUrl: 'javascript:;',
                    picUrl: 'images/swiper-6.jpg'
                },
                {
                    linkUrl: 'javascript:;',
                    picUrl: 'images/swiper-7.jpg'
                },
                {
                    linkUrl: 'javascript:;',
                    picUrl: 'images/swiper-8.jpg'
                }
            ]
        }
    };
    res.json(responseData);
});

module.exports = router;
