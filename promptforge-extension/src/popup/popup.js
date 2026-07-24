console.log("PromptForge popup loaded.");

chrome.runtime.sendMessage(
    {
        type: "POPUP_OPENED"
    },
    (response) => {
        console.log("Background Response:", response);
    }
);

// =========================
// Toggle Sidebar
// =========================

const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");

toggleSidebarBtn.addEventListener("click", () => {

    console.log("Toggle button clicked.");

    chrome.runtime.sendMessage(
        {
            type: "TOGGLE_SIDEBAR"
        },
        (response) => {
            console.log("Toggle response:", response);
        }
    );

});

// =========================
// JWT Authentication
// =========================

const tokenInput = document.getElementById("tokenInput");
const saveTokenButton = document.getElementById("saveTokenButton");
const status = document.getElementById("status");

// Load saved JWT when popup opens
document.addEventListener("DOMContentLoaded", () => {

    chrome.storage.local.get(["jwt"], (result) => {

        if (result.jwt) {

            tokenInput.value = result.jwt;
            status.textContent = "JWT already saved.";

        }

    });

});

// Save JWT
saveTokenButton.addEventListener("click", () => {

    const token = tokenInput.value.trim();

    if (!token) {

        status.textContent = "Please enter a JWT.";
        return;

    }

    chrome.storage.local.set(
        {
            jwt: token
        },
        () => {

            status.textContent = "JWT saved successfully.";
            console.log("JWT stored in chrome.storage.local");

        }
    );

});