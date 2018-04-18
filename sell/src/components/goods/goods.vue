<template>
    <div class='goods-wrapper'>
        <div class='category-wrapper' ref='categoryWrapper'>
            <ul>
                <li class='category' v-for='(item,index) in goods' :key='item.name' :class='{"active":index==currentIndex}' @click='positionCategory(index)'>
                    <span class='text'><span v-if='item.type>0' class='smallIcon' :class='"smallIcon"+item.type'></span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class='goods-list' ref='goodsList'>
            <div>
                <dl v-for='category in goods' :key='category.name' ref='category'>
                    <dt class='category-title'>
                        {{category.name}}
                    </dt>
                    <dd class='food-wrapper' v-for='food in category.foods' :key='food.name'>
                        
                        <dl class='food'>
                            <dt class='food-image' @click='showGood(food)'>
                                <img :src="food.icon">
                            </dt>
                            <dd class='food-info'>
                                <div class='food-title' @click='showGood(food)'>
                                    {{food.name}}
                                </div>
                                <div class='food-desc' v-if='food.description!=""'>
                                    {{food.description}}
                                </div>
                                <div class='food-sales'>
                                    <span class='food-sellCount'>月售{{food.sellCount}}份</span>
                                    <span class='food-rating'>好评率{{food.rating}}%</span>
                                </div>
                                <div class='food-price'>
                                    <span class='price'><span class='money'>￥</span>{{food.price}}</span>
                                    <span class='oldPrice' v-if='food.oldPrice!=""'>￥{{food.oldPrice}}</span>
                                </div>
                                <Button class='btns' :food='food' :cart='cart' @AddFood='addFood(food)' @addItem='_drop'></Button>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </div>
        </div>
        <Shopcart :selectFoods='selectFoods' @clearShopcart='clearShopcart' ref='shopcart' :minPrice='seller.minPrice'>
            
        </Shopcart>
        <Food :food='selectFood' @goBack='goBack' @dropTarget='_drop' v-if='selectFood!=""'></Food>
    </div>
</template>
<script>
import Vue from 'vue'
import Axios from 'axios'
import BScroll from 'better-scroll'
import Shopcart from './shopcart/shopcart'
import Button from './shopcart/buttons/button'
import Food from '../food/food';

