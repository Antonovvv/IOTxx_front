<template>
  <div>
    <canvas
      :id="randomId"
      :width="width"
      :height="height"
      :style="{ width: `${width}px`, height: `${height}px` }"
      @touchstart.stop="canvasDown($event)"
      @touchend.stop="canvasUp($event)"
      @touchmove.stop="canvasMove($event)"
    >
    <!-- 
      @mousedown="canvasDown($event)"
      @mouseup="canvasUp($event)"
      @mousemove="canvasMove($event)" -->
    </canvas>
  </div>
</template>

<script>
import { uuid } from "../utils/lib";

export default {
  name: "drawCanvas",
  props: {
    isDrawable: {
      type: Boolean,
      default: true,
    },
    info: {
      // 位置点信息
      type: Array,
    },
    width: {
      // 绘图区域宽度
      type: Number,
    },
    height: {
      // 绘图区域高度
      type: Number,
    },
    brushColor: {
      // 画笔颜色
      type: String,
      default: "black",
    },
    brushWidth: {
      // 画笔宽度
      type: Number,
      default: 2,
    },
    mode: {
      // 绘制类型（画笔、形状）
      type: String,
      default: 'brush',
    },
    shape: {
      // 绘制形状
      type: String,
      default: "circle",
    },
  },
  data() {
    return {
      // 同一页面多次渲染时，用于区分元素的id
      randomId: uuid(),
      context: null,
      isDrawing: false,
      // 画笔轨迹数组
      brushPoints: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化绘制信息
    init() {
      // 初始化画布
      const canvas = document.getElementById(this.randomId);
      this.context = canvas.getContext("2d");
      // 初始化画笔
      this.context.lineWidth = this.brushWidth;
      this.context.strokeStyle = this.brushColor;
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';

      // this.context.fillStyle = "rgba(255,255,255,0)"
      // this.context.fillRect(0, 0, this.width, this.height);
    },
    canvasDown(e) {
      if (this.isDrawable) {
        this.isDrawing = true;
        const target = e.target.getBoundingClientRect();
        const canvasX = e.touches[0].clientX - target.x;
        const canvasY = e.touches[0].clientY - target.y;

        const point = {
          x: canvasX,
          y: canvasY,
          timestamp: new Date().getTime(),
        };
        console.log(e);
        this.brushPoints.push(point);
      }
    },
    canvasMove(e) {
      if (this.isDrawable && this.isDrawing) {
        const target = e.target.getBoundingClientRect();
        const canvasX = e.touches[0].clientX - target.x;
        const canvasY = e.touches[0].clientY - target.y;

        const point = {
          x: canvasX,
          y: canvasY,
          timestamp: new Date().getTime(),
        };
        this.drawBrush(point, this.brushPoints[this.brushPoints.length - 1]);
        this.brushPoints.push(point);
      }
    },
    canvasUp(e) {
      if (this.isDrawable) {
        this.isDrawing = false;
        this.$emit('drawed', this.brushPoints);
        this.brushPoints = [];
      }
    },
    // 绘制画笔轨迹
    drawBrush(currPoint, prevPoint) {
      this.context.beginPath();
      this.context.lineTo(prevPoint.x, prevPoint.y);
      this.context.lineTo(currPoint.x, currPoint.y);
      this.context.stroke();
    },
    reset() {
      const canvas = document.getElementById(this.randomId);
      canvas.width = canvas.height;
    },
    // 绘制椭圆
    // drawEllipse(context, x, y, a, b) {
    //   context.save();
    //   var r = a > b ? a : b;
    //   var ratioX = a / r;
    //   var ratioY = b / r;
    //   context.scale(ratioX, ratioY);
    //   context.beginPath();
    //   context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false);
    //   context.closePath();
    //   context.restore();
    // },
  },
};
</script>

<style>
</style>