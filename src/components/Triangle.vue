<template>
  <div>
    <h1>我是Triangle组件</h1>
    <div class="diamond"></div>
  </div>
  
</template>

<script type="text/javascript">

export default{
    name:'triangle',
    props:{},
    model: {},
    mixins:[],   //data数据合并混入
    data:function(){
      return { 
        
      }; 
    },
    computed:{},
    methods:{},
    watch:{},
    components:{},
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
    @import (less) "../style/triangle.less";
  
</style>
