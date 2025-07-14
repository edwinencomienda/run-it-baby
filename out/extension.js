"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const child_process_1 = require("child_process");
function activate(context) {
    vscode.workspace.onDidSaveTextDocument((document) => {
        const commands = vscode.workspace.getConfiguration('pint-helper').get('commands');
        if (!commands) {
            return;
        }
        for (const { command, languages } of commands) {
            if (languages.includes(document.languageId)) {
                (0, child_process_1.exec)(command, (err, stdout, stderr) => {
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
function deactivate() { }
//# sourceMappingURL=extension.js.map