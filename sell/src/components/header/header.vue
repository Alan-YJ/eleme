<template>
  <div class='header'>
      <div class='content-wrapper'>
        <div class='avatar'>
          <img :src="seller.avatar" >
        </div>
        <div class='content'>
          <div class='title'>
            <span class='brand'></span>
            <span class='name'>{{seller.name}}</span>
          </div>
          <div class='description'>
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div class='supports' v-if='seller.supports'>
            <span class='icon' :class='iconNumList[seller.supports[0].type].desc'></span>
            <span class='text'>{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class='supports-btn' @click='showDetail' v-if='seller.supports'>
          <span>{{seller.supports.length}}个 </span>
          <i class='icon-keyboard_arrow_right'></i>
        </div>
      </div>
      <div class='bulletin-wrapper' @click='showDetail'>
        <span class='bulletin-title'></span><span class='bulletin-text'>
          {{seller.bulletin}}
        </span>
        <span class='icon-keyboard_arrow_right'></span>
      </div>
      <div class='background'>
        <img :src="seller.avatar" class='bg-img'>
      </div>
      <transition name='fade'>
        <detail class='details' v-show='details' :seller='seller' @closeDetail='closeDetail' ></detail>
      </transition>
  </div>
</template>
<script>
import Detail from './detail/detail'
export default {
  props:{
    seller:{
      type:Object
    }
  },
  data(){
    return {
      iconNumList:[
        {desc:'decrease'},
        {desc:'discount'},
        {desc:'guarantee'},
        {desc:'invoice'},
        {desc:'special'}
      ],
      details:false
    }
  },
  components:{
    detail:Detail
  },
  methods:{
    showDetail(){
      this.details = true
    },
    closeDetail(){
      this.details = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixin";
  .avatar
    img 
      width:64px
      height:64px
  .header
    color:white
    background-color:rgba(7,17,27,0.5)
    .content-wrapper
      padding:24px 12px 18px 24px
      blur:10px
      font-size:0
      position:relative
      .supports-btn
          position:absolute
          right:12px
          bottom:14px
          padding:2px 16px 
          background-color:rgba(0,0,0,0.2)
          font-size:12px
          line-height:24px
          height:24px
          border-radius :14px
          text-align :center
          .icon-keyboard_arrow_right
            margin-left:2px
            font-size:10px
            line-height:24px
      .avatar,.content
        display inline-block
        vertical-align :top
      .avatar img
        border-radius :2px
      .content
        margin-left:16px
        .title
          margin-top:2px
          .brand
            width:30px
            height:18px
            display:inline-block
            bg-image('brand')
            background-size:30px 18px
            background-repeat:no-repeat
          .name
            margin-left:6px
            font-weight:700
            font-size:16px
            color:white
            line-height:18px
            vertical-align :top
        .description
          margin-top:8px
          font-size:12px
          line-height:12px
        .supports
          margin-top:10px
          font-size:10px
          line-height:12px
          .text
            margin-left:4px
            vertical-align :top
            line-height:12px
            font-size:10px
          .icon
            width:12px
            height:12px
            display:inline-block
            background-size:12px 12px
            background-repeat:no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
    .bulletin-wrapper
      position relative
      height:28px
      line-height:28px
      padding:0px 22px 0px 12px
      background-color:rgba(7,17,27,0.2)
      white-space nowrap
      overflow hidden
      text-overflow :ellipsis
      .bulletin-title
        display :inline-block
        vertical-align :top
        margin-top:8px
        width:22px
        height:12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat :no-repeat
      .bulletin-text
        font-size:10px
        margin-left:4px
        vertical-align :top
      .icon-keyboard_arrow_right
        position:absolute
        font-size:10px
        right:12px
        top:8px
    .background
      position:absolute
      top:0
      left:0
      z-index:-1
      width:100%
      height:134px
      overflow hidden
      filter:blur(10px)
      img
        width:100%
    .fade-enter,.fade-leave-to
      opacity :0
      background-color:rgba(7,17,27,0)
      transition :all 0.5s
    .fade-enter-active,.fade-leave-before
      opacity :1
      transition :all 0.5s
</style>
