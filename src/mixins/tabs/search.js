import wepy from 'wepy'

export default class Home extends wepy.mixin {
  data = {
    value: "", //搜索的关键词
    searchList: [], //所搜结果的集合
    history: wepy.getStorageSync('history') || [], //搜索历史的数组
  }

  config = {}

  methods = {
    // 改变关键词搜索
    async onChange(even) {
      this.value = even.detail;
      if (this.value.length === 0) {
        return this.searchList = []
      }
      const {
        data
      } = await wepy.get('/goods/qsearch', {
        query: this.value
      })
      if (data.meta.status !== 200) {
        return wepy.baseShowToast()
      }
      this.searchList = data.message
      this.$apply()
    },

    // 按下回车搜索
    onSearch(even) {
      if (this.value.trim().length === 0) {
        return searchList = []
      }
      this.history.unshift(this.value)
      this.history = this.history.splice(0, 10)
      wepy.setStorageSync('history', this.history)
      wepy.navigateTo({
        url: '/pages/goods_list/index?keyWords=' + this.value
      })
    },

    //删除history
    deleteHistory(){
      this.history=[]
      wepy.removeStorageSync('history')
    },

    //页面隐藏(离开)的时候清空
    onhide(){
      this.value=""
      this.searchList=[]; 
    }
  }
}
