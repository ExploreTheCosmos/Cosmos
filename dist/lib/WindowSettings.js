"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
class WindowSettingsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ClientSettingsError';
    }
}
/**
 * @class WindowSettings
 * Set and Get Window Settings
 */
class WindowSettings {
    constructor() {
        this.filepath = './settings.json';
        try {
            this.content = fs_1.default.readFileSync(this.filepath, { encoding: 'utf8' });
            this.settings = JSON.parse(this.content);
        }
        catch (e) {
            new WindowSettingsError('Could not load settings: ' + e);
            this.content = '';
            this.settings = {};
        }
    }
    /**
     * Save settings to file
     */
    save() {
        try {
            let toSave = JSON.stringify(this.settings, null, 4);
            if (toSave !== this.content) {
                fs_1.default.writeFileSync(this.filepath, toSave);
            }
        }
        catch (e) {
            new WindowSettingsError('Could not save settings: ' + e);
        }
    }
    /**
     * Get an item from the Current Settings
     * @param item The Key of the Setting
     * @param defaultValue Default value if none exists
     * @returns The Default Value or Setting
     */
    get(item, defaultValue) {
        if (!this.settings[item]) {
            return defaultValue;
        }
        return this.settings[item];
    }
    /**
     * Set an item to Window Settings
     * @param key The key to add to Settings
     * @param value The value of the specified key
     */
    set(key, value) {
        this.settings[key] = value;
        this.save();
    }
}
module.exports = WindowSettings;
//# sourceMappingURL=WindowSettings.js.map