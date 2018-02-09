const n = (id)=>{
  switch (id){
    case 'Header_style46': //默认头部
      return 'v0'
      break;
    case 'Header_style46_goods': //热卖
      return 'v01'
      break;
    case 'Header_style46_nav': //默认导航
      return 'v02'
      break;
    case 1://富文本
      return 'v1'
      break;
    case 2://标题栏
      return 'v2'
      break;
    case 3://暂无
      return 'v3'
      break;
    case 4://商品
      return 'v4'
      break;
    case 5://暂无
      return 'v5'
      break;
    case 6://商品搜索
      return 'v6'
      break;
    case 7://文本导航
      return 'v7'
      break;
    case 8://图片导航
      return 'v8'
      break;
    case 9://图片广告
      return 'v9'
      break;
    case 10://分割线
      return 'v10'
      break;
    case 11://辅助空白
      return 'v11'
      break;
    case 12://顶部导航
      return 'v12'
      break;
    case 13://橱窗
      return 'v13'
      break;
    case 14://暂无
      return 'v14'
      break;
    case 15://暂无
      return 'v15'
      break;
    case 16://公告
      return 'v16'
      break;
    case 17://商品分类
      return 'v17'
      break;
    case 18://暂无
      return 'v18'
      break;
    case 19://暂无
      return 'v19'
      break;
    case 20://推荐商品
      return 'v20'
      break;
    case 21://卡片列表
      return 'v21'
      break;
    case 22://滑动导航
      return 'v22'
      break;
    default:
      console.log(id)
      return '0000'
    break;
  }
}
export default n
