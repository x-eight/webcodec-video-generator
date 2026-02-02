FROM ubuntu:24.04
ENV DEBIAN_FRONTEND=noninteractive
ENV CI=true

# Install FFmpeg and video libraries + build tools
RUN apt-get update && apt-get install -y \
  ffmpeg \
  build-essential pkg-config git yasm nasm cmake \
  libx264-dev libx265-dev \
  libvpx-dev \
  libaom-dev \
  libdav1d-dev \
  librav1e-dev \
  libsvtav1-dev \
  libdrm-dev libva-dev libvdpau-dev \
  opencl-headers ocl-icd-opencl-dev \
  libnuma-dev \
  libssl-dev \
  libxcb1-dev libxcb-shm0-dev libxcb-xfixes0-dev \
  libwayland-dev wayland-protocols \
  libx11-dev \
  zlib1g-dev \
  && rm -rf /var/lib/apt/lists/*

# node-webcodecs must use OUR FFmpeg build
ENV PKG_CONFIG_PATH=/opt/ffmpeg/lib/pkgconfig
ENV LD_LIBRARY_PATH=/opt/ffmpeg/lib

# Base system dependencies and libraries for native modules
RUN apt-get update && apt-get install -y \
  ca-certificates curl gnupg git python3 \
  build-essential pkg-config \
  libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev libpixman-1-dev \
  libva2 libvdpau1 ocl-icd-libopencl1 \
  && rm -rf /var/lib/apt/lists/*

# Install Node 22 and pnpm globally
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get update && apt-get install -y nodejs \
  && npm install -g pnpm \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./

# Install all dependencies with unsafe-perm for native modules
RUN npm install --unsafe-perm canvas

# Rebuild canvas to ensure compatibility
RUN npm rebuild canvas

# Copy the rest of the project
COPY . .

EXPOSE 3000
# Run basic example by default
CMD ["npm", "run", "example:basic"]
