import * as vscode from 'vscode';
import { doTask } from './do-task';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-progress" is now active!');

	let disposable = vscode.commands.registerCommand('vscode-progress.doTask', doTask);
	context.subscriptions.push(disposable);
}

export function deactivate() {}
