<!-- ======================================广告轮播组件（向左滑动）============================ -->
<template>
<div class="banner-wrap"> <!-- :style="{width: screenWidth +'px'}" --> 
    <div class="pic_banner" :style="{width: screenWidth*imgInfoList.length +'px',left:scrollbarInfo.bannerLeft+'px'}">
        <a id="init_img"  href="#" target="_blank" style="display:none">
            <img src="#" alt="保底图" height="340" width="1680">
        </a>
        <template v-for="imgInfo in imgInfoList">
            <!-- <a :id="imgInfo.id"  :href="imgInfo.webaddress" :style="{width: screenWidth +'px',backgroundImage:'url('+imgInfo.imgaddress+')'}" target="_top"> -->
            <a :id="imgInfo.id"  :href="imgInfo.webaddress" :style="{width: screenWidth +'px'}" target="_top">
                <img :src="imgInfo.imgaddress" :alt="imgInfo.id">
            </a>
        </template>
    </div>
    <div>
        <ul class="paging">
            <template v-for="imgPlace of scrollbarInfo.imgLeft">
                <li v-if="imgPlace.id=='1'" :first="hidefirstpaging" @click="paging(imgPlace)" :current="imgPlace.isCurrent"></li>
                <li v-else-if="imgPlace.id==scrollbarInfo.imgLeft.length" :last="hidelastpaging" @click="paging(imgPlace)" :current="imgPlace.isCurrent"></li>
                <li v-else @click="paging(imgPlace)" :current="imgPlace.isCurrent"></li>
            </template>            
        </ul>
    </div>

</div>   

  
</template>

<script type="text/javascript">

