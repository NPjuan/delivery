<template>
     <div class="amap-page-container">
       <el-amap vid="amap" :plugin="plugin" :center="center" :zoom="zoom">
         <el-amap-marker
           v-for="(marker, index, key) in markers"
           :position="marker.position"
           :vid="index"
           :key="key"
           />
           <!-- :key="index" -->
       </el-amap>
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
          markers: [],
          plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                let geolocation = new AMap.Geolocation({
                  // 是否使用高精度定位，默认：true
                  enableHighAccuracy: true,
                  // 设置定位超时时间，默认：无穷大
                  timeout: 10000,
                  // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                  buttonOffset: new AMap.Pixel(10, 20),
                  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                  zoomToAccuracy: true,
                  //  定位按钮的排放位置,  RB表示右下
                  buttonPosition: 'RB'
                })
                geolocation.getCurrentPosition((status, result) => {
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
          }]
        }
      },
      methods:{

      },
      mounted() {
        let marker = {
          position: this.center
        }
        this.markers.push(marker);
      }
    }
</script>

<style scoped>
  .amap-page-container{
    position: absolute;
    padding-top: 1.6rem;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
  }

</style>
