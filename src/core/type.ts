/**
 * Display configuration for clip visibility timeline
 */
export interface DisplayConfig {
  /** Start time in milliseconds */
  from: number;
  /** End time in milliseconds */
  to: number;
}

/**
 * Video clip configuration
 */
export interface Clip {
  /** Unique identifier for the clip */
  id: string;
  /** Type of clip content */
  type: 'Text' | 'Image';
  /** Horizontal position in pixels */
  left: number;
  /** Vertical position in pixels */
  top: number;
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
  /** Rotation angle in degrees */
  angle: number;
  /** Layer order (higher values appear on top) */
  zIndex: number;
  /** Opacity value (0-1) */
  opacity: number;
  /** Flip configuration */
  flip: any;
  /** Text content (required for Text clips) */
  text?: string;
  /** Image URL (required for Image clips) */
  src?: string;
  /** Display timeline configuration */
  display?: DisplayConfig;
}

/**
 * Video generation options with default values
 */
export interface VideoOptions {
  /** Video width in pixels (default: 1920) */
  width: number;
  /** Video height in pixels (default: 1080) */
  height: number;
  /** Frames per second (default: 30) */
  fps: number;
  /** Background color in hex format (default: "#000000") */
  bgColor: string;
  /** Video duration in milliseconds (default: 5000) */
  duration?: number;
}

/**
 * Complete video configuration
 */
export interface VideoConfig {
  /** Array of video clips to render */
  clips: Clip[];
  /** Video generation options */
  options: VideoOptions;
}

/**
 * Default video options
 */
export const DEFAULT_VIDEO_OPTIONS: VideoOptions = {
  width: 1920,
  height: 1080,
  fps: 30,
  bgColor: '#000000',
  duration: 5000,
};