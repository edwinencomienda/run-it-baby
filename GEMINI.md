## Project Overview: run-it-baby VS Code Extension

### Purpose
This VS Code extension, named "run-it-baby", is designed to automate the execution of command-line interface (CLI) commands whenever a file is saved within the VS Code environment. Its primary goal is to provide a flexible and configurable way for users to integrate external tools (like formatters, linters, or custom scripts) into their development workflow, triggered by file save events.

### Key Features
- **Configurable Commands**: Users can define one or more CLI commands to be executed.
- **Language-Specific Execution**: Commands can be configured to run only for specific programming languages (e.g., `php`, `typescript`, `javascript`).
- **Variable Substitution**: Commands support placeholders for dynamic values:
  - `{filePath}`: Replaced with the absolute path of the saved file.
  - `{projectRootPath}`: Replaced with the absolute path of the workspace root directory.
- **Logging**: All extension activities, including command execution and output, are logged to a dedicated "Run It Baby" output channel within VS Code for easy monitoring and debugging.
- **"Hello World" Command**: A simple command (`run-it-baby.helloWorld`) is included for basic extension activation testing.

### Architecture and Structure
- **`package.json`**: Defines the extension's metadata (name, display name, description, version), activation events (`onStartupFinished`, `onCommand:run-it-baby.helloWorld`), main entry point (`./out/extension.js`), and contributions (commands, configuration settings).
- **`tsconfig.json`**: TypeScript compiler configuration, specifying `commonjs` module, `es2020` target, `out` directory for compiled JavaScript, and source maps.
- **`src/extension.ts`**: The core logic of the extension. It contains:
  - The `activate` function, which is called when the extension is activated. It sets up the output channel, registers the "Hello World" command, and subscribes to the `onDidSaveTextDocument` event.
  - The `onDidSaveTextDocument` listener, which retrieves configured commands, filters them by the saved document's language, performs variable substitution (`{filePath}`, `{projectRootPath}`), and executes the command using `child_process.exec`.
  - The `deactivate` function, which is called when the extension is deactivated, disposing of the output channel.
- **`README.md`**: Provides user-facing documentation, including features, requirements, extension settings, and usage instructions with examples.

### Development Workflow
1.  **Installation**: `npm install` in the extension's root directory.
2.  **Compilation**: `npm run compile` to transpile TypeScript to JavaScript.
3.  **Testing**: Launching the Extension Development Host (`F5` in VS Code) to test the extension in a separate VS Code instance.

### Configuration Example
```json
"run-it-baby.commands": [
  {
    "command": "{projectRootPath}/vendor/bin/pint {filePath}",
    "languages": ["php"]
  },
  {
    "command": "eslint --fix {filePath}",
    "languages": ["javascript", "typescript"]
  }
]
```
