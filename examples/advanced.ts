import fs from 'fs';
import path from 'path';

import { VideoConfig } from '../src/core/type';
import { VideoGenerator } from '../src/core/generator';

/**
 * Advanced example demonstrating complex video generation
 * with multiple clips, animations, and custom configurations
 */

const videoConfig: VideoConfig = {
  clips: [
    // Background image - visible throughout
    {
      type: "Image",
      src: "https://picsum.dev/800/600",
      left: 0,
      top: 0,
      width: 1920,
      height: 1080,
      angle: 0,
      zIndex: 1,
      opacity: 0.5,
      flip: null,
      display: {
        from: 0,
        to: 10000
      },
      id: "background_clip"
    },
    // Title text - appears at start
    {
      type: "Text",
      left: 100,
      top: 100,
      width: 800,
      height: 200,
      angle: 0,
      zIndex: 10,
      opacity: 1,
      flip: null,
      text: "Advanced Video Example",
      display: {
        from: 0,
        to: 3000
      },
      id: "title_text"
    },
    // Subtitle - appears after title
    {
      type: "Text",
      left: 100,
      top: 400,
      width: 1000,
      height: 150,
      angle: 0,
      zIndex: 11,
      opacity: 0.9,
      flip: null,
      text: "Multiple clips with timing",
      display: {
        from: 2000,
        to: 6000
      },
      id: "subtitle_text"
    },
    // Overlay image - appears in middle
    {
      type: "Image",
      src: "https://picsum.dev/800/600",
      left: 1200,
      top: 200,
      width: 600,
      height: 600,
      angle: 15,
      zIndex: 20,
      opacity: 0.8,
      flip: null,
      display: {
        from: 4000,
        to: 8000
      },
      id: "overlay_image"
    },
    // Final text - appears at end
    {
      type: "Text",
      left: 200,
      top: 800,
      width: 1500,
      height: 200,
      angle: -5,
      zIndex: 30,
      opacity: 1,
      flip: null,
      text: "Created with node-webcodecs",
      display: {
        from: 7000,
        to: 10000
      },
      id: "final_text"
    }
  ],
  options: {
    width: 1920,
    height: 1080,
    fps: 30,
    duration: 10000,
    bgColor: "#1a1a2e"
  }
};

async function main() {
  const OUTPUT_DIR = path.join(__dirname, '..', 'output');
  const OUTPUT_MP4 = path.join(OUTPUT_DIR, `advanced_example_${Date.now()}.mp4`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Starting advanced video generation example...\n');
  console.log('Configuration:');
  console.log(`  - Resolution: ${videoConfig.options.width}x${videoConfig.options.height}`);
  console.log(`  - FPS: ${videoConfig.options.fps}`);
  console.log(`  - Duration: ${videoConfig.options.duration}ms`);
  console.log(`  - Clips: ${videoConfig.clips.length}\n`);
  
  const generator = new VideoGenerator(videoConfig);
  
  try {
    const resultPath = await generator.generate(OUTPUT_MP4);
    console.log(`\n✅ Success! Video generated at: ${resultPath}`);
  } catch (err) {
    console.error('❌ Video generation failed:', err);
    process.exit(1);
  }
}

main().catch(console.error);
