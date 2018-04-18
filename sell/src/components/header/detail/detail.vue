<template>
  <div class='detail'>
      <div class='detail-wrapper clearfix'>
          <div class='detail-main'>
              <h2 class='title'>{{seller.name}}</h2>
              <stars :size='48' :score='seller.score'></stars>
              <div class='sub-title'>
                  <div class='line'></div>
                  <div class='text'>优惠信息</div>
                  <div class='line'></div>
              </div>
              <ul class='supports-wrapper'>
                  <li v-for='(item,index) in seller.supports' :key='index+item.type' class='support-item'>
                      <span class='typeImg' :class='supportIcons[item.type]'></span>
                      <span class='descText'>
                          {{item.description}}
                      </span>
                  </li>
              </ul>
              <div class='sub-title'>
                  <div class='line'></div>
                  <div class='text'>商家公告</div>
                  <div class='line'></div>
              </div>
              <div class='bulletin-wrapper'>
                  <span class='bulletin'>
                      {{seller.bulletin}}
                  </span>
              </div>
          </div>
      </div>
      <div class='detail-close'>
          <span class='icon-close' @click='$emit("closeDetail")'></span>
      </div>
  </div>
</template>
<script>
import stars from '../../star/star'
export default {
    props:{
        seller:{
            type:Object
        }
    },
    data(){
      return {
          supportIcons:['decrease_2','discount_2','discount_3','special_2','special_3','guarantee_2']
      }
    },
    components:{
        stars
    }
}
</script>
<style lang='stylus' scoped>
@import '../../../common/stylus/mixin.styl';
    .detail
        position:fixed
        top:0
        left:0
        width:100%
        height:100%
        background-color:rgba(7,17,27,0.5)
        z-index :99
        overflow:auto
        backdrop-filter:blur(10px)
        h3
            font-size:16px
            font-weight:700
            text-align:center
            line-height:32px
        .detail-wrapper
            min-height:100%
            width:100%
            .detail-main
                margin-top:64px
                padding-bottom:64px
                .title
                    line-height:16px
                    text-align:center
                    font-size:16px
                    font-weight :700
                .star-wrapper
                    margin-top:16px
                    padding:2px 0px
                    height:24px
                    text-align :center
                .sub-title
                    margin:28px auto 0px auto
                    width:80%
                    display :flex
                    .line
                        flex:1
                        border-bottom:1px solid rgba(255,255,255,0.2)
                        position relative
                        top:-6px
                    .text
                        padding:0px 12px
                        font-size:14px
                        font-weight:700
                .supports-wrapper
                    width:80%
                    margin:24px auto 0px auto
                    .support-item
                        height:16px
                        line-height:16px
                        padding:0px 12px 0px 12px  
                        margin-bottom:12px
                        .typeImg
                            display :inline-block
                            width:16px
                            height:16px
                            vertical-align :top
                            background-size:16px 16px
                            background-repeat:no-repeat
                            &.decrease_1
                                bg-image('decrease_1')
                            &.decrease_2
                                bg-image('decrease_2')
                            &.decrease_3
                                bg-image('decrease_3')
                            &.decrease_4
                                bg-image('decrease_4')
                            &.discount_1
                                bg-image('discount_1')
                            &.discount_2
                                bg-image('discount_2')
                            &.discount_3
                                bg-image('discount_3')
                            &.discount_4
                                bg-image('discount_4')
                            &.guarantee_1
                                bg-image('guarantee_1')
                            &.guarantee_2
                                bg-image('guarantee_2')
                            &.guarantee_3
                                bg-image('guarantee_3')
                            &.guarantee_4
                                bg-image('guarantee_4')
                            &.invoice_1
                                bg-image('invoice_1')
                            &.invoice_2
                                bg-image('invoice_2')
                            &.invoice_3
                                bg-image('invoice_3')
                            &.invoice_4
                                bg-image('invoice_4')
                            &.special_1
                                bg-image('special_1')
                            &.special_2
                                bg-image('special_2')
                            &.special_3
                                bg-image('special_3')
                            &.special_4
                                bg-image('special_4')
                        .descText
                            margin-left:6px
                            font-size:12px
                            line-height:12px
                .bulletin-wrapper
                    width:80%
                    margin:24px auto 0px auto
                    .bulletin
                        display :inline-block
                        padding:0px 12px
                        font-size:12px
                        line-height:24px
        .detail-close
            position relative
            width :32px
            height :32px
            margin:-64px auto 0 auto
            clear:both
            font-size:32px
            
</style>
