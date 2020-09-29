<template>
  <div>
    <standard-form-row title="" block style="padding-bottom: 11px;">
      <a-radio-group v-model="status" @change="handleChangeType(status)">
        <a-radio-button value="uwsid">全部</a-radio-button>
      </a-radio-group>
      <!-- <a-input-search style="margin-left: 16px; width: 272px;" @search="handleSearch"/> -->
    </standard-form-row>
    <a-card
      style="margin-top: 0px"
      :bordered="true"
      title="">
      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="handleAdd">添加</a-button>
      </div>
      <a-list :loading="loading" size="large">
        <a-list-item :key="index" v-for="(item, index) in webList" style="padding-top: 10px;padding-bottom: 10px;">
          <a-list-item-meta :description="item.url">
            <a-avatar
              style="color: #f56a00;backgroundColor:#fff"
              slot="avatar"
              size="default"
              shape="square"
              icon="tag">
            </a-avatar>
            <a slot="title">{{ item.name }}</a>
          </a-list-item-meta>
          <div class="list-number">
            <span>{{ item.type_name }}</span>
          </div>
          <div class="list-number">
            <a-tooltip>
              <template slot="title">
                数字大的在前
              </template>
              <span>排序：{{ item.sort }}</span>
            </a-tooltip>
          </div>
          <div class="list-view">
            <a :href="item.url" target="_blank">查看</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(item)">编辑</a>
            <a-divider type="vertical" />
            <!-- <a @click="handleDel(item)">删除</a> -->
            <a-popconfirm
              title="确定删除么？"
              @confirm="delConfirm(item.uwsid)">
              <a-icon slot="icon" type="question-circle-o" style="color: red" />
              <a href="#">删除</a>
            </a-popconfirm>
          </div>
        </a-list-item>
        <span />
        <div slot="footer" v-if="pageInfo.next_page_url" style="text-align: center; margin-top: 1px;">
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
import WebForm from './modules/UserWebForm'
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
      this.webList = []
      this.getManageUserSite()
    },
    handleAdd () {
      this.visible = true
      this.mdl = {
        id: 0,
        name: '',
        url: '',
        sort: 0
      }
    },
    delConfirm (delId) {
      this.loading = true
      const params = {
        out_url: 'delUserSite',
        method: 'POST',
        data: {
          uwsid: delId
        }
      }
      outApi(params).then(res => {
        if (res.code === 0) {
          this.handleChangeType(this.status)
          this.$message.info('删除成功')
        }
      }).catch(err => {
        console.log('err:', err)
      }).finally(() => {
      })
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = {
        id: record.uwsid,
        name: record.name,
        url: record.url,
        sort: record.sort
      }
    },
    getManageUserSite () {
      this.loading = true
      const params = {
        out_url: 'manageUserSite',
        method: 'POST',
        data: {
          page: this.queryParam.page
        }
      }
      outApi(params).then(res => {
        if (res.code === 0) {
          this.pageInfo = res.data.list
          this.webList = this.webList.concat(this.pageInfo.data)
        }
      }).catch(err => {
        console.log('err:', err)
      }).finally(() => {
        this.loading = false
        this.loadingMore = false
      })
    },
    loadMore () {
      this.loadingMore = true
      this.queryParam.page += 1
      this.getManageUserSite()
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
        // console.log('getManageUserSite values:', values)
        let alertMessageSuccess = '添加成功'
        let alertMessageFail = '添加失败'
        if (values.id > 0) {
          alertMessageSuccess = '修改成功'
          alertMessageFail = '修改失败'
        }
        if (!errors) {
          const params = {
            out_url: 'saveSite',
            method: 'POST',
            data: {
              uwsid: values.id,
              type: values.type,
              name: values.name,
              url: values.url,
              sort: values.sort
            }
          }
          outApi(params).then(res => {
            if (res.code !== 0) {
              this.$message.info(alertMessageFail)
              return
            }
            this.handleChangeType(this.status)
            this.$message.info(alertMessageSuccess)
          }).catch(err => {
            console.log('err:', err)
          }).finally(() => {
            this.visible = false
            this.confirmLoading = false
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
.list-number {
  width: 10%;
  text-align: left;
}
.list-view {
  width: 20%;
  text-align: center;
}
</style>
