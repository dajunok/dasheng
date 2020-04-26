<template>
  <div>
    <div class="nav-wrap">
        <div class="top-maidan">
            <a class="logo" href="http://vue-warehouse.com:8080/web/css-demo.html" target="_blank">logo</a>         
        </div>            
        <div class="navigation">
            <ul class="main">
                <li>
                    <a href="http://vue-warehouse.com:8080/web" target="_self">首页</a>
                </li>
                <li v-for="item in nav_list">
                    <a :href="item.href" target="_blank">{{item.name}}</a>
                </li>                              
                <li v-for="item of dropdwon_menu">
                    <div class="dropdown">
                        <button class="dropdown-toggle">
                          {{item.name}}
                          <span class="caret"></span>              
                        </button>
                        <ul class="dropdown-menu">
                          <li v-for="menu of item.menulist">
                            <a href="#" >{{menu}}</a>
                          </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>        
    </div> 
    <div class="AD">
      <adwheel-banner></adwheel-banner>  <!-- 广告轮播组件 -->
    </div>
    <!-- 存放主体内容 -->  
    <div class="body">
      <div class="container">
        <div class="sidebar-left">
          <div class="catalog">
            <i>Dasheng 博客</i>
            <span :class="['caret',isnight ? 'night':'']" :title="model" @click="nightmodel()"></span>  <!-- {night:isnight} -->
          </div>
          <ul class="menu-v">
              <li class="title">Dasheng <i>CSS</i></li>
              <li class="menu-term" tabindex="1" v-for='item in csslist' @click="open(item)">Dasheng {{item.name}}</li>
              <li class="title">Dasheng <i>布局组件</i></li>
              <li class="menu-term" tabindex="1" v-for='item in layoutlist' @click="open(item)">Dasheng {{item.name}}</li>
              <li class="title">Dasheng <i>插件</i></li>
              <li class="menu-term" tabindex="1" v-for='item in pluglist' @click="open(item)">Dasheng {{item.name}}</li>
              <li class="title">Dasheng <i>其他</i></li>
              <li class="menu-term" tabindex="1" v-for='item in otherlist' @click="open(item)">Dasheng {{item.name}}</li>
          </ul>
        </div>
        <!-- switch 用于白天/黑夜背景切换 -->
        <div :class="['middle-panel', isnight ? 'switch':'']">  
          <h2>Dasheng <i>表格</i></h2>
          <!-- <p>Dasheng 提供了一个清晰的创建表格的布局。下表列出了 Dasheng 支持的一些表格元素：</p> -->
          <table class="tableone">
            <caption>Dasheng 提供了一个清晰的创建表格的布局。下表列出了 Dasheng 支持的一些表格元素：</caption>
            <tr class="head">
              <th>标签</th>
              <th>描述</th>              
            </tr>
            <tr class="datarow" v-for="data of dsTable">
              <td>{{data.tag}}</td>
              <td>{{data.describe}}</td>
            </tr>
          </table> 
          <!-- 使用 axios 来完成 ajax 请求。 -->
          <h2>Ajax之HTTP请求</h2>
          <axios-component></axios-component>  
        </div>  
        <div class="sidebar-right">
          <calendar-panel></calendar-panel>
        </div>
      </div>     
    </div>
    <!-- 存放页面底部内容 -->
    <div class="footer">
    </div>
      
  </div>  
</template>

<script type="text/javascript">    
import Calendar from "./components/Calendar.vue";
import Adwheel from "./components/Adwheel.vue";
import AxiosDemo from "./components/AxiosDemo.vue";

