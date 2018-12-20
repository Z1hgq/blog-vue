<template>
    <div style="padding:15px">
        <div class="clsinput">
            <Tag color="primary" style="margin:20px;margin-top:30px">图标</Tag>
            <div class="demo-upload-list" v-for="item in uploadList" :key="item.url" style="margin:11px;margin-top:-7px;"> 
            <template v-if="item.status === 'finished'">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
                <img :src="item.url">
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
            </div>

            <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;width:58px;margin:11px">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
                <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
            </Modal>
        <Poptip trigger="focus">
        <Input v-model="clsname" prefix="" placeholder="分类名称" style="width: 150px" />
        <div slot="content">{{clsname}}</div>
        </Poptip>
        <Button type="primary" :loading="loading2" icon="ios-add-circle-outline" @click="toLoading2" style="height:30px;margin:25px;">
        <span v-if="!loading2">添加</span>
        <span v-else>Loading</span>
        </Button>
        </div>
        <Table border :columns="columns" :data="clsdata"></Table>
    </div>
</template>
<style lang="less">
.ivu-table-wrapper {
    position: relative;
    border: 1px solid #dcdee2;
    border-bottom: 0;
    border-right: 0;
    width: 800px;
    margin-top: 30px;
}
.clsinput{
    display: flex;
    height: 90px;
    border: 2px solid #2d8cf0;
}
.demo-upload-list>img{
    width: 60px;
}
.ivu-poptip-rel {
    display: inline-block;
    position: relative;
    margin-top: 25px;
}
</style>

<script>
    export default {
        data () {
            return {
                loading2:false,
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                clsname:'',
                columns: [
                    {
                        title: '分类名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '分类id',
                        key: 'id'
                    },
                    {
                        title: '图标',
                        key: 'icon'
                    },
                    {
                        title: '添加时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                clsdata: [
                    {
                        name: 'John Brown',
                        id: 18,
                        icon: 'New York No. 1 Lake Park',
                        time:'2018-12-18'
                    },
                ]
            }
        },
        methods: {
            toLoading2 () {
                this.loading2 = true;
            },
            show (index) {
                this.$Modal.info({
                    title: '分类信息',
                    content: `分类名称：${this.clsdata[index].name}<br>分类ID：${this.clsdata[index].id}<br>图标：${this.clsdata[index].icon}<br>添加时间：${this.clsdata[index].time}`
                })
            },
            remove (index) {
                this.clsdata.splice(index, 1);
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>
