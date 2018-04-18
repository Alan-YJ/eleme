<template>
  <div class='star-wrapper' :class='starSize'>
      <span class='star' v-for='(item,index) in starType' :key='item+index' :class='item'></span>
  </div>
</template>
<script>
const MAX_SCORE= 5;
export default {
  data(){
      return {}
  },
  props:{
      size:{
          type:Number
      },
      score:{
          type:Number
      }
  },
  computed:{
      starSize(){
          return 'star-'+this.size
      },
      starType(){
          let starArr = [];
          let realStarNum = Math.floor(this.score);
          let hasHalf = (Math.floor(this.score*2) /2)%1!==0 ;
          for(let i =0;i<realStarNum;i++){
              starArr.push('on');
          }
          if(hasHalf){
              starArr.push('half');
          }
          while(starArr.length<MAX_SCORE){
              starArr.push('off');
          }
          return starArr;
      }
  }
}
</script>
<style lang='stylus' scoped>
@import "../../common/stylus/mixin.styl";
    .star-wrapper
        &.star-48
            .star
                width:20px
                height:20px
                display :inline-block
                margin-right:16px
                background-size:20px
                background-repeat:20px
                &:last-child
                    margin-right:0
                &.on
                    bg-image('star48_on')
                &.half
                    bg-image('star48_half')
                &.off
                    bg-image('star48_off')
        &.last-child
            margin-right:0
        &.star-36
            .star
                width:15px
                height:15px
                display :inline-block
                margin-right:12px
                background-size:15px
                background-repeat:15px
                line-height:15px
                &:last-child
                    margin-right:0
                &.on
                    bg-image('star36_on')
                &.half
                    bg-image('star36_half')
                &.off
                    bg-image('star36_off')
        &.last-child
            margin-right:0
        &.star-24
            .star
                width:10px
                height:10px
                display :inline-block
                margin-right:8px
                background-size:10px
                background-repeat:10px
                &:last-child
                    margin-right:0
                &.on
                    bg-image('star24_on')
                &.half
                    bg-image('star24_half')
                &.off
                    bg-image('star24_off')
        &.last-child
            margin-right:0
                
                
</style>
