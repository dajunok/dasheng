<!-- ======================================翻页日历组件============================ -->
<template>
<div class="calendar-wrap">
    <div class="year-month">
        <div class="left">
            <span class="caret" number="year-dec" @click="calculate(calendar.year-1,calendar.month)"></span>  <!-- 年份递减图标 -->
            <span class="caret" number="month-dec" @click="calculate(calendar.year,calendar.month-1)"></span>  <!-- 月份递减图标 -->
        </div>         
        <div class="middle"><i>{{calendar.year}}年{{calendar.month+1}}月</i></div>
        <div class="right">
            <span class="caret" number="month-inc" @click="calculate(calendar.year,calendar.month+1)"></span>    <!-- 月份递增图标 -->   
            <span class="caret" number="year-inc" @click="calculate(calendar.year+1,calendar.month)"></span>   <!-- 年份递增图标 -->   
        </div>            
    </div>
    <div class="week-wrap">
        <ul class="week">
            <li v-for="dayofweek in week">{{dayofweek}}</li>
        </ul>
    </div>
    <div class="days-wrap">
        <ul class="days">
            <!-- 如果第1天不是星期日，则增加相应的空白日期占据位置，以便于日期与星期对齐 。例如，星期一增加1个空白日期用于占位-->
            <template v-for="date of daylist">
                <li v-if="date.number==calendar.day" day :valid="date.valid" :current="calendar.isCurrent">{{date.number}}</li>
                <li v-else :valid="date.valid" :current="calendar.isCurrent">{{date.number}}</li>
            </template>            
        </ul>
    </div>
    <div class="calendar-bottom">       
        <button class="today" @click="goback()">返回今天</button>
    </div>
</div>    

  
</template>

<script type="text/javascript">


