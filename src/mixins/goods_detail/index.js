import wepy from 'wepy'

export default class detail extends wepy.mixin {
  data = {
    goods_id: 0, //商品id
    goods_detail: {}, // 商品详情
    address: wepy.getStorageSync('address') || null // 收货地址
  }

  methods = {
    //预览图片
    previewImg(current) {
      const urls = this.goods_detail.pics.map(item => {
        return item.pics_big_url
      })
      wepy.previewImage({
        urls,
        current
      })
    },
    //选择收获地址
    async checkAddress() {
      const result = await wepy.chooseAddress().catch(error => error)
      if (result.errMsg !== 'chooseAddress:ok') {
        return wepy.baseShowToast("选择地址失败")
      }
      wepy.baseShowToast("选择地址成功", "success")
      this.address = result
      this.$apply()
      //存放至本地localstorage
      wepy.setStorageSync('address', this.address)
    },
    //添加商品到购物车
    addToCart(goods){
      this.$parent.addToCart(this.goods_detail)
      wepy.baseShowToast('添加购物车成功','success')
    }
  }

  computed = {
    formatAddress() {
      if (this.address == null) {
        return "请选择收货地址"
      } else {
        const {
          provinceName,
          cityName,
          countyName,
          detailInfo
        } = this.address
        const result = provinceName + cityName + countyName + detailInfo
        return result
      }
    }
  }

  // 获取商品详情数据
  async getGoodsDetail() {
    const {
      data
    } = await wepy.get('/goods/detail', {
      goods_id: this.goods_id
    })
    if (data.meta.status !== 200) {
      return wepybaseShowToast()
    }
    this.goods_detail = data.message
    this.$apply()
  }
  onLoad(options) {
    this.goods_id = options.goods_id
    this.getGoodsDetail()
  }
}
