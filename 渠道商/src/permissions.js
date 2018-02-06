
/*

android6.0 以上需要进行权限验证
success 有权限时的回调函数
eroor  没有权限时的回调函数
type 
cordova.plugins.diagnostic.runtimePermission.READ_PHONE_STATE
cordova.plugins.diagnostic.runtimePermission.WRITE_CALENDAR
cordova.plugins.diagnostic.runtimePermission.CAMERA
cordova.plugins.diagnostic.runtimePermission.READ_CONTACTS
cordova.plugins.diagnostic.runtimePermission.WRITE_CONTACTS
cordova.plugins.diagnostic.runtimePermission.GET_ACCOUNTS
cordova.plugins.diagnostic.runtimePermission.ACCESS_FINE_LOCATION
cordova.plugins.diagnostic.runtimePermission.ACCESS_COARSE_LOCATION
cordova.plugins.diagnostic.runtimePermission.RECORD_AUDIO
cordova.plugins.diagnostic.runtimePermission.CALL_PHONE
cordova.plugins.diagnostic.runtimePermission.ADD_VOICEMAIL
cordova.plugins.diagnostic.runtimePermission.USE_SIP
cordova.plugins.diagnostic.runtimePermission.PROCESS_OUTGOING_CALLS
cordova.plugins.diagnostic.runtimePermission.SEND_SMS
cordova.plugins.diagnostic.runtimePermission.RECEIVE_SMS
cordova.plugins.diagnostic.runtimePermission.READ_SMS
cordova.plugins.diagnostic.runtimePermission.RECEIVE_WAP_PUSH
cordova.plugins.diagnostic.runtimePermission.RECEIVE_MMS
cordova.plugins.diagnostic.runtimePermission.WRITE_EXTERNAL_STORAGE
cordova.plugins.diagnostic.runtimePermission.READ_CALL_LOG
cordova.plugins.diagnostic.runtimePermission.WRITE_CALL_LOG
cordova.plugins.diagnostic.runtimePermission.READ_EXTERNAL_STORAGE
cordova.plugins.diagnostic.runtimePermission.BODY_SENSORS

*/
function checkPermission(success,error,type){
    cordova.plugins.diagnostic.requestRuntimePermission(function(status){
        switch(status){
            case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
                console.log("Permission granted (or already granted) - call the plugin");
                success()
                // call SQLite plugin
                break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
                console.log("Permission denied - ask again");
                alert("Come on user, we really need this. I'll ask again...");
                requestPermission();
                break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
                console.log("Permission permanently denied");
                alert("没有权限");
                navigator.app.exitApp();
                break;
        }
    }, function(error){  
        console.error("The following error occurred: "+error);
        error()
    }, type);
}
function simplecheckPermission(type){
    if (typeof cordova.plugins.diagnostic!="undefined")
    cordova.plugins.diagnostic.requestRuntimePermission(function(status){
        switch(status){
            case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
                console.log("Permission granted (or already granted) - call the plugin");
                break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
                console.log("Permission denied - ask again");
                alert("Come on user, we really need this. I'll ask again...");
                requestPermission();
                break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
                console.log("Permission permanently denied");
                alert("沒有权限！");
                navigator.app.exitApp();
                break;
        }
    }, function(error){  
        console.error("The following error occurred: "+error);
    }, type);
}
exports.checkPermission=checkPermission
exports.simplecheckPermission=simplecheckPermission