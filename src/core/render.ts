import { StaticCanvas, Textbox, FabricImage } from 'fabric/node';
import { ImageData } from 'canvas';

import { Clip, VideoOptions } from './type';

// Type alias to avoid strict type issues with extended properties in this setup
type FabricObjectAny = any; 

export class FrameRenderer {
  private canvas: StaticCanvas;
  private imageCache: Map<string, FabricObjectAny> = new Map();
  private clips: Clip[] = [];

  constructor(private options: VideoOptions) {
    this.canvas = new StaticCanvas(null, {
      width: options.width,
      height: options.height,
      backgroundColor: options.bgColor,
    });
  }

  public async prepare(clips: Clip[]) {
    this.clips = [...clips].sort((a, b) => a.zIndex - b.zIndex);
    this.imageCache.clear();

    // Preload images
    const imageClips = this.clips.filter(c => c.type === 'Image' && c.src);
    for (const clip of imageClips) {
      if (clip.src && !this.imageCache.has(clip.src)) {
        try {
          const img = await FabricImage.fromURL(clip.src);
          // Store the base fabric image
          this.imageCache.set(clip.src, img);
        } catch (err) {
          console.error(`Failed to load image: ${clip.src}`, err);
        }
      }
    }
  }

  public processFrame(rgbaData: Uint8Array, frameIndex: number, fps: number): Uint8Array {
    const ctx = this.canvas.getContext() as unknown as CanvasRenderingContext2D;
    const currentTimeMs = (frameIndex / fps) * 1000;

    // 1. Draw Background (Video Frame)
    const frameImageData = new ImageData(
      new Uint8ClampedArray(rgbaData.buffer),
      this.options.width,
      this.options.height
    ) as unknown as globalThis.ImageData;
    ctx.putImageData(frameImageData, 0, 0);

    // 2. Clear previous Fabric objects (keep background video which is on context)
    // Note: canvas.clear() might wipe the context logic we just did with putImageData depending on implementation via specific canvas-node backends,
    // but usually remove(...) is safer to clear the object stack.
    this.canvas.getObjects().forEach(obj => this.canvas.remove(obj));

    // 3. Build Scene for Current Frame
    for (const clip of this.clips) {
      let shouldRender = true;
      if (clip.display) {
        const { from, to } = clip.display;
        if (currentTimeMs < from || currentTimeMs >= to) {
          shouldRender = false;
        }
      }

      if (shouldRender) {
        this.renderClip(clip, frameIndex);
      }
    }

    // 4. Render
    this.canvas.renderAll();

    const resultImageData = ctx.getImageData(0, 0, this.options.width, this.options.height);
    return new Uint8Array(resultImageData.data.buffer);
  }

  private renderClip(clip: Clip, frameIndex: number) {
    if (clip.type === 'Text' && clip.text) {
      const content = `${clip.text} [Frame: ${frameIndex}]`;
      
      const textbox = new Textbox(content, {
        left: clip.left,
        top: clip.top,
        width: clip.width,
        height: clip.height,
        angle: clip.angle,
        opacity: clip.opacity,
        fontSize: 60,
        fill: 'white',
        splitByGrapheme: true,
      });
      this.canvas.add(textbox);

    } else if (clip.type === 'Image' && clip.src) {
      const cachedImg = this.imageCache.get(clip.src);
      if (cachedImg) {
        const scaleX = clip.width / (cachedImg.width || 1);
        const scaleY = clip.height / (cachedImg.height || 1);
        
        cachedImg.set({
          left: clip.left,
          top: clip.top,
          scaleX: scaleX,
          scaleY: scaleY,
          angle: clip.angle,
          opacity: clip.opacity,
        });
        
        this.canvas.add(cachedImg);
      }
    }
  }
}