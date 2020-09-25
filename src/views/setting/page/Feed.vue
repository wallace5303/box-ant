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
        <icon-text type="star-o" :text="item.col_times" />
        <icon-text type="like-o" :text="item.like" />
      </template>
      <a-list-item-meta>
        <a slot="title"><strong>{{ item.title }}</strong></a>
        <template slot="description">
          <span v-if="item.url">
            <a-tag>{{ item.url }}</a-tag>
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
  </a-list>
</template>

<script>
import FeedList from './modules/FeedList'
import IconText from '@/views/home/page/components/IconText'
import { outApi } from '@/api/main'

export default {
  name: 'Feed',
  components: {
    FeedList,
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
      }
    }
  },
  mounted () {
    this.getFeedList()
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>
