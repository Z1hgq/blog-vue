<template>
  <div id="app">
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
        <router-link  v-for="tap in taps" :key="tap.id" :to="tap.link" class="el" >
            <img :src="tap.icon" alt="">
            <div><a :href="tap.link">{{tap.name}}</a></div>
        </router-link>
    </div>
  </div>
  <br>
  <br>
  <br>
  <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      tapel:'el',
      name: "Z1hgq",
      img:'/static/img/z1hgq.png',
      taps:[
          {
              icon:'/static/img/about.png',
              name:'关于',
              link:'/about',
              active:false
          },
          {
              icon:'/static/img/photo.png',
              name:'摄影',
              link:'/photo',
              active:false
          },
          {
              icon:'/static/img/blog.png',
              name:'博客',
              link:'/',
              active:true
          },
      ],
    };
  }
}
</script>
<style lang="less">
a{
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.nav {
  z-index: 99999;
  height: 60px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  box-shadow: 0px 4px 4px #ccc;
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
      color: #009966;
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
              border-bottom: 2px solid #FF9933;
              a{
                  color:#FF9933;
              }
          }
          a{
              color:#009966;
          }
          img{
              width: 20px;
              height: 20px;
              float: left;
              margin-top: 20px;
          }
          div{
              width: 80px;
              padding-top: 20px;
              text-align: center;
          }
      }
      .act{
        border-bottom: 2px solid #FF9933;
        a{
          color:#FF9933;
        }
      }
  }
}
</style>
