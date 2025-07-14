
import * as vscode from 'vscode';
import { exec } from 'child_process';

interface Command {
  command: string;
  languages: string[];
}

let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
  outputChannel = vscode.window.createOutputChannel('Run It Baby');
  outputChannel.appendLine('Run It Baby extension is now active.');

  let disposable = vscode.commands.registerCommand('run-it-baby.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from Run It Baby!');
  });

  context.subscriptions.push(disposable);

  vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
    const commands = vscode.workspace.getConfiguration('run-it-baby').get('commands') as Command[];
    if (!commands) {
      return;
    }

    for (const { command, languages } of commands) {
      if (languages.includes(document.languageId)) {
        let processedCommand = command.replace(/\{filePath\}/g, document.fileName);
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
          processedCommand = processedCommand.replace(/\{projectRootPath\}/g, vscode.workspace.workspaceFolders[0].uri.fsPath);
        }

        outputChannel.appendLine(`Executing command: ${processedCommand}`);
        exec(processedCommand, (err, stdout, stderr) => {
          if (err) {
            outputChannel.appendLine(`Error executing command: ${err.message}`);
            return;
          }
          if (stderr) {
            outputChannel.appendLine(`Stderr: ${stderr}`);
          }
          outputChannel.appendLine(`Stdout: ${stdout}`);
        });
      }
    }
  });
}

export function deactivate() {
  if (outputChannel) {
    outputChannel.dispose();
  }
}
