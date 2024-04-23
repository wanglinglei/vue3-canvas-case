export interface GenerateOptions {
  containerId: string;
  canvasId: string;
  imageData: HTMLImageElement | ImageData;
}

export interface DrawOptions {
  canvasId: string;
  width?: number;
  height?: number;
}
export interface DrawImageMaskOptions {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  opacity?: number;
}