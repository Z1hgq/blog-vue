<template>
  <div>
    <div class="nav">
    <div class="icon">
      <a href="/"  rel="noopener noreferrer">
        <div>
          <img :src="img">
        </div>
        <div>
          <span>{{name}}</span>
        </div>
      </a>
    </div>
    <div class="tap">
        <div class="el" v-for="tap in taps" :key="tap.id" :id="tap.id">
            <!-- <img :src="tap.icon" alt=""> -->
            <div><Icon :type="tap.icon" class="tapicon"/><a :href="tap.link">{{tap.name}}</a></div>
        </div>
    </div>
  </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "Navigation",
  data() {
    return {
      name: "Z1hgq",
      img:'/static/img/z1hgq.png',
      taps:[
          {
              id:'tapabout',
              icon:'ios-contact-outline',
              name:'关于',
              link:'/dist/about',
              active:false
          },
          { 
              id:'tapphoto',
              icon:'ios-camera-outline',
              name:'摄影',
              link:'/dist/photo',
              active:false
          },
          {
              id:'tapblog',
              icon:'ios-laptop',
              name:'博客',
              link:'/dist/blog',
              active:true
          },
      ],
    };
  },
  mounted(){
      var element = document.getElementById(this.$route.meta.active);
      element.classList.add('act')
  }
};
</script>
<style lang="less">
a,p{ 
    font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 18px;
    text-decoration: none;
} 
.nav {
  height: 60px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  box-shadow: 0px 4px 4px #ccc;
  z-index: 99999;
  .icon {
    height: 100%;
    width: 15%;
    // display: flex;
    float: left;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: inline-block;
      margin-top: 5px;
      margin-left: 10px;
    }
    span {
      color: #515a6e;
      font-size: 20px;
      padding-left: 10px;
      height: 20px;
      margin-top: 20px;
      display: block;
      text-align: left;
    }
    a {
      div{
          width: 75px;
          height: 100%;
          float: left;
      }
    }
  }
  .tap{
      width: 85%;
      height: 100%;
      float: right;
      .el{
          width: 100px;
          height: 100%;
          float: right;
          &:hover{
              border-bottom: 2px solid #2d8cf0;
              a{
                  color:#2d8cf0;
              }
              .tapicon{
                  color:#2d8cf0;
              }
          }
          a{
              color:#515a6e;
              padding-left: 15px;
          }
          div{
              width: 80px;
              padding-top: 20px;
          }
      }
      .act{
          border-bottom: 2px solid #2d8cf0;
              a{
                  color:#2d8cf0;
              }
              .tapicon{
                  color:#2d8cf0;
              }
      }
  }
}
</style>
