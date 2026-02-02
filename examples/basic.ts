import fs from 'fs';
import path from 'path';

import { VideoConfig } from '../src/core/type';
import { VideoGenerator } from '../src/core/generator';

/**
 * Basic example demonstrating simple video generation
 * with text and image clips
 */

const videoConfig: VideoConfig = {
  clips: [
    {
      type: "Image",
      src: "https://picsum.dev/800/600",
      left: 6.153846153845734,
      top: 1007.2193289507385,
      width: 1080,
      height: 1917.8690344062154,
      angle: 0,
      zIndex: 20,
      opacity: 1,
      flip: null,
      display: {
        from: 0,
        to: 2500
      },
      id: "clip_1766768906579_qrrx7hoc3"
    },
    {
      type: "Text",
      left: 304.61538461538476,
      top: 818.4615384615385,
      width: 440,
      height: 395,
      angle: 0,
      zIndex: 30,
      opacity: 1,
      flip: null,
      text: "This is a text",
      display: {
        from: 1500,
        to: 7000
      },
      id: "clip_1766768920828_lx74h84cx"
    }
  ],
  options: {
    width: 1080,
    height: 1920,
    fps: 30,
    duration: 7000,
    bgColor: "#000000"
  }
};

async function main() {
  const OUTPUT_DIR = path.join(__dirname, '..', 'output');
  const OUTPUT_MP4 = path.join(OUTPUT_DIR, `basic_example_${Date.now()}.mp4`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Starting basic video generation example...\n');
  
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
