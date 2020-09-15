<template>
  <div class="app-list">
    <a-list
      :grid="{ gutter: 24, lg: 6, md: 2, sm: 1, xs: 1 }"
      :dataSource="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :hoverable="true">
          <a-card-meta >
            <div style="margin-bottom: 3px" slot="title">{{ item.title }}</div>
            <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="small"/>
          </a-card-meta>
          <!-- <template class="ant-card-actions" slot="actions">
            <a>
              <a-icon type="edit"/>
            </a>
          </template> -->
        </a-card>
      </a-list-item>
    </a-list>

  </div>
</template>

<script>
const dataSource = []
for (let i = 0; i < 11; i++) {
  dataSource.push({
    title: 'Alipay',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    activeUser: 17,
    newUser: 1700
  })
}

export default {
  name: 'Article',
  components: {},
  data () {
    return {
      dataSource
    }
  }
}
</script>

<style lang="less" scoped>

  .app-list {

    .meta-cardInfo {
      zoom: 1;
      margin-top: 16px;

      > div {
        position: relative;
        text-align: left;
        float: left;
        width: 50%;

        p {
          line-height: 32px;
          font-size: 24px;
          margin: 0;

          &:first-child {
            color: rgba(0, 0, 0, .45);
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 4px;
          }
        }

      }
    }
  }

</style>
