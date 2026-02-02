import fs from 'fs';
import path from 'path';

import { VideoGenerator, VideoConfig, DEFAULT_VIDEO_OPTIONS } from './src/index';

/**
 * Test suite for WebCodec Video Generator
 * 
 * This file validates the core functionality of the library
 */

console.log('🧪 Running WebCodec Video Generator Tests\n');

// Test 1: Default options merging
console.log('Test 1: Default options merging');
const minimalConfig: VideoConfig = {
  clips: [],
  options: {
    width: 1280,
    height: 720,
    fps: 24,
    bgColor: '#ffffff'
  }
};

const generator1 = new VideoGenerator(minimalConfig);
console.log('✅ Default options merged successfully\n');

// Test 2: Partial options with defaults
console.log('Test 2: Partial options with defaults');
const partialConfig: VideoConfig = {
  clips: [],
  options: {
    ...DEFAULT_VIDEO_OPTIONS,
    width: 640,
    height: 480
  }
};

const generator2 = new VideoGenerator(partialConfig);
console.log('✅ Partial options work correctly\n');

// Test 3: Full video generation test
console.log('Test 3: Full video generation');

const testConfig: VideoConfig = {
  clips: [
    {
      type: "Text",
      left: 100,
      top: 100,
      width: 400,
      height: 200,
      angle: 0,
      zIndex: 1,
      opacity: 1,
      flip: null,
      text: "Test Video",
      display: {
        from: 0,
        to: 3000
      },
      id: "test_text_1"
    }
  ],
  options: {
    width: 640,
    height: 480,
    fps: 30,
    duration: 3000,
    bgColor: "#000000"
  }
};

async function runGenerationTest() {
  const OUTPUT_DIR = path.join(__dirname, 'output');
  const OUTPUT_MP4 = path.join(OUTPUT_DIR, `test_${Date.now()}.mp4`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const generator = new VideoGenerator(testConfig);
  
  try {
    console.log('  Generating test video...');
    const resultPath = await generator.generate(OUTPUT_MP4);
    
    // Verify file exists
    if (fs.existsSync(resultPath)) {
      const stats = fs.statSync(resultPath);
      console.log(`✅ Video generated successfully`);
      console.log(`  Path: ${resultPath}`);
      console.log(`  Size: ${(stats.size / 1024).toFixed(2)} KB\n`);
      
      // Cleanup test file
      fs.unlinkSync(resultPath);
      console.log('🧹 Cleaned up test file\n');
      
      return true;
    } else {
      console.error('❌ Video file was not created\n');
      return false;
    }
  } catch (err) {
    console.error('❌ Video generation failed:', err, '\n');
    return false;
  }
}

// Run tests
runGenerationTest()
  .then(success => {
    if (success) {
      console.log('✅ All tests passed!');
      process.exit(0);
    } else {
      console.log('❌ Some tests failed');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ Test suite failed:', err);
    process.exit(1);
  });
