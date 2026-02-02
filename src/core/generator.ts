import {
  Muxer,
  TestVideoGenerator,
  VideoEncoder,
  VideoFrame,
} from '@pproenca/node-webcodecs';

import { VideoConfig, DEFAULT_VIDEO_OPTIONS } from './type';
import { FrameRenderer } from './render';

export class VideoGenerator {
  private config: VideoConfig;
  private frameRenderer: FrameRenderer;

  constructor(config: VideoConfig) {
    // Merge with default options
    this.config = {
      ...config,
      options: { ...DEFAULT_VIDEO_OPTIONS, ...config.options }
    };
    this.frameRenderer = new FrameRenderer(this.config.options);
  }

  public async generate(outputPath: string) {
    console.log('Initializing VideoGenerator...');
    
    // Preload assets
    await this.frameRenderer.prepare(this.config.clips);

    const { width, height, fps, duration = 5000 } = this.config.options;
    const durationSec = duration / 1000;
    
    console.log(`Generating base frames for ${durationSec}s at ${fps}fps...`);
    const generator = new TestVideoGenerator();
    generator.configure({ width, height, frameRate: fps, duration: durationSec, pattern: 'testsrc' });
    
    const frames: any[] = [];
    await generator.generate(frame => frames.push(frame));
    generator.close();
    console.log(`Generated ${frames.length} base frames.`);

    const muxer = new Muxer({ filename: outputPath });
    const encodedChunks: any[] = [];
    let codecDescription: any = null;

    const encoder = new VideoEncoder({
      output: (chunk, metadata) => {
        encodedChunks.push(chunk);
        if (metadata?.decoderConfig?.description) {
          codecDescription = metadata.decoderConfig.description;
        }
      },
      error: e => console.error('Encoder error:', e),
    });

    encoder.configure({
      codec: 'avc1.42001e',
      width,
      height,
      bitrate: 2_000_000,
      framerate: fps,
      latencyMode: 'realtime',
      avc: { format: 'avc' },
    });

    console.log('Processing and encoding frames...');
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        
        const size = frame.allocationSize({ format: 'RGBA' });
        const rgbaData = new Uint8Array(size);
        frame.copyTo(rgbaData.buffer, { format: 'RGBA' });

        // Pass fps to calculate time
        const processedData = this.frameRenderer.processFrame(rgbaData, i, fps);

        const newFrame = new VideoFrame(Buffer.from(processedData.buffer), {
            format: 'RGBA',
            codedWidth: width,
            codedHeight: height,
            timestamp: frame.timestamp,
            duration: frame.duration ?? undefined
        });

        await encoder.ready;
        encoder.encode(newFrame, { keyFrame: i % 30 === 0 });
        
        newFrame.close();
        frame.close();

        if ((i + 1) % 30 === 0) process.stdout.write(`  Processed ${i + 1}/${frames.length}\r`);
    }

    await encoder.flush();
    encoder.close();

    console.log('\nMuxing to MP4...');
    muxer.addVideoTrack({
        codec: 'avc1.42001e',
        width,
        height,
        description: codecDescription,
    });

    encodedChunks.sort((a, b) => a.timestamp - b.timestamp)
                 .forEach(chunk => muxer.writeVideoChunk(chunk));
    
    muxer.finalize();
    muxer.close();
    
    return outputPath;
  }
}
