<template>
  <div class="goods-container clearfix">
    <!-- 左侧图片 -->
    <div class="thumb">
      <div class="custom-control custom-checkbox">
        <!--  6.  change可以监听复选框的变化，一旦变化就会触发stateChange事件-->
        <input
          type="checkbox"
          class="custom-control-input"
          :id="'cb' + id"
          :checked="state"
          @change="stateChange"
        />
        <label class="custom-control-label" :for="'cb' + id">
          <img :src="pic" alt="" />
        </label>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="goods-info">
      <h6 class="goods-title">{{ title }}</h6>
      <div class="goods-info-bottom">
        <!-- 商品的价格 -->
        <span class="goods-price">￥{{ price }}</span>
        <!-- 商品数量 -->
        <Counter :c="count" :id="id"></Counter>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "../Counter/Counter.vue";
export default {
  methods: {
    //   6.1  通过 $emit
    stateChange(e) {
      //  6.2  通过打印 e 找到哪个属性 记录状态
      const newState = e.target.checked;
      this.$emit("state-change", { id: this.id, value: newState });
    },
  },
  props: {
    //  1.  要渲染商品的标题
    title: {
      default: "",
      type: String,
    },
    //  2.  图片地址
    pic: {
      default: "",
      type: String,
    },
    //  3.  单价
    price: {
      default: 0,
      type: Number,
    },
    //  4.  商品的勾选状态
    state: { default: true, type: Boolean },
    //  5.  传 id 过来, 才能知道控制的是哪个复选框,所以是必选项
    id: { required: true, type: Number },

    count: { default: 1, type: Number },
  },
  components: { Counter },
};
</script>

<style lang="less" scoped>
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.goods-container {
  border-bottom: 1px solid #ccc;
}
.thumb {
  float: left;
}

.goods-info {
  float: left;
  width: 200px;
  position: relative;
  margin-left: 20px;
  //   background-color: pink;
}
.goods-title {
  font-weight: 700;
  //  超出两行省略号
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goods-info-bottom {
  position: absolute;
  bottom: -55px;
  // background-color: pink;
  width: 200px;
  color: red;
  font-weight: 700;
}
// .goods-info-bottom Counter {
//   float: right;
// }
</style>