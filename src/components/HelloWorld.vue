<template>
  <div class="hello">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  mounted(){
    this.getTest()
  },
  methods:{
    getTest(){
      this.$http.get('/api/getAssetsList', {
      	params: {
      		pageStart: 1,
      		pageEnd:10
      	}
      }).then(res=>{
        console.log(res.data)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
