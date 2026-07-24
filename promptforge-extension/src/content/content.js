console.log("PromptForge Content Script Loaded.");

// Inject PromptForge button
injectPromptForgeButton();

let currentInput = null;

/**
 * Attach listener to the current prompt input.
 */
function attachPromptListener() {

    const input = findPromptInput();

    // Debug: show which element was found
    

    if (!input) {
        return;
    }

    // Don't attach twice to the same element
    if (input === currentInput) {
        return;
    }

    currentInput = input;

    input.addEventListener("input", () => {
        updateLatestPrompt();

        console.log("Latest Prompt:", getLatestPrompt());
    });

    // Save current text immediately
    updateLatestPrompt();

    console.log("PromptForge: Prompt listener attached.");
}

/**
 * Observe DOM changes because ChatGPT
 * replaces elements dynamically.
 */
const observer = new MutationObserver(() => {
    attachPromptListener();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial attachment
attachPromptListener();

// Existing Day 7 message handling
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "TOGGLE_SIDEBAR") {

        console.log("TOGGLE_SIDEBAR message received.");

        togglePromptForgeSidebar();
    }

});