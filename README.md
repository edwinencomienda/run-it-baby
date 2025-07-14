
# Pint Helper

A VS Code extension that executes a command on file save.

## Features

*   Executes a configurable command every time a file is saved.

## Requirements

There are no special requirements for this extension.

## Extension Settings

This extension contributes the following settings:

*   `pint-helper.commands`: An array of commands to execute on file save. The default is `[]`.

## Usage

1.  Install the extension.
2.  Open your VS Code settings (`settings.json`).
3.  Add the following setting to configure the commands to be executed:

    ```json
    "pint-helper.commands": [
      {
        "command": "your-command-here",
        "languages": ["language-id-1", "language-id-2"]
      }
    ]
    ```

4.  Replace `"your-command-here"` with the command you want to execute, and `["language-id-1", "language-id-2"]` with the languages you want this command to apply to.
5.  Save a file to trigger the command.

## Known Issues

There are no known issues at this time.

## Release Notes

### 0.0.1

Initial release of Pint Helper.
