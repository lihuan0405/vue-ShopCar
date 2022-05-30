<template>
  <div class="counter-box">
    <button @click="subCount">-</button>
    <span class="num-box">{{ c }}</span>
    <button @click="addCount">+</button>
  </div>
</template>

<script>
import bus from "@/components/eventbus.js";

export default {
  props: {
    //  1.  这个c是由 APP传给Goods，再由Goods传给Counter的
    c: { default: 1, type: Number },
    id: { required: true, type: Number },
  },
  methods: {
    addCount() {
      //  2.   用eventbus 实现孙向爷传值
      bus.$emit("add-count", { id: this.id, val: this.c + 1 });
    },
    subCount() {
      if (this.c > 1) {
        bus.$emit("sub-count", { id: this.id, val: this.c - 1 });
      }
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.counter-box {
  float: right;
  color: black;
}
button {
  width: 20px;
  height: 20px;
  line-height: 16px;
  text-align: center;
  //   border: 0;
}
.num-box {
  display: inline-block;
  width: 50px;
  height: 20px;
  //   background-color: yellow;
  text-align: center;
}
</style>