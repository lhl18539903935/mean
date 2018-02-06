<template>
  <div>

  </div>
</template>

<script>
  import datas from '../datas/address_json.json'
  const citylist=datas
    export default {
        name: 'test',
        data(){
            return{
                names: datas,
                alphabet: []
            }
        },
        methods:{
            one(){
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(initial => {
                    let cells = [];
                    datas.filter(name => {
                        if (name.pinyin[0] === initial.toLocaleLowerCase()) cells.push(name);
                    });

                    this.alphabet.push({
                        initial,
                        cells
                    });
                });
                    let arr = [];
                    for (let i in this.alphabet) {
                        if (this.alphabet[i].cells.length > 0) {
                            arr.push(this.alphabet[i]);
                        }
                    }
                    this.alphabet = arr;
                    console.log(this.alphabet)

            }
        },

        created(){
//            this.one()
        }
    }

</script>

<style scoped>

</style>