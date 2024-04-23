

export interface Options {
  canvasId: string;
  width?: number;
  height?: number;
}

class DrawBase {
  ctx: null | CanvasRenderingContext2D = null;
  canvas: null | HTMLCanvasElement = null;
  private width: number = 0;
  private height: number = 0;
  constructor(options: Options) {
    const { canvasId } = options;
    this.getContext(canvasId);
    this.setCanvas(options);
  }
  /**
   * @description: 获取context上下文
   * @param {string} canvasId
   * @return {*}
   */
  getContext(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }


  /**
   * @description: 改变画布大小
   * @param {Options} options
   * @return {*}
   */
  setCanvas(options: Options) {
    const { width, height } = options;

    if (!this.canvas) return;
    this.canvas.width = width || this.canvas.width;
    this.canvas.height = height || this.canvas.height;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }


}

export default DrawBase