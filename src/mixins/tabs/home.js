import wepy from 'wepy'

export default class Home extends wepy.mixin {
  data = {
    swiperData: [], //轮播图数据
    catesData: [], //分类数据
    floorData: [], //分类数据
  }

  config = {}

  methods = {
    // 跳转到商品详情
    goGoodsList(url){
      wepy.navigateTo({
        url
      })
    }
  }


  // 获取轮播图数据
  async getSwiperData() {
    const {
      data
    } = await wepy.get('/home/swiperdata')
    if (data.meta.status !== 200) {
      return wepy.baseShowToast()
    }
    this.swiperData = data.message
    this.$apply()
  }

  //获取分类数据
  async getCatesData() {
    const {
      data
    } = await wepy.get('/home/catitems')
    if (data.meta.status !== 200) {
      return wepy.baseShowToast()
    }
    this.catesData = data.message
    this.$apply();
  }

  //获取楼层数据
  async getFloorData() {
    const {
      data
    } = await wepy.get('/home/floordata')
    if (data.meta.status !== 200) {
      return wepy.baseShowToast()
    }
    this.floorData = data.message
    this.$apply()
  }

  onLoad() {
    //页面初始化 调用获取首页轮播图的数据
    this.getSwiperData()
    //页面初始化 调用获取分类数据
    this.getCatesData()
    //页面初始化 调用获取楼层数据
    this.getFloorData()
  }
}
