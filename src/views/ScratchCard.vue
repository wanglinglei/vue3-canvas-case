<template>
  <view class="container">
    <div id="ggk">
      <div class="jp" id="jp"></div>
      <canvas id="canvas" class="ggk-canvas" width="400" height="100"></canvas>
    </div>
  </view>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import { useCanvas } from '@/common/hooks/useCanvas';

function initRender({ ctx, canvas }: { ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement }) {

  ctx.fillStyle = "darkgray";
  ctx.fillRect(0, 0, 400, 100);
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("刮刮卡", 180, 40)

  const ggkDom = document.querySelector("#ggk") as HTMLElement;
  const jp = document.querySelector("#jp") as HTMLElement;
  const rewardList = [{ content: '一等奖', p: 1 }, { content: '二等奖', p: 5 }, { content: '三等奖', p: 14 }, { content: '谢谢惠顾', p: 100 }]

  function randomReward() {
    const randomNumber = Math.floor(Math.random() * 100);

    const item = rewardList.find(item => randomNumber < item.p);
    if (!item) return
    console.log(item, randomNumber);
    const rewardText = item.content || '谢谢惠顾';
    jp.textContent = rewardText;
  }
  randomReward()

  let isDrawing = false;
  canvas.onmousedown = function () {
    isDrawing = true
  }

  // 移动时绘制圆形 将源图像内的内容清除
  canvas.onmousemove = function (e) {
    if (isDrawing) {
      const x = e.pageX - ggkDom.offsetLeft;
      const y = e.pageY - ggkDom.offsetTop;
      ctx.globalCompositeOperation = "destination-out";
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  canvas.onmouseup = function () {
    console.log('onmouseup');
    isDrawing = false
  }
}

useCanvas(initRender)

</script>

<style scoped>
#ggk {
  position: relative;
  width: 400px;
  height: 100px;

}

.jp {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 50px;
  color: brown
}

.ggk-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 100px;
}
</style>