import wepy from 'wepy'

export default class Order extends wepy.mixin {
  data = {
    addressInfo: null, //收货地址
    cart: [] //购物车
  }

  methods = {
    //选择收货地址
    async checkAddress() {
      const result = await wepy.chooseAddress().catch(err => err)
      if (result.errMsg === "chooseAddress:ok") {
        wepy.baseShowToast("选择地址成功", "success")
        wepy.setStorageSync('address', result)
        this.addressInfo = result
        this.$apply()
      } else {
        wepy.baseShowToast("您已经取消选择地址")
      }
    },
    // 登录
    getUserInfo(e) {
      const {
        encryptedData,
        iv,
        rawData,
        signature
      } = e.detail
    },
    //获取code
    async getUserInfo(even) {
      const {
        encryptedData,
        iv,
        rawData,
        signature
      } = even.detail
      const {
        code
      } = await wepy.login()
    }

    //************************支付流程***********************
     /* 根据订单信息创建订单，创建完订单之后就会有订单号
     根据订单号生成预支付订单，生成预支付订单之后就会得到支付所需要的一些参数
     根据预支付返回的参数调用微信提供的微信支付进行支付，调用微信支付后就会弹出支付，此时你可能会支付，也可能会取消支付
     如果进入支付再判断支付状态，支付成功跳转至订单列表页   */
    //************************支付流程***********************
  }
  computed = {
    //计算属性 选择收货地址，显示收货地址
    showAddress() {
      if (this.addressInfo == null) {
        return true
      }
      return false
    },
    //拼接地址
    addressStr() {
      if (this.addressInfo == null) {
        return null
      }
      const {
        provinceName,
        cityName,
        countyName,
        detailInfo
      } = this.addressInfo
      return provinceName + cityName + countyName + detailInfo
    }
  }

  onLoad() {
    this.addressInfo = wepy.getStorageSync('address') || null
    this.cart = this.$parent.globalData.cart.filter(item => {
      return item.isCheck === true
    })
  }
}
