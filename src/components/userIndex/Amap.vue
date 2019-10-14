<template>
     <div class="amap-page-container">
       <el-amap vid="amap" :plugin="plugin" :center="center" :zoom="zoom"></el-amap>
       <el-amap-marker
         v-for="(marker, index) in markers"
         :position="marker.position"
         :draggable="marker.draggable"
         :vid="index"
         :key="index">
       </el-amap-marker>
     </div>
</template>

<script>
    export default {
        name: "Amap",
      data() {
        let self = this;
        return {
          center: [113.394625, 23.038476],
          lng: 0,
          lat: 0,
          loaded: false,
          zoom: 13,
          plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    self.lng = result.position.lng;
                    self.lat = result.position.lat;
                    self.center = [self.lng, self.lat];
                    self.loaded = true;
                    self.$nextTick();
                  }
                });
              }
            }
          }],
          markers: [

          ]
        }
      },
      methods: {
          addMarker() {
            let marker = {
              position: this.center,
              draggable: false,
              template: '<span>1</span>' // 这个模板是必须滴
            };
            this.markers.push(marker);
          }
      }
    }
</script>

<style scoped>
  .amap-page-container{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
  }

</style>
