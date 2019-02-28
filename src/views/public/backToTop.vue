<template>
  <div class="backToTop" v-on:click="backToTop" id="backToTop" v-show="scrollPosition > 0">
    <Icon type="ios-arrow-up"/>
  </div>
</template>
<script>
export default {
  name: "backToTop",
  data() {
    return {
      scrollPosition: 0
    };
  },
  methods: {
    backToTop() {
      var btt = document.getElementById("backToTop");
      var con = btt.parentNode;
      var currentScroll = con.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(this.backToTop);
        con.scrollTo(0, currentScroll - currentScroll / 5);
      }
    },
    //滚动事件发生之后，设置scrollPosition配合v-show来控制按钮的隐藏与现实
    handleScroll() {
      var btt = document.getElementById("backToTop");
      var con = btt.parentNode;
      this.scrollPosition = con.scrollTop;
    }
  },
  mounted() {
    //添加滚动事件监听器
    var btt = document.getElementById("backToTop");
    var con = btt.parentNode;
    con.addEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang="less" scoped>
.backToTop {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  width: 48px;
  height: 40px;
  cursor: pointer;
  i {
    color: #fff;
    font-size: 24px;
    padding: 8px 12px;
  }
  &:hover{
    background-color: rgba(0, 0, 0, 0.8);
    i{
      color:#eee;
    }
  }
}
</style>
