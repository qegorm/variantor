# Variantor

**Variantor** is a powerful tool that allows you to quickly and easily generate multiple icon sizes from a single source. It automates the process of scaling and adjusting the outline for each size, saving time and simplifying work on UI kits and design systems.

<img src="/.github/assets/cover.png">

## What can Variantor do?
* **Custom sizes and outline thickness:**  
You can set your own size and outline thickness for each icon version, and Variantor will generate all the options in seconds, freeing you from tedious manual work.

* **Quick color change**  
Variantor provides the ability to change fill and stroke colors for all icons at once, which is useful when creating branded color palettes.

* **Flexible component settings**  
Adjust the margins and spacing of your component to improve its visual appearance. This will make it look more balanced and attractive.

* **Simple and intuitive interface**  
Add, edit, or delete properties in just a couple of clicks. This plugin is useful for both novice designers and professionals working with extensive icon libraries.

## How to build and run this plugin
Plugin is built using TypeScript and React, and it uses Vite as the build tool.

To build and run this plugin, follow these steps:
1. Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. Clone this repository to your local machine.
3. Open repository in terminal and run the following command to install the necessary dependencies:
   ```bash
   npm install
   ```
4. To build the plugin and generate `dist` folder, run the following command:
   ```bash
   npm run build
   ```
5. To watch for changes and automatically rebuild the plugin, run:
   ```bash
   npm run watch
   ```
6. To run the plugin, open Figma and go to `Plugins > Development > Import Plugin from Manifest...`, then select the `manifest.json` file in the previously generated `dist` folder.