export default {
    components:{
        Button,Shopcart,Food
    },
    data(){
        return {
            goods:[],
            cart:[],
            heights:[],
            scoreY:0,
            seller:{},
            selectFood:{}
        }
    },
    watch:{
    },
    created(){
        Axios.get('/api/goods/').then((response)=>{
            let result = response.data;
            if(result.data){
                this.goods = result.data;
                this.$nextTick(()=>{
                    this._initScroll();
                    this._initHeights();
                })
            }
        });
        Axios.get('/api/seller/').then((response) => {
            let result = response.data;
            this.seller = result.data;
        })
    },
    computed:{
        currentIndex(){
            for(let i =0;i<this.heights.length;i++){
                if((this.heights[i]<=this.scoreY&&this.heights[i+1]>this.scoreY)||!this.heights[i+1]){
                    return i;
                }
            }
        },
        selectFoods(){
            let foods = [];
            this.goods.forEach((good)=>{
                good.foods.forEach((food)=>{
                    if(food.count){
                        foods.push(food);
                    }
                })
            })
            return foods;
        }
    },
    methods:{
        goBack(){
            this.selectFood ='';
        },
        clearShopcart(){
            for(let i = 0;i<this.selectFoods.length;i++){
                this.$set(this.selectFoods[i],'count',0);
            }
            this.$set(this.selectFoods[this.selectFoods.length-1],'count',0);
            this.$refs.shopcart.toggleShopcart();
        },
        _initScroll(){
            this.categoryScroll = new BScroll(this.$refs.categoryWrapper,{
                click:true
            })
            this.goodsScroll = new BScroll(this.$refs.goodsList,{
                probeType:3,
                click:true
            })
            this.goodsScroll.on('scroll',(pos)=>{
                this.scoreY = Math.abs(Math.round(pos.y));
            })
        },
        _initHeights(){
            let height = 0;
            this.heights.push(height);
            let goods = this.$refs.category;
            for(let i =0;i<goods.length;i++){
                height+=goods[i].clientHeight;
                this.heights.push(height)
            }
        },
        positionCategory(index){
            let element = this.$refs.category[index];
            this.goodsScroll.scrollToElement(element,300)
        },
        addFood(food){
            
            // for(let i =0;i<this.cart.length;i++){
            //     if(this.cart[i].name==food.name){
            //         this.cart[i].count++
            //     }else{
            //         this.cart.push(
            //             obj
            //         )
            //     }
            // }
            // for(let i=0;i<this.cart.length;i++){
            //     if(this.cart[i].name==food.name){
            //         this.cart[i].count++
            //         return ;
            //     }
            // }
            // this.cart.push({
            //         name:food.name,
            //         price:food.price,
            //         count:1
            //     } 
            // )
        },
        decrFood(food){
            // for(let i=0;i<this.cart.length;i++){
            //     if(this.cart[i].name==food.name){
            //         if(this.cart[i].count>1){
            //             this.cart[i].count--
            //         }else{
            //             this.cart.splice(i,1);
            //         }
            //         return ;
            //     }
            // }
        },
        // decrFood1(food){
        //     for(let i=0;i<this.cart.length;i++){
        //         if(this.cart[i].name==food.name){
        //             if(this.cart[i].count>1){
        //                 this.cart[i].count--
        //             }else{
        //                 this.cart.splice(i,1);
        //             }
        //             return ;
        //         }
        //     }
        // },
        _drop(target){
            this.$refs.shopcart.dropItem(target)
        },
        showGood(food){
            this.selectFood = food;
        }
    }
}
</script>
<style lang='stylus' scoped>
@import "../../common/stylus/mixin.styl";
    .slide-enter, .slide-leave-to
        transform :translateX(100%)
    .slide-enter-active, .slide-leave-active
        transition :all 0.3s
    .goods-wrapper
        display :flex
        width:100%
        position:absolute
        top:174px
        bottom:46px
        overflow:hidden
        .category-wrapper
            width:80px
            flex:0 0 80px
            background-color:#f3f5f7
            .category
                padding:0px 12px
                display :table
                width:56px
                height 54px
                font-size:12px
                line-height:14px
                border-bottom:1px solid rgba(7,17,27,0.1)
                &:last-child
                    border:none
                &.active
                    background-color:white
                    border-bottom:none
                    z-index:2
                    height:55px
                    margin-top:-1px
                .smallIcon
                    display :inline-block
                    width:12px 
                    height:12px 
                    background-size:12px 12px
                    background-repeat:no-repeat
                    vertical-align :top
                    margin-right:2px
                    &.smallIcon1
                        bg-image('special_2')
                    &.smallIcon2
                        bg-image('decrease_3')
                .text
                    display :table-cell
                    vertical-align :middle
        .goods-list
            flex:1
            .category-title
                width:100%
                height:26px
                line-height:26px
                background-color:#f3f5f7
                font-size:12px
                color:rgb(147,153,159)
                text-indent:14px
                border-left:2px solid #d9dde1
            .food-wrapper
                padding:0px 18px
                &:last-child .food
                    border:none
                .food
                    display :flex
                    padding:18px 0px
                    border-bottom:1px solid rgba(7,17,27,0.1)
                    .food-image img
                        width:57px
                        height:57px
                        flex:0 0 57px
                    .food-info
                        margin-left:10px
                        position:relative
                        flex:1
                        .btns
                            position:absolute
                            right:0
                            bottom:0
                        .food-title
                            margin:2px 0px 8px 0px
                            font-size:14px
                            color:rgb(7,17,27)
                            line-height:14px
                        .food-desc,.food-sales,.food-price
                            margin-top:8px
                            font-size:10px
                            color:rgb(147,153,159)
                            line-height:10px
                        .food-sales
                            .food-rating
                                margin-left:12px
                        .food-desc
                            line-height:12px
                            width:100%
                        .food-price
                            font-weight:700
                            .price
                                font-size:14px
                                line-height:14px
                                font-weight:700
                                color:red
                                .money
                                    font-size:10px
                            .oldPrice
                                margin-left:  8px 
                            .oldPrice
                                text-decoration :line-through 
                                vertical-align :top
                        
</style>
