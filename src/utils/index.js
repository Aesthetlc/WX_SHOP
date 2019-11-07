import wepy from 'wepy'

const baseUrl = "https://uinav.com/api/public/v1"

/**
 * wepy 封装的提示方法全局使用
 */
wepy.baseShowToast = function (title = '获取数据失败', icon = 'none') {
  wepy.showToast({
    title,
    icon
  })
}

/**
 * wepy  get方法封装
 */
wepy.get = function (path, data = {}) {
  return wepy.request({
    url: baseUrl + path,
    data
  })
}

/**
 * wepy  post方法封装
 */
wepy.post = function (path, data = {}) {
  return wepy.request({
    url: baseUrl + path,
    data,
    method: "post"
  })
}