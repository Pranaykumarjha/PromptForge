function injectPromptForgeButton() {

    if (document.getElementById("promptforge-button")) {
        return;
    }

    const button = document.createElement("button");

    button.id = "promptforge-button";
    button.textContent = "PromptForge";

    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.padding = "10px 16px";
    button.style.border = "none";
    button.style.borderRadius = "10px";
    button.style.backgroundColor = "#2563EB";
    button.style.color = "#FFFFFF";
    button.style.cursor = "pointer";
    button.style.fontSize = "14px";
    button.style.fontWeight = "600";
    button.style.zIndex = "999999";

    button.addEventListener("click", () => {

        // Get the latest detected prompt
        const prompt = getLatestPrompt();

        console.log("Prompt to save:", prompt);

        // Send it to the background service worker
        chrome.runtime.sendMessage(
            {
                type: "SAVE_PROMPT",
                prompt: prompt
            },
            (response) => {
                console.log("Background Response:", response);
            }
        );

        // Existing Day 7 functionality
        const sidebar = document.getElementById("promptforge-sidebar");

        if (sidebar) {
            sidebar.classList.add("open");
            button.style.display = "none";
        }

    });

    document.body.appendChild(button);
}

injectPromptForgeButton();