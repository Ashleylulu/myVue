<template lang="html">
    <div :val="value_" class="cron_con">
        <div>
            <span style="margin-right: 5px;">每</span>
            <el-input  v-model="loop" style="width: 100px;" size="mini"></el-input>
            月执行一次
        </div>
        <!--几号最近的工作日-->
        <div>
            <el-radio v-model="type" label="8" size="mini">
                <el-select v-model="work"  @change="type = '8'">
                    <el-option
                        v-for="j in 31"
                        :key="j"
                        :label="j"
                        :value="j"
                    >
                    </el-option>
                </el-select>
                号最近的那个工作日
            </el-radio>
        </div>
        <!--指定-->
        <div class="cron_month">
            <el-radio v-model="type" label="4" size="mini">指定</el-radio>
            <el-checkbox-group v-model="appoint">
                <el-checkbox style="display: inline-block;font-size: 10px;margin-right: 10px;width:35px" @change="type = '4'"  v-for="j in 31"  :key="j" :label="j"></el-checkbox>
            </el-checkbox-group>
        </div>
        <!--本月最后一天-->
        <div>
            <el-radio v-model="type" label="6" size="mini">本月最后一天</el-radio>
        </div>
        <!--指定周-->
        <div>
            <el-radio v-model="type" label="7" size="mini">
                <el-select v-model="week.start"  @change="type = '7'">
                    <el-option
                        v-for="item in ops"
                        :key="item"
                        :value="item"
                        :label="item"
                    >
                    </el-option>
                </el-select>
                <span style="margin-left: 5px; margin-right: 5px;">周的星期</span>
                <el-select v-model="week.end"  @change="type = '7'">
                    <el-option
                        v-for="d in 7"
                        :key="d"
                        :value="d"
                        :label="d"
                    >
                    </el-option>
                </el-select>
            </el-radio>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: '*'
            },
            mark: {
                type: String
            }
        },
        data () {
            return {
                type: '1', // 类型
                loop: 1,
                week: { // 指定周
                    start: 1,
                    end: 1
                },
                work: 1,//最近工作日
                last: 0,//本月最后一天
                ops:[1,2,3,4,"L"],
                appoint: [] // 指定
            }
        },
        computed: {
            value_ () {
                let result = [];
                let str = this.loop == '' ? 1 : this.loop;//如果为空,默认传1
                switch (this.type) {
                    case '1': // 每秒
                        result.push('*')
                        break
                    case '4': // 指定
                        let apRes = this.appoint.join(',') == 0 ? '*': this.appoint.join(',');
                        result = [apRes,`*/${str}`,`?`];
                        break
                    case '6': // 最后一天
                        result = [`L`,`*/${str}`,`?`];
                        break
                    case '7': // 指定周
                        if (this.week.start == 'L') {
                            result = [`?`,`*/${str}`,`${this.week.end}${this.week.start}`]
                        } else {
                            result = [`?`,`*/${str}`,`${this.week.start}#${this.week.end}`]
                        }
                        break
                    case '8': // 工作日
                        result = [`${this.work}W`,`*/${str}`,`?`]
                        break
                    default: // 不指定
                        result.push('?')
                        break
                };
                this.$emit('input', result.join(' '))
                return result.join(' ')
            }
        },
        watch:{
            'value'(a,b){
                this.updateVal()
            }
        },
        methods: {
            updateVal () {
                if (!this.value) {
                    return
                }
                if (this.mark && this.mark == 'month') {
                    if (this.value.indexOf('W') != -1) {//几号最近的工作日
                        let str = this.value.split('W');
                        this.type = '8';
                        this.work = str[0];//最近工作日
                        let loopStr = str[1].split(' */')[1].split(' ')[0];
                        this.loop = loopStr;
                        return false
                    }
                    if (this.value.indexOf('L') != -1) {//本月最后一天或指定周中L
                        let str = this.value.split(' ');
                        if (str[0] == 'L') {//本月最后一天
                            this.type = '6';
                            let loopStr = str[1].split('/')[1];
                            this.loop = loopStr;
                            return false
                        }
                        //指定周中的L
                        this.type = '7';
                        this.week.start = 'L';
                        this.week.end = str[2].split('L')[0];
                        this.loop = str[1].split('/')[1];
                        return false
                    }
                    if (this.value.indexOf('#') !== -1) {//指定几周的周几
                        this.type = '7';
                        let str = this.value.split(' ');
                        this.week.start = str[2].split('#')[0];
                        this.week.end = str[2].split('#')[1];
                        this.loop = str[1].split('/')[1];
                        return false
                    }
                    if (this.value.indexOf('*/') != -1) {//指定或不指定
                        let str = this.value.split(' ');
                        this.loop = str[1].split('/')[1];
                        if (str[0] != '*') {//指定日期
                            this.type = '4';
                            let arr = str[0].split(',')
                            this.appoint = arr.map(it => Number(it));//需要转为数值类型,el-checkbox才会生效
                        }
                    }
                }

            }
        },
        created () {
            this.updateVal()
        }
    }
</script>

<style lang="scss">
    .cron_con{
        .cron_month{
            .el-checkbox-group{
                margin-left: 25px;
            }
        }
        .el-checkbox__label{
            padding-left: 5px;
        }
    }

</style>
