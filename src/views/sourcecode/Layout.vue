<template>
  <div>
    <section class="layout float">
      <article class="left-right-center">
        <div class="left"></div>
        <div class="right"></div>
        <div class="center">
          <h1>浮动解决方案</h1>
        </div>
      </article>
    </section>
    <section class="layout absolute">
      <article class="left-right-center">
        <div class="left"></div>
        <div class="right"></div>
        <div class="center">
          <h1>绝对定位解决方案</h1>
        </div>
      </article>
    </section>
    <section class="layout flexbox">
      <article class="left-right-center">
        <div class="left"></div>
        <div class="center">
          <h1>flexbox解决方案</h1>
        </div>
        <div class="right"></div>
      </article>
    </section>
    <section class="layout table">
      <article class="left-right-center">
        <div class="left"></div>
        <div class="center">
          <h1>table解决方案</h1>
        </div>
        <div class="right"></div>
      </article>
    </section>
    <section class="layout gird">
      <article class="left-right-center">
        <div class="left"></div>
        <div class="center">
          <h1>gird解决方案</h1>
        </div>
        <div class="right"></div>
      </article>
    </section>
    <pre v-highlightA>
        <code >{{code}}</code>
    </pre>
  </div>
</template>
<script>
// highlight.js代码高亮指令
import Vue from 'vue'
import Highlight from '@/libs/highlightcode';
Vue.use(Highlight);
export default {
    name:'sourcecode-layout',
    data(){
        return{
            code:`<template>
  <div>
    <section class="layout float">
      <article class="left-right-center">
        <div class="left"></div>
        <div class="right"></div>
        <div class="center">
          <h1>浮动解决方案</h1>
        </div>
      </article>
    </section>
    <section class="layout absolute">
      <article class="left-right-center">
        <div class="left"></div>
        <div class="right"></div>
        <div class="center">
          <h1>绝对定位解决方案</h1>
        </div>
      </article>
    </section>
    <section class="layout flexbox">
      <article class="left-right-center">
        <div class="left"></div>
        <div class="center">
          <h1>flexbox解决方案</h1>
        </div>
        <div class="right"></div>
      </article>
    </section>
    <section class="layout table">
      <article class="left-right-center">
        <div class="left"></div>
        <div class="center">
          <h1>table解决方案</h1>
        </div>
        <div class="right"></div>
      </article>
    </section>
    <section class="layout gird">
      <article class="left-right-center">
        <div class="left"></div>
        <div class="center">
          <h1>gird解决方案</h1>
        </div>
        <div class="right"></div>
      </article>
    </section>
    <pre v-highlightA>
        <code >{{code}}</code>
    </pre>
  </div>
</template>
<style lang="less" scoped>
html * {
  padding: 0;
  margin: 0;
}

.layout {
  margin-top: 10px;
}

.layout article div {
  min-height: 100px;
}
.layout.flexbox {
  margin-top: 120px;
}

.layout.flexbox .left-right-center {
  display: flex;
}

.layout.flexbox .left {
  width: 300px;
  background: red;
}

.layout.flexbox .center {
  flex: 1;
  background: yellow;
}

.layout.flexbox .right {
  width: 300px;
  background: blue;
}
.layout.float .left {
  float: left;
  width: 300px;
  background: red;
}

.layout.float .right {
  float: right;
  width: 300px;
  background: blue;
}

.layout.float .center {
  background: yellow;
}
.layout.table .left-right-center {
  width: 100%;
  display: table;
  height: 100px;
}

.layout.table .left-right-center > div {
  display: table-cell;
}

.layout.table .left {
  width: 300px;
  background: red;
}

.layout.table .center {
  background: yellow;
}

.layout.table .right {
  width: 300px;
  background: blue;
}
.layout.gird .left-right-center {
  width: 100%;
  display: grid;
  grid-template-rows: 100px;
  grid-template-columns: 300px auto 300px;
}

.layout.gird .left {
  background: red;
}

.layout.gird .center {
  background: yellow;
}

.layout.gird .right {
  background: blue;
}
.layout.absolute .left-right-center > div {
  position: absolute;
}

.layout.absolute .left {
  left: 0;
  width: 300px;
  background: red;
}

.layout.absolute .right {
  right: 0;
  width: 300px;
  background: blue;
}

.layout.absolute .center {
  left: 300px;
  right: 300px;
  background: yellow;
}
</style>`
        }
    }
};
</script>
<style lang="less" scoped>
html * {
  padding: 0;
  margin: 0;
}

.layout {
  margin-top: 10px;
}

.layout article div {
  min-height: 100px;
}
.layout.flexbox {
  margin-top: 120px;
}

.layout.flexbox .left-right-center {
  display: flex;
}

.layout.flexbox .left {
  width: 300px;
  background: red;
}

.layout.flexbox .center {
  flex: 1;
  background: yellow;
}

.layout.flexbox .right {
  width: 300px;
  background: blue;
}
.layout.float .left {
  float: left;
  width: 300px;
  background: red;
}

.layout.float .right {
  float: right;
  width: 300px;
  background: blue;
}

.layout.float .center {
  background: yellow;
}
.layout.table .left-right-center {
  width: 100%;
  display: table;
  height: 100px;
}

.layout.table .left-right-center > div {
  display: table-cell;
}

.layout.table .left {
  width: 300px;
  background: red;
}

.layout.table .center {
  background: yellow;
}

.layout.table .right {
  width: 300px;
  background: blue;
}
.layout.gird .left-right-center {
  width: 100%;
  display: grid;
  grid-template-rows: 100px;
  grid-template-columns: 300px auto 300px;
}

.layout.gird .left {
  background: red;
}

.layout.gird .center {
  background: yellow;
}

.layout.gird .right {
  background: blue;
}
.layout.absolute .left-right-center > div {
  position: absolute;
}

.layout.absolute .left {
  left: 0;
  width: 300px;
  background: red;
}

.layout.absolute .right {
  right: 0;
  width: 300px;
  background: blue;
}

.layout.absolute .center {
  left: 300px;
  right: 300px;
  background: yellow;
}
</style>

