<template>
    <div class='seller-wrapper' ref='seller'>
        <div>
            <div class='info-wrapper'>
                <div class='title-wrapper'>
                    <div class='title'>
                        <div class='text'>{{seller.name}}</div>
                        <Stars class='score-star' :size='36' :score='seller.score'></Stars>
                        <span class='ratingCount'>
                            ({{seller.ratingCount}})
                        </span>
                        <span class='sellCount'>
                            月售{{seller.sellCount}}单
                        </span>
                    </div>
                    <div class='collect' @click='Collect' v-if='isCollect'>
                        <div class='icon-favorite'></div>
                        <span class='text'>已收藏</span>
                    </div>
                    <div class='collect' @click='Collect' v-else>
                        <div class='icon-favorite not-collect'></div>
                        <span class='text'>收藏</span>
                    </div>
                </div>
                <div class='distribution-wrapper'>
                    <dl>
                        <dt class='text'>起送价</dt>
                        <dd class='value'>
                            {{seller.minPrice}}
                        </dd><dd class='unit'>元</dd>
                    </dl>
                    <dl>
                        <dt class='text'>商家配送</dt>
                        <dd class='value'>
                            {{seller.deliveryPrice}}
                        </dd><dd class='unit'>元</dd>
                    </dl>
                    <dl>
                        <dt class='text'>平均配送时间</dt>
                        <dd class='value'>
                            {{seller.deliveryTime}}
                        </dd><dd class='unit'>分钟</dd>
                    </dl>
                </div>
            </div>
            <div class='desc-wrapper'>
                <div class='title'>公告与活动</div>
                <p class='desc'>
                    {{seller.bulletin}}
                </p>
                <dl class='support' v-for='item in seller.supports' :key='item.description'>
                    <dt :class='"icon-"+item.type'></dt>
                    <dd class='text'>
                        {{item.description}}
                    </dd>
                </dl>
            </div>
            <div class='AR-wrapper'>
                <div class='title'>商家实景</div>
                <div class='img-wrapper' ref='imgbox'>
                    <div ref='imgs'>
                        <img :src="pic" v-for='pic in seller.pics' :key='pic' />
                    </div>
                </div>
            </div>
            <div class='about-wrapper'>
                <div class='title'>商家信息</div>
                <div v-for='item in seller.infos' :key='item' class='info'>
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import BScroll from 'better-scroll';
import Stars from '../star/star'
import {urlParse} from '../../common/js/util';
import {saveStore,localFromLocal} from '../../common/js/store'

export default {
    data(){
        return {
            seller:{
                id:(()=>{
                   return urlParse()
                })
            },
            isCollect:false
        }
    },
    created(){
        Axios.get('/api/seller').then((response)=>{
            this.seller = Object.assign({},this.seller,response.data.data)
        })
    },
    watch:{
        seller(){
            this._initScroll();
            this._initImg();
            this.isCollect = (()=>{
                return localFromLocal(this.seller.id,'Collect',false)
            })();
        }
    },
    methods:{
        // getWidth(){
        //     let w = 0;
        //     for(let i =0;i<this.seller.pics.length;i++){
        //         w+=126;
        //     }
        //     return w-6;
        // },
        Collect(){
            this.isCollect = !this.isCollect;
            saveStore(this.seller.id,'Collect',this.isCollect);
        },
        _initImg(){
            if(this.seller.pics){
            let width = 126*this.seller.pics.length-6;
            this.$refs.imgs.style.width=width+"px";
            this.$nextTick(()=>{
                let imgScroll = new BScroll(this.$refs.imgbox,{
                    scrollX:true,
                    eventPassthrough:'vertical'
                })
            })
            }
        },
        _initScroll(){
            this.$nextTick(()=>{
                let scroll = new BScroll(this.$refs.seller,{
                    click:true
                })
            })
        }
    },
    components:{
        Stars
    }
}
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixin.styl';
    .seller-wrapper
        position:absolute
        top:176px
        left:0px
        bottom:0px
        width:100%
        overflow hidden
        background-color:#f3f5f7
        .info-wrapper
            padding:18px;
            border-bottom:1px solid rgba(7,17,27,0.1)
            background-color:white
            .title-wrapper
                display:flex
                .title
                    flex:1
                    .text
                        font-size:14px
                        color:rgb(7,17,27)
                        line-height:14px
                    .score-star
                        margin-top:8px
                        display inline-block
                        position:relative
                        top:3px
                    .ratingCount,.sellCount
                        margin-left:8px
                        font-size:10px
                        color:rgb(77,85,93)
                        line-height:18px
                    .sellCount
                        margin-left:12px
                .collect
                    width:36px
                    text-align:center
                    .icon-favorite
                        line-height:24px
                        font-size:24px
                        color:rgb(240,20,20)
                    .text
                        font-size:10px
                        color:rgb(77,85,93)
                        line-height:10px
                    .not-collect
                        color:rgb(147,153,159)
            .distribution-wrapper
                margin-top:18px
                border-top:1px solid rgba(7,17,27,0.1)
                padding-top:18px
                display:flex
                dl
                    flex:1
                    display inline-block
                    border-right:1px solid rgba(7,17,27,0.1)
                    text-align :center
                    &:last-child
                        border:none
                    .text
                        color:rgb(147,153,159)
                        font-size:10px
                        line-height:10px
                    .value,.unit
                        margin-top:4px
                        display inline-block
                        vertical-align :bottom
                    .value
                        font-size:24px
                        color:rgb(7,17,27)
                        line-height:24px
                    .unit
                        font-size:10px
                        line-height:16px
        .desc-wrapper
            margin-top:16px
            padding:18px
            background-color:white
            .title
                font-size:14px
                color:rgb(7,17,27)
                line-height:14px
            .desc
                margin-top:8px
                padding:0px 12px 16px 12px
                line-height:24px
                color:rgb(240,20,20)
                font-size:12px
            .support
                padding:16px 24px 16px 12px
                border-top:1px solid rgba(7,17,27,0.1)
                &:last-child
                    padding-bottom:0
                dt,dd
                    display inline-block
                dt
                    width:16px
                    height:16px
                    background-size 16px
                    background-repeat :no-repeat
                    vertical-align :middle
                dt.icon-0
                    bg-image("imgs/decrease_3")
                dt.icon-1
                    bg-image("imgs/discount_3")
                dt.icon-2
                    bg-image("imgs/special_1")
                dt.icon-3
                    bg-image("imgs/invoice_1")
                dt.icon-4
                    bg-image("imgs/guarantee_1")
                dd
                    font-size:12px
                    color:rgb(7,17,27)
                    line-height:16px
                    vertical-align :middle
        .AR-wrapper
            margin-top:16px
            padding:18px
            background-color:white
            .title
                font-size:14px
                color:rgb(7,17,27)
                line-height:14px
            .img-wrapper
                width:100%
                overflow hidden
                div
                    font-size:0
                    margin-top:12px
                    white-space nowrap
                img
                    margin-left:6px
                    width:120px
                    height:90px
                    &:first-child
                        margin-left:0px
        .about-wrapper
            margin-top:16px
            padding:18px
            background-color:white
            .title
                font-size:14px
                color:rgb(7,17,27)
                line-height:14px
                margin-bottom:12px
            .info
                border-top:1px solid rgba(7,17,27,0.1)
                padding:16px 12px
                font-size:12px
                color:rgb(7,17,27)
                line-height:16px
                
</style>
