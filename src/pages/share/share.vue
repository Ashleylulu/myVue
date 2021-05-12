<template>
    <div>分享</div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        this.judgeViewer();
    },
    methods:{
        judgeViewer(){
            let viewer = window.navigator.userAgent.toLowerCase();
            if(viewer.match(/MicroMessenger/i) == 'micromessenger'){
                alert('微信浏览器');
            }else{
                alert('外部浏览器');
            }
        }
    }
}
</script>
<style lang="scss">

</style>