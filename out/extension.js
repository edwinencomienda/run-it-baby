"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const child_process_1 = require("child_process");
let outputChannel;
function activate(context) {
    outputChannel = vscode.window.createOutputChannel('Pint Helper');
    outputChannel.appendLine('Pint Helper extension is now active.');
    let disposable = vscode.commands.registerCommand('pint-helper.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from pint-helper!');
    });
    context.subscriptions.push(disposable);
    vscode.workspace.onDidSaveTextDocument((document) => {
        const commands = vscode.workspace.getConfiguration('pint-helper').get('commands');
        if (!commands) {
            return;
        }
        for (const { command, languages } of commands) {
            if (languages.includes(document.languageId)) {
                let processedCommand = command.replace(/\{filePath\}/g, document.fileName);
                if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                    processedCommand = processedCommand.replace(/\{rootPath\}/g, vscode.workspace.workspaceFolders[0].uri.fsPath);
                }
                outputChannel.appendLine(`Executing command: ${processedCommand}`);
                (0, child_process_1.exec)(processedCommand, (err, stdout, stderr) => {
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
function deactivate() {
    if (outputChannel) {
        outputChannel.dispose();
    }
}
//# sourceMappingURL=extension.js.map