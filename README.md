# BuhlProbe

A modern Angular application with responsive design and multi-language internationalization support.

## Responsive Design Features

This application implements a complete responsive design system based on design specifications provided by UX/UI designers, supporting the following breakpoints:

- **Mobile S (320px)**: Small mobile devices
- **Mobile M (390px)**: Medium mobile devices  
- **Tablet (768px)**: Tablet devices
- **Desktop (1200px)**: Desktop devices
- **Desktop L (1980px)**: Large desktop devices

For detailed responsive design documentation, please see: [RESPONSIVE_DESIGN.md](./RESPONSIVE_DESIGN.md)

## Internationalization Support

The application supports multi-language switching:
- English (en)
- German (de)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Code Quality and Formatting

This project is configured with comprehensive code quality and formatting tools to ensure consistent code style and catch potential issues early.

### Available Scripts

#### Linting (Code Quality Analysis)

```bash
# Run all linting checks (TypeScript + SCSS)
npm run lint:all

# Lint TypeScript and Angular template files only
npm run lint

# Lint SCSS/CSS files only
npm run lint:styles

# Auto-fix SCSS linting issues where possible
npm run lint:styles:fix
```

#### Code Formatting

```bash
# Format all files (TypeScript, HTML, SCSS)
npm run format

# Check if files are properly formatted (without changing them)
npm run format:check

# Auto-fix all possible issues (SCSS lint + formatting)
npm run fix:all
```

### Configured Tools

#### ESLint

- **Purpose**: TypeScript and Angular template code quality analysis
- **Files**: `*.ts`, `*.html`
- **Config**: `eslint.config.js`
- **Rules**: Angular ESLint recommended + TypeScript ESLint + Prettier integration

#### Stylelint

- **Purpose**: SCSS/CSS code quality and style consistency
- **Files**: `*.scss`, `*.css`
- **Config**: `.stylelintrc`
- **Rules**: Standard SCSS configuration with custom indentation rules

#### Prettier

- **Purpose**: Code formatting for consistent style
- **Files**: `*.ts`, `*.html`, `*.scss`, `*.json`
- **Config**: `.prettierrc`
- **Integration**: Automatically formats on save (VS Code)

### Configuration Files

| Tool      | Configuration File | Location                |
| --------- | ------------------ | ----------------------- |
| ESLint    | `eslint.config.js` | Root directory          |
| Stylelint | `.stylelintrc`     | Root directory          |
| Prettier  | `.prettierrc`      | Root directory          |
| VS Code   | `settings.json`    | `.vscode/settings.json` |

### IDE Integration

The project includes VS Code settings (`.vscode/settings.json`) that:

- Enable format on save
- Set Prettier as the default formatter
- Ensure consistent development experience across team members

### Pre-commit Workflow Recommendation

For the best development experience, run these commands before committing:

```bash
# Check everything is properly formatted and passes quality checks
npm run format:check && npm run lint:all

# Or auto-fix most issues and then check
npm run fix:all && npm run lint:all
```
