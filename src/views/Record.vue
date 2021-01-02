<template>
  <div class="container">
    轨迹绘制
    <draw-canvas
      @drawed="onCanvasDrawed"
      :width="canvasWidth" :height="canvasHeight"
      ref="drawCanvas"
    />
  </div>
</template>

<script>
import Canvas from "../components/Canvas.vue";

export default {
  data() {
    return {
      canvasWidth: 300,
      canvasHeight: 150,
      pointsList: [],
    }
  },
  components: {
    'draw-canvas': Canvas,
  },
  mounted() {
    this.canvasWidth = document.body.clientWidth;
    this.canvasHeight = this.canvasWidth;
    this.$nextTick(() => {
      this.$refs.drawCanvas.init();
    });
  },
  methods: {
    onCanvasDrawed(brushPoints) {
      console.log(brushPoints);
      this.pointsList.push(brushPoints);
    }
  },
}
</script>

<style>

</style>