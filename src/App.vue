<template>
  <div class="app-container">
    <Header></Header>
    <!--  3. 循环渲染每一个商品信息 并实现父向子传值-->
    <Goods
      v-for="item in list"
      :key="item.id"
      :title="item.goods_name"
      :pic="item.goods_img"
      :price="item.goods_price"
      :state="item.goods_state"
      :id="item.id"
      :count="item.goods_count"
      @state-change="getNewState"
    ></Goods>
    <!--   4.1  子向父传递 复选框的checked属性 用自定义事件 -->

    <Footer
      :isfull="fullState"
      @all-change="getAllState"
      :amount="amt"
      :allcount="total"
    ></Footer>
  </div>
</template>

<script>
//  1.  导入 header
import Header from "@/components/Header/Header.vue";
//  2.  导入 axios 库
import axios from "axios";
//  3.  导入goods
import Goods from "./components/Goods/Goods.vue";
import Footer from "@/components/Footer/Footer.vue";
import bus from "@/components/eventbus.js";

export default {
  components: {
    Header,
    Goods,
    Footer,
  },
  data() {
    return {
      //  2.3 只要请求回来的数据，在页面渲染期间要用到，就转存到data中  (list 用来存储购物列表)
      list: [],
    };
  },
  methods: {
    //  2.1 封装请求列表数据的方法
    async initCarList() {
      const { data: res } = await axios.get("https://www.escook.cn/api/cart");
      //console.log(res);
      //   2.3  转存数据
      if (res.status == 200) {
        this.list = res.list;
      }
    },

    //  4.1  接收子组件Goods.vue的值  val是一个对象包含id 和state 这里面的e就是传过来的对象
    getNewState(e) {
      this.list.some((item) => {
        if (item.id === e.id) {
          item.goods_state = e.value;
          //  4.2  数组的some在找到之后可以通过return 跳出
          return true;
        }
      });
    },

    //    5.2  在APP中拿到全选的状态
    getAllState(e) {
      // console.log(e);
      this.list.forEach((item) => (item.goods_state = e));
    },
  },

  computed: {
    //  5.1  计算属性 设置 Footer 的全选按钮
    fullState() {
      return this.list.every((item) => item.goods_state === true);
    },

    //  6.1  计算商品总价格
    amt() {
      return this.list
        .filter((item) => item.goods_state)
        .reduce((total, item) => {
          return (total += item.goods_price * item.goods_count);
        }, 0);
    },

    //  8.1  计算购买的总件数
    total() {
      return this.list
        .filter((item) => item.goods_state)
        .reduce((t, item) => {
          return (t += item.goods_count);
        }, 0);
    },
  },

  //  2.2 生命周期中 调用init..()
  created() {
    this.initCarList();
    //  7.1  Counter 利用eventBus向 App发送数据
    bus.$on("add-count", (e) => {
      // console.log(e);
      this.list.some((item) => {
        if (item.id === e.id) {
          item.goods_count = e.val;
          return true;
        }
      });
    });
    bus.$on("sub-count", (e) => {
      this.list.some((item) => {
        if (item.id === e.id) {
          item.goods_count = e.val;
          return true;
        }
      });
    });
  },
};
</script>

<style lang="less">
// .app-container {
//   padding-top: 45px;
//   padding-bottom: 50px;
// }
</style>
