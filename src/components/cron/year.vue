<template>
    <div :val="value_" class="cron_con">
        <div>
            <span style="margin-left: 10px; margin-right: 5px;">每年</span>
            <el-select  v-model="monVal" @change="type = '9'">
               <el-option
                   v-for="m in 12"
                   :key="m"
                   :label="m"
                   :value="m"
               >
               </el-option>
            </el-select>
            <span style="margin-left: 5px; margin-right: 5px;">月</span>
            <el-select  v-model="dayVal" @change="type = '4'">
                <el-option
                    v-for="d in 31"
                    :key="d"
                    :label="d"
                    :value="d"
                >
                </el-option>
            </el-select>
            号
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
            mark : {
                type: String
            }
        },
        data () {
            return {
                type: '1', // 类型
                monVal:1,
                dayVal:1
            }
        },
        computed: {
            value_ () {
                let result = []
                switch (this.type) {
                    case '1': // 每秒
                        result.push('*')
                        break
                    case '4': // 指定 日
                        result = [`${this.dayVal}`,`${this.monVal}`,`?`,`*`];
                        break
                    case '9': // 指定 - 每年几月
                        result = [`${this.dayVal}`,`${this.monVal}`,`?`,`*`];
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
                if (this.mark && this.mark == 'year') {
                    let str = this.value.split(' ');
                    this.monVal = str[1];
                    this.dayVal = str[0];
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
        .el-input-number--small{
            width: 220px;
        }
        .el-input-number--small{
            line-height: 34px !important;
        }
        .el-input-number--small .el-input-number__decrease{
            height: 34px !important;
        }
    }
</style>