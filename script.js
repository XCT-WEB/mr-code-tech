const YOUTUBE_CHANNEL = "https://www.youtube.com/@dude_dubai_code/featured";

const videos = [
    {
        title: "TUI Calculator in python#python #pythontutorial #code",
        description: "This video teaches you to build a working TUI python calculator check out my videos",
        url: "https://www.youtube.com/watch?v=LA6jVJAgqUE&t=31s",
        tag: "01"
    },
    {
        title: "I asked 2 AI's to make a personal dashboard #ai #githubcopilot #cursor #code",
        description: "I asked github copilot and cursor to generate a full stack dashboard",
        url: "https://www.youtube.com/watch?v=zm4PpHOO8fY&t=2s",
        tag: "02"
    },
    {
        title: "I asked to AI's to make me a house plan",
        description: "check my other vids",
        url: "https://www.youtube.com/watch?v=gr_N647CaOI&t=1s",
        tag: "03"
    }
];

function getYouTubeThumbnail(url, quality = "maxresdefault") {
    const videoId = new URL(url).searchParams.get("v");
    return videoId ? `https://img.youtube.com/vi/${videoId}/${quality}.jpg` : "";
}

function renderVideos() {
    const grid = document.getElementById("video-grid");
    if (!grid) return;

    grid.innerHTML = videos
        .map(
            (video) => `
        <article class="video-card">
            <a href="${video.url}" target="_blank" rel="noopener noreferrer">
                <img class="thumb" src="${getYouTubeThumbnail(video.url)}" alt="${video.title}" loading="lazy" onerror="this.onerror=null; this.src='${getYouTubeThumbnail(video.url, "hqdefault")}'">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            </a>
        </article>
    `
        )
        .join("");
}

function setupNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    links.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            links.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open menu");
        });
    });
}

function setupActiveSection() {
    const navAnchors = [...document.querySelectorAll(".nav-links a")];
    const sections = navAnchors
        .map((anchor) => document.querySelector(anchor.getAttribute("href")))
        .filter(Boolean);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = `#${entry.target.id}`;
                navAnchors.forEach((anchor) => {
                    anchor.classList.toggle("active", anchor.getAttribute("href") === id);
                });
            });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
}

function setupContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        const message = String(data.get("message") || "").trim();

        if (!name || !email || !message || !email.includes("@")) {
            status.textContent = "Please fill in a name, valid email, and message.";
            status.classList.add("error");
            return;
        }

        status.classList.remove("error");
        status.textContent = `Thanks, ${name}. I’ll get back to you soon.`;
        form.reset();
    });
}

document.getElementById("year").textContent = String(new Date().getFullYear());
renderVideos();
setupNav();
setupActiveSection();
setupContactForm();
