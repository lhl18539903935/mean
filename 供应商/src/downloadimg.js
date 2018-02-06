import { simplecheckPermission } from "./permissions"
//下载图片  
function downloadImage(img_url, success, errr) {
    simplecheckPermission(cordova.plugins.diagnostic.runtimePermission.READ_EXTERNAL_STORAGE);
    simplecheckPermission(cordova.plugins.diagnostic.runtimePermission.WRITE_EXTERNAL_STORAGE);
    var url = img_url
    cordova.plugins.saveToPhotoAlbum.save(url, function (nativeURL) {
        success(nativeURL);
    }, function (err) {
        error(err)
    });
}
export default downloadImage