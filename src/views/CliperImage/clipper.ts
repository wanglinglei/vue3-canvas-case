import DrawBase, { Options } from "@/src/common/drawBase";

interface DrawOptions extends Options {
  imageData: HTMLImageElement;
  opacity?: number;
}

class CliperImage extends DrawBase {
  private imageData: HTMLImageElement;
  private opacity = 0.5;
  private initPos = [];
  private screenShotData = [];
  constructor(options: DrawOptions) {
    super(options);
    // // 初始化
    // this.init();
    const { imageData, opacity = 0.5 } = options;
    this.imageData = imageData;
    this.opacity = opacity;
    this.drawImage();
    this.drawImageMask();

  }
  drawImage() {
    this.ctx.drawImage(this.imageData, 0, 0, this.width, this.height);
  }

  drawImageMask() {
    const { width, height, opacity } = this;
    this.ctx.fillStyle = `rgba(0,0,0,${opacity})`;
    this.ctx.fillRect(0, 0, width, height);
  }

  drawScreen(rectWidth, rectHeight) {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0,0,0,1)';
    this.ctx.fillRect(...this.initPos, rectWidth, rectHeight);
    this.ctx.globalCompositeOperation = 'destination-over';
    // this.drawImage();
    this.ctx.drawImage(this.imageData, 0, 0, this.width, this.height, 0, 0, this.width, this.height)
  }

  drawScreenShotImage(options) {
    const { canvasId } = options;
    const canvas = document.getElementById(canvasId);
    console.log('drawScreenShotImage', canvasId, canvas)
    const ctx = canvas.getContext('2d');
    const data = this.ctx.getImageData(...this.screenShotData);
    ctx.clearRect(...this.screenShotData);
    ctx.putImageData(data, 0, 0);
  }


  canvasMouseDown(e) {
    const { offsetX, offsetY } = e;
    this.initPos = [offsetX, offsetY];
  }

  canvasMouseMove(e: MouseEvent) {
    const { offsetX: endX, offsetY: endY } = e;

    const [startX, startY] = this.initPos;
    const rectWidth = endX - startX;
    const rectHeight = endY - startY;
    console.log(rectWidth, rectHeight);
    this.screenShotData = [startX, startY, rectWidth, rectHeight];
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawImageMask();
    this.drawScreen(rectWidth, rectHeight)
  }
}

export default CliperImage;