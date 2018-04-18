<template>
    <div class='btns-wrapper'>
        <transition name='silde-decr'>
            <div class='decrease icon-remove_circle_outline'  v-if='food.count' @click='Decrease' :key='"box1"'>
                
            </div>
        </transition>
        <transition name='silde-count'>
            <div class='count' v-if='food.count' :key='"box2"'>
                {{food.count}}
            </div>
        </transition>
        <div class='addition icon-add_circle' @click='Addition' >
            
        </div>
    </div>
</template>
<script>
import Vue from 'vue'


export default {
    created(){
        //   this.$watch('food',{
        //       deep:true,
        //       handler:function(){
        //         console.info(this.cart)
        //         console.info(this.food)
        //         for(let i=0;i<this.cart.length;i++){
        //                 if(this.cart[i].name==this.food.name){
        //                     if(this.cart[i].count>0){
        //                         this.cart[i].count--;
        //                     }else{
        //                         this.cart.splice(i,1);
        //                     }
        //                 }
        //             }
        //       }
        //   })
    },
    props:{
        food:{
            type:Object
        },
        // cart:{
        //     type:Array
        // }
    },
  data(){
      return {
      }
  },
  watch:{
      food(){
      }
  },
  methods:{
      Addition(){
        //   this.$emit('AddFood',this.food);
          if(this.food.count){
              Vue.set(this.food,'count',this.food.count+1)
          }else{
              Vue.set(this.food,'count',1)
          }
          //小红点
          this.$emit('addItem',event.target)
      },
      Decrease(){
          if(this.food.count){
              Vue.set(this.food,'count',this.food.count-1)
              if(this.food.count==0){
                this.$emit('toggleShopcart')
              }
          }
        //   for(let i=0;i<this.cart.length;i++){
        //                 if(this.cart[i].name==this.food.name){
        //                     console.info(this.cart[i].count)
        //                     if(this.cart[i].count<1){
        //                         this.cart.splice(i,1);
        //                         if(this.cart.length==0){
        //                             this.$emit('toggleShopcart')
        //                         }
        //                     }else{
        //                         this.$set(this.cart[i],'count',this.food.count);
        //                         if(this.cart[i].count==0){
        //                             this.cart.splice(i,1);
        //                         }
        //                         console.info(this.cart[i])
        //                     }
        //                 }
        //             }
      }
  }
}
</script>
<style lang='stylus' scoped>
    div
        display :inline-block
        vertical-align :top
        width:72px
        font-size:0
        text-align:right
        .decrease,.addition
            width:24px
            height:24px
            font-size:24px
            line-height:24px
            text-align:center
        .decrease
            width:24px
            height:24px
            line-height:24px
            color:rgb(0,160,220)
            background-color:white
        .addition
            color:rgb(0,160,220)
            position:relative
            z-index:2
        .count
            width:24px
            text-align:center
            line-height:24px
            font-size:10px
            color:rgb(147,153,159)
            
    .silde-decr-enter-active,.silde-decr-leave-active
        transition :all 0.3s linear
    .silde-decr-enter,.silde-decr-leave-to
        transform :translateX(24px)  rotate(180deg)
        opacity :0
    .silde-count-enter-active,.silde-count-leave-active
        transition :all 0.3s linear
    .silde-count-enter,.silde-count-leave-to
        opacity :0
</style>
