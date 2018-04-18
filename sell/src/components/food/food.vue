<template>
<transition name='slide'>
  <div v-show='showFlag' class='food' ref='foodWrapper'>
      <div>
        <div class='info-wrapper'>
            <div class='food-img'>
                <span class='icon-arrow_lift' @click='goBack'></span>
                <img :src="food.image" >
            </div>
            <div class='food-info'>
                <h1 class='food-title'>
                    {{food.name}}
                </h1>
                <div class='food-sales'>
                    <span class='count'>
                        月售{{food.sellCount}}份
                    </span>
                    <span class='rating'>
                        好评率{{food.rating}}%
                    </span>
                </div>
                <div class='price-wrapper'>
                    <div class='price'>
                        <span class='new-price'>
                            {{food.price}}
                        </span>
                        <span class='old-price' v-if='food.oldPrice!=""'>
                            {{food.oldPrice}}
                        </span>
                    </div>
                    <div class='switch-btn' ref='btn' >
                        <div class='show-btn' @click='addFood' v-if='food.count==null||food.count==0||food.count==undefined'>
                            加入购物车
                        </div>
                        <div class='show-cart' v-else>
                            <Button :food='food' @addItem='_drop'></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='desc-wrapper'>
            <div class='title'>商品介绍</div>
            <div class='desc'>
                {{food.description}}
            </div>
        </div>
        <Evaluate v-if='showFlag' :evals='food.ratings' :evalType='"all"'></Evaluate>
    </div>
  </div>
  </transition>
</template>
<script>
import Button from '../goods/shopcart/buttons/button';
import Evaluate from '../evaluate/evaluate'
import BScroll from 'better-scroll'
export default {
    components:{
        Button,Evaluate
    },
    props:{
        food:{
            type:Object
        }
    },
  data(){
      return{
          
      }
  },
  computed:{
      showFlag(){
          if(this.food.name){
              this.$nextTick(()=>{
                  if(!this.foodScroll){
                    this.foodScroll = new BScroll(this.$refs.foodWrapper,{
                        click:true
                    })
                  }else{
                      this.foodScroll.refresh();
                  }
                this._initScroll();
              })
              return true
          }else{
              return false
          }
      },
  },
  created(){
  },
  methods:{
      _initScroll(){
      },
      addFood(){
          this.$set(this.food,'count',1);
          this.$emit('dropTarget',this.$refs.btn)
      },
      _drop(){
          this.$emit('dropTarget',this.$refs.btn)
      },
      goBack(){
          this.$emit('goBack')
      }
  }
}
</script>
<style lang='stylus' scoped>
.food
    position:fixed
    top:0
    bottom:45px
    left:0
    z-index:30
    background-color:#f3f5f7
    .info-wrapper
        background-color:white
        border-bottom:1px solid rgba(7,17,27,0.1)
        .food-img
            position:relative
            span
                position:absolute
                top:0px
                left:0px
                z-index:50
                padding:10px 10px 10px 10px
                font-size:34px
                color:rgba(255,255,255,.6)
            img
                width:100%
        .food-info
            margin:18px 18px 18px 18px
            .food-title
                line-height:14px
                font-size:13px
                font-weight:700
                color:rgb(7,17,27)
            .food-sales
                line-height:20px
                font-size:10px
                color:rgb(147,153,159)
                .rating
                    margin-left:12px
            .price-wrapper
                display :flex
                .price,.switch-btn
                    flex:1
                    justify-content :space-around
                .price
                    .old-price
                        font-size:10px
                        font-weight:700
                        color:rgb(147,153,159)
                        text-decoration:line-through
                        &:before
                            content:"￥"
                            font-weight:200
                    .new-price
                        font-size:14px
                        font-weight:700
                        color:rgb(240,20,20)
                        line-height:24px
                        &:before
                            content:"￥"
                            font-weight:200
                            
                .switch-btn
                    flex:0
                    width:74px
                    .show-btn
                        padding:6px 12px
                        width:55px
                        background-color:rgb(0,160,220)
                        border-radius:12px
                        font-size:10px
                        line-height:12px
                        color:white
    .desc-wrapper
        margin-top:16px
        padding:18px
        background-color:white
        border-bottom:1px solid rgba(7,17,27,0.1)
        background-color:white
        .title
            font-size:14px
            line-height:14px
            color:rgb(7,17,27)
        .desc
            padding:6px 8px
            font-size:12px
            color:rgb(77,85,93)
            line-height:24px
        .btns
            margin-top:12px
            span
                margin-left:8px
                padding:8px 12px
                font-size:12px 
                color:white
                line-height:16px
                vertical-align :bottom
                border-radius :2px
                &:first-child
                    margin-left:0
                span
                    padding:0px 0px 0px 4px
                    font-size:8px
            .all
                background-color:rgb(0,160,220)
            .good
                color:rgb(77,85,93)
                background-color:rgba(0,160,220,0.2)
            .bad
                color:rgb(77,85,93)
                background-color:rgba(77,85,93,0.2)
        .eval-list
            margin-top:18px
            border-top:1px solid rgba(7,17,27,0.1)
            .content-choose
                padding:12px 0px
                font-size:12px 
                color:rgb(147,153,159)
                line-height:24px
                .icon-check_circle
                    font-size:24px
                    line-height:24px
            
                            
                           
                        
</style>
