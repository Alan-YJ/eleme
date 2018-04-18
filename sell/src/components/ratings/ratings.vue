<template>
    <div class='ratings-wrapper' ref='ratings'>
        <div>
        <div class='score-wrapper'>
            <div class='seller-score'>
                <div class='score'>{{seller.score}}</div>
                <div class='text'>综合评分</div>
                <div class='percent'>高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class='star-score'>
                <div>
                    <span>服务态度</span>
                    <Stars :size='36' :score='seller.serviceScore' class='services-star'></Stars>
                    <span class='score'>{{seller.serviceScore}}</span>
                </div>
                <div>
                    <span>欢迎程度</span>
                    <Stars :size='36' :score='seller.foodScore' class='services-star'></Stars>
                    <span class='score'>{{seller.foodScore}}</span>
                </div>
                <div>
                    <span>送达时间</span>
                    <span class='time'>{{seller.deliveryTime}}分钟</span>
                </div> 
            </div>
        </div>
        <div class='eval-wrapper'>
            <div class='btns'>
              <span class='all active' @click='checkEval("all",$event)'>全部<span>{{getCount("all")}}</span></span>
              <span class='good' @click='checkEval("good",$event)'>推荐<span>{{getCount("good")}}</span></span>
              <span class='bad' @click='checkEval("bad",$event)'>吐槽<span>{{getCount("bad")}}</span></span>
          </div>
          <div class='eval-list'>
              <div class='content-choose' @click='toggleShowContent'>
                  <span class='icon-check_circle' :class='onlyContent?"blue":"gray"'></span>
                  <span> 只看有内容的评价</span>
              </div>
              <ul>
                <li v-for='(item,index) in list' :key='item.username+index' class='ratings'>
                    <div class='avatar'>
                        <img :src="item.avatar" >
                    </div>
                    <div class='eval-info'>
                        <div class='username-wrapper'>
                            <div class='username'>{{item.username}}</div>
                            <div class='rateTime'>
                                {{timestampToDate(item.rateTime)}}
                            </div>
                        </div>
                        <div class='evalscore-wrapper'>
                            <Stars :size='24' :score='item.score' class='score'></Stars>
                            <span class='deliveryTime' v-if='item.deliveryTime&&item.deliveryTime!=""'>{{item.deliveryTime}}分钟送达</span>
                        </div>
                        <div class='content'>
                            {{item.text}}
                        </div>
                        <div class='tag-wrapper'>
                            <span class='icon-thumb_down' v-if='item.rateType==1'></span>
                            <span class='icon-thumb_up' v-if='item.rateType==0'></span>
                            <span class='recommendList' v-for='recom in item.recommend' :key='recom'>
                                {{recom}}
                            </span>
                        </div>
                    </div>
                </li>
                <li v-if='ratings.length==0' class='no-eval'>
                      暂无评论
                </li>
              </ul>
          </div>
        </div>
        </div>
    </div>
