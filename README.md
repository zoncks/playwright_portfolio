# Playwright Portfolio Project

A demonstration project showcasing automated testing skills using Playwright. This project uses [Sauce Demo](https://www.saucedemo.com/) as the test target to show various testing approaches and best practices.

## Overview

This portfolio demonstrates:
- Basic test automation setup using Playwright
- Page Object Model implementation
- Cross-browser testing capabilities
- Test organization and structure
- Clean, maintainable test code

## Test Examples

The project includes tests for:
1. **Authentication**
   - Login with valid credentials
   - Handle invalid login attempts
   - Verify error messages
   - Session management

2. **Inventory Page**
   - Product listing verification
   - Item details validation
   - Navigation checks
   - UI element validation

## Project Structure

```
├── tests/
│   ├── pages/         # Page Object Models
│   └── tests/         # Test files
├── utils/             # Helper functions
└── playwright.config.ts # Playwright configuration
```

## Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd playwright_portfolio
```

2. Install dependencies
```bash
npm install
```

3. Install Playwright browsers
```bash
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with browser visible
npm run test:headed

# Run tests in specific browsers
npm run test:chrome
npm run test:firefox
npm run test:safari
```

## Test Configuration

The framework is configured to run tests across multiple browsers:

### Desktop Browsers
- Chrome (1920x1080)
- Firefox (1920x1080)
- Safari (1920x1080)

### Mobile Devices
- Pixel 5 (Android)
- iPhone 12 (iOS)

## Key Features

### Page Object Model
- Organized page elements and actions
- Reusable components
- Easy maintenance

### Cross-Browser Testing
- Tests run on multiple browsers
- Consistent test execution
- Viewport size management

### Test Reports
- HTML reports for test runs
- Clear test results
- Easy to share and analyze

## Development Notes

### Timeouts
- Test timeout: 30 seconds
- Action timeout: Unlimited
- Expect timeout: 5 seconds

### Parallel Execution
- Tests run in parallel by default
- Configurable worker count

## License

This project is licensed under the ISC License.
