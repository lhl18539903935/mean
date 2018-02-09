var url = 'http://j.diankuai.com'
// var url = 'http://www.huileyi.com'

var _req = {
  url:'',
  data:{},
  success: function(res){
    // success
  },
  fail: function() {
    // fail
  },
}

//GET请求
function get(req) {
  request('GET',req)
}
//POST请求
function post(req) {
  request('POST',req)
}

function request(method,req) {
  wx.getStorage({
    key: 'token',
    success: function (res) {
      var token = res.data
      let header = req.header || {}
      wx.request({
        url: url + req.url,
        data: req.data,
        method: method,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "TOKEN": token
        }, // 设置请求的 header
        success: function (res) {
          //注意：可以对参数解密等处理
          req.success(res.data)
        },
        fail: function (e) {
          req.fail()
        },
        complete: function (e) {
          // complete
        }
      })
    }
  })
  
}

module.exports = {
  get: get,
  post: post
}
