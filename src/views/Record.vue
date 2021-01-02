<template>
  <div class="record-page">
    <div class="title">
      轨迹绘制
    </div>
    
    <div class="container">
      <div id="coveredMap" class="covered-map"/>
      <draw-canvas
        class="draw-canvas"
        @drawed="onCanvasDrawed"
        :isDrawable="isDrawable" :width="canvasWidth" :height="canvasHeight"
        ref="drawCanvas"
      />
    </div>

    <div class="footer">
      <a-button type="primary" @click="onDrawableToggle" >
        {{ drawableText }}
      </a-button>
    </div>
  </div>
</template>

<script>
import Canvas from "../components/Canvas.vue";

export default {
  name: 'Record',
  components: {
    'draw-canvas': Canvas,
  },
  data() {
    return {
      canvasWidth: 300,
      canvasHeight: 150,
      pointsList: [],
      points: [],
      isDrawable: true,
      isDrawing: false,
      map: null,
      mapControls: {},
      lineLayer: null,
    }
  },
  computed: {
    drawableText() {
      return this.isDrawable ? '绘制模式' : '控制模式';
    }
  },
  mounted() {
    this.initMap();
    this.initCanvas();
  },
  methods: {
    initMap() {
      if (window.TMap) {
        const TMap = window.TMap;
        const center = new TMap.LatLng(30.51283206177366, 114.43127457409332);
        const map = new TMap.Map(document.getElementById('coveredMap'), {
          center: center,
          zoom: 18,
          minZoom: 18,
          maxZoom: 20,
          showControl: true,
        });
        this.map = map;
        this.mapControls = {
          scale: this.map.getControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE),
          zoom: this.map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM),
          rotation: this.map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION),
        }

        this.lineLayer = new TMap.MultiPolyline({
          id: 'line-layer',
          map: this.map,
          styles: {
            'style_blue': new TMap.PolylineStyle({
              'color': '#3777FF', //线填充色
              'width': 6, //折线宽度
              'borderWidth': 2, //边线宽度
              'borderColor': '#FFF', //边线颜色
              'lineCap': 'round' //线端头方式
            }),
            'style_red': new TMap.PolylineStyle({
              'color': '#CC0000', //线填充色
              'width': 6, //折线宽度
              'borderWidth': 2, //边线宽度
              'borderColor': '#CCC', //边线颜色
              'lineCap': 'round' //线端头方式
            })
          },
          geometries: [],
        });

        this.freezeMap();
        this.map.on('touchstart', this.onMapDown);
        this.map.on('touchmove', this.onMapMove);
        this.map.on('touchend', this.onMapUp);
      }
    },
    initCanvas() {
      this.canvasWidth = document.body.clientWidth;
      this.canvasHeight = this.canvasWidth;
      this.$nextTick(() => {
        this.$refs.drawCanvas.init();
      });
    },
    onMapDown(e) {
      if (this.isDrawable) {
        // this.isDrawing = true;
        this.points.push({ ...e.latLng, time: new Date().getTime() });
        this.$refs.drawCanvas.canvasDown(e.originalEvent);
      }
    },
    onMapMove(e) {
      if (this.isDrawable) {
        // const TMap = window.TMap;
        // const prevPoint = this.points[this.points.length - 1];
        // this.lineLayer.add([
        //   {
        //     styleId: 'style_blue',
        //     paths: [ new TMap.LatLng(prevPoint.lat, prevPoint.lng), new TMap.LatLng(e.latLng.lat, e.latLng.lng) ],
        //   }
        // ]);
        this.points.push({ ...e.latLng, time: new Date().getTime() });
        this.$refs.drawCanvas.canvasMove(e.originalEvent);
      }
    },
    onMapUp(e) {
      if (this.isDrawable) {
        this.$refs.drawCanvas.canvasUp(e.originalEvent);
      }
    },
    onCanvasDrawed(brushPoints) {
      // this.pointsList.push(brushPoints);
      if (this.points.length < 2) {
        this.points = [];
        this.clearCanvas();
        return;
      }
      this.pointsList.push(this.points);
      const TMap = window.TMap;
      const prevPoint = this.points[this.points.length - 1];
      this.lineLayer.add([
        {
          styleId: 'style_blue',
          paths: this.points.map(point => {
            return new TMap.LatLng(point.lat, point.lng);
          }),
        }
      ]);
      this.points = [];
      this.clearCanvas();
    },
    onDrawableToggle() {
      this.isDrawable = !this.isDrawable;
      if (this.isDrawable) this.freezeMap();
      else this.enableMap();
    },
    freezeMap() {
      const TMap = window.TMap;
      this.map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE);
      this.map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
      this.map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION);

      this.map.setDraggable(false);
      this.map.setScrollable(false);
      this.map.setDoubleClickZoom(false);
    },
    enableMap() {
      const TMap = window.TMap;
      var { scale, zoom, rotation } = this.mapControls;
      this.map.addControl(scale);
      this.map.addControl(zoom);
      this.map.addControl(rotation);

      this.map.setDraggable(true);
      this.map.setScrollable(true);
      this.map.setDoubleClickZoom(true);
    },
    clearCanvas() {
      this.$refs.drawCanvas.reset();
    },

  },
}
</script>

<style lang="less">
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
}

.container {
  position: relative;
  height: 100vw;
  .draw-canvas {
    position: absolute;
    left: 0;
    top: 0;
  }
  .covered-map {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vw;
  }
}

.footer {
  margin-top: 20px;
}
</style>