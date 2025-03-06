var parentWidgetId = 213;
var isInputtingPin = false;
var hasPinScreenOpened = false;

function OnStart() {
    Logger.log("Bank PIN plugin started.", "info");
}

function OnGameTick() {
    try {
        if (!Game || !Game.info || !Game.info.isWidgetVisible) {
            Logger.log("Game.info not ready.", "debug");
            return;
        }

        const widget = Game.info.isWidgetVisible(parentWidgetId, 0);
        Logger.log("Widget " + parentWidgetId + " visibility: " + (widget ? "visible" : "not visible"), "debug");
        if (!widget && hasPinScreenOpened) {
            Logger.log("Bank PIN screen closed, resetting trigger.", "debug");
            hasPinScreenOpened = false;
        }
        if (widget)
            handleBankPin();
    } catch (e) {
        Logger.log("Error in OnGameTick: " + e.message, "error");
    }
}

function isValidPin(pin) {
    if (typeof pin !== "string" || !pin || pin.length !== 4) return false;
    for (let i = 0; i < pin.length; i++) {
        const charCode = pin.charCodeAt(i);
        if (charCode < 48 || charCode > 57) return false;
    }
    return true;
}

function handleBankPin() {
    if (isInputtingPin) return;
    isInputtingPin = true;
    hasPinScreenOpened = true;

    const pin = config.bankPin.getValue();
    if (!isValidPin(pin)) {
        Logger.log("Error: Bank PIN must be a 4-digit number.", "error");
        isInputtingPin = false;
        return;
    }

    async function inputPin() {
        for (let i = 0; i < 4; i++) {
            const digit = pin[i];
            Utility.pressKey(digit);
            Logger.log(`Pressed key for digit ${digit}`, "info");
            await Utils.delay(565); // int config is broken
        }
        isInputtingPin = false;
        Logger.log("Bank PIN input completed.", "info");
    }

    inputPin();
}

function OnShutdown() {
    Logger.log("Bank PIN plugin stopped.", "info");
}