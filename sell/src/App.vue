<template>
  <div id="app">
    <Header :seller='seller'></Header>
    <div class='tab'>
      <div class='tab-item'>
        <router-link to='/goods'>商品</router-link>
        </div>
      <div class='tab-item'>
        <router-link to='/ratings'>评论</router-link>
        </div>
      <div class='tab-item'>
        <router-link to='/seller'>商家</router-link>
        </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from 'components/header/header'
import Axios from 'axios'
import {urlParse} from './common/js/util'

const ERR_NUM = 0;

export default {
  name: 'App',
  components:{
    Header
  },
  data(){
    return {
      seller:{
        id:(()=>{
          let queryParam = urlParse();
          return queryParam.id;
        })()
      },
    }
  },
  methods:{
    
  },
  created(){
    Axios.get('/api/seller?id='+this.seller.id).then((response) => {
       let result = response.data;
       if(result.error!=ERR_NUM){
         this.seller = Object.assign({},this.seller,response.data.data)
       }else{
         
       }
    }).catch()
  }
}
</script>

<style >
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.tab{
  display: flex;
  width:100%;
  height:40px;
  line-height:40px;
  background-color:white
  /* border-bottom:1px solid rgba(7,17,27,0.1); */
}
.tab-item{
  flex:1;
  text-align: center;
}
.tab-item a{
  display: block;
  color:rgb(77.85,93);
  font-size:14px;
}
.tab-item .active{
  color:rgb(240,20,20)
}
</style>
<style lang="stylus">
  @import "./common/stylus/mixin.styl";
  @import "./common/stylus/icon.styl";
  body,html 
    line-height:1
    font-weight:200
    font-family :'PingFang SC','STHeitiSC-Light','Helevtica-Light','arial','sans-serif'
  .tab
    border-1px(rgba(7,17,27,0.1))
  .clearfix
    display:inline-block
    &.after
      display :block
      content:'.'
      height:0
      line-height:0
      clear:both
      visibility:hidden
</style>

