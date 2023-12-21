import * as vscode from "vscode";
const fs = require('fs').promises;
const path = require('path');

export async function addFolder(destinationFolderName: string, destinationFolderUri: string, webviewToRender: string, context: vscode.ExtensionContext, panel: vscode.WebviewPanel): Promise<void> {

	const newFolderName = await vscode.window.showInputBox({
		placeHolder: 'Enter folder name',
		prompt: 'Provide a name for the new folder'
	});

	if (!newFolderName) {
		return;
	}

	const newFolderPath = path.join(destinationFolderUri, newFolderName);

	try {
		await fs.mkdir(newFolderPath, Error);
		vscode.window.showInformationMessage(`Folder "${newFolderName}" created successfully.`);
		console.log(`Folder '${newFolderName}' created successfully.`);

	} catch (error: any) {
		if (error.code === 'EEXIST') {
			vscode.window.showWarningMessage(`Folder "${newFolderName}" already exists.`);
			console.error(`Folder already exists: ${error.message}`);
		} else {
			vscode.window.showErrorMessage(`Error creating folder: ${error.message}`);
			console.error(`Error creating folder: ${error.message}`);

		}
	}
}