export default{
    name:'calendar',
    props:{        
    },
    model: {},
    mixins:[],   //data数据合并混入
    data:function(){
      return { 
        week:['日','一','二','三','四','五','六'], 
        calendar:{   //日历数据列表，通过calculate()函数计算得出。
            year:0,        //年份字符串
            month:0,       //月份字符串
            day:0,          //当日
            days:0,        //月份天数
            weekday:0,      //月份第一天星期几。星期天：0；星期一：1；星期二：2；星期三：3；星期四：4；星期五：5；星期六：6。            
            isCurrent:true,    //是否现在日期（即没有对年月进行翻页）
            isLeapyear:false,   //是否闰年
            beforeyesterday:'', //前天
            yesterday:'',   //昨天
            today:'',       //今天
            tomorrow:'',    //明天
            aftertomorrow:'',  //后天            
        },
        daylist:[],        
      };      
    },
    computed:{

    },
    methods:{
        calculate(year,month){ //日历计算函数
            //let year=this.calendar.year+1;
            //let month=this.calendar.month;
            if(month>=12 || month<0){
                return;
            }
            let days = new Date(year, month + 1, 0).getDate();  //计算递增/递减后的当前月份天数
            let firstDay = new Date(year, month, 1); //递增/递减后年份后的当前月的第一天的日期
            let weekday = firstDay.getDay();        //递增/递减后年份后的当前月份第一天是星期几
            let count=weekday-this.calendar.weekday;  //递增/递减前后，对月份第一天的星期几的数字进行相减，如果是正数则添加空白占位，负数则减少空白占位，以便日期与星期正确对齐。
            if(count>0){ //正数则添加空白占位，以便日期与星期正确对齐。
                for(var i = 0,len=count; i < len; i++) {                
                    this.daylist.unshift({number:'',valid:false});
                }
            }
            if(count<0){ //负数则减少空白占位，以便日期与星期正确对齐。
                for(var i = 0,len=Math.abs(count); i < len; i++) {                
                    this.daylist.shift();
                }
            }
            count=days-this.calendar.days;  //将递增/递减前后的当前月份总天数相减。如果是正数则添加日期格，负数则减少日期格。以便日期的完整性与星期正确对齐。
            if(count>0){ //正数则在尾部添加日期格,以便日期的完整性与星期正确对齐。？？？？
                for(var i=this.calendar.days,len=days;i<len;i++){
                    this.daylist.push({number:i+1,valid:true});
                }
            }
            if(count<0){ //负数则在尾部减少日期格，以便日期的完整性与星期正确对齐。
                for(var i = 0,len=Math.abs(count); i < len; i++) {                
                    this.daylist.pop();
                }
            }
            //保存递增/递减后的数据
            this.calendar.year=year;
            this.calendar.month=month;
            this.calendar.days=days;
            this.calendar.firstDay=firstDay;
            this.calendar.weekday =weekday;
            this.calendar.isCurrent=false;
        },
        goback(){ //“返回到今天”按钮事件触发函数
            var date = new Date();   //获取当天日期
            var year=date.getFullYear();   //获取现年份
            var month=date.getMonth();     //获取现月份
            this.calculate(year,month);
        },
    },
    watch:{},
    components:{},
    // 生命周期钩子
    beforeCreate:function(){},
    created:function(){ 
        //日历计算：根据当天日期计算，将计算结果存储到calendar对象中。
        var date = new Date();   //获取当天日期
        this.calendar.year=date.getFullYear();   //计算当前年份
        this.calendar.month=date.getMonth();  //计算当前月份，注意这里的月是从0开始计数的。
        this.calendar.day=date.getDate();     //计算当前日
        this.calendar.days = new Date(this.calendar.year, this.calendar.month + 1, 0).getDate();  //计算当前月份天数
        var firstDay = new Date(this.calendar.year, this.calendar.month, 1); //当前月的第一天的日期
        this.calendar.weekday = firstDay.getDay(); //当前第一天是星期几
        //创建标准月份天数（31天）列表
        for (var i =1; i<=31; i++) {
            this.daylist.push({number:i,valid:true});
        }
        console.log(`The copyObj is ${JSON.stringify(this.daylist)}`);  
        //如果第1天不是星期日，则增加相应的空白日期占据位置，以便于日期与星期对齐 。例如，星期一增加1个空白日期用于占位      
        if(this.calendar.weekday>0){  
            for(var i = 0,len=this.calendar.weekday; i < len; i++) {                
                this.daylist.unshift({number:'',valid:false});
            }
        }
        //如果当前月份天数小于标准月份（31天），则从标准月份数组daylist中删除。
        if(this.calendar.days<31){
            for(var i = 0,len=31-this.calendar.days; i < len; i++) {                
                this.daylist.pop();
            }
            
        }
        console.log(`当前月份天数： ${JSON.stringify(this.daylist)}`); 

    },
    beforeMount:function(){},
    mounted:function(){},
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
.font(@size,@bold,@lh){  //定义字体mixin函数
    font-style:normal;
    font-variant:normal;
    font-weight:@bold;   //设置字体粗细
    font-size:@size;     //规定字体尺寸
    line-height:@lh;     //规定字体行高
    font-family:"Microsoft yahei", arial, Simsun, sans-serif;  //规定字体系列。
}
.bakimg(@url){ //定义背景图片mixin函数
    background-image: @url;    
    background-repeat:no-repeat;
    background-size:cover;
}
.bakicon(@url,@repeat:no-repeat,@position:right center,@origin:content-box,@size:20px 20px){    //定义背景图标mixin函数
    background-image: @url;   //指定图标路径
    background-repeat:@repeat; //指定背景图标的重复方式，no-repeat为不重复。
    background-position:@position;  //设置背景图像的起始位置
    background-origin:@origin;  //指定background-position属性的相对位置。例如padding-box是相对内边距位置。
    background-size:@size;  //指定背景图像的大小
}
.border(@width:1px,@style:solid,@color:Black,@radius:0){  //定义边框mixin函数
  border-width:@width;
  border-style:@style;
  border-color:@color;
  border-radius:@radius;  //边框圆角
}
.box-shadow(@h:5px,@v:5px,@blur:5px,@spread:0,@color:#888888){  //定义阴影mixin函数
    /*  h-shadow       //必需。水平阴影的位置。允许负值。   
        v-shadow       //必需。垂直阴影的位置。允许负值。    
        blur           //可选。模糊距离,又叫他模糊半径。他的效果是一个模糊的圆。
        spread         //可选。阴影的尺寸。它相当于增加了border的宽度。但不是border哦，与border不同，box-shadow并不占据空间。
        color          //可选。阴影的颜色。请参阅 CSS 颜色值。   
        inset          //可选。将外部阴影 (outset) 改为内部阴影。*/
    box-shadow:@h @v @blur @spread @color;
}

.calendar-wrap{    
    width: 300px;
    height: 300px;
    margin: 0 0 0 5px;
    position: relative;
    padding: 3px 5px 0 5px;
    background-color: #f7f4e1; //#f7f4e1 
    box-sizing: border-box;  //元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
    .border(@width:1px,@style:solid,@color:Gold,@radius:0);  //定义边框mixin函数
    .box-shadow(@h:5px,@v:5px,@blur:5px,@spread:0,@color:#888888); //定义阴影    
    .year-month{        
        width:100%;
        height: 25px;
        color:white;
        background-color: #d974f2;  //#ce45ce
        .left,.right{
            width: 25%;
            height: 100%; 
            &,.caret{
                position:relative;
                display: inline-block;
            };
            .caret{                
                width: 20px;
                height: 20px;
                top:50%;    
                transform: translateY(-50%);  //垂直居中 
                &:hover{
                    cursor: pointer;
                    background-color: Purple;
                }
            }

        }
        .left{
            float: left;
            padding-left: 5px;
            box-sizing: border-box;  //元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
            .caret[number="year-dec"]{ //设置背景图片
                float: left;
                .bakimg(@url:url('../assets/doubleArrow-left.png')); 
            }   
            .caret[number="month-dec"]{ 
                float: right;
                .bakimg(@url:url('../assets/arrow-left.png')); //设置背景图片
            }   
        }
        .right{
            float: right;
            padding-right: 5px;
            box-sizing: border-box;  //元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
            .caret[number="month-inc"]{
                float: left;
                .bakimg(@url:url('../assets/arrow-right.png')); //设置背景图片
            }   
            .caret[number="year-inc"]{
                float: right;
                .bakimg(@url:url('../assets/doubleArrow-right.png')); //设置背景图片
            }   
        }
        .middle{
            display: inline-block;            
            width: 50%;
            height: 100%;
            .font(@size:14px,@bold:bold,@lh:auto);
            text-align: center;
            float: left;
        }        
    }
    .week-wrap{ //星期栏
        width:100%;
        height: 25px;
        margin-top: 5px;
        background-color: #f4edc9;        
        .week li{            
            width: 14.28%;
            height: 100%;
            position: relative;                         
            .font(@size:15px,@bold:auto,@lh:auto);
            float: left;
            text-align: center;
            &:first-of-type,
            &:last-of-type{
                color: red;
                .font(@size:14px,@bold:bold,@lh:auto);
            }
        }
    }
    .days-wrap{ //具体日期面板        
        .days{
            width:100%;
            margin-top: 10px;
            //background-color: red;
            li{
                width: 14.28%;
                position: relative;
                text-align: center;
                float: left;
                box-sizing: border-box;  //元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
                .font(@size:14px,@bold:auto,@lh:30px);
                .border(@width:1px,@style:solid,@color:#f7f4e1,@radius:0); //添加边框
                &[valid]:hover{
                    background-color: rgba(255, 165, 0, 0.25); //
                    .border(@width:1px,@style:solid,@color:Orange,@radius:0); //添加边框
                    cursor: pointer;
                }
                &[day]{
                    background-color: rgba(255, 165, 0, 1);
                }
            }
        }
    }
    .calendar-bottom{
        position: absolute;
        bottom: 0px;
        width: calc(100%-6px*2);  //其中5px是父元素的内边距，1px是父边框
        height: 40px;
        .today{
            position:relative;
            top:50%;
            height: 70%;
            line-height: 70%;
            padding:5px;
            transform: translateY(-50%);
            float: right;
            color: white;
            background-color:#d974f2; 
            text-align: center;
            .border(@width:2px,@style:solid,@color:#d974f2,@radius:4px); //添加边框
            &:hover{
                cursor: pointer;
                background-color: Purple;
                .border(@width:2px,@style:solid,@color:Purple,@radius:4px); //添加边框
            }
        }
    }
}
</style>