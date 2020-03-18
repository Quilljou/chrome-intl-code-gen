export interface Message {
    [keyName: string]: {
        "message": string;
        "description": string;
    }
}



export interface Options {
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