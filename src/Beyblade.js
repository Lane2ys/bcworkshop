"use strict";

let EventEmitter;
try{
    EventEmitter = require("eventemitter3");
}catch(err){
    EventEmitter = require("events");
}

const Mode = require("./structures/Mode");
const Passive = require("./structures/Passive");
const Special = require("./structures/Special");

/**
 * Beyblade builder
 * @extends EventEmitter
 * @prop {String} name The name of the Bey.
 * @prop {String} type The type of the Bey (Attack, Defense, Stamina or Balance).
 * @prop {String} imageLink The image link of the Bey (file path or web link).
 * @prop {Array} specials Array of all special moves that the Bey can use.
 * @prop {Array} passives Array of all passive stat boosts or attacks that the Bey can use.
 * @prop {Array} modes Array of all modes that the Bey can be in.
 */

class Beyblade extends EventEmitter {
    /**
     * @arg {Object} [stats] Statistics of the Bey.
     * @arg {String} [stats.name] The name of the Bey.
     * @arg {String} [stats.type] The type of the Bey (Attack, Defense, Stamina, Balance).
     * @arg {String} [stats.imageLink] The image link of the Bey (file path or web link).
     */
    constructor(stats){
        super();
        stats = Object.assign({
            name: "Beyblade",
            type: "Type",
            imageLink: "https://images-ext-1.discordapp.net/external/SkyihHxg4MHJ_qWWMLPFNPYVV-Z1XnxCfqd0EQrXYXA/%3Fsize%3D128/https/cdn.discordapp.com/avatars/570115430786531340/e3ff8924f1d5d41c975907008f0059f2.png?width=100&height=100",
        }, stats)
        this.name = stats.name;
        this.type = stats.type;
        this.imageLink = stats.imageLink;
        this.specials = [];
        this.passives = [];
        this.modes = [];
    }
    /**
     * Attaches a special to the Bey
     * @arg {Special} special The special to be added.
     * @returns {Array}
     */
    attachSpecial(special){
        if(special instanceof Special !== true) throw new Error("Specials must be an instance of the Special class.");
        this.specials.push(special);
        return this.specials;
    }
    /**
     * Attaches a passive to the Bey.
     * @arg {Passive} passive The passive to be added.
     * @returns {Array}
     */
    attachPassive(passive){
        if(passives instanceof Passive !== true) throw new Error("Passives must be an instance of the Passive class.");
        this.passives.push(passive);
        return this.passives;
    }
    /**
     * Attaches a mode to the Bey.
     * @arg {Mode} mode The mode to be attached.
     * @returns {Array}
     */
    attachMode(mode){
        if(mode instanceof Mode !== true) throw new Error("Modes must be an instance of the Mode class.");
        this.modes.push(mode);
        return this.modes;
    }
}

module.exports = Beyblade;