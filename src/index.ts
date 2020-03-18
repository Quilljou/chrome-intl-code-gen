import { Compiler, Stats, compilation as compilationType } from 'webpack';
import { Options } from './interfaces';
import { Generator } from './generator';
import fs from 'fs';
import Watchpack from "watchpack";


// Copied from https://github.com/sindresorhus/is-plain-obj/blob/97480673cf12145b32ec2ee924980d66572e8a86/index.js
function isPlainObject(value: unknown): boolean {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    }

    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.getPrototypeOf({});
}

class ChromeI18nCodeGenPlguin {
    generator: Generator;
    options: Options;
    constructor(options: Options) {
        if (isPlainObject(options) === false) {
            throw new Error(`ChromeI18nCodeGenPlguin only accepts an options object.`);
        }

        if (!options.input || !fs.statSync(options.input).isDirectory()) {
            throw new Error(`Input locales directory is required`);
        } 

        if (!options.output || !fs.statSync(options.input).isDirectory()) {
            throw new Error(`Output path is required`);
        } 

        this.generator = new Generator(options)
        this.options = options;
    }

    apply() {
        const watcherOptions = {
            aggregateTimeout: 0
        };
        const watcher = new Watchpack(watcherOptions);

        watcher.watch([], [this.options.input]);

        watcher.on('aggregated', (changes) => {
            this.generator.start()
        })
    }
}

export * from './interfaces'

export default ChromeI18nCodeGenPlguin;