export default{
    name:'adwheel',
    props:{},
    model: {},
    mixins:[],   //data数据合并混入
    data:function(){
      return {
        hidefirstpaging:'0',    //当true时，隐藏第一个分页按钮
        hidelastpaging:'1',      //隐藏最后一个分页按钮
        screenWidth: document.documentElement.clientWidth,  //浏览器窗口宽度   
        imgInfoList_1:[ //当元素采用背景图片时，直接使用绝对地址。但需要拷贝图片到dist目录
            {id:'img_01',webaddress:'#',imgaddress:'/web/static/ad01.jpg',imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_02',webaddress:'#',imgaddress:'/web/static/ad02.jpg',imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_03',webaddress:'#',imgaddress:'/web/static/ad03.jpg',imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_04',webaddress:'#',imgaddress:'/web/static/ad04.jpg',imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_05',webaddress:'#',imgaddress:'/web/static/ad05.jpg',imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_06',webaddress:'#',imgaddress:'/web/static/ad06.jpg',imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_07',webaddress:'#',imgaddress:'/web/static/ad07.jpg',imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_08',webaddress:'#',imgaddress:'/web/static/ad08.jpg',imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_09',webaddress:'#',imgaddress:'/web/static/ad09.jpg',imgWidth:this.screenWidth,imgHeight:'340'},
        ],
        imgInfoList:[  //使用require()函数，解决webpack对<img>属性arc不打包图片问题。
            {id:'img_01',webaddress:'#',imgaddress:require('../assets/adwhell/ad01.jpg'),imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_02',webaddress:'#',imgaddress:require('../assets/adwhell/ad02.jpg'),imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_03',webaddress:'#',imgaddress:require('../assets/adwhell/ad03.jpg'),imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_04',webaddress:'#',imgaddress:require('../assets/adwhell/ad04.jpg'),imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_05',webaddress:'#',imgaddress:require('../assets/adwhell/ad05.jpg'),imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_06',webaddress:'#',imgaddress:require('../assets/adwhell/ad06.jpg'),imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_07',webaddress:'#',imgaddress:require('../assets/adwhell/ad07.jpg'),imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_08',webaddress:'#',imgaddress:require('../assets/adwhell/ad08.jpg'),imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_09',webaddress:'#',imgaddress:require('../assets/adwhell/ad09.png'),imgWidth:this.screenWidth,imgHeight:'340'},
            {id:'img_10',webaddress:'#',imgaddress:require('../assets/adwhell/ad01.jpg'),imgWidth:this.screenWidth,imgHeight:'340'},
        ],
        scrollbarInfo:{    //图片滚动栏信息
            bannerLeft:0,  //滚动栏当前left位置值（单位像素）
            imgSeq:1,       //当前屏幕显示图片的序号
            imgCount:0,     //滚动栏中的图片总数量
            imgLeft:[],     //每张图片在屏幕中显示时的left位置和图片URL地址
            nextLeft:0,    //左翻页，滚动栏左移一张图片位置，如果当前显示的是最后一张图片，则滚动栏不动。
            nextRight:0,    //右翻页，滚动栏右移一张图片位置，如果当前显示的是第一张图片，则滚动栏不动。
        },
        loopPtimer:{}, //该对象用于临时创建和临时存放轮播定时器ID。
        loopPlay:{},
      }; 
    },
    computed:{},
    methods:{
        paging(imgPlace){  //点击分页按钮切换图片
            this.scrollbarInfo.bannerLeft=imgPlace.left;
            this.scrollbarInfo.imgLeft[this.scrollbarInfo.imgSeq-1].isCurrent=false; //把切换前的当前屏幕显示图片的状态改为false
            this.scrollbarInfo.imgSeq=imgPlace.id; //切换当前显示图片的序号
            this.scrollbarInfo.imgLeft[this.scrollbarInfo.imgSeq-1].isCurrent=true;  //把切换后的当前屏幕显示图片的状态改为true，这样就完成了图片切换。
            var that=this;
            window.clearInterval(that.loopPtimer.timerId);  //停止循环滚动（防止影响分页按钮滑动）
            that.loopPtimer.timerId=setInterval(that.loopPlay,3000);      //重启循环滚动，它将延时5000毫秒（不是10毫秒哦！！）
        }
    },
    watch:{
        screenWidth(val){  //监控screenWidth（浏览器窗口）
            // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            if(!this.timer){
                // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                this.screenWidth = val
                this.timer = true;   //使用this声明变量，var是在当前作用域（scope）中声明一个变量，而this则是指向当前上下文（context）。作用域很好理解，在函数里面，作用域就是执行var语句的那个函数，否则就是root（window或者global）。 上下文是在函数调用的时候决定的
                let that = this;
                //浏览器窗口改变时，重新计算滚动栏
                that.imgWidth=that.screenWidth;
                if(that.scrollbarInfo.bannerLeft!=0){
                    that.scrollbarInfo.bannerLeft=-(that.screenWidth*that.scrollbarInfo.imgSeq);
                }
                for(var i=0,len=that.imgInfoList.length;i<len;i++){  //浏览器窗口改变时，重新计算每张图的left值变化
                    var num=i+1;
                    var leftsize=0;
                    if(i>0){
                        leftsize=-(that.screenWidth*i)
                    }
                    var img={id:num,left:leftsize,isCurrent:false};
                    that.scrollbarInfo.imgLeft[i]=img;  
                }
                that.scrollbarInfo.imgLeft[0].isCurrent=true; //第一张显示图片的分页按钮为选中状态背景图片。
                if(that.scrollbarInfo.imgSeq>0){   //浏览器窗口改变时，重新计算左翻页位置 
                    that.scrollbarInfo.nextLeft=that.scrollbarInfo.imgLeft[that.scrollbarInfo.imgSeq-1].left-that.screenWidth;
                }
                if(that.scrollbarInfo.imgSeq>1  && that.scrollbarInfo.imgSeq<that.scrollbarInfo.imgCount){ //浏览器窗口改变时，重新计算右翻页位置。
                    that.scrollbarInfo.nextRight=that.scrollbarInfo.imgLeft[that.scrollbarInfo.imgSeq-1].left+that.screenWidth; 
                }
                console.log(that.screenWidth)
                console.log(`imgLeft数组： ${JSON.stringify(that.scrollbarInfo.imgLeft)}`);
                console.log(`scrollbarInfo： ${JSON.stringify(that.scrollbarInfo)}`);
                setTimeout(function(){
                    // 打印screenWidth变化的值
                    // console.log(that.screenWidth)
                    // console.log(`imgLeft数组： ${JSON.stringify(that.scrollbarInfo.imgLeft)}`);
                    // console.log(`scrollbarInfo： ${JSON.stringify(that.scrollbarInfo)}`); 
                    that.timer = false
                },0)
            }
        }
    },
    components:{},
    // 生命周期钩子
    beforeCreate:function(){},
    created:function(){
    },
    beforeMount:function(){},
    mounted:function(){
        //=================j计算浏览器窗口宽度
        const that = this;
        that.screenWidth=document.documentElement.clientWidth;
        console.log('www'+that.screenWidth);
        window.onresize = () => {  //onresize：当调整窗口大小时运行脚本
            return (() => {
                window.screenWidth =document.documentElement.clientWidth;  //document.documentElement.clientWidth;  document.body.clientWidth 
                that.screenWidth = window.screenWidth
            })()
        }
        //================初始化图片滚动栏信息scrollbarInfo
        that.scrollbarInfo.bannerLeft=0;
        that.scrollbarInfo.imgSeq=1;
        that.scrollbarInfo.imgCount=that.imgInfoList.length-1;
        for(var i=0,len=that.imgInfoList.length;i<len;i++){
            var num=i+1;
            var leftsize=0;
            if(i>0){
                leftsize=-(that.screenWidth*i)
            }
            var img={id:num,left:leftsize,isCurrent:false};
            that.scrollbarInfo.imgLeft[i]=img;  
        }
        that.scrollbarInfo.imgLeft[0].isCurrent=true; //第一张显示图片的分页按钮为选中状态背景图片。
        if(that.scrollbarInfo.imgSeq>0){     
            that.scrollbarInfo.nextLeft=that.scrollbarInfo.imgLeft[that.scrollbarInfo.imgSeq-1].left-that.screenWidth;
        }
        if(that.scrollbarInfo.imgSeq>1  && that.scrollbarInfo.imgSeq<that.scrollbarInfo.imgCount){
            that.scrollbarInfo.nextRight=that.scrollbarInfo.imgLeft[that.scrollbarInfo.imgSeq-1].left+that.screenWidth; 
        }
        console.log("imgLeft数组长度："+that.scrollbarInfo.imgLeft.length);
        console.log(`imgLeft数组： ${JSON.stringify(that.scrollbarInfo.imgLeft)}`); 
        console.log(`scrollbarInfo： ${JSON.stringify(that.scrollbarInfo)}`); 
        
        //===========================无限循环滚动(带滑动效果）========================================== 
        that.loopPlay=loopPlay;
        window.clearInterval(this.loopPtimer.timerId);
        this.loopPtimer.timerId=setInterval(that.loopPlay,3000);
        //当离开页面时，停止图片滚动
        var visProp = getHiddenProp();
        if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
            document.addEventListener(evtname, function () {
                var stat= document[getVisibilityState()];
                //alert(stat);
                if(stat=='hidden'){
                    window.clearInterval(that.loopPtimer.timerId);
                }else if(stat=='visible'){
                    that.loopPtimer.timerId=setInterval(loopPlay,3000);
                }
            },false);
        }
        
        //=================定义滚动栏循环与图片移动函数
        //循环轮播函数
        function loopPlay(){
            if(that.scrollbarInfo.imgSeq>that.scrollbarInfo.imgCount){
                that.scrollbarInfo.bannerLeft=0;   
                that.scrollbarInfo.imgSeq=1;              
            }
            that.hidefirstpaging='1';   
            that.hidelastpaging='0';                      
            var gap=that.screenWidth*that.scrollbarInfo.imgSeq; //移到间距 
            if(that.scrollbarInfo.imgSeq==1){
               that.scrollbarInfo.imgLeft[that.scrollbarInfo.imgCount].isCurrent=false; 
            }
            that.scrollbarInfo.imgLeft[that.scrollbarInfo.imgSeq-1].isCurrent=false;
            that.scrollbarInfo.imgLeft[that.scrollbarInfo.imgSeq].isCurrent=true;  //修改当前显示图片的分页按钮的背景图片
            that.scrollbarInfo.imgSeq++;              
            that.scrollbarInfo.nextLeft-=that.screenWidth;
            that.scrollbarInfo.nextRight+=that.screenWidth; 
            move(that.scrollbarInfo,-gap);

        }

        //==图片移动函数(带滑动效果)
        function move(obj,toLeft){                  //obj参数可以是任何一个js对象，函数运行时会在该对象中添加一个timerID的属性用于临时存放定时器ID。toLeft参数是要移到目的位置值。
            window.clearInterval(obj.timerID);      //取消setInterval()方法设置的定时器
            obj.timerID=setInterval(function(){     //obj.timerID用于存放定时器ID
                //console.log(`obj： ${JSON.stringify(obj)}`); 
                let step=100;  //每次移动的距离
                let current=that.scrollbarInfo.bannerLeft;  //存储滚动栏当前left属性值
                let target=toLeft;  //保存滚动栏移动后值（向左或向右移动后的left属性值）
                step=Math.abs(current)>target ? -step : step;  //通过比较current与target判断滚动栏要向左移动还是向右移动。
                current+=step;
                if(Math.abs(current-target)>Math.abs(step)){ //如果剩余间距大于每次要移动的间距,继续移动
                    that.scrollbarInfo.bannerLeft=current;  
                }else{
                    window.clearInterval(obj.timerID); //取消setInterval()方法设置的定时器
                    that.scrollbarInfo.bannerLeft=target;
                }
            },10);
        }

        //----------------------下面是页面是否可见监听事件相关函数
        //获取document.hidden属性：
        function getHiddenProp(){
            var prefixes = ['webkit','moz','ms','o'];
            
            // if 'hidden' is natively supported just return it
            if ('hidden' in document) return 'hidden';
            
            // otherwise loop over all the known prefixes until we find one
            for (var i = 0; i < prefixes.length; i++){
                if ((prefixes[i] + 'Hidden') in document) 
                    return prefixes[i] + 'Hidden';
            }
         
            // otherwise it's not supported
            return null;
        }
        //获取document.visibilityState属性：
        function getVisibilityState() {
            var prefixes = ['webkit', 'moz', 'ms', 'o'];
            if ('visibilityState' in document) return 'visibilityState';
            for (var i = 0; i < prefixes.length; i++) {
                if ((prefixes[i] + 'VisibilityState') in document)
                    return prefixes[i] + 'VisibilityState';
            }
            // otherwise it's not supported
            return null;
        }
        //跨浏览器函数，检查文档是否可见。
        function isHidden(){
            var prop = getHiddenProp();
            if (!prop) return false;    
            return document[prop];
        }




    },
    beforeUpdate:function(){},
    updated:function(){},
    activated:function(){},
    deactivated:function(){},
    beforeDestroy:function(){},
    destroyed:function(){},
    errorCaptured:function(){},

}


