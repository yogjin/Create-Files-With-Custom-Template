import * as vscode from 'vscode';

export const createDirectory = (directoryPath: vscode.Uri) => {
  return vscode.workspace.fs.createDirectory(directoryPath);
};
