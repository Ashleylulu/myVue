<template>
    <div :val="value_" class="cron_con">
        <div>
            <span style="margin-left: 5px; margin-right: 5px;">每</span>
            <el-input @change="type = '3'"  v-model="loop"  size="mini" ></el-input>
            周
        </div>
        <div>
            <el-checkbox-group v-model="appoint" style="margin-left: 50px;  line-height: 25px;">
                <el-checkbox style="display: inline-block;margin-right: 10px;" @change="type = '4'"  v-for="i in 7" :key="i" :label="i"></el-checkbox>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "week",
        props: {
            value: {
                type: String,
                default: '*'
            },
            mark : {
                type: String
            }
        },
        data(){
            return {
                type: '1', // 类型
                loop: 1,
                appoint: [] // 指定
            }
        },
        computed:{
            value_ () {
                let result = [];
                let str = this.loop == '' ? 1 : this.loop;//如果为空,默认传1
                switch (this.type) {
                    case '1': // 每秒
                        result.push('*')
                        break
                    case '3': // 循环
                        let lens = this.appoint.length;
                        if (lens == 7 || lens == 0) {
                            result = [`?`,`*`,`*/${str}`];
                        } else {
                            let apss = this.appoint.join(',');
                            result = [`?`,`*`,`${apss}/${str}`];
                        }
                        break
                    case '4': // 指定
                        let len = this.appoint.length;
                        if (len == 7 || len == 0) {
                            result = [`?`,`*`,`*/${str}`];
                        } else {
                            let aps = this.appoint.join(',');
                            result = [`?`,`*`,`${aps}/${str}`];
                        }
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
                if (this.mark && this.mark == 'week') {
                    if (this.value.indexOf('*/') !== -1) { // 可能是3或4
                        //每几周
                        let str = this.value.split('*/');
                        let len = str.length;
                        if (len === 2) {
                            if (str[0].indexOf('?') != -1) {//代表每几周的每一天
                                this.loop = Number(str[1])
                            } else if (str[0].indexOf('*') != -1) {
                                let loopStr = str[1].split(' ');
                                this.loop = loopStr[0]
                                this.appoint = [];
                            }
                        }
                    } else if (this.value.indexOf('? *') != -1) {
                        let str = this.value.split('? *');
                        let loopStr = str[1].split(' ')[1].split('/');
                        this.loop = loopStr[1];
                        this.appoint = loopStr[0].split(',');
                        this.appoint = this.appoint.map(it => Number(it));//需要转为数值类型,el-checkbox才会生效
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
        .el-checkbox-group{
            margin-left: 28px !important;
        }
        .el-checkbox__label{
            padding-left: 5px;
        }
        .editAwardRule .el-checkbox{
            width: 35px;
        }
    }
</style>