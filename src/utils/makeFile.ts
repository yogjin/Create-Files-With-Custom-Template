import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';

/**
 * 파일을 생성하는 유틸리티 함수
 * @param folderPath 파일을 생성할 폴더 경로
 * @param fileNameWithExtension 확장자를 포함한 파일 이름
 * @param fileContent 파일 내용
 */
export const makefile = (
  folderPath: string,
  fileNameWithExtension: string,
  fileContent: string
) => {
  const filePath = path.join(folderPath, fileNameWithExtension);
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      vscode.window.showErrorMessage('Error creating`file: ' + err.message);
    } else {
      vscode.window.showInformationMessage(`file created: ${fileNameWithExtension}`);
    }
  });
};
