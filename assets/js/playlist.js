
/*
 * OSTM Radio - Playlist Manager
 * Loads artist and song information from playlist.json
 * and generates the Bootstrap accordion automatically.
 */

document.addEventListener("DOMContentLoaded", loadPlaylist);

async function loadPlaylist() {
    const accordion = document.getElementById("accordion");

    if (!accordion) {
        console.error("Playlist container not found.");
        return;
    }

    try {
        // Fetch the latest playlist data
        const response = await fetch("/playlist/playlist.json", {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.artists)) {
            throw new Error("Invalid playlist data.");
        }

        // Clear existing playlist content
        accordion.replaceChildren();

        // Generate an accordion panel for each artist
        data.artists.forEach((artist, index) => {

            const panel = document.createElement("div");
            panel.className = "panel";

            // Artist heading
            const header = document.createElement("div");
            header.className = "panel-header";
            header.id = `heading${index}`;

            const button = document.createElement("button");
            button.className = "panel-link collapsed";
            button.type = "button";
            button.setAttribute("data-toggle", "collapse");
            button.setAttribute("data-target", `#collapse${index}`);
            button.setAttribute("aria-expanded", "false");
            button.setAttribute("aria-controls", `collapse${index}`);
            button.textContent = artist.name;

            // Collapsible song container
            const collapse = document.createElement("div");
            collapse.className = "collapse";
            collapse.id = `collapse${index}`;
            collapse.setAttribute("aria-labelledby", header.id);
            collapse.setAttribute("data-parent", "#accordion");

            const body = document.createElement("div");
            body.className = "panel-body";

            // Add songs
            if (Array.isArray(artist.songs)) {
                artist.songs.forEach(song => {
                    const paragraph = document.createElement("p");
                    paragraph.textContent = song;
                    body.appendChild(paragraph);
                });
            }

            // Assemble the artist panel
            header.appendChild(button);
            collapse.appendChild(body);

            panel.appendChild(header);
            panel.appendChild(collapse);

            accordion.appendChild(panel);
        });

        console.log(
            `OSTM Radio: Loaded ${data.artists.length} artists.`
        );

    } catch (error) {
        console.error("OSTM Radio Playlist Error:", error);

        accordion.textContent =
            "The playlist is currently unavailable. Please try again later.";
    }
}
