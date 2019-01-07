<template>
  <div class="detail">
    <div class="dot-revolution" v-if="showloading"></div>
    <h1 class="title">{{title}}</h1>
    <div class="info">
      <span>{{time}}</span>
      <span style="margin-left:25px" v-if="!showloading">标签：</span>
      <span v-for="tag in tags" :key="tag.id">{{tag}};</span>
    </div>
    <div class="blockquote" v-if="!showloading">{{description}}</div>
    <div v-html="content" class="content"></div>
    <!-- <comment :pageinfos='pageInfo' v-if="!showloading"></comment> -->
    <div class="comment-container">
      <a
        href="https://github.com/login/oauth/authorize?client_id=8ee10db11a206bed9e71"
        v-if="!userinfo"
      >
        <img src="@/assets/images/github.png" alt @click="seturl">
      </a>
      <a v-if="userinfo" :href="userinfo.html_url">
        <img :src="userinfo.avatar_url" :alt="userinfo.email">
      </a>
      <transition name="fade">
        <div class="input-wrapper">
          <Input
            class="gray-bg-input"
            v-model="inputComment"
            type="textarea"
            :rows="3"
            placeholder="写下你的评论"
          />
          <div class="btn-control" v-if="userinfo">
            <Button class="btn" type="success" round @click="commitComment">确定</Button>
          </div>
          <div class="btn-control" v-if="!userinfo">
            <a
              href="https://github.com/login/oauth/authorize?client_id=8ee10db11a206bed9e71"
              @click="seturl"
            >
              <Button class="btn" type="success" round>登录</Button>
            </a>
          </div>
        </div>
      </transition>
      <div class="comment" v-for="item in comments" :key="item._id">
        <div class="info">
          <a :href="item.fromGithub">
            <img class="avatar" :src="item.fromAvatar" width="36">
          </a>
          <div class="right">
            <div class="name">
              <a :href="item.fromGithub">{{item.fromName}}</a>
            </div>
            <div class="date">{{item.date}}</div>
          </div>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="control">
          <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
            <i class="iconfont icon-like"></i>
            <span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span>
          </span>
          <span class="comment-reply" @click="showReplyInput(item)">
            <i class="iconfont icon-comment"></i>
            <span>回复</span>
          </span>
        </div>
        <div class="reply">
          <div class="item" v-for="reply in item.reply" :key="reply._id">
            <div class="reply-content">
              <span class="from-name">
                <a :href="reply.fromGithub">{{reply.fromName}}</a>
              </span>
              <span>:</span>
              <span class="to-name">
                <a :href="reply.toGithub">@{{reply.toName}}</a>
              </span>
              <span>{{reply.content}}</span>
            </div>
            <div class="reply-bottom">
              <span>{{reply.date}}</span>
              <span class="reply-text" @click="showReplyInput(item,reply)">
                <i class="iconfont icon-comment"></i>
                <span>回复</span>
              </span>
            </div>
          </div>
          <div class="write-reply" v-if="item.reply.length > 0" @click="showReplyInput(item)">
            <i class="el-icon-edit"></i>
            <span class="add-comment">添加新评论</span>
          </div>
          <transition name="fade">
            <div class="input-wrapper" v-if="showItemId === item._id">
              <Input
                class="gray-bg-input"
                v-model="inputReply"
                type="textarea"
                :rows="3"
                placeholder="写下你的评论"
              />
              <div class="btn-control" v-if="userinfo">
                <span class="cancel" @click="cancel">取消</span>
                <Button class="btn" type="success" round @click="commitReply()">确定</Button>
              </div>
              <div class="btn-control" v-if="!userinfo">
                <a
                  href="https://github.com/login/oauth/authorize?client_id=8ee10db11a206bed9e71"
                  @click="seturl"
                >
                  <Button class="btn" type="success" round>登录</Button>
                </a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { getArticalContent } from "@/api/blog";
