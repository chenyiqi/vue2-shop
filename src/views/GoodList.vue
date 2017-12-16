<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
        <span>商品列表</span>
    </nav-bread>
    <div class="accessory-result-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">排序:</span>
                <a href="javascript:;" @click.stop="showFilterPop" class="filterby">筛选</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter" id="filter" v-bind:class="{'filterby-show': filterBy}">
                    <dl class="filter-price">
                        <dt>价格区间:</dt>
                        <dd><a @click="setpriceFilter('all')" v-bind:class="{'cur': priceChecked == 'all'}" href="javascript:;">选择价格</a></dd>
                        <dd v-for="(item, index) in priceFilter">
                            <a @click="setpriceFilter(index)" v-bind:class="{'cur': priceChecked == index}" href="javascript:;">￥{{item.startPrice}}-{{item.endPrice}}元</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="item in goodsList.result">
                                <div class="pic">
                                    <a href="javascript:;"><img v-lazy="'/static/' + item.productImage" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import '../assets/css/base.css'
import '../assets/css/goods-list.css'
import NavHeader from '../components/NavHeader.vue'
import NavBread from '../components/NavBread.vue'
import NavFooter from '../components/NavFooter.vue'
import axios from 'axios'
export default {
  //name: 'HelloWorld',
  data () {
    return {
      goodsList: [],
      priceFilter:[{
            startPrice:'0.00',
            endPrice:'100.00'
        },
        {
            startPrice:'100.00',
            endPrice:'500.00'
        },
        {
            startPrice:'500.00',
            endPrice:'1000.00'
        },
        {
            startPrice:'1000.00',
            endPrice:'2000.00'
        },
        {
            startPrice:'2000.00',
            endPrice:'3000.00'
        },
        {
            startPrice:'3000.00',
            endPrice:'6000.00'
        }],
    priceChecked: 'all',
    filterBy: false
    }
  },
  mounted: function() {
      this.getGoodsList();
  },
  components: {
      NavHeader,
      NavBread,
      NavFooter
  },
  methods: {
      getGoodsList() {
          axios.get('/goods').then((result) => {
              console.log(result);
              this.goodsList = result.data;
          });
      },
      setpriceFilter(index) {
          this.priceChecked = index;
      },
      showFilterPop() {
          this.filterBy = true;
          this.overLayFlag = true;
      },
      closePop() {
          this.filterBy = false;
          this.overLayFlag = false;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
