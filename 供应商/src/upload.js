//import {ajax} from './ajax.js'

const upload = {
    methods: {
        //获取照片
        getPhotoAndUpload: function (success, error, quality) {
            var vm = this
            var _quality = typeof quality == "undefined" ? 50 : quality;
            var pictureSource;
            var destinationType;
            pictureSource = navigator.camera.PictureSourceType;
            destinationType = navigator.camera.DestinationType;
            //quality : 图像的质量，范围是[0,100]
            navigator.camera.getPicture(function (imageURI) {
                //获取照片成功
                vm.apiPost('http://p.huileyi.com/Dls/base64_upload',{img:'data:image/jpg;base64,'+imageURI}).then((res) => {
                      // alert(res.token)
                     console.log(res);
                    if(res.code==200){
                        vm.$vux.loading.hide()
                        vm.$vux.toast.show({
                            text: '上传成功',
                        })
                        success(res)
                        
                    }else{
                        vm.$vux.toast.show({
                            text: res.msg,
                            type: "warn"
                        })
                    }
                })

            },
                function (error) {
                    console.log("照片获取失败！")
                },
                {
                    quality: _quality, destinationType: destinationType.DATA_URL, sourceType: pictureSource.PHOTOLIBRARY
                })
        },
    }
}
export default upload 