function injectPromptForgeSidebar() {
    if (document.getElementById("promptforge-sidebar")) {
        return;
    }

    const sidebar = document.createElement("div");

    sidebar.id = "promptforge-sidebar";

    sidebar.innerHTML = `
    <div class="pf-sidebar-header">
        <h2>PromptForge</h2>
        <button id="pf-close-sidebar">&times;</button>
    </div>

    <div class="pf-sidebar-body">

        <div class="pf-section">
            <h3>Quick Actions</h3>
            <p>Save prompts instantly from any AI website.</p>
        </div>

        <div class="pf-section">
            <h3>Prompt Library</h3>
            <p>Your saved prompts will appear here.</p>
        </div>

        <div class="pf-section">
            <h3>Favorites</h3>
            <p>Quickly access your favorite prompts.</p>
        </div>

        <div class="pf-section">
            <h3>Collections</h3>
            <p>Organize prompts into folders.</p>
        </div>

    </div>
`;
    document.body.appendChild(sidebar);

    const closeButton = document.getElementById("pf-close-sidebar");

    closeButton.addEventListener("click", () => {
        sidebar.classList.remove("open");

        const button = document.getElementById("promptforge-button");

        if (button) {
            button.style.display = "block";
        }
    });
}

injectPromptForgeSidebar();
function togglePromptForgeSidebar() {

    const sidebar = document.getElementById("promptforge-sidebar");

    if (!sidebar) {
        return;
    }

    sidebar.classList.toggle("open");

    const button = document.getElementById("promptforge-button");

    if (button) {
        button.style.display = sidebar.classList.contains("open")
            ? "none"
            : "block";
    }
}