"use strict";

let EventEmitter;
try{
    EventEmitter = require("eventemitter3");
}catch(error){
    EventEmitter = require("events");
}

const fs = require("fs");

const Beyblade = require("./Beyblade");
const Passive = require("./structures/Passive");
const Special = require("./structures/Special");
const Mode = require("./structures/Mode");

/**
 * @extends EventEmitter
 * @prop {Object} [options] Workshop options
 * @prop {String} directoryPath File path to the directory that the Workshop should read from to gather data for Bey generations.
 * @prop {String} outputPath File path to the directory that Beys will be generated in.
 */

class Workshop extends EventEmitter {
    /**
     * @arg {String} directoryPath File path to the directory that the Workshop should read from to gather data for Bey generations.
     * @arg {String} outputPath File path to the directory that Beys will be generated in.
     * @arg {Object} [options] Workshop options.
     * @arg {Boolean} [options.generateBeysOnReady] Whether the Workshop should start generating Beys when it is ready. (Only does it once.)
     */
    constructor(directoryPath, outputPath, options){
        super();
        this.options = Object.assign({
            generateBeysOnReady: true
        }, options)
        if(!directoryPath || !fs.existsSync(directoryPath)) throw new Error("Directory to gather Bey data cannot be found!");
        if(!outputPath || !fs.existsSync(outputPath)) throw new Error("Output path to generate Beys in cannot be found!");
        this.directoryPath = directoryPath;
        this.outputPath = outputPath;
        this.on("ready", () => {
            if(this.options.generateBeysOnReady) this.generate();
        });
        this.emit("ready");
    }
    /**
     * Start generating Beys
     * @returns {String} Directory path to view the generated contents.
     */
    generate(){
        let directory = fs.readdirSync(this.directoryPath);
        directory.forEach(name => {
            let bey = require(`${this.directoryPath}/${name}`);
            if(bey instanceof Beyblade !== true) throw new Error(`${this.directoryPath}/${name} is not a Beyblade!`);
            let code = `const Beyblade = require("./Beyblade.js"); class ${bey.name} extends Beyblade {} module.exports = ${bey.name};`;
            fs.writeFileSync(`${this.outputPath}/${name}`, code);
        });
        return this.outputPath;
    }
}

module.exports = Workshop;