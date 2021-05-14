<template lang="html">
    <div :val="value_" class="cron_con">
        <div>
            <span style="margin-left: 5px; margin-right: 5px;">每</span>
            <el-input  style="width: 100px;" size="mini" @change="type = '3'" v-model="loop" ></el-input>
            天执行一次
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: '?'
            },
            mark: {
                type: String
            }
        },
        data () {
            return {
                type: '5', // 类型
                loop:1
            }
        },
        computed: {
            value_ () {
                let result = [];
                switch (this.type) {
                    case '1': // 每日
                        result.push('*')
                        break
                    case '3': // 循环
                        let str = this.loop == '' ? 1 : this.loop;
                        result = [`*/${str}`,'*','?'];
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
                if (this.mark && this.mark == 'd') {
                    let spVal = this.value.split(' ');
                    if (spVal.length === 3) {
                        this.type = '3';
                        this.loop = spVal[0].split('/')[1];
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
        .el-input-number--small{
            width: 220px;
        }
    }
</style>
