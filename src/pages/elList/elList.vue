<template>
    <div>
        <el-table :data='res.records'>
            <el-button>hahah</el-button>
        </el-table>
    </div>
</template>
<script>
const data = require('../../json/tabs.json')
export default {
    data(){
        return {
            res:data.content
        }
    },
    mounted(){
        console.log(this.res)
    },
    methods:{
        
    }
}
</script>
<style lang="scss">

</style>