# Contributing to habitica-avatar-react

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

## Development Process

We use GitHub to host code, track issues and feature requests, and accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/habitica-avatar-react.git
cd habitica-avatar-react
npm install
```

2. Start development environment
```bash
npm run dev  # Starts Storybook
```

3. Run tests
```bash
npm test
npm run test:coverage  # With coverage
```

4. Build the library
```bash
npm run build
```

## Code Style

We use ESLint and Prettier for code formatting. Run these before committing:

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

## Testing

- Write tests for new features
- Ensure existing tests pass
- Maintain test coverage above 80%
- Use React Testing Library for component tests

## Commit Messages

We follow conventional commits:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting, no code change
- `refactor:` code change that neither fixes a bug nor adds a feature
- `test:` adding tests
- `chore:` updating build tasks, package manager configs, etc.

## Any contributions you make will be under the MIT Software License

When you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project.

## Report bugs using GitHub's [issues](https://github.com/yourusername/habitica-avatar-react/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/habitica-avatar-react/issues/new).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## License

By contributing, you agree that your contributions will be licensed under its MIT License.