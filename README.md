# WebCodec Video Generator

> Server-side video generation using **node-webcodecs** and **fabric.js**

Generate videos programmatically on the server with text and image clips. Perfect for creating dynamic video content, social media posts, automated video generation, and more.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

## ✨ Features

- 🎬 **Server-side video generation** - No browser required
- 🎨 **Text & Image clips** - Combine multiple elements
- ⏱️ **Timeline control** - Precise timing for each clip
- 🎯 **Layer management** - Control z-index and opacity
- 🔄 **Transformations** - Rotate, scale, and position clips
- 🎥 **MP4 output** - Industry-standard format
- 🚀 **TypeScript support** - Full type definitions included

## 📋 Table of Contents

- [System Requirements](#-system-requirements)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [Examples](#-examples)
- [Docker Usage](#-docker-usage)
- [Configuration Options](#-configuration-options)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🔧 System Requirements

This project requires specific system dependencies:

- **Node.js**: >= 18.0.0
- **glibc**: 2.39 (for node-webcodecs support)
- **FFmpeg**: 6.x (for video processing)

> **Note**: If you don't have these dependencies, use the provided [Docker setup](#-docker-usage).

## 📦 Installation

### NPM Installation

```bash
npm install webcodec-video-generator
```

### Docker Installation

```bash
# Clone the repository
git clone https://github.com/x-eight/webcodec-video-generator.git
cd webcodec-video-generator

# Build the Docker image
docker build -t webcodec .

# Run examples
docker run --rm -v $(pwd)/output:/app/output webcodec
```

## 🚀 Quick Start

```typescript
import { VideoGenerator, VideoConfig } from 'webcodec-video-generator';

const config: VideoConfig = {
  clips: [
    {
      type: 'Text',
      text: 'Hello World!',
      left: 100,
      top: 100,
      width: 400,
      height: 200,
      angle: 0,
      zIndex: 1,
      opacity: 1,
      flip: null,
      id: 'text_1',
      display: {
        from: 0,
        to: 5000
      }
    }
  ],
  options: {
    width: 1920,
    height: 1080,
    fps: 30,
    duration: 5000,
    bgColor: '#000000'
  }
};

const generator = new VideoGenerator(config);
await generator.generate('output.mp4');
```

## 📚 API Reference

### `VideoGenerator`

Main class for video generation.

#### Constructor

```typescript
new VideoGenerator(config: VideoConfig)
```

#### Methods

##### `generate(outputPath: string): Promise<string>`

Generates the video and saves it to the specified path.

**Parameters:**
- `outputPath` - Path where the MP4 file will be saved

**Returns:** Promise that resolves to the output path

**Example:**
```typescript
const generator = new VideoGenerator(config);
const path = await generator.generate('./output/video.mp4');
console.log(`Video saved to: ${path}`);
```

### Types

#### `VideoConfig`

Main configuration object for video generation.

```typescript
interface VideoConfig {
  clips: Clip[];
  options: VideoOptions;
}
```

#### `VideoOptions`

Video generation options with default values.

```typescript
interface VideoOptions {
  width: number;      // Default: 1920
  height: number;     // Default: 1080
  fps: number;        // Default: 30
  bgColor: string;    // Default: "#000000"
  duration?: number;  // Default: 5000 (milliseconds)
}
```

#### `Clip`

Individual clip configuration (Text or Image).

```typescript
interface Clip {
  id: string;
  type: 'Text' | 'Image';
  left: number;           // X position in pixels
  top: number;            // Y position in pixels
  width: number;          // Width in pixels
  height: number;         // Height in pixels
  angle: number;          // Rotation in degrees
  zIndex: number;         // Layer order (higher = on top)
  opacity: number;        // 0-1
  flip: any;              // Flip configuration
  text?: string;          // Required for Text clips
  src?: string;           // Required for Image clips (URL)
  display?: DisplayConfig; // Timeline configuration
}
```

#### `DisplayConfig`

Timeline configuration for clip visibility.

```typescript
interface DisplayConfig {
  from: number;  // Start time in milliseconds
  to: number;    // End time in milliseconds
}
```

### Default Options

```typescript
import { DEFAULT_VIDEO_OPTIONS } from 'webcodec-video-generator';

console.log(DEFAULT_VIDEO_OPTIONS);
// {
//   width: 1920,
//   height: 1080,
//   fps: 30,
//   bgColor: '#000000',
//   duration: 5000
// }
```

## 💡 Examples

### Basic Example

```bash
npm run example:basic
```

See [`examples/basic.ts`](./examples/basic.ts) for a simple example with text and image.

### Advanced Example

```bash
npm run example:advanced
```

See [`examples/advanced.ts`](./examples/advanced.ts) for a complex example with multiple clips, timing, and effects.

### Custom Example

```typescript
import { VideoGenerator, VideoConfig } from 'webcodec-video-generator';

const config: VideoConfig = {
  clips: [
    // Background image
    {
      type: 'Image',
      src: 'https://example.com/background.jpg',
      left: 0,
      top: 0,
      width: 1920,
      height: 1080,
      angle: 0,
      zIndex: 1,
      opacity: 0.5,
      flip: null,
      id: 'bg',
      display: { from: 0, to: 10000 }
    },
    // Title text
    {
      type: 'Text',
      text: 'My Video Title',
      left: 100,
      top: 100,
      width: 800,
      height: 200,
      angle: 0,
      zIndex: 2,
      opacity: 1,
      flip: null,
      id: 'title',
      display: { from: 0, to: 3000 }
    }
  ],
  options: {
    width: 1920,
    height: 1080,
    fps: 30,
    duration: 10000,
    bgColor: '#1a1a2e'
  }
};

const generator = new VideoGenerator(config);
await generator.generate('./my-video.mp4');
```

## 🐳 Docker Usage

The project includes a Docker setup for environments without the required system dependencies.

### Build the Image

```bash
docker build -t webcodec .
```

### Run with Output Volume

```bash
docker run --rm -v $(pwd)/output:/app/output webcodec
```

This mounts your local `output` folder to persist generated videos.

### Run Examples in Docker

```bash
# Basic example
docker run --rm -v $(pwd)/output:/app/output webcodec npm run example:basic

# Advanced example
docker run --rm -v $(pwd)/output:/app/output webcodec npm run example:advanced
```

## ⚙️ Configuration Options

### Video Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | number | 1920 | Video width in pixels |
| `height` | number | 1080 | Video height in pixels |
| `fps` | number | 30 | Frames per second |
| `bgColor` | string | "#000000" | Background color (hex) |
| `duration` | number | 5000 | Video duration in milliseconds |

### Clip Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier |
| `type` | 'Text' \| 'Image' | ✅ | Clip type |
| `left` | number | ✅ | X position |
| `top` | number | ✅ | Y position |
| `width` | number | ✅ | Width in pixels |
| `height` | number | ✅ | Height in pixels |
| `angle` | number | ✅ | Rotation in degrees |
| `zIndex` | number | ✅ | Layer order |
| `opacity` | number | ✅ | Opacity (0-1) |
| `text` | string | For Text | Text content |
| `src` | string | For Image | Image URL |
| `display` | DisplayConfig | ❌ | Timeline config |

## 🔍 Troubleshooting

### Common Issues

#### `glibc` version error

**Error:** `version 'GLIBC_2.39' not found`

**Solution:** Use the Docker setup or upgrade to Ubuntu 24.04+ with glibc 2.39.

#### FFmpeg not found

**Error:** `FFmpeg not found`

**Solution:** Install FFmpeg 6:
```bash
sudo apt update
sudo apt install ffmpeg
```

#### Module not found errors

**Error:** `Cannot find module '@pproenca/node-webcodecs'`

**Solution:** Install dependencies:
```bash
npm install
```

#### Video generation fails

**Error:** Various encoding errors

**Solutions:**
- Ensure image URLs are accessible
- Check that all required clip properties are provided
- Verify `display.from` < `display.to`
- Ensure `duration` is sufficient for all clips

## 🧪 Testing

Run the test suite:

```bash
npm test
```

This validates:
- Default options merging
- Partial configuration handling
- Full video generation pipeline

## 🤝 Contributing

Contributions are welcome! This project is built on top of:

- [node-webcodecs](https://github.com/pproenca/node-webcodecs) by @pproenca
- [fabric.js](https://github.com/fabricjs/fabric.js)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/x-eight/webcodec-video-generator.git
cd webcodec-video-generator

# Install dependencies
npm install

# Run examples
npm run example:basic

# Run tests
npm test
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Built with [node-webcodecs](https://github.com/pproenca/node-webcodecs) by Paulo Proença
- Uses [fabric.js](https://github.com/fabricjs/fabric.js) for canvas rendering
- Inspired by the need for server-side video generation

## 📞 Support

- 🐛 [Report bugs](https://github.com/x-eight/webcodec-video-generator/issues)
- 💡 [Request features](https://github.com/x-eight/webcodec-video-generator/issues)
- 📖 [Documentation](https://github.com/x-eight/webcodec-video-generator#readme)

---

Made with ❤️ for the video generation community
# webcodec-video-generator
# webcodec-video-generator