// import Comment from '@/views/blog/comment.vue';
// import * as CommentData from "@/mock/mockCommentData";
import Element from "element-ui";
Vue.use(Element);
import { localSave, localRead } from "@/libs/util";
import { submitComment, getComments, submitReply } from "@/api/blog";
const sd = require("silly-datetime");
export default {
  name: "detail",
  // components:{Comment},
  data() {
    return {
      showloading: true,
      content: "",
      title: "",
      time: "",
      tags: [],
      description: "",
      commentData: [],
      pageInfo: {
        pageid: "",
        pagepath: ""
      },
      comments: [],
      inputComment: "",
      inputReply: "",
      showItemId: "",
      userinfo: {},
      item_id: "",
      reply_id: ""
    };
  },
  mounted() {
    // this.commentData = CommentData.comment.data;
    this.pageInfo.pageid = this.$route.params.id;
    this.pageInfo.pagepath = this.$route.path;
    var that = this;
    var obj = { _id: this.$route.params.id };
    getArticalContent(obj).then(res => {
      that.content = res.data.data[0].content;
      that.title = res.data.data[0].title;
      that.time = res.data.data[0].createTime;
      that.tags = res.data.data[0].tag.split(";");
      that.description = res.data.data[0].description;
      that.showloading = false;
    });
    var cObj = { ownerId: this.pageInfo.pageid };
    getComments(cObj).then(res => {
      that.comments = [...res.data.data];
    });
    if (localRead("blogUserInfo")) {
      this.userinfo = JSON.parse(localRead("blogUserInfo"));
    } else {
      this.userinfo = false;
    }
  },
  methods: {
    seturl() {
      localSave("login_url", this.pageInfo.pagepath);
    },
    /**
     * 点赞
     */
    likeClick(item) {
      if (item.isLike === null) {
        Vue.$set(item, "isLike", true);
        item.likeNum++;
      } else {
        if (item.isLike) {
          item.likeNum--;
        } else {
          item.likeNum++;
        }
        item.isLike = !item.isLike;
      }
    },

    /**
     * 点击取消按钮
     */
    cancel() {
      this.showItemId = "";
    },
    commitReply() {
      var that = this;
      var item_id = this.item_id;
      var reply = [];
      var toObj = {};
      for (let i in this.comments) {
        if (this.comments[i]._id == item_id) {
          toObj = this.comments[i];
          break;
        }
      }
      reply = [...toObj.reply];
      if (this.reply_id != "") {
        let reply_id = this.reply_id;
        let obj = {};
        for (let i in toObj.reply) {
          if (toObj.reply[i]._id == reply_id) {
            obj = toObj.reply[i];
            break;
          }
        }
        reply.push({
          _id: Date.now(), //主键id
          commentId: item_id, //父评论id，即父亲的id
          fromId: this.userinfo.id, //评论者id
          fromName: this.userinfo.login, //评论者昵称
          fromAvatar: this.userinfo.avatar_url, //评论者头像
          toId: obj.fromId, //被评论者id
          toName: obj.fromName, //被评论者昵称
          toAvatar: obj.fromAvatar, //被评论者头像
          content: this.inputReply, //评论内容
          date: sd.format(new Date(), "YYYY-MM-DD HH:mm:ss") //评论时间
        });
      } else {
        reply.push({
          _id: Date.now(), //主键id
          commentId: item_id, //父评论id，即父亲的id
          fromId: this.userinfo.id, //评论者id
          fromName: this.userinfo.login, //评论者昵称
          fromAvatar: this.userinfo.avatar_url, //评论者头像
          fromGithub: this.userinfo.html_url,
          toId: toObj.fromId, //被评论者id
          toName: toObj.fromName, //被评论者昵称
          toAvatar: toObj.fromAvatar, //被评论者头像
          toGithub: toObj.html_url,
          content: this.inputReply, //评论内容
          date: sd.format(new Date(), "YYYY-MM-DD HH:mm:ss") //评论时间
        });
      }
      let obj = {
        _id: item_id,
        reply: reply
      };
      console.log(obj);
      submitReply(obj).then(res => {
        if (res.data.success == "1") {
         this.$Notice.success({
              title:res.data.message,
              desc:''
          });
          var cObj = { ownerId: that.pageInfo.pageid };
          getComments(cObj).then(res => {
            that.comments = [...res.data.data];
            that.inputReply = "";
          });
        } else {
          this.$Notice.error({
              title:res.data.message,
              desc:''
          });
        }
      });
    },
    /**
     * 提交评论
     */
    commitComment() {
      console.log(this.inputComment);
      var that = this;
      let obj = {
        date: sd.format(new Date(), "YYYY-MM-DD HH:mm:ss"), //评论时间
        ownerId: this.pageInfo.pageid, //文章的id
        fromId: this.userinfo.id, //评论者id
        fromName: this.userinfo.login, //评论者昵称
        fromAvatar: this.userinfo.avatar_url, //评论者头像
        fromGithub: this.userinfo.html_url,
        likeNum: 0, //点赞人数
        content: this.inputComment, //评论内容
        reply: [] //评论回复
      };
      submitComment(obj).then(res => {
        if (res.data.success == "1") {
          this.$Notice.success({
              title:res.data.message,
              desc:''
          });
          var cObj = { ownerId: this.pageInfo.pageid };
          getComments(cObj).then(res => {
            this.inputComment = "";
            this.comments = [...res.data.data];
          });
        } else {
          this.$Notice.error({
              title:res.data.message,
              desc:''
          });
        }
      });
    },

    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showReplyInput(item, reply) {
      this.item_id = item._id;
      if (reply) {
        // this.inputReply = "@" + reply.fromName + " ";
        this.reply_id = reply._id;
      } else {
        this.inputReply = "";
      }
      this.showItemId = item._id;
    }
  },
  created() {}
};
</script>
<style lang="less">
@color-main: #2d8cf0;
@color-success: #67c23a;
@color-warning: #e6a23c;
@color-danger: #f56c6c;
@color-info: #909399;

