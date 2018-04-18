<template>
    <div>
        <div class='shopcart-wrapper'>
            <div class='left-content' @click='toggleShopcart'>
                <div class='icon-wrapper'>
                    <div class='icon-background' :class='goodsCount>0?"hasgood":""'>
                        <span class='small-count' >{{goodsCount}}</span>
                        <span class='icon-shopping_cart'></span>
                    </div>
                </div>
                <div class='total-money' :class='goodsCount>0?"hasgood":""'> 
                    ￥<span>{{totalPrice}}</span>
                </div>
                <div class='split-line'></div>
                <div class='delivery-price'> 
                    另需配送费￥{{seller.deliveryPrice}}元
                </div>
            </div>
            <div class='right-content'>
                <span v-if='totalPrice==0'>￥{{seller.minPrice}}起送</span>
                <span v-if='totalPrice<minPrice&&totalPrice>0'>还差￥{{minPrice-totalPrice}}元起送</span>
                <span v-if='totalPrice>=minPrice' class='settlement'>去结算</span>
            </div>
            <div class='redPoint-wrapper'>
                <transition-group name='drop' @before-enter='beforeEnter' @enter='enter' @after-enter='afterEnter'>
                    <div class='redpoint' v-for='(ball,index) in balls' :key='"ball"+index' v-show='ball.show'>
                        <div class='inner inner-hook'></div>
                    </div>
                </transition-group>
            </div>
        </div>
            <ShopcartDetail v-if='showCart' :showCart='showCart' ref='goodsList' @clearShopcart='clearShopcart' @closeShopcart='closeShopcart' :list='selectFoods'></ShopcartDetail>
            <div class='gray-layer' v-if='showCart'></div>
    </div>
</template>
<script>
import ShopcartDetail from './shopcartDetail'
import Axios from 'axios'
import BScroll from 'better-scroll'
export default {
    components:{
        ShopcartDetail
    },
    props:{
        selectFoods:{
            type:Array
        },
        minPrice:{
            type:Number
        }
    }, 
    computed:{
        totalPrice(){
            let sum = 0;
            this.selectFoods.forEach(function(item){
                sum += item.price*item.count
            })
            return sum;
        },
        goodsCount(){
            return this.selectFoods.length;
        },
    },
    data(){
        return {
            seller:{},
            balls:[
                {show:false},
                {show:false},
                {show:false},
                {show:false},
                {show:false}
            ],
            dropBalls:[],
            showCart:false
        }
    },
  created(){
      Axios.get('/api/seller').then((response)=>{
          this.seller = response.data.data; 
      })
  },
  methods:{
      clearShopcart(){
          this.$emit('clearShopcart')
      },
      toggleShopcart(){
          if((!this.showCart)&&this.selectFoods.length>0){
            this.showCart = !this.showCart
          }
          else if(this.showCart){
            this.showCart = !this.showCart
          }
      },
      closeShopcart(){
          if(this.selectFoods.length==1&&this.selectFoods[0].count==0){
            this.showCart = !this.showCart
          }
      },
      dropItem(target){
          for(let i=0;i<this.balls.length;i++){
              let ball = this.balls[i];
              if(!ball.show){
                  ball.show = true;
                  ball.el = target;
                  this.dropBalls.push(ball);
                  return;
              }
          }
      },
      beforeEnter(el){
              let count = this.balls.length;
              while(count--){
                  let ball = this.balls[count];
                  if(ball.show){
                      let rect = ball.el.getBoundingClientRect();
                      let x=  rect.left-32;
                      let y = -(window.innerHeight-rect.top-44);
                      el.style.display = '';
                      el.style.webKitTransform = `translate3d(0,${y}px,0)`
                      el.style.transform = `translate3d(0,${y}px,0)`
                      let inner = el.getElementsByClassName('inner-hook');
                      inner[0].style.webKitTransform = `translate3d(${x}px,0,0)`
                      inner[0].style.transform = `translate3d(${x}px,0,0)`
                  }
              }
      },
      enter(el,done){
              /*手动触发浏览器重绘*/
              this.$nextTick(()=>{
                    el.style.webKitTransform = `translate3d(0,0,0)`
                    el.style.transform = `translate3d(0,0,0)`
                    let inner = el.getElementsByClassName('inner-hook');
                    inner[0].style.webKitTransform = `translate3d(0,0,0)`
                    inner[0].style.transform = `translate3d(0,0,0)`
              })
              setTimeout(()=>{
                done();
              },400)
      },
      afterEnter(el){
              let ball = this.dropBalls.shift();
              if(ball){
                  ball.show = false;
                  el.style.display = 'none';
              }
      }
      
  },
}
</script>
<style lang='stylus' scoped>
    .shopcart-wrapper
        position:fixed
        bottom:0
        left:0
        z-index:50
        display:flex
        width:100%
        height:46px
        background-color:#141d27
        color:rgba(255,255,255,0.4)
        font-size:0
        .left-content
            flex:1
            &>div
                display inline-block
                vertical-align :top
            .icon-wrapper
                margin:-12px 12px 2px 12px
                padding:6px
                width:44px
                height:44px
                border-radius :50%
                background-color:#141d27
                .icon-background
                    width:100%
                    height:100%
                    border-radius :50%
                    text-align :center
                    line-height:48px
                    background-color:rgba(255,255,255,0.1)
                    position:relative
                    &.hasgood
                        background-color:rgb(0,160,220)
                        .icon-shopping_cart
                            color:white
                        .small-count
                            display:block
                            width:24px
                            height:16px
                            font-size:9px
                            line-height:16px
                            text-align :center
                            color:white
                            background-color:rgb(240,20,20)
                            border-radius :6px
                            box-shadow :0px 4px 8px rgba(0,0,0,0.4)
                            position:absolute
                            right:-6px
                            top:-6px
                    .icon-shopping_cart
                        color:rgba(255,255,255,0.4)
                        font-size:24px
                        line-height:44px
            .total-money
                margin:12px
                font-size:14px
                font-weight:700
                line-height:24px
                span
                    font-weight:700
                &.hasgood
                    color:white
            .delivery-price
                margin-left:12px
                line-height:48px
                font-size:12px
            .split-line
                height:24px
                margin-top:10px
                border-left:1px solid rgba(255,255,255,0.1)
        .right-content
            flex:0 0 105px
            width:105px
            height:100%
            background-color:rgba(255,255,255,0.1)
            font-size:12px
            text-align:center
            line-height:48px
            .settlement
                width:100%
                height:100%
                display:inline-block
                background-color:#00b43c
                font-weight:700
                color:white
            span
                font-weight:700
    
    .redpoint
        position:fixed
        left:32px
        bottom:22px
        z-index:200
        .inner
            width:16px
            height:16px
            border-radius:50%
            background-color:red
            transition :all 0.4s linear
    .drop-enter-active
        transition :all 0.4s cubic-bezier(.37,-0.48,.88,.6)
    .gray-layer
        position:fixed
        top:0
        left:0
        z-index:48
        width:100%
        height:100%
        background-color:rgba(7,17,27,0.6)
</style>
