<template>
  <a-card
    style="margin-top: 24px"
    :bordered="false"
    title="推荐站点">

    <div slot="extra">
      <!-- <a-radio-group v-model="status">
        <a-radio-button value="all">全部</a-radio-button>
        <a-radio-button value="processing">进行中</a-radio-button>
        <a-radio-button value="waiting">等待中</a-radio-button>
      </a-radio-group>
      <a-input-search style="margin-left: 16px; width: 272px;" /> -->
    </div>
    <a-list :loading="loading" size="large" :pagination="paginationOpt">
      <a-list-item :key="index" v-for="(item, index) in webList">
        <a-list-item-meta :description="item.desc">
          <a-avatar slot="avatar" size="default" shape="circle" :src="item.img"/>
          <a slot="title">{{ item.name }}</a>
        </a-list-item-meta>
        <div class="list-times">
          <div class="list-content-item">
            <a-icon type="star-o" style="margin-right: 8px" />
            <span>{{ item.col_times }}</span>
          </div>
        </div>
        <div class="list-view">
          <div class="list-content-item">
            <a :href="item.url">查看</a>
          </div>
        </div>
        <div class="list-view">
          <a @click="handleEdit(item)">添加</a>
        </div>
      </a-list-item>
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

</template>

<script>
import WebForm from './modules/WebSaveForm'
import { outApi } from '@/api/main'

export default {
  name: 'StandardList',
  components: {
    WebForm
  },
  data () {
    return {
      webList: {},
      webPageList: {},
      paginationOpt: {
        current: 1,
        total: 0,
        pageSize: 10,
        'show-quick-jumper': true,
        onChange: (current) => {
          this.paginationOpt.current = current
          this.queryParam.page = current
          this.getAllWebs()
        }
      },
      loading: true,
      // 查询参数
      queryParam: {
        page: 1,
        type2: ''
      },
      visible: false,
      confirmLoading: false,
      mdl: null
    }
  },
  mounted () {
    this.getAllWebs()
  },
  methods: {
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    getAllWebs () {
      this.loading = true
      const params = {
        out_url: 'allWebSites',
        method: 'POST',
        data: {
          page: this.queryParam.page,
          type2: this.queryParam.type2
        }
      }
      outApi(params).then(res => {
        this.loading = false
        if (res.code !== 0) {
          return
        }
        this.webPageList = res.data && res.data.list
        this.webList = this.webPageList.data
        this.paginationOpt.total = this.webPageList.total
        this.paginationOpt.pageSize = this.webPageList.per_page
        }).catch(err => {
          console.log('err:', err)
        })
    },
    handleCancel () {
      this.visible = false
      this.confirmLoading = false
      const form = this.$refs.webSaveModal.form
      // form.resetFields() // 清理表单数据（可不做）
    },
    handleOk () {
      // console.log('webInfo', webInfo)
      const form = this.$refs.webSaveModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          const saveMySiteParams = {
            out_url: 'saveSite',
            method: 'POST',
            data: {
              type: values.type,
              name: values.name,
              url: values.url,
              sort: 0
            }
          }
          outApi(saveMySiteParams).then(res => {
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
.list-times {
  width: 10%;
  text-align: center;
}
.list-view {
  width: 10%;
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
