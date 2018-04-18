<template>
<div class='eval-wrapper'>
          <div class='title'>商品评价</div>
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
                  <li class='eval-item' v-for='(item,index) in ecalList' :key='item.rateTime+index'>
                      <div class='eval-info'>
                        <div class='eval-time'>
                            {{getDate(item.rateTime)}}
                        </div>
                        <div class='eval-account'>
                            {{item.username}}
                            <img :src="item.avatar" />
                        </div>
                      </div>
                      <div class='text-wapper'>
                          <span class='icon-thumb_down ' v-if='item.rateType==1'></span>
                          <span class='icon-thumb_up' v-else></span>
                          <span class='text'>
                            {{item.text}}
                          </span>
                      </div>
                  </li>
                  <li v-if='ecalList.length==0' class='no-eval'>
                      暂无评论
                  </li>
              </ul>
          </div>
      </div>
</template>
<script>
export default {
  props:{
      evals:{
          type:Array,
          default(){[]}
      }
  },
  data(){
      return {
        evalType:"all",
        onlyContent:false
      }
  },
  computed:{
      ecalList(){
          let list = [];
          let vm = this;
          switch(this.evalType){
              case "all":
                this.evals.forEach(function(item){
                    if(!vm.onlyContent){
                        list.push(item);
                    }else if(item.text.trim()!=""){
                        list.push(item);
                    }
                })
                break;
              case "good":
                this.evals.forEach(function(item){
                    if(item.rateType==0&&!vm.onlyContent){
                        list.push(item);
                    }else if(item.rateType==0&&item.text.trim()!=""){
                        list.push(item);
                    }
                })
                break;
              case "bad":
                this.evals.forEach(function(item){
                    if(item.rateType==1&&!vm.onlyContent){
                        list.push(item);
                    }else if(item.rateType==1&&item.text.trim()!=""){
                        list.push(item);
                    }
                })
                break;
          }
          return list;
      }
  },
  methods:{
      toggleShowContent(){
          this.onlyContent = !this.onlyContent;
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
      getCount(type){
          let num = 0;
          switch(type){
              case "all":
                this.evals.forEach(function(item){
                        num++;
                })
                break;
              case "good":
                this.evals.forEach(function(item){
                    if(item.rateType==0){
                        num++;
                    }
                })
                break;
              case "bad":
                this.evals.forEach(function(item){
                    if(item.rateType==1){
                        num++;
                    }
                })
                break;
          }
          return num;
      }
  }
}
</script>
<style lang='stylus' scoped>
.eval-wrapper
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
                .eval-item
                    padding:16px 0px
                    border-bottom:1px solid rgba(7,17,27,0.1)
                    &:last-child
                        border:none
                    .eval-info
                        display :flex
                        &>div
                            justify-content :space-around
                            flex:1   
                            font-size:10px
                            color:rgb(147,153,159)
                        .eval-account
                            text-align:right
                            vertical-align :middle
                            img
                                margin-left:6px
                                height:12px
                                width:12px
                    .text-wapper
                        margin-top:6px
                        font-size:12px
                        color:rgb(7,17,27)
                        line-height:16px
                        font-size:12px
                        .icon-thumb_down
                            color:rgb(147,153,159)
                            line-height:24px
                        .icon-thumb_up
                            color:rgb(0,160,220)
                        .text
                            margin-left:4px
                            font-size:12px
                            color:rgb(7,17,27)
                            line-height:16px
                .no-eval
                    margin-top:12px
                    font-size:14px
                    text-align:center
</style>
