import * as vscode from 'vscode';
import path from 'path';
import { createComponentFile } from './templates/component';
import { createStorybookFile } from './templates/storybook';
import { createCSSFile } from './templates/css';
import { createDirectory } from './utils/createDirectory';

async function selectTemplate() {
  // 템플릿 가져오기
  const rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath!; // 프로젝트 루트 디렉터리 경로
  const templatesPath = path.join(rootPath, 'templates');

  // 현재 경로의 내용 읽기
  const entries = await vscode.workspace.fs.readDirectory(vscode.Uri.file(templatesPath));

  // 템플릿 폴더에는 폴더와 파일이 있다
  const folderNames = entries
    .filter(([name, type]) => type === vscode.FileType.Directory)
    .map(([name]) => name);
  const fileNames = entries
    .filter(([name, type]) => type === vscode.FileType.File)
    .map(([name]) => name);

  // 폴더를 선택하게 하는 QuickPick 표시
  const selectedName = await vscode.window.showQuickPick([...folderNames, ...fileNames], {
    placeHolder: 'Select template',
  });

  if (selectedName) {
    const selected = entries.find(([name]) => name === selectedName);

    if (selected) {
      if (selected[1] === vscode.FileType.Directory) {
        const subEntries = await vscode.workspace.fs.readDirectory(
          vscode.Uri.file(path.join(templatesPath, selectedName))
        );
        const subFileNames = subEntries
          .filter(([name, type]) => type === vscode.FileType.File)
          .map(([name]) => name);

        return subFileNames.map((name) =>
          vscode.Uri.file(path.join(templatesPath, selectedName, name))
        );
      }

      if (selected[1] === vscode.FileType.File) {
        return vscode.Uri.file(path.join(templatesPath, selectedName));
      }
    }
  } else {
    vscode.window.showInformationMessage('Template selection cancelled.');
  }

  return null;
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('createComponent', async (uri) => {
    // const templates = await vscode.workspace.fs.readDirectory(vscode.Uri.file(templatesPath));

    // 템플릿 선택
    const selectedFiles = await selectTemplate();
    vscode.window.showInformationMessage(`Selected template: ${selectedFiles}`);

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
      const directoryPath = path.join(folderPath, componentName);
      await createDirectory(directoryPath);

      createComponentFiles(directoryPath, componentName);
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
