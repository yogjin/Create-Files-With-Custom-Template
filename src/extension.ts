import * as vscode from 'vscode';
import path from 'path';
import { makefile } from './utils/makeFile';
import Handlebars from 'handlebars';

async function selectTemplate() {
  // 템플릿 가져오기
  const rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath!; // 프로젝트 루트 디렉터리 경로
  const templatesPath = path.join(rootPath, 'customTemplates');

  try {
    const templatesPathExists = await vscode.workspace.fs.stat(vscode.Uri.file(templatesPath));
  } catch (error) {
    vscode.window.showErrorMessage(
      'Please create a customTemplates folder on the root path. ' + error.message
    );
  }

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
  let disposable = vscode.commands.registerCommand('createFilesWithCustomTemplate', async (uri) => {
    // const templates = await vscode.workspace.fs.readDirectory(vscode.Uri.file(templatesPath));

    // 템플릿 선택
    const selectedFiles = await selectTemplate();
    vscode.window.showInformationMessage(`Selected template: ${selectedFiles}`);

    if (!selectedFiles) {
      return;
    }

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
      createSelectedTemplates(folderPath, selectedFiles, componentName);
    } else {
      vscode.window.showInformationMessage('Please select a folder to create the component.');
    }
  });

  context.subscriptions.push(disposable);
}

async function createSelectedTemplates(
  folderPath: string,
  template: vscode.Uri | vscode.Uri[],
  componentName: string
) {
  // 현재 폴더기능(파일 여러개 변환)은 안됨
  if (template instanceof Array) {
    template.forEach(async (template) =>
      템플릿내부문자변환한파일생성하기(folderPath, template, componentName)
    );
    return;
  }

  // 파일 하나만 선택했을 때
  템플릿내부문자변환한파일생성하기(folderPath, template, componentName);
}

async function 템플릿내부문자변환한파일생성하기(
  folderPath: string,
  template: vscode.Uri,
  componentName: string
) {
  const templateFileName = path.basename(template.fsPath);
  const handlerBarFileNameTemplate = Handlebars.compile(templateFileName);
  const 변환결과FileName = handlerBarFileNameTemplate({ name: componentName });

  const templateContent = await readFileContents(template);
  const handlerbarTemplate = Handlebars.compile(templateContent);
  const 변환결과Content = handlerbarTemplate({ name: componentName });

  makefile(folderPath, 변환결과FileName, 변환결과Content);
}

async function readFileContents(uri: vscode.Uri): Promise<string> {
  try {
    // 파일의 내용을 Uint8Array 형태로 읽어옴
    const data = await vscode.workspace.fs.readFile(uri);

    // Uint8Array를 문자열로 변환
    const text = new TextDecoder('utf-8').decode(data);

    return text;
  } catch (error) {
    console.error(`Error reading file: ${uri.fsPath}`, error);
    throw error; // 오류를 던지거나, 적절한 오류 처리를 수행
  }
}

export function deactivate() {}
