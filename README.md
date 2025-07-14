# Run It Baby

A VS Code extension that executes commands on file save.

## Features

- Executes a configurable command every time a file is saved.

## Requirements

There are no special requirements for this extension.

## Extension Settings

This extension contributes the following settings:

- `run-it-baby.commands`: An array of commands to execute on file save. The default is `[]`.

## Usage

1.  Install the extension.
2.  Open your VS Code settings (`settings.json`).
3.  Add the following setting to configure the commands to be executed:

    ```json
    "run-it-baby.commands": [
      {
        "command": "your-command-here",
        "languages": ["language-id-1", "language-id-2"]
      }
    ]
    ```

4.  **Variable Placeholders**: You can use the following placeholders within your `command` string:

    - `{filePath}`: Will be replaced with the absolute path of the file that was saved.
    *   `{projectRootPath}`: Will be replaced with the absolute path of the current VS Code workspace folder.

    Replace `"your-command-here"` with the command you want to execute, and `["language-id-1", "language-id-2"]` with the languages you want this command to apply to. For example, to run `pint` on PHP files, you would use the following configuration:

    ```json
    "run-it-baby.commands": [
      {
        "command": "{projectRootPath}/vendor/bin/pint {filePath}",
        "languages": ["php"]
      }
    ]
    ```

5.  Save a file to trigger the command.

## Known Issues

There are no known issues at this time.

## Release Notes

### 0.0.1

Initial release of Run It Baby.
