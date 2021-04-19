<template>
    <div>
        <button @click="printPage">打印</button>
        <div id="printPageCon">
            <table v-for="(res,index) in result" :key="index"  class="table" width="100%"  style="border-collapse: collapse;text-align:center;color:#5a5e66;background:#fff;margin-bottom:30px;">
                <thead id="table">
                    <tr style="height:28px">
                        <th style="text-align: left">{{res.acctDate+res.title}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <table class="table" width="100%" border="1" style="border-collapse: collapse;text-align:center;color:#5a5e66;background:#fff;margin-bottom:30px;">
                                <thead id="table2">
                                <tr style="height:28px">
                                    <th>账号</th>
                                    <th>账号名称</th>
                                    <th>科目</th>
                                    <th>借贷标志</th>
                                    <th style="width:180px">交易金额(元)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,index) in res.list" :key="index" style="height:28px">
                                    <td>{{item.acctNumb}}</td>
                                    <td>{{item.acctName}}</td>
                                    <td>{{item.itemCode}}</td>
                                    <td>{{item.cdFlag=='C'?'贷':'借'}}</td>
                                    <td>{{item.tranAmnt}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    const data = require('../../data.json');
    import print from 'print-js'
    export default {
        name: "print.vue",
        data(){
            return {
                result:data.content
            }
        },
        mounted(){

        },
        methods:{
            printPage(){
                printJS({
                    printable:  'printPageCon',
                    type: 'html',
                    targetStyles: ['*']
                })
            }
        }
    }
</script>

<style lang="scss">

</style>