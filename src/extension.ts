import * as vscode from 'vscode';
import path from 'path';
import { createComponentFile } from 'templates/component';
import { createStorybookFile } from 'templates/storybook';
import { createCSSFile } from 'templates/css';
import { createDirectory } from 'utils/createDirectory';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('createComponent', async (uri) => {
    // 사용자로부터 컴포넌트의 이름을 입력받음
    const componentName = await vscode.window.showInputBox({
      placeHolder: 'Enter the Component name',
    });

    if (!componentName) {
      vscode.window.showInformationMessage('Component creation cancelled.');
      return;
    }

    // 현재 선택된 폴더 경로를 가져옴
    const folderPath = uri.fsPath;

    if (folderPath) {
      // 폴더도 함께 생성
      await createDirectory(vscode.Uri.joinPath(folderPath, componentName));

      createComponentFiles(path.join(folderPath, componentName), componentName);
    } else {
      vscode.window.showInformationMessage('Please select a folder to create the component.');
    }
  });

  context.subscriptions.push(disposable);
}

function createComponentFiles(folderPath: string, componentName: string) {
  createComponentFile(folderPath, componentName);

  createStorybookFile(folderPath, componentName);

  createCSSFile(folderPath, componentName);
}

export function deactivate() {}