</template>
<script>
import Stars from '../star/star'
import Axios from 'axios'
import BScroll from 'better-scroll'
export default {
    components:{
        Stars
    },
    data(){
        return {
            list:[],
            ratings:[],
            seller:{},
            evalType:"all",
            onlyContent:false
        }
    },
    created(){
        Axios.get('/api/ratings').then((response)=>{
            this.ratings = response.data.data;
            this.getList();
        });
        Axios.get('/api/seller').then((response)=>{
            this.seller = response.data.data;
        });
        this.$nextTick(()=>{
            this.scroll = new BScroll(this.$refs.ratings,{
                click:true
            })
        })
        
    },
    methods:{
      toggleShowContent(){
          this.onlyContent = !this.onlyContent;
          this.getList();
      },
      checkEval(type,event){
          let dom = event.srcElement;
          if(dom.className==''){
              dom = event.srcElement.parentElement
          }
          for(let i=0;i<dom.parentElement.children.length;i++){
             dom.parentElement.children[i].className = dom.parentElement.children[i].className.replace('active','');
          }
          dom.className += ' active';
          this.evalType = type;
          this.getList();
      },
      getDate(rateTime){
          return this.timestampToDate(rateTime);
      },
      timestampToDate(timestamp){
          let newDate = new Date();
          newDate.setTime(parseInt(timestamp)).toLocaleString();
          let year = newDate.getFullYear();
          let month = newDate.getMonth();
          let day = newDate.getDay();
          let hour = newDate.getHours();
          let minute = newDate.getMinutes();
          let second = newDate.getSeconds();
          return year+"-"+month+"-"+day+"    "+hour+":"+minute;
      },
      getList(){
          this.list = [];
          let vm = this;
          if(!this.onlyContent&&this.evalType=='all'){
              vm.list = this.ratings
          }else{
            switch(this.evalType){
                case "all":
                    this.ratings.forEach(function(item){
                        if(!vm.onlyContent){
                            vm.list.push(item)
                        }else if(item.text.trim()!=""){
                            vm.list.push(item)
                        }
                    })
                    break;
                case "good":
                    this.ratings.forEach(function(item){
                        if(item.rateType==0&&!vm.onlyContent){
                            vm.list.push(item)
                        }else if(item.rateType==0&&item.text.trim()!=""){
                            vm.list.push(item)
                        }
                    })
                    break;
                case "bad":
                    this.ratings.forEach(function(item){
                        if(item.rateType==1&&!vm.onlyContent){
                            vm.list.push(item)
                        }else if(item.rateType==1&&item.text.trim()!=""){
                            vm.list.push(item)
                        }
                    })
                    break;
            }
        }
      },
      getCount(type){
          let num = 0;
          switch(type){
              case "all":
                this.ratings.forEach(function(item){
                        num++;
                })
                break;
              case "good":
                this.ratings.forEach(function(item){
                    if(item.rateType==0){
                        num++;
                    }
                })
                break;
              case "bad":
                this.ratings.forEach(function(item){
                    if(item.rateType==1){
                        num++;
                    }
                })
                break;
          }
          return num;
      }
}}
</script>
<style lang='stylus' scoped>
.ratings-wrapper
    position:absolute
    top:176px
    left:0px
    bottom:0px
    width:100%
    overflow hidden
    background-color:#f3f5f7
    .score-wrapper
        padding:18px 0px 
        display :flex
        border-bottom:1px solid rgba(7,17,27,0.1)
        background-color:white
        .seller-score
            flex:auto
            text-align :center
            .score
                font-size:24px
                color:rgb(255,153,0)
                line-height:28px
            .text
                margin-top:6px
                font-size:12px
                color:rgb(7,17,27)
                line-height:12px
            .percent
                margin-top:6px
                font-size:10px
                color:rgb(147,153,159)
                line-height:10px
        .star-score
            flex:0 0 auto
            padding:0px 20px
            width:210px
            border-left:1px solid rgba(7,17,27,0.1)
            &>div
                margin-top:8px
                font-size:12px
                line-height:18px
                .score
                    margin-left:6px
                    color:rgb(255,153,0)
                    font-size:12px
                    line-height:18px
            &>div:first-child
                margin-top:0px
            .services-star,.time
                margin-left:6px
                height:16px
                display:inline
            .services-star
                position:relative
                top:3px
            .time
                font-size:12px
                color:rgb(147,153,159)
                line-height:18px
    .eval-wrapper
        margin-top:16px
        padding:18px
        background-color:white
        border-top:1px solid rgba(7,17,27,0.1)
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
            .all,.good
                color:rgb(77,85,93)
                background-color:rgba(0,160,220,0.2)
            .bad
                color:rgb(77,85,93)
                background-color:rgba(77,85,93,0.2)
            .active
                color:white
                background-color:rgb(0,160,220)
            .bad.active, .bad.active span
                background-color:#93999f
            .bad span,.good span,.all span
                color:rgb(77,85,93)
            .active span,.active span
                color:white
        .eval-list
            margin-top:18px
            border-top:1px solid rgba(7,17,27,0.1)
            .content-choose
                padding:12px 0px
                font-size:12px 
                color:rgb(147,153,159)
                span
                    vertical-align :middle
                    line-height:24px
                .icon-check_circle
                    font-size:24px
                    &.blue
                        color:rgb(0,160,220)
            ul
                border-top:1px solid rgba(7,17,27,0.1)
                .no-eval
                    margin-top:12px
                    font-size:14px
                    text-align:center
                .avatar,.avatar img
                    width:28px
                    border-radius :50%
                .ratings
                    display :flex
                    padding:18px 0px
                    border-bottom:1px solid rgba(7,17,27,0.1)
                    &:last-child
                        border:none
                    .eval-info
                        margin-left:12px
                        flex:1
                        .username-wrapper
                            display :flex
                            justify-content :space-between
                            &>div
                                font-size:10px
                                line-height:12px
                                color:rgb(7,17,27)
                            .rateTime
                                color:rgb(147,153,159)
                        .evalscore-wrapper
                            margin-top:4px
                            font-size:10px
                            color:rgb(147,153,159)
                            line-height:12px
                            .score
                                display:inline-block
                            .deliveryTime
                                margin-left:6px
                        .content
                            margin-top:6px
                            font-size:12px
                            color:rgb(7,17,27)
                            line-height:18px
                        .tag-wrapper
                            margin-top:8px
                            .icon-thumb_down
                                font-size:12px
                                line-height:16px
                                color:rgb(183,187,191)
                                vertical-align :middle
                            .icon-thumb_up
                                font-size:12px
                                line-height:16px
                                color:rgb(0,160,220)
                                vertical-align :middle
                            .recommendList
                                display inline-block
                                margin-left:8px
                                padding:0px 3px
                                border:1px solid rgba(7,17,27,0.1)
                                border-radius:2px
                                max-width:45px
                                overflow hidden
                                white-space :nowrap
                                text-overflow :ellipsis
                                vertical-align :middle
                                font-size:8px
                                color:rgb(147,153,159)
                                line-height:12px
                                
                    

</style>
