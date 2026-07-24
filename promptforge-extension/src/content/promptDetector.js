let latestPrompt = "";

const SUPPORTED_SELECTORS = [
    "textarea",
    '[contenteditable="true"]'
];

/**
 * Returns the first visible supported prompt input element.
 */
function findPromptInput() {

    for (const selector of SUPPORTED_SELECTORS) {

        const elements = document.querySelectorAll(selector);

        for (const element of elements) {

            const style = window.getComputedStyle(element);

            if (
                style.display === "none" ||
                style.visibility === "hidden"
            ) {
                continue;
            }

            return element;
        }
    }

    return null;
}

/**
 * Reads the current prompt text.
 */
function getCurrentPrompt() {

    const input = findPromptInput();

    if (!input) {
        return "";
    }

    if (input.tagName === "TEXTAREA") {
        return input.value.trim();
    }

    return input.innerText.trim();
}

/**
 * Updates the cached prompt.
 */
function updateLatestPrompt() {

    const prompt = getCurrentPrompt();

    if (prompt.length > 0) {
        latestPrompt = prompt;
    }
}

/**
 * Returns the latest detected prompt.
 */
function getLatestPrompt() {
    return latestPrompt;
}

// Make the functions available to other content scripts
globalThis.findPromptInput = findPromptInput;
globalThis.getCurrentPrompt = getCurrentPrompt;
globalThis.updateLatestPrompt = updateLatestPrompt;
globalThis.getLatestPrompt = getLatestPrompt;