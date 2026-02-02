/**
 * WebCodec Video Generator
 * 
 * Server-side video generation using node-webcodecs and fabric.js
 * 
 * @example
 * ```typescript
 * import { VideoGenerator, VideoConfig } from 'webcodec-video-generator';
 * 
 * const config: VideoConfig = {
 *   clips: [
 *     {
 *       type: 'Text',
 *       text: 'Hello World',
 *       left: 100,
 *       top: 100,
 *       width: 400,
 *       height: 200,
 *       angle: 0,
 *       zIndex: 1,
 *       opacity: 1,
 *       flip: null,
 *       id: 'text_1'
 *     }
 *   ],
 *   options: {
 *     width: 1920,
 *     height: 1080,
 *     fps: 30,
 *     duration: 5000,
 *     bgColor: '#000000'
 *   }
 * };
 * 
 * const generator = new VideoGenerator(config);
 * await generator.generate('output.mp4');
 * ```
 */

// Export core classes
export { VideoGenerator } from './core/generator';
export { FrameRenderer } from './core/render';

// Export types
export type {
  VideoConfig,
  VideoOptions,
  Clip,
  DisplayConfig
} from './core/type';

// Export defaults
export { DEFAULT_VIDEO_OPTIONS } from './core/type';
