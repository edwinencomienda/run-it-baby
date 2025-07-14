
import * as vscode from 'vscode';
import { exec } from 'child_process';

interface Command {
  command: string;
  languages: string[];
}

export function activate(context: vscode.ExtensionContext) {
  vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
    const commands = vscode.workspace.getConfiguration('pint-helper').get('commands') as Command[];
    if (!commands) {
      return;
    }

    for (const { command, languages } of commands) {
      if (languages.includes(document.languageId)) {
        exec(command, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }
          vscode.window.showInformationMessage(stdout);
        });
      }
    }
  });
}

export function deactivate() {}
