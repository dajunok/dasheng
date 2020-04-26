<!-- ======================================固定日历组件============================ -->
<template> 
<!-- 注意：没有年月翻页功能的固定日历组件 --> 
<div class="calendar-wrap">
    <div class="year-month">
        <div class="left">
            <span class="caret" number="year-dec"></span>  <!-- 年份递减图标 -->
            <span class="caret" number="month-dec"></span>  <!-- 月份递减图标 -->
        </div>         
        <div class="middle"><i>{{calendr.year}}年{{calendr.month+1}}月</i></div>
        <div class="right">
            <span class="caret" number="month-inc"></span>    <!-- 月份递增图标 -->   
            <span class="caret" number="year-inc" @click="yearGrow()"></span>   <!-- 年份递增图标 -->   
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
            <template v-if="calendr.weekday==1">
                <li v-for="n of 1" blank></li>
            </template>
            <template v-else-if="calendr.weekday==2">
                <li v-for="n of 2" blank></li>
            </template>
            <template v-else-if="calendr.weekday==3">
                <li v-for="n of 3" blank></li>
            </template>
            <template v-else-if="calendr.weekday==4">
                <li v-for="n of 4" blank></li>
            </template>
            <template v-else-if="calendr.weekday==5">
                <li v-for="n of 5" blank></li>
            </template>
            <template v-else-if="calendr.weekday==6">
                <li v-for="n of 6" blank></li>
            </template>
            <template v-else></template >
            <template v-for="date of calendr.days">
                <li v-if="date==calendr.day" day valid>{{date}}</li>
                <li v-else valid>{{date}}</li>
            </template>
            
        </ul>
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
        calendr:{   //日历数据列表，通过calculate()函数计算得出。
            year:0,        //年份字符串
            month:0,       //月份字符串
            day:0,          //当日
            days:31,        //月份天数
            weekday:0,      //月份第一天星期几。星期天：0；星期一：1；星期二：2；星期三：3；星期四：4；星期五：5；星期六：6。            
            isLeapyear:false,   //是否闰年
            beforeyesterday:'', //前天
            yesterday:'',   //昨天
            today:'',       //今天
            tomorrow:'',    //明天
            aftertomorrow:'',  //后天            
        },

      };      
    },
    computed:{
        calculate(){             
        }

    },
    methods:{
        yearGrow(){ //递增年份

        },
        yearReduce(){ //递减年份

        },
        monthGrow(){ //递增月份

        },
        monthReduce(){ //递减月份

        }
        
    },
    watch:{},
    components:{},
    // 生命周期钩子
    beforeCreate:function(){},
    created:function(){ 
        //日历计算：根据当天日期计算，将计算结果存储到calendr对象中。
        var date = new Date();   //获取当天日期
        this.calendr.year=date.getFullYear();   //计算当前年份
        this.calendr.month=date.getMonth();  //计算当前月份，注意这里的月是从0开始计数的。
        this.calendr.day=date.getDate();     //计算当前日
        this.calendr.days = new Date(this.calendr.year, this.calendr.month + 1, 0).getDate();  //计算当前月份天数
        var firstDay = new Date(this.calendr.year, this.calendr.month, 1); //当前月的第一天的日期
        this.calendr.weekday = firstDay.getDay(); //当前第一天是星期几

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
    margin: 5px 0 0 5px;
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
}
</style>