console.log("PromptForge Background Service Worker Loaded.");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    switch (message.type) {

        case "POPUP_OPENED":

            console.log("Popup opened.");

            sendResponse({
                success: true,
                message: "Background received popup message."
            });

            break;

        case "TOGGLE_SIDEBAR":

            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                (tabs) => {

                    if (!tabs.length) {
                        return;
                    }

                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        {
                            type: "TOGGLE_SIDEBAR"
                        },
                        () => {
                            console.log("Message sent to content script.");

                            if (chrome.runtime.lastError) {
                                console.log(chrome.runtime.lastError);
                            }
                        }
                    );

                }
            );

            break;

        case "SAVE_PROMPT":

            console.log("Prompt received from content script:");
            console.log(message.prompt);

            sendResponse({
                success: true
            });

            break;
    }

    return true;
});