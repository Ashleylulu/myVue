<template lang="html">
    <div class="cron" :val="value_">
        <el-tabs v-model="activeName">
            <el-tab-pane label="日" name="d">
                <day v-model="dVal" lable="日"></day>
            </el-tab-pane>
            <el-tab-pane label="月" name="month">
                <month v-model="monthVal" lable="月"></month>
            </el-tab-pane>
            <el-tab-pane label="周" name="week">
                <week v-model="weekVal" lable="周"></week>
            </el-tab-pane>
            <el-tab-pane label="年" name="year">
                <year v-model="yearVal" lable="年"></year>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import day from './day'
    import month from './month'
    import week from './week'
    import year from './year'
    export default {
        props: {
            value: {
                type: String
            }
        },
        data () {
            return {
                activeName: 'd',//默认选中
                dVal: '',
                monthVal: '',
                weekVal: '',
                yearVal: ''
            }
        },
        // watch: {
        //     'value' (a, b) {
        //         this.updateVal()
        //     }
        // },
        // computed:{
        //     value_ () {
        //         if (!this.dVal && !this.weekVal) {
        //             return ''
        //         }
        //         let v = this.value;
        //         this.$emit('input', this.value)
        //         return v
        //     }
        // },
        methods: {
            updateVal () {
                if (!this.value) {
                    return
                }
                console.log(this.value)
                let arrays = this.value.split(' ')
                this.dVal = arrays[0]
                this.monthVal = arrays[1]
                this.weekVal = arrays[2]
                this.yearVal = arrays[3]
            }
        },
        created () {
            //this.updateVal()
        },
        components: {
            day, month, week, year
        }
    }
</script>

<style lang="css">
    .cron {
        text-align: left;
        padding: 10px;
        background: #fff;
        border: 1px solid #dcdfe6;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    }
</style>
