let local;
local=JSON.parse(localStorage.getItem('addressData'))
if(!local){
	local=require('./addressData.json');
	localStorage.setItem('addressData',JSON.stringify(local));
}

export default local