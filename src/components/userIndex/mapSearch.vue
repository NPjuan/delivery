<template>
  <div class="box">
    <input v-model="key" id="search"/>
    <div style="position: fixed;right: 0;top:0;z-index: 1000;width: .8rem;height: .8rem;background-color: skyblue" @click="search(key)"></div>
  </div>
</template>

<script>
  export default {
    name: "mapSearch",
    data() {
      return {
        // 搜索关键字
        key: "",
        // 结果数组
        result: []
      }
    },
    methods: {
     search(key) {
       let MSearch;
       let self = this
       AMap.plugin(["AMap.PlaceSearch"], function() {
         MSearch = new AMap.PlaceSearch({ //构造地点查询类
           pageSize:6,
           pageIndex:1,
           city:"全国" //城市
         });
         AMap.event.addListener(MSearch, "complete", self.searchShow);//返回地点查询结果
         MSearch.search(key); //关键字查询
       });
     },
     searchShow(result) {
       console.log(result)
       let marker = {
         position: [
           result.poiList.pois[0].location.lng,
           result.poiList.pois[0].location.lat
         ]
       }
       this.$store.state.point.splice(1, 1, marker)
     }
    }
  }
</script>

<style scoped>
  .box{
    width: 100%;
    height: 100%;
    z-index: 105;
  }
  #search {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    text-indent: .15rem;
    font-size: .3rem;
    color: gray;
    transition: .5s all ease;
    z-index: 106;
  }
  #search:focus{
    transform: scale(1.65, 1.6) translateX(-.6rem) translateY(.2rem);
    z-index: 100000;
  }
  .place-show{
    width: 100%;
    height: auto;
  }
  .place{
    display: inline-block;
    width: 100%;
    height: .5rem;
    background-color: white;
    border-bottom: 1px solid slategray;
    font-size: .25rem;
  }
</style>
