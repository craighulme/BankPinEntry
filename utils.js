class Utils {
    static delay(ms) { return new Promise(resolve => Utility.invokeLater(resolve, ms)); }
    static randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
class Logger {
    static log(message, level = "info") {
        if (Logger.levels[level] >= Logger.currentLevel) {
            const formatted = `[${level.toUpperCase()}] ${message}`;
            Utility.print(formatted);
        }
    }
}
Logger.levels = { debug: 0, info: 1, warn: 2, error: 3 };
Logger.currentLevel = Logger.levels.debug;
