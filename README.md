# Chrome intl Code Gen

[![npm](https://img.shields.io/npm/v/chrome-intl-code-gen)](https://www.npmjs.com/package/chrome-intl-code-gen)
[![GitHub issues](https://img.shields.io/github/issues/Quilljou/chrome-intl-code-gen)](https://github.com/Quilljou/chrome-intl-code-gen)

It provide a webpack plugin for watching chrome extesion's `_locales` directory, if locale file changed, A typescript file which contains a type-safe version of `chrome.i18n.getMessage`  will be generated at the output path. the file contents includes a default export and multiple exports like this. Also you can custom your own generated content with the `template` option. 

```ts
/* eslint-disable */
// This file is generated by chrome-i18n-code-gen, do not edit it

export type ChromeI18nKeys = "extName" | "extDescription"

export default function i18n(key: ChromeI18nKeys): string {
    return chrome.i18n.getMessage(key)
}
        
/**
* extension name
*/
export function extName(): string {
    return chrome.i18n.getMessage('extName')
}
            
/**
* extension description
*/
export function extDescription(): string {
    return chrome.i18n.getMessage('extDescription')
}
```


## Usage

```ts
const ChromeIntlCodeGenPlguin = require('chrome-intl-code-gen').default;

[
    new ChromeIntlCodeGenPlguin({
      input: "public/_locales",
      output: "src/shared/locale.ts"
    })
]
```

Options

```ts
interface Options {
    /**
     * path of `_locales` directory 
     */
    input: string;
    /**
     * output typescript file path
     */
    output: string;
    /**
     * base language, defaults to en
     */
    base?: string;
    /**
     * optional custom template function to generate your own output file
     * interface Message { [keyName: string]: { "message": string;  "description": string; } }
     */
    template?: ((data: Message) => string);
}
```