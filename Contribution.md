# Contributing to Anti-Boredom

Thank you for considering contributing to the Anti-Boredom project! This document provides guidelines and information for contributors.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Community Guidelines](#community-guidelines)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Prerequisites
- Basic knowledge of web development (HTML, CSS, JavaScript)
- Git installed on your system
- A GitHub account

### Setting Up the Development Environment
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Anti-Boredom.git
   cd Anti-Boredom
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/ramanuj-droid/Anti-Boredom.git
   ```

## How to Contribute

### 1. Choose What to Work On
- Browse existing [issues](https://github.com/ramanuj-droid/Anti-Boredom/issues) for bugs or feature requests
- Create a new issue if you have an idea for a new project or improvement
- Check the project descriptions in `project_descriptions.txt` for inspiration

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/issue-number
```

### 3. Make Your Changes
- Follow the [Development Guidelines](#development-guidelines)
- Test your changes thoroughly
- Ensure your code is clean and well-commented

### 4. Commit Your Changes
```bash
git add .
git commit -m "Add: Brief description of your changes"
```

Use conventional commit messages:
- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for improvements
- `Remove:` for deletions
- `Docs:` for documentation changes

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub.

## Project Structure

### Directory Organization
```
Anti-Boredom/
├── Anti_Boredom_main/          # Main projects directory
│   ├── project_name/           # Individual project folders
│   │   ├── index.html         # Main HTML file
│   │   ├── style.css          # Styles (if needed)
│   │   ├── script.js          # JavaScript (if needed)
│   │   └── README.md          # Project documentation
│   └── ...
├── index.html                  # Main landing page
├── README.md                   # Project overview
├── CODE_OF_CONDUCT.md         # Community guidelines
└── Contribution.md            # This file
```

### Important Rules
- **All new projects must be placed inside the `Anti_Boredom_main` directory**
- Each project should have its own folder with a descriptive name
- Include a `README.md` file for each project explaining its purpose and how to use it
- Use consistent naming conventions (snake_case for folders)

## Development Guidelines

### Project Requirements
- **Originality**: Create original content. Avoid copying from other sources
- **Functionality**: Ensure your project works as intended
- **Documentation**: Include clear instructions and descriptions
- **Responsive Design**: Make projects work on different screen sizes
- **Accessibility**: Follow basic accessibility guidelines

### Code Standards
- Use meaningful variable and function names
- Add comments for complex logic
- Follow consistent indentation (2 or 4 spaces)
- Validate your HTML and CSS
- Test your JavaScript for errors

### File Naming
- Use lowercase with underscores: `my_awesome_project`
- HTML files: `index.html`
- CSS files: `style.css` or `styles.css`
- JavaScript files: `script.js` or `index.js`

## Pull Request Process

### Before Submitting
- [ ] Test your changes thoroughly
- [ ] Ensure your project follows the folder structure
- [ ] Update documentation if needed
- [ ] Check that your code is clean and commented
- [ ] Verify no sensitive information is included

### PR Description Template
```markdown
## Description
Brief description of what this PR adds or fixes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
Describe how you tested your changes.

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings or errors
```

## Issue Reporting

### Bug Reports
When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots if applicable

### Feature Requests
When suggesting features:
- Clear description of the proposed feature
- Use case and motivation
- Any additional context or examples

## Community Guidelines

### Communication
- Be respectful and constructive in all interactions
- Help others learn and grow
- Ask questions when you need help
- Share knowledge and resources

### Recognition
- Contributors will be credited in the project
- Star the repository if you find it useful
- Share the project with others who might benefit

### Originality and Creativity
- We value authentic, creative contributions
- Use your unique perspective and skills
- Avoid relying solely on AI tools or copy-pasting
- Build something you're proud of

## Getting Help

- Check existing [issues](https://github.com/ramanuj-droid/Anti-Boredom/issues) for solutions
- Create a new issue for questions or problems
- Join discussions in the community

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Anti-Boredom! Your efforts help make this project better for everyone. 🎉

Happy coding!