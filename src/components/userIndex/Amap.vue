<template>
     <div id="amap-page-container" class="amap-page-container" :plugin="plugin">
       <el-amap vid="amap" :plugin="plugin" :center="center" :zoom="zoom" :resizeEnable="resizeEnable">
         <el-amap-marker
           v-for="(marker, index) in $store.state.point"
           :position="marker.position"
           :vid="index"
           :key="index"/>
       </el-amap>
     </div>
</template>

<script>
    export default {
      name: "Amap",
      props: {
        role: {
          type: Number
        }
      },
      data() {
        let self = this;
        return {
          map: null,
          center: [113.394625, 23.038476],
          lng: 0,
          lat: 0,
          loaded: false,
          zoom: 13,
          resizeEnable: true,
          markers: [],
          path:[],
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
          let marker = {
            position: [
              result.poiList.pois[0].location.lng,
              result.poiList.pois[0].location.lat
            ]
          }
          if(this.role){
            this.$store.state.point.splice(1, 1, marker)
          }else{
            this.$store.state.point.splice(0, 1, marker)
          }
          console.log( this.$store.state.point)
          if(this.$store.state.point.length == 2){
            this.route()
          }
        },
        route(){
         let self = this
          AMap.plugin('AMap.Driving', function() {
            var driving = new AMap.Driving({
              // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
              policy: AMap.DrivingPolicy.LEAST_TIME,
              autoFitView: true
            })
            var startLngLat = self.$store.state.point[0].position
            var endLngLat = self.$store.state.point[1].position

            driving.search(startLngLat, endLngLat, function (status, result) {
              // 未出错时，result即是对应的路线规划方案
              if (status === 'complete') {
                console.log('绘制驾车路线完成')
                console.log(result.routes[0].steps)
                let path = self.parseRouteToPath(result.routes[0])
                let routeLine = new AMap.Polyline({
                  path: path,
                  isOutline: false,     //线条是否带描边，默认false
                  outlineColor: '#ffeeff',//线条描边颜色，此项仅在isOutline为true时有效，默认：#000000
                  borderWeight: 1,    //描边的宽度，默认为1
                  strokeColor: "#3366FF", //线条颜色，使用16进制颜色代码赋值。默认值为#006600
                  strokeOpacity: 1,   //线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
                  strokeWeight: 2,    //线条宽度，单位：像素
                  // 折线样式还支持 'dashed'
                  strokeStyle: "dashed",  //线样式，实线:solid，虚线:dashed
                  // strokeStyle是dashed时有效
                  strokeDasharray: [10, 5],//勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效
                  lineJoin: 'round',    //折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
                  lineCap: 'round',   //折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
                  zIndex: 50,       //折线覆盖物的叠加顺序。默认叠加顺序，先添加的线在底层，后添加的线在上层。通过该属性可调整叠加顺序，使级别较高的折线覆盖物在上层显示默认zIndex：50、
                })
                console.log('获取驾车数据成功')
              } else {
                console.log('获取驾车数据失败：' + result)
              }
            })
          })
        },
        parseRouteToPath(route){
          var path = []
          for (var i = 0, l = route.steps.length; i < l; i++) {
            var step = route.steps[i]
            for (var j = 0, n = step.path.length; j < n; j++) {
              path.push(step.path[j])
            }
          }
          return path
        },
        // initMap() {
        //   let self = this
        //   let map = new AMap.Map('amap-page-container', {
        //     resizeEnable: true,
        //     zoom:13,
        //     center: self.center
        //   });
        //   this.map = map
        //   map.plugin('AMap.Geolocation', function() {
        //     var geolocation = new AMap.Geolocation({
        //       // 是否使用高精度定位，默认：true
        //       enableHighAccuracy: true,
        //       // 设置定位超时时间，默认：无穷大
        //       timeout: 10000,
        //       // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        //       buttonOffset: new AMap.Pixel(10, 20),
        //       //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        //       zoomToAccuracy: true,
        //       //  定位按钮的排放位置,  RB表示右下
        //       buttonPosition: 'RB'
        //     })
        //
        //     geolocation.getCurrentPosition()
        //     AMap.event.addListener(geolocation, 'complete', onComplete)
        //     AMap.event.addListener(geolocation, 'error', onError)
        //     function onComplete (data) {
        //       // data是具体的定位信息
        //       console.log(data)
        //       var marker = new AMap.Marker({
        //         icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        //         position: self.center
        //       });
        //       map.add(marker);
        //       console.log("定位标记")
        //     }
        //     function onError (data) {
        //       // 定位出错
        //       console.log(data)
        //     }
        //   })
        // }
      },
      mounted() {
        // this.initMap()
        this.$store.state.point = []
        let marker = {
          position: this.center
        }
        // 传入 store
        this.$store.state.point.push(marker)
        this.markers = this.$store.state.point
      }
    }
</script>

<style scoped>
  #amap-page-container{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
  }

</style>
