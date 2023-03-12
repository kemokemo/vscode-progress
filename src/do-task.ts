import * as vscode from 'vscode';
import cp = require('child_process');

const sleep = (time: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
};

export function doTask() {
	const controller = new AbortController();
	const { signal } = controller;
	const child = cp.exec('sleep 10000', { signal }, (error) => {
		console.log(`${error}`);
	});

	vscode.window.withProgress({
		title: 'Sample Task',
		location: vscode.ProgressLocation.Notification,
		cancellable: true
	},
		async (progress, token) => {
			const seconds = 10;
			for (let i = 0; i < seconds; i++) {
				if(token.isCancellationRequested){
					vscode.window.showWarningMessage("Cancelling task. Please wait...");
					controller.abort();
					child.kill();
					await sleep(1000); // Emulation of time to cancel

					vscode.window.showWarningMessage("Sample Task: User cancelled.");
					return;
				}
				// you can catch messages from script via some env variables etc..
				progress.report({ message: 'Running...', increment: seconds });
				await sleep(1000);
			}
			vscode.window.showInformationMessage("Sample Task: Task has completed.");
		}
	);
}