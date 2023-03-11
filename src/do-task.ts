import * as vscode from 'vscode';

const sleep = (time: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
};

export function doTask() {
	vscode.window.withProgress({
		title: 'Please wait...',
		location: vscode.ProgressLocation.Notification,
		cancellable: true
	},
		async (progress, token) => {
			const seconds = 10;
			for (let i = 0; i < seconds; i++) {
				if(token.isCancellationRequested){
					vscode.window.showWarningMessage("Sample Task: User cancelled.");
					return;
				}
				progress.report({ increment: seconds });
				await sleep(1000);
			}
			vscode.window.showInformationMessage("Sample Task: Task has completed.");
		}
	);

}