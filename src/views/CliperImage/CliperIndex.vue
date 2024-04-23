<template>
  <div>
    <input type="file" name="" id="" accept="image/*" @change="inputFile">
    <div class="container" id="baseContainer">
      <canvas id="canvas"></canvas>
    </div>

    <div class="screen-container" id="screenContainer">
      <canvas id="shotImage"></canvas>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { type GenerateOptions, type DrawOptions, type DrawImageMaskOptions } from './types'
const image: HTMLImageElement = new Image()
const inputFile = (e) => {
  console.log("inputFile", e);
  const file = e.target.files[0];
  bindEvents();
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    console.log("reader.result", reader.result);
    const data = reader.result as string;
    image.src = data;
    image.onload = function () {
      generateCanvas({ containerId: 'baseContainer', canvasId: 'canvas', imageData: image });
      drawImage({ canvasId: 'canvas' })
    }
  }
}

const generateCanvas = (options: GenerateOptions) => {
  const { containerId, canvasId, imageData } = options;
  const { width, height } = imageData;
  const container = document.getElementById(containerId);
  if (!container) return;
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;
  canvas.width = width;
  canvas.height = height;
}

const drawImage = (options: DrawOptions) => {
  let { canvasId, width, height } = options;
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;
  width = width || canvas.width;
  height = height || canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(image, 0, 0, width, height);
  drawImageMask({ ctx, width, height })
}

const drawImageMask = (options: DrawImageMaskOptions) => {
  const { width, height, opacity = 0.5, ctx } = options;
  ctx.fillStyle = `rgba(0,0,0,${opacity})`;
  ctx.fillRect(0, 0, width, height);
}

const bindEvents = () => {
  const canvas = document.getElementById("canvas");
  if (!canvas) return;
  canvas.addEventListener("mousedown", mouseDown, false);
}
let initPos: [number, number] = [0, 0];
let screenShotData: number[] = [];
let baseCtx: CanvasRenderingContext2D | null = null;
let baseCanvas: HTMLCanvasElement | null = null;
const mouseDown = (e) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) return;
  baseCanvas = canvas
  baseCtx = canvas.getContext("2d");

  const { offsetX, offsetY } = e;
  initPos = [offsetX, offsetY];
  canvas.addEventListener("mousemove", mousemove, false);
  canvas.addEventListener("mouseup", mouseUp, false);
}

const drawScreen = (rectWidth: number, rectHeight: number) => {
  if (!baseCtx || !baseCanvas) return
  const { width, height } = baseCanvas;
  baseCtx.globalCompositeOperation = 'destination-out';
  baseCtx.fillStyle = 'rgba(0,0,0,1)';
  baseCtx.fillRect(...initPos, rectWidth, rectHeight);
  baseCtx.globalCompositeOperation = 'destination-over';
  // drawImage();
  baseCtx.drawImage(image, 0, 0, width, height, 0, 0, width, height)
}

const mousemove = (e: MouseEvent) => {
  const { offsetX: endX, offsetY: endY } = e;
  const [startX, startY] = initPos;
  const rectWidth = endX - startX;
  const rectHeight = endY - startY;
  screenShotData = [startX, startY, rectWidth, rectHeight];
  if (!baseCtx || !baseCanvas) return;
  const { width, height } = baseCanvas;
  baseCtx.clearRect(0, 0, width, height);
  drawImageMask({ ctx: baseCtx, width, height });
  drawScreen(rectWidth, rectHeight);
}

const drawScreenShotImage = (options: { canvasId: string }) => {
  const { canvasId } = options;
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas || !baseCtx) return
  const ctx = canvas.getContext('2d');
  if (!ctx) return
  // @ts-ignore
  const data = baseCtx.getImageData(...screenShotData);
  console.log('drawScreenShotImage', data)
  generateCanvas({
    containerId: 'screenContainer',
    canvasId: 'shotImage',
    imageData: data
  })
  // @ts-ignore
  ctx.clearRect(...screenShotData);
  ctx.putImageData(data, 0, 0);
}

const mouseUp = () => {
  console.log('11111')
  const canvas = document.getElementById("canvas");
  if (!canvas) return;
  console.log('222')
  drawScreenShotImage({ canvasId: 'shotImage' })
  canvas.removeEventListener("mousemove", mousemove, false);
  canvas.removeEventListener("mouseup", mouseUp, false);
}



</script>

<style></style>