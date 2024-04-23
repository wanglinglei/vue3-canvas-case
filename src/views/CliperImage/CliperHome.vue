<template>
  <div>

    <input type="file" name="" id="" accept="image/*" @change="inputFile">
    <div class="container" :style="containerStyle">
      <canvas id="canvas"></canvas>
    </div>

    <div class="screen-container">
      <canvas id="shotImage" width="200" height="200"></canvas>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import Clipper from "./clipper";

const image = new Image()
const containerStyle = ref({})
let clipper = null;


const inputFile = (e) => {
  console.log("inputFile", e);
  const file = e.target.files[0];
  bindEvents();
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    console.log("reader.result", reader.result);
    const data = reader.result;
    image.src = data;
    image.onload = function () {
      console.log("image.width", image.width);
      console.log("image.height", image.height);

      const { width, height } = this;
      containerStyle.value = {
        width: `${width}px`,
        height: `${height}px`,
      };
      clipper = new Clipper({ canvasId: 'canvas', width, height, imageData: image });
    }
  }
}

function bindEvents() {
  const canvas = document.getElementById("canvas");
  if (!canvas) return;
  canvas.addEventListener("mousedown", mouseDown, false);
}

function mouseDown(e) {
  const canvas = document.getElementById("canvas");
  if (!canvas) return;
  clipper.canvasMouseDown(e);
  canvas.addEventListener("mousemove", mousemove, false);
  canvas.addEventListener("mouseup", mouseUp, false);
}
function mousemove(e) {
  clipper.canvasMouseMove(e);
}


function mouseUp() {
  const canvas = document.getElementById("canvas");
  if (!canvas) return;
  canvas.removeEventListener("mousemove", mousemove, false);
  canvas.removeEventListener("mouseup", mouseUp, false)
  clipper.drawScreenShotImage({ canvasId: 'shotImage' })

}



</script>

<style scoped>
.container {
  display: block;
}
</style>