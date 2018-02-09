let str = 'John bos'
let a = 'John boss生肖系列 儿童杯壶套装HB-TD6026'
let b = '2017啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
let c = 'aa'

function cutStr(str,L){
  L = 2*L
  var result = '',
    strlen = str.length, // 字符串长度
    chrlen = str.replace(/[^\x00-\xff]/g,'**').length; // 字节长度
  if(chrlen<=L){return str;}
  for(var i=0,j=0;i<strlen;i++){
    var chr = str.charAt(i);
    if(/[\x00-\xff]/.test(chr)){
      j++; // ascii码为0-255，一个字符就是一个字节的长度
    }else{
      j+=2; // ascii码为0-255以外，一个字符就是两个字节的长度
    }
    if(j<=L){ // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
      result += chr;
    }else{ // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
      return result;
    }
  }
}
console.log(cutStr(a,8))
console.log(cutStr(b,8))
console.log(cutStr(c,8))