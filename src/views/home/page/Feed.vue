<template>
  <a-list
    size="large"
    rowKey="id"
    :loading="loading"
    itemLayout="vertical"
    :dataSource="feedList"
  >
    <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
      <template slot="actions">
        <a @click="handleEdit(item)"><icon-text type="star-o" :text="item.col_times"/></a>
        <a @click="handleLike(item)"><icon-text type="like-o" :text="item.like" /></a>
      </template>
      <a-list-item-meta>
        <a slot="title"><strong>{{ item.title }}</strong></a>
        <template slot="description">
          <span v-if="item.url">
            <a :href="item.url" target="_blank"><a-tag>{{ item.url }}</a-tag></a>
          </span>
        </template>
      </a-list-item-meta>
      <img
        v-if="item.pic"
        slot="extra"
        width="272"
        alt="pic"
        :src="item.pic"
      />
      <feed-list :description="item.content" :owner="item.username" :avatar="item.avatar" :href="item.link" :updateAt="item.created_at" />
    </a-list-item>
    <div slot="footer" v-if="pageInfo.next_page_url" style="text-align: center; margin-top: 16px;">
      <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
    </div>
    <web-form
      ref="webSaveModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </a-list>
</template>

<script>
import FeedList from './modules/FeedList'
import IconText from '@/views/home/page/components/IconText'
import { outApi } from '@/api/main'
import WebForm from './modules/WebSaveForm'

export default {
  name: 'Feed',
  components: {
    FeedList,
    WebForm,
    IconText
  },
  data () {
    return {
      loading: true,
      loadingMore: false,
      feedList: [],
      pageInfo: {},
      data: [],
      // 查询参数
      queryParam: {
        page: 1,
        sort: 'fid', // fid like col_times
        desc: ''
      },
      clickColTimes: [],
      clickLikeTimes: [],
      visible: false,
      confirmLoading: false,
      mdl: null
    }
  },
  mounted () {
    this.getFeedList()
  },
  methods: {
    handleEdit (record) {
      this.visible = true
      this.mdl = {
        id: record.fid,
        name: record.title,
        url: record.url
      }
      if (!this.hasExistedColId(record.fid)) {
        record.col_times += 1
        this.clickColTimes.push(record.fid)
      }
    },
    handleLike (record) {
      if (!this.hasExistedLikeId(record.fid)) {
        this.clickLikeTimes.push(record.fid)
        record.like += 1
        this.dataIncr(record, 'like')
      }
    },
    dataIncr (record, type) {
      const params = {
        out_url: 'dataIncr',
        method: 'POST',
        data: {
          fid: record.fid,
          type: type
        }
      }
      outApi(params).then(res => {
        if (res.code !== 0) {
          return
        }
        this.$message.info('+1')
      }).catch(err => {
        console.log('err:', err)
      })
    },
    hasExistedColId (id) {
      const set = new Set(this.clickColTimes)
      if (set.has(id)) {
        return true
      }
      return false
    },
    hasExistedLikeId (id) {
      const set = new Set(this.clickLikeTimes)
      if (set.has(id)) {
        return true
      }
      return false
    },
    getFeedList () {
      const params = {
        out_url: 'feedList',
        method: 'POST',
        data: {
          sort: this.queryParam.sort,
          desc: this.queryParam.desc,
          page: this.queryParam.page
        }
      }
      outApi(params).then(res => {
        this.loading = false
        this.loadingMore = false
        if (res.code !== 0) {
          return
        }
        this.pageInfo = res.data
        this.feedList = this.feedList.concat(this.pageInfo.data)
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
        console.log('feed values:', values)
        if (!errors) {
          const saveMySiteParams = {
            out_url: 'saveSite',
            method: 'POST',
            data: {
              fid: values.id,
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
            this.clickData[values.id] = {
              fid: values.id,
              col_incr: 1,
              like_incr: 1
            }
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

<style scoped>

</style>
