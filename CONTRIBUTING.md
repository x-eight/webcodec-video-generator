# Contributing to WebCodec Video Generator

Thank you for your interest in contributing! This project aims to provide a professional, easy-to-use server-side video generation library.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- (Optional) Docker for testing in isolated environment

### Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/x-eight/webcodec-video-generator.git
cd webcodec-video-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run examples to verify setup:
```bash
npm run example:basic
npm run example:advanced
```

## 📝 Development Workflow

### Project Structure

```
webcodec-video-generator/
├── src/
│   ├── index.ts           # Library entry point
│   └── core/
│       ├── type.ts        # Type definitions
│       ├── generator.ts   # Video generation logic
│       └── render.ts      # Frame rendering logic
├── examples/
│   ├── basic.ts          # Simple example
│   ├── advanced.ts       # Complex example
│   └── README.md         # Examples documentation
├── test.ts               # Test suite
├── Dockerfile            # Docker configuration
└── README.md             # Main documentation
```

### Making Changes

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes following the code style

3. Test your changes:
```bash
npm run example:basic
npm test
```

4. Commit with clear messages:
```bash
git commit -m "feat: add new feature description"
```

## 🎯 Contribution Guidelines

### Code Style

- Use TypeScript for all code
- Follow existing code formatting
- Add JSDoc comments for public APIs
- Use meaningful variable and function names

### Commit Messages

Follow conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Test additions or changes
- `chore:` - Maintenance tasks

### Pull Requests

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG if applicable
5. Reference any related issues

## 🐛 Reporting Bugs

When reporting bugs, please include:
- Node.js version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Error messages or logs

## 💡 Feature Requests

We welcome feature requests! Please:
- Check existing issues first
- Describe the use case
- Explain why it would be useful
- Provide examples if possible

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Test with Docker:
```bash
docker build -t webcodec .
docker run --rm -v $(pwd)/output:/app/output webcodec npm test
```

## 📚 Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new APIs
- Update examples if adding features
- Keep CONTRIBUTING.md current

## 🙏 Credits

This project builds on:
- [node-webcodecs](https://github.com/pproenca/node-webcodecs) by @pproenca
- [fabric.js](https://github.com/fabricjs/fabric.js)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

Feel free to open an issue for questions or discussions!
