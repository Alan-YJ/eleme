<template>
      <transition name='cart'>
        <div class='list-wrapper' v-show='showCart'>
            <div class='title'>
                <span class='text'>购物车</span> 
                <span class='clear' @click='clearShopcart'>清空</span>
            </div>
            <ul ref='goodsList'>
                <li v-for='item in list' :key='item.name'  class='list-item' >
                    <span class='item-title'>
                        {{item.name}}
                    </span>
                    <span class='item-price'>
                        ￥<span>{{item.price*item.count}}</span>
                    </span>
                    <Button class='btns' @toggleShopcart='toggleShopcart'  :cart='list' :food='item'></Button>
                </li>
            </ul>
        </div>
      </transition>
</template>
<script>
import Button from '../shopcart/buttons/button'
import BScroll from 'better-scroll'
export default {
  props:{
      list:{
          type:Array
      },
      showCart:{
          type:Boolean
      }
  },
  created(){
    //   this.$nextTick(()=>{
    //     this.goodsListScroll = new BScroll(this.$refs.goodsList,{
    //                 click:true
    //     })
    //   })
  },
  components:{
      Button
  },
  methods:{
      toggleShopcart(){
          this.$emit('closeShopcart')
      },
      clearShopcart(){
          this.$emit('clearShopcart')
      }
  },
  computed:{
  }
}
</script>
<style lang='stylus' scoped>

        .list-wrapper
            position:absolute
            z-index:49
            bottom:0px
            left:0px
            width:100%
            max-height:305px
            background-color:white
            // ul
            //     max-height:265px;
            .title
                display:flex
                justify-content:space-between
                height:40px
                background-color:#f3f5f7
                border-bottom:1px solid rgba(7,17,27,0.1)
                .text
                    margin-left:18px
                    font-size:14px
                    color:rgb(7,17,27)
                    line-height:40px
                .clear
                    margin-right:18px
                    line-height:40px
                    color:rgb(0,160,220)
                    font-size:12px
            .list-item
                padding:12px 18px
                height:24px
                border-bottom:1px solid rgba(7,17,27,0.1)
                display:flex
                justify-content:space-between
                &:last-child
                    border:none
                .item-title
                    font-size:14px
                    color:rgb(7,17,27)
                    line-height:24px
                    flex:1
                .item-price
                    display:inline-block
                    margin:0px 12px 0px 18px
                    font-size:10px
                    color:rgb(240,20,20)
                    line-height:24px
                    vertical-align :bottom
                    span
                        font-size:14px
                        font-weight:700
                .btns
                    width:72px
                    text-align:right
                    
                    
    .cart-enter
        transform :translateY(200px)
    .cart-enter-active
        transition :all 0.3s
            
</style>
