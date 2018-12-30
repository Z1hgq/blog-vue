<template>
  <div class='banner'>
    <swiper :options="swiperOption">
        <swiper-slide v-for="img in imgs" :key="img.id">
          <div style="position: relative;">
            <img :src="img.url" class="banner_img">
            <div class="banner_in">
              <!-- <img :src="img.desc_icon"> -->
              <div><b>{{img.desc1}}</b></div>
              <!-- <p>{{img.desc2}}</p> -->
            </div>
            <!-- <div class="pre_btn" :style="note" slot="button-prev">
              <img src="./images/left_icon.png">
            </div>
            <div class="next_btn" :style="note" slot="button-next">
              <img src="./images/right_icon.png">
            </div> -->
          </div>
        </swiper-slide>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> -->
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
  </swiper>
  </div>
</template>
<script>
    import Vue from 'vue'
    import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
    // import Swiper from 'swiper'
    // const mySwiper = new Swiper('.swiperOption');
    // console.log(mySwiper);
    export default{
        name:'Photo',
        components: {
            swiper,
            swiperSlide
        },
        data(){
            return {
                swiperOption: {
                //   pagination: {
                //     el: '.swiper-pagination',
                //     dynamicBullets: true
                //   },
                  //这个滑块效果还可以
                //   effect : 'cube',
                //   cubeEffect: {
                //     slideShadows: true,
                //     shadow: true,
                //     shadowOffset: 100,
                //     shadowScale: 0.6
                //   },
                effect : 'coverflow',
                slidesPerView: 2,
                centeredSlides: true,
                coverflowEffect:{
                    rotate:10,
                    stretch: 20,
                    depth: 120,
                    modifier: 2,
                    slideShadows : true
                },
                  autoplay:{
                      delay:3500
                  },
                  loop:true,
                //   navigation: {
                //     nextEl: '.next_btn',
                //     prevEl: '.pre_btn'
                //   },
                },
                imgs:[
                    { url:'/static/img/photo/1.JPG',
                      desc1:'',
                      desc2:'@Z1hgq',
                    },
                    { url:'/static/img/photo/2.JPG',
                      desc1:'',
                      desc2:'@Z1hgq',
                    },
                    { url:'/static/img/photo/3.JPG',
                      desc1:'',
                      desc2:'@Z1hgq',
                    },
                    { url:'/static/img/photo/4.JPG',
                      desc1:'',
                      desc2:'@Z1hgq',
                    },
                    { url:'/static/img/photo/5.JPG',
                      desc1:'',
                      desc2:'@Z1hgq',
                    },
                ],
            }
        },
        methods:{
          // pre:function(){
          //    mySwiper.slidePrev();
          //  },
          // next:function(){
          //   mySwiper.slideNext();
          // } 
        },
    }
</script>
<style>
.banner{
  margin-top: 60px;
  background: #000;
}
.banner_img{
  width: 100%;
  height: auto;
  /* box-shadow: 8px 8px 8px #777; */
}
.banner_in{
  position: absolute;
  width: 450px;
  height: 200px;
  top: 48%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
}
.banner_in>img{
  width: 60px;
  height: 60px;
}
.banner_in>div>b{
  color: white;
  font-size: 54px; 
  margin: 0;
  line-height: 55px;
  padding: 10px 0 10px 0;
}
.banner_in>p{
  margin: 0;
  color: white;
  font-size: 16px;
  line-height: 30px;
  width: 320px;
  padding-left: 65px;
  padding-top: 300px;
}
.pre_btn{
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 10%;
  transform: translate(-50%,-50%);
  text-align: center;
  /*background-image: url('~@/Circle.png') no-repeat;*/
}
.pre_btn>img{
  margin-top: 18px;
}
.next_btn{
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 90%;
  transform: translate(-50%,-50%);
  text-align: center;
  /*background-image: url('~@/Circle.png') no-repeat;*/
}
.next_btn>img{
  margin-top: 18px;
}
</style>



