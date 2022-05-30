<template>
  <div class="footer-box">
    <p class="choose">
      全选<input type="checkbox" :checked="isfull" @change="allChange" />
    </p>
    <p class="sum">
      合计：<span>￥{{ amount.toFixed(2) }}</span>
    </p>
    <div class="count">结算 ({{ allcount }})</div>
  </div>
</template>

<script>
export default {
  props: {
    //  1. 全选的状态  父向子传递
    isfull: {
      default: true,
      type: Boolean,
    },
    amount: {
      default: 0,
      type: Number,
    },
    allcount: {
      default: 0,
      type: Number,
    },
  },
  methods: {
    //  2.  监听全选的按钮状态变化，子向父传值
    allChange(e) {
      this.$emit("all-change", e.target.checked);
    },
  },
};
</script>

<style lang="less" scoped>
.footer-box {
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  //   line-height: 50px;
  border: 1px solid #ccc;
  background-color: #fff;
}
input {
  float: left;
}
.choose {
  position: absolute;
  top: 15px;
}
.sum {
  position: absolute;
  left: 88px;
  top: 12px;
}
.sum span {
  color: red;
  font-size: 700;
  font-size: 18px;
}
.count {
  //   float: right;
  position: absolute;
  top: 5px;
  right: 10px;
  background-color: rgb(47, 47, 248);
  height: 40px;
  line-height: 40px;
  width: 120px;
  border-radius: 20px;

  text-align: center;
  color: #fff;
}
</style>