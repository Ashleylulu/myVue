<template>
    <div :val="value_">
        <div>
            <span style="margin-left: 5px; margin-right: 5px;">每</span>
            <el-input @change="type = '3'" v-model="loop.end"  size="mini" style="width: 100px;"></el-input>
            周
        </div>
        <div>
            <el-radio v-model="type" label="4" size="mini">
                <el-checkbox-group v-model="appoint" style="margin-left: 50px;  line-height: 25px;">
                    <el-checkbox @change="type = '4'"  v-for="i in 7" :key="i" :label="i"></el-checkbox>
                </el-checkbox-group>
            </el-radio>
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
            }
        },
        data(){
            return {
                type: '3', // 类型
                cycle: { // 周期
                    start: 0,
                    end: 0
                },
                loop: { // 循环
                    start: 0,
                    end: 1
                },
                week: { // 指定周
                    start: 1,
                    end: 1
                },
                work: 0,
                last: 0,
                appoint: [] // 指定
            }
        },
        computed:{
            value_ () {
                let result = [];
                switch (this.type) {
                    case '1': // 每秒
                        result.push('*')
                        break
                    case '2': // 年期
                        result.push(`${this.cycle.start}-${this.cycle.end}`)
                        break
                    case '3': // 循环
                        result = [`*`,`*/${this.loop.end}`,`?`]
                        //result.push(`*/${this.loop.end}`)
                        break
                    case '4': // 指定
                        let aps = '';
                        let len = this.appoint.length;
                        if (len == 6) {
                            aps = '*';
                        } else {
                            aps = this.appoint.join(',');
                        }
                        result = [`?`,`*`,`${aps}/${this.loop.end}`];
                        //result.push(this.appoint.join(','))
                        break
                    case '6': // 最后
                        result.push(`${this.last === 0 ? '' : this.last}L`)
                        break
                    case '7': // 指定周
                        result.push(`${this.week.start}#${this.week.end}`)
                        break
                    default: // 不指定
                        result.push('?')
                        break
                };
                this.$emit('input', result.join(''))
                return result.join('')
            }
        },
        methods: {
            updateVal () {
                if (!this.value) {
                    return
                }
                if (this.value === '?') {
                    this.type = '5'
                } else if (this.value.indexOf('-') !== -1) { // 2周期
                    if (this.value.split('-').length === 2) {
                        this.type = '2'
                        this.cycle.start = this.value.split('-')[0]
                        this.cycle.end = this.value.split('-')[1]
                    }
                } else if (this.value.indexOf('/') !== -1) { // 3循环
                    if (this.value.split('/').length === 2) {
                        this.type = '3'
                        this.loop.start = this.value.split('/')[0]
                        this.loop.end = this.value.split('/')[1]
                    }
                } else if (this.value.indexOf('*') !== -1) { // 1每
                    this.type = '1'
                } else if (this.value.indexOf('L') !== -1) { // 6最后
                    this.type = '6'
                    this.last = this.value.replace('L', '')
                } else if (this.value.indexOf('#') !== -1) { // 7指定周
                    if (this.value.split('#').length === 2) {
                        this.type = '7'
                        this.week.start = this.value.split('#')[0]
                        this.week.end = this.value.split('#')[1]
                    }
                } else if (this.value.indexOf('W') !== -1) { // 8工作日
                    this.type = '8'
                    this.work = this.value.replace('W', '')
                } else { // *
                    this.type = '4'
                    this.appoint = this.value.split(',')
                }
            }
        },
        created () {
            this.updateVal()
        }

    }
</script>

<style scoped>

</style>