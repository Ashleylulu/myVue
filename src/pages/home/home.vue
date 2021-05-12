<template>
    <div class="home_sty">
        <el-form :model="form" label-width="80px">
            <el-form-item style="margin-top: -10px; margin-bottom:0px;">
                <cron v-if="showCronBox" v-model="form.cronExpression"></cron>
                <span style="color: #E6A23C; font-size: 12px;">corn从左到右（用空格隔开）：秒 分 小时 月份中的日期 月份 星期中的日期 年份</span>
            </el-form-item>
            <el-form-item label="Cron">
                <el-input v-model="form.cronExpression" auto-complete="off">
                    <el-button slot="append" v-if="!showCronBox" icon="el-icon-arrow-up" @click="showCronBox = true" title="打开图形配置"></el-button>
                    <el-button slot="append" v-else icon="el-icon-arrow-down" @click="showCronBox = false" title="关闭图形配置"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import data from '../../json/tabs.json'
    import cron from '../../components/cron/cron'
    export default {
        name: "home",
        components:{cron},
        data(){
            return {
                showCronBox: true,
                form: {
                    cronExpression: ''
                }
            }
        },
        mounted(){
            console.log(data)
        },
        methods:{
            changeCron(val){
                this.cron=val
            },
            getJSON(url){
                const promise = new Promise(function(resolve, reject){
                    const handler = function() {
                        if (this.readyState !== 4) {
                            return;
                        }
                        if (this.status === 200) {
                            resolve(this.response);
                        } else {
                            reject(new Error(this.statusText));
                        }
                    };
                    const client = new XMLHttpRequest();
                    client.open("GET", url);
                    client.onreadystatechange = handler;
                    client.responseType = "json";
                    client.setRequestHeader("Accept", "application/json");
                    client.send();

                });
                return promise;
            },
            async getRes(){
                let res = await this.getJSON('../../json/tabs.json')
                console.log(res)
            }
        }
    }
</script>

<style scoped lang="scss">
    .home_sty{
        .test_px_css{
            width: 750px;
            height: 100px;
            font-size: 40px;
            line-height: 100px;
            background: #42b983;
            text-align: center;
            margin: 0 auto;
            color: #fff;
        }
    }
</style>