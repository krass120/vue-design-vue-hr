<template>
  <a-card>
    <!-- :rowKey="record => record.id" -->
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      @change="onChange"
    >
      <!-- <template slot="cover" slot-scope="text">
        {{ text }}
      </template> -->
      <template slot="status" slot-scope="text">
        <a-tag :color="setColor(text)">{{ setTag(text) }}</a-tag>
      </template>
      <template slot="operation" slot-scope="">
        <a-button type="primary">编辑</a-button>
        <a-button type="danger">删除</a-button>
      </template>
    </a-table>
    <div class="set-pagination">
      <a-pagination
        v-model="current"
        :total="total"
        showQuickJumper
        showSizeChanger
        show-less-items
        @change="changePage"
        @showSizeChange="changeSize"
      />
    </div>
  </a-card>
</template>
<script>
import { getList } from '@/api/content'

const columns = [
  {
    title: '封面',
    dataIndex: 'cover',
    scopedSlots: { customRender: 'cover' }
  },
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '发布时间',
    dataIndex: 'pubdate',
    scopedSlots: { customRender: 'pubdate' },
    defaultSortOrder: 'descend',
    sorter: (a, b) => new Date(a.pubdate) - new Date(b.pubdate)
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  data () {
    return {
      data: [],
      columns,
      current: 1,
      total: 50,
      resParams: {
        page: 1,
        per_page: 10
      }
    }
  },
  mounted () {
    this.hGetList()
  },
  methods: {
    onChange (pagination, filters, sorter) {
      console.log(pagination, filters, sorter)
    },
    async hGetList () {
      const res = await getList(this.resParams)
      this.data = res.data.data.results
      console.log(this.columns)
    },
    changePage (page, pageSize) {
      this.resParams.page = page
      this.hGetList()
    },
    changeSize (current, size) {
      this.resParams.page = 1
      this.resParams.per_page = size
      this.hGetList()
    },
    setTag (tab) {
      const tabArr = ['草稿', '待审核', '审核通过', '审核失败', '已删除']
      return tabArr[tab]
    },
    setColor (tab) {
      const colorArr = ['pink', 'cyan', 'green', 'orange', 'red']
      return colorArr[tab]
    }
  }
}
</script>

<style scoped>
.set-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
</style>
