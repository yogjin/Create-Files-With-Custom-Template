# Introduction
Have you ever found yourself repeatedly creating files of the same format, such as storybook files or component files? Such repetitive tasks can be tedious. However, with the ability to create templates, you can easily generate files of the same format using the "Create Files With Custom Template" feature. This is available as a VSCode extension, making it easy to install and use.

# How to Use
### 1. Install the Extension
Click [here](https://marketplace.visualstudio.com/items?itemName=YoungJinPark.createFilesWithCustomTemplate) to install.

### 2. Creating Templates
#### 2.1. Create a `customTemplates` Folder at the Project's Root Path
<img width="385" alt="image" src="https://github.com/yogjin/Create-Files-With-Custom-Template/assets/33623078/85b403db-c58c-4927-8610-d386502e9a44">

- Important Notes
  - Please create it at the project's root path.
  - The folder must be named customTemplates.
#### 2.2. Creating a Template
<img width="816" alt="image" src="https://github.com/yogjin/Create-Files-With-Custom-Template/assets/33623078/8eff9740-181b-4bd0-94ea-355cdfe4e1c4">

1. Create it inside the `customTemplates` folder.
2. In the file name and code, `{{name}}` will be replaced with the input you provide during creation.
3. You can create multiple templates at once by placing them in a folder.
- Important Notes
  - Templates can only be created up to 1-depth.
  - Folder within a folder structure is not allowed.
### 3. Examples

#### 3.1 Creating a Single Template
https://github.com/yogjin/Create-Files-With-Custom-Template/assets/33623078/3401fd52-ecf8-47e1-ae6a-46a5642f5d79


#### 3.2 Creating Multiple Templates
https://github.com/yogjin/Create-Files-With-Custom-Template/assets/33623078/82fe95f8-95d3-4fff-b7be-54069896acbe
