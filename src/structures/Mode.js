/**
 * @prop {String} name The name of the mode.
 * @prop {function} requirement The function used to identify whether or not the mode should activate. MUST RETURN A BOOLEAN!!
 * @prop {function} mode Stuff to do when the Bey has entered the mode. (OPTIONAL)
 */

class Mode {
    constructor(name, requirement, mode){
        /**
         * @arg {String} name The name of the mode.
         * @arg {function} requirement The function used to identify whether or not the mode should activate. MUST RETURN A BOOLEAN!!
         * @arg {function} mode Stuff to do when the Bey has entered the mode. (OPTIONAL)
         */
        this.name = name || "Mode",
        this.requirement = requirement || function placeholder(){return false};
        this.Mode = mode || function Modeplaceholder(){};
    }
}

module.exports = Mode;