@text-main: #303133;
@text-normal: #606266;
@text-minor: #909399; //次要文字
@text-placeholder: #c0c4cc;
@text-333: #333;

@border-first: #dcdfe6;
@border-second: #e4e7ed;
@border-third: #ebeef5;
@border-fourth: #f2f6fc;

@content-bg-color: #fff;
.comment-container {
  margin-top: 50px;
  img {
    width: 50px;
    border-radius: 25px;
  }
  .btn-control {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
    .cancel {
      font-size: 16px;
      color: @text-normal;
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        color: @text-333;
      }
    }
    .confirm {
      font-size: 16px;
    }
  }
  padding: 0 10px;
  box-sizing: border-box;
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid @border-fourth;
    .info {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-size: 16px;
          color: @text-main;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .date {
          font-size: 12px;
          color: @text-minor;
        }
      }
    }
    .content {
      font-size: 16px;
      color: @text-main;
      line-height: 20px;
      padding: 10px 0;
    }
    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: @text-minor;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active,
        &:hover {
          color: @color-main;
        }
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: @text-333;
        }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
    .reply {
      margin: 10px 0;
      border-left: 2px solid @border-first;
      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed @border-third;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: @text-main;
          .from-name {
            color: @color-main;
          }
          .to-name {
            color: @color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: @text-minor;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: @text-333;
            }
            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }
      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: @text-minor;
        padding: 10px;
        cursor: pointer;
        &:hover {
          color: @text-main;
        }
        .el-icon-edit {
          margin-right: 5px;
        }
      }
      .fade-enter-active,
      fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      .input-wrapper {
        padding: 10px;
        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;
          .cancel {
            font-size: 16px;
            color: @text-normal;
            margin-right: 20px;
            cursor: pointer;
            &:hover {
              color: @text-333;
            }
          }
          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}
.detail {
  margin-top: 80px;
  width: 800px;
  height: auto;
  min-height: 640px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  .info {
    padding: 8px 0;
    span {
      margin-left: 5px;
    }
  }
  .title {
    word-break: break-word !important;
    word-break: break-all;
    margin: 20px 0 0;
    font-family: -apple-system, SF UI Display, Arial, PingFang SC,
      Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.3;
  }
  .blockquote {
    padding: 5px;
    padding-left: 20px;
    margin-bottom: 25px;
    background-color: #f7f7f7;
    border-left: 6px solid #b4b4b4;
    word-break: break-word !important;
    word-break: break-all;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
  }
  .dot-revolution {
    position: absolute !important;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .content {
    margin-top: 10px;
    p {
      font-size: 18px;
      strong {
        font-size: 20px;
      }
      span {
        font-size: 18px;
      }
    }
  }
}
</style>
