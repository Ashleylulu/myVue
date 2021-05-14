<template lang="html">
    <div class="cron" :val="value_">
        <el-tabs v-model="activeName">
            <el-tab-pane label="日" name="d">
                <day v-model="strVal" :mark="activeName" lable="日"></day>
            </el-tab-pane>
            <el-tab-pane label="月" name="month">
                <month v-model="strVal" :mark="activeName" lable="月"></month>
            </el-tab-pane>
            <el-tab-pane label="周" name="week">
                <week v-model="strVal" :mark="activeName" lable="周"></week>
            </el-tab-pane>
            <el-tab-pane label="年" name="year">
                <year v-model="strVal" :mark="activeName" lable="年"></year>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    /*
    * `*` , 表示每日/周/月/年 , 例如 :  *\/2(此处因为注释原因加了转义符'\',实际场景中不需要) , 每2日执行一次
    * `#` , 表示每几周的周几 , 例如 : 3#5 , 每3周的周五
    * `W` , 表示指定日期的最近工作日 , 例如 : 7W , 7号最近的工作日
    * `L` , 表示本月最后一天或L周 , 例如 : 单独L,表示本月最后一天 ; 4L , 表示L周的周四
    * `?` , 表示不指定
    * */
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
                strVal:''
            }
        },
        watch: {
            'value' (a, b) {
                this.updateVal()
            }
        },
        computed:{
            value_ () {
                let v = this.strVal;
                if (v == '*' || v == '?') {
                    return false
                }
                if (v !== this.value) {
                    this.$emit('input', v)
                }
                return v
            }
        },
        methods: {
            updateVal () {
                if (!this.value) {
                    return
                }
                this.strVal = this.value;
                //判断日,月,周,年
                if (this.value.indexOf('/') == -1) {//年
                    this.activeName = 'year';
                    return false
                }
                if (this.value.indexOf('? *') == -1) {//日或月
                    if (this.value.indexOf('W') != -1) {//月
                        this.activeName = 'month';
                        return false
                    }
                    if (this.value.indexOf('L') != -1) {//月
                        this.activeName = 'month';
                        return false
                    }
                    let str = this.value.split('*/');

                    if (str[0] == '') {//日
                        this.activeName = 'd';
                        return false
                    }
                    this.activeName = 'month';
                    return false
                }

                if (this.value.indexOf('#') != -1) {//月
                    this.activeName = 'month';
                    return false
                }
                if (this.value.indexOf('L') != -1) {//月
                    this.activeName = 'month';
                    return false
                }
                this.activeName = 'week';//周
            }
        },
        created () {
            this.updateVal()
        },
        components: {
            day, month, week, year
        }
    }
</script>

<style lang="scss">
    .cron {
        text-align: left;
        padding: 10px;
        background: #fff;
        border: 1px solid #dcdfe6;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    }
</style>
