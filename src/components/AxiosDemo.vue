<!-- ======================================Vue.js使用 axios 来完成 Ajax 请求。============================ -->
<template>
  <div>
    用户名：<input type="text" v-model="user"><br>
    密码：<input type="password" v-model="password"><br>
    <input type="button" value="submit" @click="login()">
  </div>
  
</template>

<script type="text/javascript">

export default{
    name:'axiosDemo',
    props:{},
    model: {},
    mixins:[],   //data数据合并混入
    data:function(){
      return { 
        user: '',
        password: '',
      }; 
    },
    computed:{},
    methods:{
        login: function () {
            this.$axios.get('/web/LoginServlet', {
                params: {
                    user: this.user,
                    password: this.password
                }
            }).then(function (data) {
                if (data.data.ok != 1) {
                    alert(data.data.msg);
                } else {
                    alert(data.data.msg);
                }
            }, function () {
                console.log('传输失败');
            });
        },
    },
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
  
</style>