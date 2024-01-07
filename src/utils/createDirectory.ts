import * as vscode from 'vscode';

export const createDirectory = (path: string) => {
  const uri = vscode.Uri.file(path);

  return vscode.workspace.fs.createDirectory(uri);
};
