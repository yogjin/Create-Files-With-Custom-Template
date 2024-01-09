## `Create Files With Custom Template`

VSCode Extension 입니다.

스토리북이나 컴포넌트 파일처럼 같은 형식의 파일을 자주 만들어야 했던 경험이 있으신가요?

`Create Files With Custom Template`를 이용하면, 내가 만든 템플릿을 한번 만들어놓으면, 그걸 이용해 같은 형식의 파일을 손쉽게 만들 수 있습니다.

이 기능은 VSCode 확장 프로그램으로 제공됩니다.

## 사용 방법

### 1. Extension 설치

[여기](https://marketplace.visualstudio.com/items?itemName=YoungJinPark.createFilesWithCustomTemplate)를 클릭하셔서 설치하세요.

### 2. 템플릿 만들기

#### 2.1. 프로젝트 루트 경로에 `customTemplates` 폴더 만들기

<img width="385" alt="image" src="https://github.com/yogjin/Create-Files-With-Custom-Template/assets/33623078/85b403db-c58c-4927-8610-d386502e9a44">

- 중요한 점들
  - 프로젝트 루트 경로에 만드셔야해요.
  - 폴더 이름은 꼭 customTemplates로 지정해주세요.

#### 2.2. 템플릿 생성

<img width="816" alt="image" src="https://github.com/yogjin/Create-Files-With-Custom-Template/assets/33623078/8eff9740-181b-4bd0-94ea-355cdfe4e1c4">

1. `customTemplates` 폴더 안에 생성하세요.
2. 파일 이름이나 코드 내의 `{{name}}` 부분은 생성할 때 입력하시는 내용으로 바뀌어요.
3. 폴더 안에 여러 템플릿을 넣어서 한번에 여러개를 만들 수도 있어요.

- 중요한 점들
  - 템플릿은 최대 1-depth까지만 만들 수 있어요.
  - 폴더 안에 또 다른 폴더나 템플릿을 만드는 구조는 지원하지 않아요.

### 3. 예시들

#### 3.1 단일 템플릿 만들기

https://github.com/yogjin/Create-Files-With-Custom-Template/assets/33623078/3401fd52-ecf8-47e1-ae6a-46a5642f5d79

#### 3.2 여러 템플릿 한꺼번에 만들기

https://github.com/yogjin/Create-Files-With-Custom-Template/assets/33623078/82fe95f8-95d3-4fff-b7be-54069896acbe
