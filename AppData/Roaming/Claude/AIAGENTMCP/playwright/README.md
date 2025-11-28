# Playwright Project

A browser automation and testing project using Playwright.

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in debug mode
npm run test:debug

# Run tests with UI
npm run test:ui

# Record new test
npm run codegen
```

## Project Structure

- `tests/` - Test files
- `playwright.config.ts` - Playwright configuration
- `package.json` - Project dependencies and scripts

## Configuration

See `playwright.config.ts` for detailed configuration options. By default, tests run against:
- Chromium
- Firefox
- WebKit
- Mobile Chrome
- Mobile Safari

## Documentation

For more information, visit [Playwright Documentation](https://playwright.dev)