export default{
    name:'app',    //模块名称
    props:{},      //组件属性
    model: {},
    mixins:[],   //data数据合并混入
    data:function(){
      return { 
        nav_list:[  //导航栏列表
            {name:'HTML',href:'https://www.w3cschool.cn/htmltags/'},
            {name:'CSS',href:'https://www.w3cschool.cn/cssref/'},
            {name:'Less',href:'https://www.w3cschool.cn/less/'},
            {name:'Sass',href:'https://www.runoob.com/sass/sass-tutorial.html'},
            {name:'JavaScript',href:'https://www.w3school.com.cn/js/index.asp'},
            {name:'JQuery',href:'https://www.w3school.com.cn/jquery/jquery_reference.asp'},
            {name:'Lodash',href:'https://www.lodashjs.com/'},
            {name:'Vue',href:'https://cn.vuejs.org/'},
            {name:'Bootstrap',href:'https://www.runoob.com/bootstrap/bootstrap-tutorial.html'},
        ],
        dropdwon_menu:[  //导航栏中带下拉菜单的列表项
          {name:'Web服务器',menulist:['Tomcat','Jboss','Nginx','Apache','IIS','Jetty','WebSphere','WebLogic']},
          {name:'工具类',menulist:['Git','Webpack']}
        ],
        csslist:[
            {id:'001',name:'CSS 概览'},
            {id:'002',name:'网格系统'},
            {id:'003',name:'排版'},
            {id:'004',name:'代码'},
            {id:'005',name:'表格'},
            {id:'006',name:'表单'},
            {id:'007',name:'按钮'},
            {id:'008',name:'图片'},
            {id:'009',name:'辅助类'},
            {id:'010',name:'响应式实用工具'}
        ], 
        layoutlist:[
            {id:'011',name:'字体图标'},
            {id:'012',name:'下拉菜单'},
            {id:'013',name:'按钮组'},
            {id:'014',name:'按钮下拉菜单'},
            {id:'015',name:'输入框组'},
            {id:'016',name:'导航元素'},
            {id:'017',name:'导航栏'},
            {id:'018',name:'面包屑导航'},
            {id:'019',name:'分页'},
            {id:'020',name:'标签'},
            {id:'021',name:'徽章'},
            {id:'022',name:'超大屏幕'},
            {id:'023',name:'页面标题'},
            {id:'024',name:'缩略图'},
            {id:'025',name:'警告'},
            {id:'026',name:'进度条'},
            {id:'027',name:'多媒体对象'},
            {id:'028',name:'列表组'},
            {id:'029',name:'面板'},
            {id:'030',name:'Wells'},
            {id:'031',name:'创建一个网页'}
        ],
        pluglist:[
            {id:'032',name:'插件概览'},
            {id:'033',name:'过度效果'},
            {id:'034',name:'模态框'},
            {id:'035',name:'下拉菜单'},
            {id:'036',name:'滚动监听'},
            {id:'037',name:'标签页'},
            {id:'038',name:'提示工具'},
            {id:'039',name:'弹出框'},
            {id:'040',name:'警告框'},
            {id:'041',name:'按钮'},
            {id:'042',name:'折叠'},
            {id:'043',name:'轮播'},
            {id:'044',name:'附加导航'}
        ],
        otherlist:[
            {id:'045',name:'UI编辑器'},
            {id:'046',name:'V2教程'},
            {id:'047',name:'HTML编码规范'},
            {id:'048',name:'CSS编码规范'},
            {id:'049',name:'可视化布局'},
            {id:'050',name:'Less教程'},
        ],
        //白天夜间页面颜色切换
        isnight:false,  
        model:'夜间模式',  //鼠标移入时提示信息
        //表格数据内容
        dsTable:[
          {tag:'<table>',describe:"为表格添加基础样式。"},
          {tag:'<thead>',describe:"表格标题行的容器元素（<tr>），用来标识表格列。"},
          {tag:'<tbody>',describe:"表格主体中的表格行的容器元素（<tr>）。"},
          {tag:'<tr>',describe:"一组出现在单行上的表格单元格的容器元素（<td> 或 <th>）。"},
          {tag:'<td>',describe:"默认的表格单元格。"},
          {tag:'<th>',describe:"特殊的表格单元格，用来标识列或行（取决于范围和位置）。必须在 <thead> 内使用。"},
          {tag:'<caption>',describe:"关于表格存储内容的描述或总结。"}
        ],
        //测试axios
        info:null,
      }; 
    },
    computed:{    
    },
    methods:{
      open(item){
        //alert('Dasheng '+item.name);
      },
      nightmodel(){
        if(this.isnight==false){
          this.isnight=true;
          this.model='日间模式';
        }else{
          this.isnight=false;
          this.model='夜间模式';
        }     
      },
    },
    watch:{},
    components:{
        'calendar-panel':Calendar,
        'adwheel-banner':Adwheel,
        'axios-component':AxiosDemo,
    },
    // 生命周期钩子
    beforeCreate:function(){},
    created:function(){},
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

@import (reference) "./style/color.less";     //常用颜色
@import (reference) "./style/triangle.less";  //三角符号
@import (less) "./style/sidebarleft.less";  


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



//通过以下变量值的改变，来实现不同款式的导航栏。
//==============================================head================================================
.nav-wrap{
  min-width:1000px;
  .top-maidan{ //顶部广场
      height: 124px;
      .border(@width:0 0 10px 0,@style:solid,@color:Gold);  //底部边框带
      .bakimg(@url:url('./assets/starsky.png'));   //设置背景图片
      .logo{  
          display:inline-block;
          position:relative;
          left: 50%;
          width: 150px;
          height: 100%;
          .bakimg(@url:url('./assets/mylog.png'));  //设置背景图片
          transform: translateX(-50%);    //水平居中
          text-indent: -999px;            //隐藏a标签的HTML文本
      }
  }
  .navigation{    //导航栏菜单
      height:40px;
      .font(@bold:normal,@size:14px,@lh:40px);
      &,.dropdown-toggle{background-color:#f2f2f2;}   //导航背景颜色
      .border(@width:0 0 1px 0,@style:solid,@color:Gold);  //底部边框带
      white-space:nowrap;    //解决窗口变小时导航菜单列表换行问题    
      .main{
          position:relative;
          height: 100%;
          width:95%;
          @media screen and (min-width:1440px) and (max-width: 1680px){width:85%}  //如果屏宽度大于等于1440像素且小于等于1680像素
          max-width: 1920px;
          min-width: 1000px;
          left:50%;
          transform: translateX(-50%);    //水平居中
          z-index:10;               
          &>li{
              height: 100%;
              width: auto;
              margin: 0 0 0 20px;              
              float: left;
              display: inline-block;
              padding:0px 5px;                   
              a,.dropdown-toggle{                
                color:DarkGray;
                .caret{
                  .triangle-common-down(@size:4px,@color:DarkGray); //三角形朝下
                  display: inline-block;
                }
              }        
              .dropdown-menu{display:none; }
              &:hover{                  
                .dropdown{position:relative;}
                .dropdown-menu{
                  display:block;
                  position:absolute;
                  .font(@bold:normal,@size:14px,@lh:30px);
                  .border(@width:0 1px 1px 1px,@style:solid,@color:#f2f2f2);   //鼠标移入时给下拉菜单框增加边框线                 
                  left:-5px;
                  li{.border(@width:0 5px,@style:solid,@color:White);}
                  li:hover{
                    border-color:#f2f2f2;
                    background-color:#f2f2f2;
                  }
                }                
                &,.dropdown-toggle,.dropdown-menu{background-color:White;}
                .caret{
                  .triangle-common-up(@size:4px,@color:DarkGray);  //三角形朝上
                }                
              }          
          }
      }
  } 
}
//==============================================body================================================
//14"HD笔记本电脑：1920px X 1080px
.body{  
  min-width:1000px;
  .container{
    position:relative;
    top:20px;
    width:97%;
    @media screen and (min-width:1440px) and (max-width: 1680px){width:85%}  //如果屏宽度大于等于1440像素且小于等于1680像素
    max-width: 1920px;
    min-width: 1000px;
    left:50%;
    height:500px;
    transform: translateX(-50%);    //水平居中
    .font(@bold:normal,@size:12px,@lh:25px);  
    //display:flex; 
    //background-color:LightGreen;  
    .sidebar-left{//左侧栏
      width: 15%;
      height: 200px;
      //background-color: LightGreen;
      float: left;
      margin-right: 15px;
      .catalog{
        position: relative;
        width: 100%;        
        height: 30px;
        line-height:30px; 
        padding:0 5px;
        box-sizing: border-box;  //解决width100%，加边距导致的溢出问题（即内、外边距无效问题）。
        color: Red;
        .font(@bold:bold,@size:13px,@lh:25px);
        .border(@width:1px,@style:solid,@color:Gold,@radius:5px 5px 0 0);        
        background-color: Gold;
        i{
          height: 30px;
          line-height:30px;
        }
        .caret{ 
          position:relative;
          top: 50%;
          width: 20px;
          height: 20px; 
          float: right;
          transform: translateY(-50%); //垂直居中
          //白天模式背景 
          .bakimg(@url:url('./assets/night-gray.png'));  //设置背景图片
          &:hover{.bakimg(@url:url('./assets/night-green.png'));cursor: pointer; }//设置背景图片
        }
        .night{ //夜间模式背景
          .bakimg(@url:url('./assets/day-gray.png'));  //设置背景图片
          &:hover{.bakimg(@url:url('./assets/day-green.png'));cursor: pointer; }//设置背景图片
        }               
      }
      .menu-v{
        width:100%; 
        padding:0 5px;
        box-sizing: border-box;  //解决width100%，加边距导致的溢出问题（即内、外边距无效问题）。
        color: #4c4a4a; 
        .border(@width:1px,@style:solid,@color:Gold,@radius:0);                
        .title{        
          height: 40px;
          .font(@bold:bold,@size:14px,@lh:50px);
          i{color: Pink}
        }
        .menu-term{
          width: 100%;
          height: 25px;
          padding-left: 5px;
          box-sizing: border-box;  //解决width100%，加边距导致的溢出问题（即内、外边距无效问题）。
          .border(@width:0.2px,@style:solid,@color:#f3eabc,@radius:0);
          background-color: #f4edc9;
          &:hover{
            .font(@bold:bold,@size:12px,@lh:25px);
            color: #4c4a4a;
            background-color: #f7f4e1;
            cursor: pointer;
          }
          &:focus{
            .font(@bold:bold,@size:12px,@lh:25px);
            color: White;
            background-color: #d974f2;
            .border(@width:0,@style:solid,@color:#d974f2,@radius:0);
            outline:0px; //去掉默认蓝色边框线问题
          }
        } 
      } 
    } 
    .middle-panel{  //中间面板
      width: 60%;
      height: 200px;
      //background-color: Pink;
      float: left;
      .tableone{
        width:100%;
        .border(@width:1px,@style:solid,@color:Gold,@radius:0);  //定义边框mixin函数
        //background-color:#d974f2;
        caption{
          text-align:left;
        }
        .head{
            height:25px;
            color:white;
            background-color:#d974f2;  //#d974f2
            th{
              .border(@width:1px,@style:solid,@color:Gold,@radius:0);  //定义边框mixin函数
            }
        }
        .datarow{
          td{
            height:40px;
            padding-left:5px;
            .border(@width:1px,@style:solid,@color:Gold,@radius:0);  //定义边框mixin函数
          }
        }
        .datarow:nth-child(even){  //odd是奇数；even是偶数
          background-color:#f7f4e1; 
        }        
      }
    }
    .switch{  //白天夜间背景颜色切换
      background-color: Gray;
    }
    .sidebar-right{//右侧栏
      width: 20%;
      height: 200px;
      background-color: LightGreen;
      float: left;

    }
  }

}

  
</style>