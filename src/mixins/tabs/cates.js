import wepy from 'wepy'

export default class cates extends wepy.mixin {
  data = {
    cateList: [], //分类数据
    secondCate: []
  }

  config = {}

  methods = {
    //三级导航
    onChange(even) {
      this.secondCate = this.cateList[even.detail].children
    }
  }

  //获得分类list
  async getCatesList() {
    const {
      data
    } = await wepy.get('/categories')
    if (data.meta.status !== 200) {
      return wepy.baseShowToast()
    }
    this.cateList = data.message
    this.secondCate = this.cateList[0].children
    this.$apply()
  }

  onLoad() {
    this.getCatesList()
  }
}
