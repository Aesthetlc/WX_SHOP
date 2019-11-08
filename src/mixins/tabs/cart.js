import wepy from 'wepy'

export default class cart extends wepy.mixin {
  data = {
    cart: []
  }

  config = {}

  methods = {
    onChangeCount(even) {
      //id,count=====>根据id修改count
      const id = even.target.dataset.id
      const count = even.detail
      this.$parent.updataToCart(id, count)
    },
    onChangeCheck(even) {
      const id = even.target.dataset.id
      const checked = even.detail
      this.$parent.updataToCheck(id, checked)
    },
    deleteShopMsg(id) {
      this.$parent.deleteShopMsg(id)
    },
    //全选
    onChangeAllCheck(even) {
      this.$parent.checkToAll(even.detail)
    },
    //提交订单
    submitOrder() {
      if (this.sumPrice <= 0) {
        wepy.baseShowToast('请选择商品')
      } else {
        wepy.navigateTo({
          url: '/pages/order/index'
        })
      }
    }
  }
  computed = {
    //判断购物车里面是否有商品
    isEmpty() {
      return this.cart.length === 0 ? true : false
    },

    //计算总价
    sumPrice() {
      let sumPrice = 0;
      this.cart.forEach(item => {
        if (item.isCheck == true) {
          sumPrice += item.price * item.count
        }
      })
      return sumPrice * 100
    },

    //全选 
    isFullCheck() {
      return this.cart.every(item => item.isCheck)
    }
  }

  onLoad() {
    this.cart = this.$parent.globalData.cart
  }

  onShow() {
    this.$parent.setTabBarBadge()
  }
}
