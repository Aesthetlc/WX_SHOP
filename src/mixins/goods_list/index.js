import wepy from 'wepy'

export default class index extends wepy.mixin {
    data = {
        query:'',//关键词
        cid:'',//分类id
        total:'',//总页数
        goodsList:[],//商品列表集合
        pagenum:1,//页数索引
        pagesize:20,//每页长度
        isLoading:false,//防止刷新过快，请求完毕在请求下一次
        isMore:true //是否有更多数据
    }

    methods = {
        // 进入商品详情页面
        goGoodsDetail(id){
            wepy.navigateTo({
                url:'/pages/goods_detail/index?goods_id='+id
            })
        }
    }

    //获取商品列表数据
    async getGoodsList(fn){
        this.isLoading = true
        const {data} =  await wepy.get('/goods/search',{
             query:this.query,
             cid:this.cid,
             pagenum:this.pagenum,
             pagesize:this.pagesize
         })
         fn && fn()  //如果传入了fn就执行 不传入就不执行
         this.goodsList.push(...data.message.goods)
         this.total = data.message.total
         this.isLoading = false
         this.$apply()
     }

    //初始化加载
    onLoad(options){
        // isLoading 防止刷新过快，请求完毕在请求下一次
        if(this.isLoading){
            return
        }
       // 获取初始值
       this.query = options.keyWords || ''
       this.cid = options.cat_id || ''
       // 调用商品列表的方法
       this.getGoodsList()
    }

    //触底
    onReachBottom(){
        if(this.pagenum * this.pagesize>=this.total){
            return this.isMore = false
        }
        this.pagenum++
        this.getGoodsList()
    }

    //下拉
    onPullDownRefresh(){
        this.pagenum=1;
        this.total=0;
        this.goodsList=[];
        this.isMore=true
        this.getGoodsList(function(){
            wepy.stopPullDownRefresh()
            console.log("关闭");
        })
       
    }
}