<template>
  <div>
    <standard-form-row title="" block style="padding-bottom: 11px;">
      <a-radio-group v-model="status" @change="handleChangeType(status)">
        <a-radio-button value="uwsid">默认</a-radio-button>
        <a-radio-button value="uwsid">最新</a-radio-button>
      </a-radio-group>
      <a-input-search style="margin-left: 16px; width: 272px;" @search="handleSearch"/>
    </standard-form-row>
    <a-card
      style="margin-top: 0px"
      :bordered="true"
      title="">
      <div class="operate">
        <a-button type="dashed" style="width: 100%">添加</a-button>
      </div>
      <a-list :loading="loading" size="large">
        <a-list-item :key="index" v-for="(item, index) in webList" style="padding-top: 10px;padding-bottom: 10px;">
          <a-list-item-meta>
            <a-avatar
              style="color: #f56a00;backgroundColor:#fff"
              slot="avatar"
              size="default"
              shape="square"
              icon="tag">
            </a-avatar>
            <a slot="title">{{ item.name }}</a>
          </a-list-item-meta>
          <div class="list-view">
            <a :href="item.url" target="_blank">查看</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(item)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(item)">删除</a>
          </div>
        </a-list-item>
        <div slot="footer" v-if="pageInfo.next_page_url" style="text-align: center; margin-top: 16px;">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>
      </a-list>
      <web-form
        ref="webSaveModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </div>
</template>

<script>
import WebForm from './modules/WebSaveForm'
import { outApi } from '@/api/main'
import { StandardFormRow } from '@/components'

export default {
  name: 'StandardList',
  components: {
    WebForm,
    StandardFormRow
  },
  data () {
    return {
      webList: [],
      pageInfo: {},
      loading: true,
      loadingMore: false,
      // 查询参数
      queryParam: {
        page: 1,
        sort: 'uwsid'
      },
      status: 'uwsid',
      visible: false,
      confirmLoading: false,
      mdl: null
    }
  },
  mounted () {
    this.getManageUserSite()
  },
  methods: {
    handleSearch (value) {
      this.queryParam.sort = 'uwsid'
      this.queryParam.page = 1
      this.getManageUserSite()
    },
    handleChangeType (status) {
      this.status = status
      this.queryParam.sort = status
      this.queryParam.page = 1
      this.getManageUserSite()
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = {
        id: record.uwsid,
        name: record.name,
        url: record.url
      }
    },
    getManageUserSite () {
      const params = {
        out_url: 'manageUserSite',
        method: 'POST',
        data: {
          page: this.queryParam.page
        }
      }
      outApi(params).then(res => {
        this.loading = false
        this.loadingMore = false
        if (res.code !== 0) {
          return
        }
        this.pageInfo = res.data.list
        this.webList = this.webList.concat(this.pageInfo.data)
        }).catch(err => {
          console.log('err:', err)
        })
    },
    loadMore () {
      this.loadingMore = true
      this.queryParam.page += 1
      this.getFeedList()
    },
    handleCancel () {
      this.visible = false
      this.confirmLoading = false
      const form = this.$refs.webSaveModal.form
    },
    handleOk () {
      // console.log('webInfo', webInfo)
      const form = this.$refs.webSaveModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        console.log('getManageUserSite values:', values)
        if (!errors) {
          const params = {
            out_url: 'saveSite',
            method: 'POST',
            data: {
              uwsid: values.uwsid,
              type: values.type,
              name: values.name,
              url: values.url,
              sort: 0
            }
          }
          outApi(params).then(res => {
            this.confirmLoading = false
            if (res.code !== 0) {
              this.$message.info('添加失败')
              return
            }
              this.visible = false
              this.$message.info('添加成功')
            }).catch(err => {
              console.log('err:', err)
            })
        } else {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
}
.list-view {
  width: 20%;
  text-align: center;
}
.list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span {
        line-height: 20px;
    }
    p {
        margin-top: 4px;
        margin-bottom: 0;
        line-height: 22px;
    }
}
</style>
