import LoadingComponent from './loading'

let $vm


const plugin = {
	
		    	show (options = {}){
		    		$vm.show=true
		    	},
		    	hide(){
		    		$vm.show=false
		    	}
		    }

export default plugin