</script>


<style scoped lang="less" rel="stylesheet/less"> 
.bakimg(@url){ //定义背景图片mixin函数
    background-image: @url;    
    background-repeat:no-repeat;
    background-size:cover;
}

.banner-wrap{
    position: relative;
    height: 340px;
    //min-width: 1000px;
    overflow-x:hidden;      /*隐藏多余内容，避免显示滚动条overflow: hidden;*/ 
    .pic_banner{
        height: 340px;
        overflow-x:hidden;      /*隐藏多余内容，避免显示滚动条overflow: hidden;*/   
        position: relative;   //            
        a{
            position: relative;
            display: block;
            height: 340px;
            float: left;                
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            } 
        }
        
    }
    .paging{
        position:absolute;
        width:400px;
        height:30px;
        left:70%;
        @media screen and (min-width:1440px) and (max-width: 1680px){left:75%}  //如果屏宽度大于等于1440像素且小于等于1680像素
        @media screen and (min-width:0px) and (max-width: 1100px){left:30%}  //如果屏宽度大于等于1440像素且小于等于1680像素
        bottom:10px;
        white-space:nowrap; 
        //background-color: blue;
        li{
            position: relative;
            width: 20px;
            height:20px;
            margin-right: 20px;
            float:left;
            top: 50%;
            transform: translateY(-50%);
            .bakimg(@url:url('../assets/adwhell/circle-solid.png')); //设置背景图片
            &:hover{cursor: pointer;}
            &[first='1']{display: none;}
            &[last='1']{display: none;}
            &[last='0']{position: absolute;left:-40px;}
            &[current=true]{
                width: 25px;
                height:25px;
                .bakimg(@url:url('../assets/adwhell/rectangle-fillet2.png')); //设置背景图片
            }
        }
    }        
}







/*创建动画
animation: imgMove 400ms linear 1;  //linear infinite  此行css需放置具体选择器中。
@keyframes imgMove {
    from {
        transform: translateX(0px);
    }
    to {
        transform: translateX(-1680px);
    }
}
*/
</style>