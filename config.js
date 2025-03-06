const config = {
    bankPin: ConfigItem.createString(
        "bankPin",
        "General",
        "Bank PIN",
        "Enter your 4-digit bank PIN (e.g., 1234)",
        "1234"
    ),
    // inputDelayMs: ConfigItem.createIntegerRange(
    //     "inputDelayMs",
    //     "Timing",
    //     "Input Delay (ms)",
    //     "Delay between each digit (50-500 ms)",
    //     50,   // rangeMin
    //     500,  // rangeMax
    //     100   // defaultValue
    // )
};