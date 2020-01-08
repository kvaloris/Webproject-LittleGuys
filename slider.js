;(function($, window, document, undefined) {
    //创建类
    var Carousel = function(elem, options) {
        this.defaults = {
            curDisplay: 0,
            autoPlay: false,
            interval: 300
        };
        this.opts = $.extend({}, this.defaults, options);

        var self = this;
        this.$carousel = elem;
        this.$aImg = this.$carousel.find("img.rotate");

        this.imgLen = this.$aImg.length;
        this.curDisplay = this.opts.curDisplay;
        this.autoPlay = this.opts.autoPlay;
        this.viewWidth = $(window).width() / 6;
        this.b_switch = true;
        this.iNow = this.opts.curDisplay;
        this.timer = null;
        this.interval = this.opts.interval;


    };

    var outerWidth = parseInt(document.body.offsetWidth);
    var middleWidth = 500;
    var _height = outerWidth >= middleWidth ? 350 : 350;
    var _slideHeight = outerWidth >= middleWidth ? 200 : 200;
    var _startHeight = outerWidth >= middleWidth ? 300 : 300;







    //原型方法
    Carousel.prototype = {
        //自动播放的设置
        play: function() {
            if (this.autoPlay) {
                if (this.iNow === this.imgLen - 1) {
                    this.iNow = 0;
                } else {
                    this.iNow++;
                }

                this.movingNext(this.iNow);
            }





        },

        //向前一个移动
        //index() 方法返回指定元素相对于其他指定元素的 index 位置。
        movingPrev: function(index) {
            this.curDisplay = index;

            this.initalCarousel();


        },

        //向下一个移动
        movingNext: function(index) {
            this.curDisplay = index;

            this.initalCarousel();


        },

        // movingMid: function(index) {
            // this.curDisplay = index;

            // this.middleCarousel();

            // this.$aImg.eq(this.curDisplay).css({
            //     transform: 'scale(2)',
            //     // zIndex:99999
            // }).animate({
            //     // height: _height + 'px',
            //     // marginTop: -_height / 2 + 'px',
            //     opacity: '1',
            //     // transform: scale(2)
            // }, 500).addClass('on').attr('onclick', null);


        // },



        initalCarousel: function() {
            var self = this;
            var half_imgLen = Math.floor(this.imgLen / 2);
            var leftNum, rightNum;






            //k=1时 三张图在中间不动弹 大概是动画循环条件
            var k = 0;
            for (var i = 0; i < half_imgLen; i++) {

                //移动到左边的图片
                leftNum = this.curDisplay - i - 1;

               //k=1时 三张图在中间不动弹 大概是动画循环一次
                if (k == 0) {
                    this.$aImg.eq(leftNum).css({

                        //左边距离
                        transform: 'translateX(' + (-300 * (i + 1)) + 'px) translateZ(-120px)',
                        width:"auto",
                    }).animate({
                        height: _slideHeight + 'px',
                        marginTop: -_slideHeight / 2 + 'px',
                        opacity: '0.6'
                    }, 500);//200 500没影响
                    this.$aImg.eq(leftNum).attr('onclick', null);



                    //移动到右边的图片
                    rightNum = this.curDisplay + i + 1;
                    if (rightNum > this.imgLen - 1) rightNum -= this.imgLen;
                    this.$aImg.eq(rightNum).css({
                        //右边的距离300是距离
                        transform: 'translateX(' + (300 * (i + 1)) + 'px) translateZ(-120px) ',
                        width:"auto"
                    }).animate({
                        height: _slideHeight + 'px',
                        marginTop: -_slideHeight / 2 + 'px',
                        opacity: '0.6'
                    }, 500);//200 500没影响
                    this.$aImg.eq(rightNum).attr('onclick', null);
                    k++;


                } else {
                    this.$aImg.eq(leftNum).css({

                        //注释掉没问题
                        transform: 'translateX(0px) translateZ(-1000px) ',
                        zIndex:-1
                    });

                    rightNum = this.curDisplay + i + 1;
                    if (rightNum > this.imgLen - 1) rightNum -= this.imgLen;
                    this.$aImg.eq(rightNum).css({
                        transform: 'translateX(0px) translateZ(-1000px) ',
                        zIndex:-1
                    });
                }
                this.$aImg.removeClass('on');

            }






            //移动到中间的图片
            //var _href可注释掉
            var _href = 'location.href=' + "'" + this.$aImg.eq(this.curDisplay).attr('data-url') + "'";
            this.$aImg.eq(this.curDisplay).css({
                transform: 'translateZ(0px)',
                zIndex:99999
            }).animate({
                height: _height + 'px',
                marginTop: -_height / 2 + 'px',
                opacity: '1',
                // transform: scale(2)
            }, 500).addClass('on').attr('onclick', _href);


            this.$carousel.on('webkitTransitionEnd', function() {
                self.b_switch = true;
            });



        },











        inital: function() {
            var self = this;

            this.initalCarousel();




            this.$aImg.on('click', function(ev) {
                if (self.b_switch && !$(this).hasClass('on')) {
                    self.iNow = $(this).index();
                    self.b_switch = false;

                    // var direction = self.viewWidth < ev.clientX ? 'next' : 'prev';


                    if (self.viewWidth < ev.clientX){
                        var direction = 'next';
                    }else if (self.viewWidth > ev.clientX) {
                        var direction = 'prev';
                    } else{
                        var direction = 'middle';
                    }

                    var index = $(this).index();

                    if (direction === 'next') {
                        self.movingNext(index);
                    } else if (direction === 'prev'){
                        self.movingPrev(index);
                    } else {
                        self.movingMid(index);
                    }


                }
            }).hover(function() {
                clearInterval(self.timer);
            }, function() {
                self.timer = setInterval(function() {
                    self.play();
                }, self.interval);
            });

            this.timer = setInterval(function() {
                self.play();
            }, this.interval);

            this.$carousel.on('selectstart', function() {
                return false;
            });
        },

        constructor: Carousel
    };

    $.fn.carousel = function(options) {
        var carousel = new Carousel(this, options);

        return carousel.inital();
    };

})(jQuery, window, document, undefined);
