# Chrome i18n Code Gen

It provide a webpack plugin for watching chrome extesion's `_locales` directory, if locale file changed, A typescript file which contains a type-safe version of `chrome.i18n.getMessage` will be generated at the output path.


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
     */
    template?: ((data: Message) => string);
}
```