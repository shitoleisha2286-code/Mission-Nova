import * as THREE from "three";

const byId = (id) => document.getElementById(id);
const entryModal = byId("entry-modal");
const nameInput = byId("astronaut-name");
const planets = [
    { name: "Mercury", kind: "Planet", color: 0xa9a39c, radius: .28, orbit: 2.2, speed: .42, distance: "57.9 million km", size: "4,879 km", temperature: "167°C average", gravity: "3.7 m/s²", atmosphere: "Almost none", moons: "0", description: "The smallest planet and closest to the Sun. Its rocky surface has many old impact craters.", fact: "One Mercury day lasts longer than its year.", discovery: "Visited by Mariner 10 and MESSENGER." },
    { name: "Venus", kind: "Planet", color: 0xe7b36c, radius: .39, orbit: 3.2, speed: .32, distance: "108.2 million km", size: "12,104 km", temperature: "465°C average", gravity: "8.87 m/s²", atmosphere: "Thick carbon dioxide", moons: "0", description: "A rocky world wrapped in thick clouds. Its powerful greenhouse effect makes the surface extremely hot.", fact: "Venus rotates in the opposite direction to most planets.", discovery: "Explored by the Magellan and Akatsuki missions." },
    { name: "Earth", kind: "Planet", color: 0x318cff, radius: .46, orbit: 4.35, speed: .26, distance: "149.6 million km", size: "12,742 km", temperature: "15°C average", gravity: "9.81 m/s²", atmosphere: "Nitrogen and oxygen", moons: "1", description: "Our home world. Liquid water, a protective atmosphere and suitable temperatures support a great variety of life.", fact: "Earth is the only world currently known to support life.", discovery: "Studied by satellites, space stations and explorers." },
    { name: "Mars", kind: "Planet", color: 0xe46b48, radius: .36, orbit: 5.55, speed: .21, distance: "227.9 million km", size: "6,779 km", temperature: "−65°C average", gravity: "3.71 m/s²", atmosphere: "Thin carbon dioxide", moons: "2", description: "The Red Planet has dusty deserts, ancient river channels and enormous volcanoes. Robotic rovers explore its surface.", fact: "Olympus Mons on Mars is the tallest known volcano in the Solar System.", discovery: "Explored by Curiosity, Perseverance and other robotic missions." },
    { name: "Jupiter", kind: "Planet", color: 0xd7b18b, radius: .72, orbit: 7.05, speed: .14, distance: "778.6 million km", size: "139,820 km", temperature: "−110°C cloud tops", gravity: "24.79 m/s²", atmosphere: "Mostly hydrogen and helium", moons: "95 known", description: "The largest planet is a gas giant with colourful cloud bands, powerful storms and a family of moons.", fact: "The Great Red Spot is a giant storm that has raged for centuries.", discovery: "Visited by Pioneer, Voyager, Galileo and Juno." },
    { name: "Saturn", kind: "Planet", color: 0xe7d3a1, radius: .62, orbit: 8.65, speed: .11, distance: "1.43 billion km", size: "116,460 km", temperature: "−140°C cloud tops", gravity: "10.44 m/s²", atmosphere: "Mostly hydrogen and helium", moons: "146 known", description: "A gas giant famous for its broad rings of icy and rocky pieces. The rings are wide but remarkably thin.", fact: "Saturn is less dense than water on average.", discovery: "The Cassini spacecraft studied Saturn for 13 years." },
    { name: "Uranus", kind: "Planet", color: 0x80d9e4, radius: .50, orbit: 10.15, speed: .085, distance: "2.87 billion km", size: "50,724 km", temperature: "−195°C average", gravity: "8.69 m/s²", atmosphere: "Hydrogen, helium and methane", moons: "28 known", description: "A pale blue-green ice giant with a cold atmosphere and an unusually tilted rotation axis.", fact: "Uranus spins almost on its side.", discovery: "Discovered by William Herschel in 1781; visited by Voyager 2." },
    { name: "Neptune", kind: "Planet", color: 0x4169e1, radius: .49, orbit: 11.55, speed: .067, distance: "4.50 billion km", size: "49,244 km", temperature: "−200°C average", gravity: "11.15 m/s²", atmosphere: "Hydrogen, helium and methane", moons: "16 known", description: "A distant ice giant with a deep blue colour and some of the fastest winds in the Solar System.", fact: "Neptune takes about 165 Earth years to orbit the Sun.", discovery: "Visited by Voyager 2 in 1989." },
    { name: "Moon", kind: "Natural satellite", color: 0xb9bec9, radius: .17, orbit: 4.9, speed: .33, distance: "384,400 km from Earth", size: "3,475 km", temperature: "−20°C average", gravity: "1.62 m/s²", atmosphere: "Extremely thin exosphere", moons: "Orbits Earth", description: "Earth's natural satellite has a cratered surface, ancient lava plains and no breathable air.", fact: "Astronauts on the Moon weigh about one-sixth as much as on Earth.", discovery: "First human landing: Apollo 11, in 1969." },
    { name: "Pluto", kind: "Dwarf planet", color: 0xc69b80, radius: .21, orbit: 13.0, speed: .052, distance: "5.9 billion km average", size: "2,377 km", temperature: "−225°C average", gravity: ".62 m/s²", atmosphere: "Thin nitrogen atmosphere", moons: "5", description: "Pluto is a small, icy dwarf planet in the Kuiper Belt beyond Neptune. It is not one of the eight planets.", fact: "Pluto has a heart-shaped region on its surface.", discovery: "New Horizons flew past Pluto in 2015." }
];

const missionData = {
    Moon: {
        color: 0x8c929c, accent: 0xc9d2e1, habitat: ["Choose a level, crater-protected site", "Build a radiation-shielded habitat", "Inspect your suit and collect a rock sample"],
        fieldLessons: [
            {
                prompt: "Which landing zone is safest for a crew and their lander?",
                options: ["A broad, gently sloping plain with few boulders", "The steep wall of a dramatic crater", "A permanently shadowed crater floor"],
                answer: 0,
                hint: "Check the slope, boulder hazards and how well the lander can see the terrain.",
                explanation: "A flatter, well-lit site lowers landing and walking risks. The crew can still study nearby craters without landing on their steep slopes."
            },
            {
                prompt: "How can a lunar habitat reduce radiation and temperature swings?",
                options: ["Cover it with a thick layer of lunar soil", "Use a thin glass roof", "Leave the airlock open to the lunar vacuum"],
                answer: 0,
                hint: "Think about what local material could make a thick protective layer around a sealed shelter.",
                explanation: "Lunar soil (regolith) can shield a habitat from radiation and micrometeoroids. Insulation and a sealed pressure vessel are also essential."
            },
            {
                prompt: "Before an EVA (spacewalk), which check matters most?",
                options: ["Verify suit pressure, oxygen, battery and radio", "Open the suit helmet to equalize pressure", "Rely on the lander to supply air outdoors"],
                answer: 0,
                hint: "Outside the lander there is no air supply; the suit must support the astronaut independently.",
                explanation: "The Moon has no breathable atmosphere. A pressure and life-support check helps confirm the suit can supply oxygen, power and communications throughout the EVA."
            }
        ],
        intro: "A simulated lunar expedition. Learn how crews prepare for a place with no breathable air and very weak gravity.",
        quiz: [
            { q: "Why does a Moon explorer need a spacesuit?", options: ["The Moon has no breathable air", "The Moon is made of ice", "The Moon has too much oxygen"], answer: 0, explain: "The Moon has almost no atmosphere, so a spacesuit supplies air and pressure." },
            { q: "How strong is gravity on the Moon compared with Earth?", options: ["About the same", "About one-sixth as strong", "Twice as strong"], answer: 1, explain: "Lunar gravity is about one-sixth of Earth's." },
            { q: "What helps protect a lunar habitat from radiation?", options: ["A thin glass roof", "Covering it with lunar soil", "Leaving the door open"], answer: 1, explain: "A thick layer of lunar soil can help shield a habitat." },
            { q: "Why do astronauts carefully manage water?", options: ["It is a limited resource", "It evaporates instantly indoors", "It makes gravity stronger"], answer: 0, explain: "Water is precious on a remote mission and must be conserved and recycled." },
            { q: "What should happen before a spacewalk?", options: ["Check suit, oxygen and communication", "Turn off every radio", "Leave the habitat unpressurised"], answer: 0, explain: "A suit check helps protect oxygen, communication and life support." }
        ]
    },
    Mars: {
        color: 0xb94f35, accent: 0xffb18d, habitat: ["Choose a sheltered site away from steep slopes", "Build a dust- and radiation-protected habitat", "Check your suit and collect a rock sample"],
        fieldLessons: [
            {
                prompt: "What is a sensible landing-site choice for a Mars crew?",
                options: ["A broad, relatively level area with useful science nearby", "A steep canyon wall with no clear landing zone", "The middle of a dust storm"],
                answer: 0,
                hint: "Balance landing safety and communications with the science target; avoid severe terrain and active storms.",
                explanation: "A level site reduces landing hazards. Crews can balance safe terrain, sunlight, communications and access to scientifically useful rocks."
            },
            {
                prompt: "What should a Mars habitat do about dust and radiation?",
                options: ["Keep pressure seals clean and add shielding, such as covered regolith", "Leave doors open so dust can blow through", "Use only an unshielded glass shelter"],
                answer: 0,
                hint: "Protect both the sealed pressure boundary and the crew from the exposed surface environment.",
                explanation: "Fine dust can damage seals and equipment, while the thin atmosphere offers limited radiation protection. Sealed airlocks, dust control and shielding all help."
            },
            {
                prompt: "During an EVA, a suit warning appears. What is the safest response?",
                options: ["Stop work, report it and follow the planned return procedure", "Ignore it until the sample is collected", "Remove the helmet to inspect the suit"],
                answer: 0,
                hint: "A life-support warning should take priority over a science objective; Mars air cannot replace suit oxygen.",
                explanation: "A suit warning can signal a life-support problem. The astronaut should tell the crew and follow the mission's safe-return checklist; Mars air is not breathable."
            }
        ],
        intro: "A simulated future Mars expedition. Human trips to Mars have not happened; this mission imagines the preparation such a journey would need.",
        quiz: [
            { q: "Why is Mars's atmosphere unsafe to breathe?", options: ["It is mostly carbon dioxide and very thin", "It is pure oxygen", "It is thicker than Earth's"], answer: 0, explain: "Mars has a thin atmosphere made mostly of carbon dioxide." },
            { q: "What can a major dust storm do to a Mars mission?", options: ["Reduce sunlight and visibility", "Create breathable air", "Stop gravity"], answer: 0, explain: "Dust can reduce sunlight, visibility and the performance of solar equipment." },
            { q: "Why might communication with Mars have a delay?", options: ["Radio signals take time to travel far", "Mars has no day or night", "Rovers cannot use radios"], answer: 0, explain: "Mars is far away, so radio messages take time to travel between planets." },
            { q: "What should a Mars habitat help protect astronauts from?", options: ["Radiation, dust and extreme cold", "Ocean tides", "Too much oxygen"], answer: 0, explain: "A habitat must protect crews from radiation, dust and harsh temperatures." },
            { q: "What is a sensible way to prepare for a Mars surface trip?", options: ["Check suit, oxygen and communications", "Walk outside without a suit", "Ignore the weather"], answer: 0, explain: "A careful suit and communication check helps keep a crew safe." }
        ]
    }
};

let explorerRenderer;
let explorerScene;
let explorerCamera;
let explorerFrame = 0;
let explorerResize;
let explorerTargets = [];
let selectedPlanet = "Earth";
let explorerView = new THREE.Vector3(0, 0, 0);
let astronautName = "";

function addStars(container, count = 110) {
    for (let i = 0; i < count; i += 1) {
        const star = document.createElement("i");
        star.className = "star";
        star.setAttribute("aria-hidden", "true");
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty("--duration", `${2 + Math.random() * 4}s`);
        star.style.setProperty("--delay", `${Math.random() * 4}s`);
        container.appendChild(star);
    }
}

function openNameModal() {
    entryModal.hidden = false;
    const saved = sessionStorage.getItem("missionNovaName");
    if (saved) nameInput.value = saved;
    window.setTimeout(() => nameInput.focus(), 50);
}

function closeNameModal() {
    entryModal.hidden = true;
    byId("begin-button").focus();
}

const NASA_IMAGE_SEARCH_URL = "https://images-api.nasa.gov/search";
const NASA_EPIC_URL = "https://epic.gsfc.nasa.gov/api/natural";
const NASA_APOD_FEED_URL = "https://science.nasa.gov/feed/apod-basic/";

async function fetchNasaResponse(url) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`NASA API returned HTTP ${response.status}`);
        return response;
    } finally {
        window.clearTimeout(timeout);
    }
}

async function fetchNasaJSON(url) {
    const response = await fetchNasaResponse(url);
    return response.json();
}

function nasaImageURL(value) {
    if (!value) return null;
    try {
        const url = new URL(value);
        return url.protocol === "https:" && (url.hostname === "nasa.gov" || url.hostname.endsWith(".nasa.gov"))
            ? url.href
            : null;
    } catch {
        return null;
    }
}

function setApiStatus(id, message, state = "loading") {
    const status = byId(id);
    status.textContent = message;
    status.hidden = false;
    status.classList.toggle("is-loading", state === "loading");
    status.classList.toggle("is-error", state === "error");
}

function formatNasaDate(value) {
    const utcValue = /^\d{4}-\d{2}-\d{2}(?: |$)/.test(value)
        ? `${value.replace(" ", "T")}Z`
        : value;
    const date = new Date(utcValue);
    return Number.isNaN(date.getTime())
        ? value
        : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeZone: "UTC" }).format(date);
}

function makeNASAImageCard(image) {
    const card = document.createElement("article");
    card.className = "nova-image-card";

    const link = document.createElement("a");
    link.className = "nova-live-image";
    link.href = image.full;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Open full-size NASA image: ${image.title}`);

    const photo = document.createElement("img");
    photo.src = image.preview;
    photo.alt = image.title;
    photo.loading = "lazy";
    photo.addEventListener("error", () => {
        const gallery = card.parentElement;
        card.remove();
        if (gallery && !gallery.querySelector(".nova-image-card")) {
            setApiStatus(gallery.id + "-status", "NASA image files are temporarily unavailable. Please try again later.", "error");
        } else {
            setApiStatus(`${gallery.id}-status`, "Some NASA image files could not be loaded.", "error");
        }
    }, { once: true });
    link.appendChild(photo);

    const title = document.createElement("h4");
    title.textContent = image.title;
    const meta = document.createElement("p");
    meta.className = "nova-image-credit";
    meta.textContent = `${formatNasaDate(image.date)} · ${image.credit}`;

    card.append(link, title, meta);
    return card;
}

async function loadNASAImageGallery(destination, query) {
    const galleryId = destination === "Moon" ? "nova-moon-gallery" : "nova-mars-gallery";
    const statusId = `${galleryId}-status`;
    try {
        const url = new URL(NASA_IMAGE_SEARCH_URL);
        url.searchParams.set("q", query);
        url.searchParams.set("media_type", "image");
        url.searchParams.set("page_size", "24");
        const payload = await fetchNasaJSON(url);
        const records = payload.collection?.items ?? [];
        const images = records.flatMap((record) => {
            const data = record.data?.[0];
            const title = data?.title?.trim();
            const details = `${title ?? ""} ${data?.description ?? ""} ${(data?.keywords ?? []).join(" ")}`;
            if (!data || data.media_type !== "image" || !title || /artist.?s? concept/i.test(details)) return [];
            if (destination === "Mars" && !/rover/i.test(details)) return [];
            if (destination === "Moon" && !/moon|lunar|apollo/i.test(details)) return [];

            const links = record.links ?? [];
            const preview = nasaImageURL(links.find((item) => item.rel === "preview")?.href)
                ?? nasaImageURL(links.find((item) => item.render === "image")?.href);
            const full = nasaImageURL(links.find((item) => item.rel === "canonical")?.href)
                ?? nasaImageURL(links.find((item) => item.render === "image")?.href);
            if (!preview || !full) return [];
            const creator = data.secondary_creator || data.photographer || data.center || "NASA";
            return [{
                title,
                preview,
                full,
                date: data.date_created,
                credit: /nasa/i.test(creator) ? creator : `NASA / ${creator}`
            }];
        }).slice(0, 3);

        if (!images.length) throw new Error(`NASA returned no matching ${destination} photographs.`);
        const gallery = byId(galleryId);
        gallery.replaceChildren(...images.map(makeNASAImageCard));
        byId(statusId).hidden = true;
    } catch (error) {
        console.error(`Could not load NASA ${destination} images:`, error);
        setApiStatus(statusId, `NASA ${destination} photos are temporarily unavailable. Please try again later.`, "error");
    }
}

async function loadEPICImage() {
    const statusId = "nova-epic-status";
    try {
        const records = await fetchNasaJSON(NASA_EPIC_URL);
        const latest = Array.isArray(records) ? records[records.length - 1] : null;
        if (!latest?.date || !latest.image) throw new Error("NASA EPIC returned no recent image.");

        const date = latest.date.slice(0, 10);
        const [year, month, day] = date.split("-");
        const imageURL = nasaImageURL(`https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${latest.image}.jpg`);
        if (!imageURL) throw new Error("NASA EPIC returned an invalid image URL.");

        const link = byId("nova-epic-link");
        const image = byId("nova-epic-image");
        image.addEventListener("error", () => {
            link.hidden = true;
            setApiStatus(statusId, "NASA's Earth image file is temporarily unavailable. Please try again later.", "error");
        }, { once: true });
        image.src = imageURL;
        image.alt = `Earth photographed by NASA's EPIC camera on ${formatNasaDate(latest.date)}`;
        link.href = imageURL;
        link.hidden = false;
        byId("nova-epic-caption").textContent = latest.caption || "Earth image from NASA's EPIC camera aboard DSCOVR.";
        const location = latest.centroid_coordinates;
        byId("nova-epic-info").textContent = `${formatNasaDate(latest.date)} · ${latest.date.slice(11, 19)} UTC`
            + (location ? ` · View centered near ${location.lat.toFixed(2)}°, ${location.lon.toFixed(2)}°` : "");
        byId(statusId).hidden = true;
    } catch (error) {
        console.error("Could not load the NASA EPIC image:", error);
        setApiStatus(statusId, "NASA's latest Earth image is temporarily unavailable. Please try again later.", "error");
    }
}

async function loadAPOD() {
    const statusId = "nova-apod-status";
    try {
        const response = await fetchNasaResponse(NASA_APOD_FEED_URL);
        const xml = new DOMParser().parseFromString(await response.text(), "application/xml");
        if (xml.querySelector("parsererror")) throw new Error("NASA APOD feed was not valid XML.");
        const item = xml.querySelector("item");
        if (!item) throw new Error("NASA APOD feed did not contain today's entry.");
        const field = (name) => Array.from(item.children).find((child) => child.localName === name)?.textContent.trim() ?? "";
        const imageURL = nasaImageURL(field("hdurl"));
        const pageURL = nasaImageURL(field("url") || field("link"));
        if (!imageURL || !pageURL) throw new Error("NASA APOD entry did not include a usable image and page.");

        const explanationMarkup = field("explanation");
        const explanationDocument = new DOMParser().parseFromString(explanationMarkup, "text/html");
        const creditDocument = new DOMParser().parseFromString(field("credit"), "text/html");
        const link = byId("nova-apod-link");
        const image = byId("nova-apod-image");
        image.addEventListener("error", () => {
            link.hidden = true;
            setApiStatus(statusId, "NASA's daily image file is temporarily unavailable. Please try again later.", "error");
        }, { once: true });
        image.src = imageURL;
        image.alt = field("alt") || field("primary_image_alt") || field("title");
        link.href = pageURL;
        link.hidden = false;
        byId("nova-apod-title").textContent = field("title");
        byId("nova-apod-date").textContent = formatNasaDate(field("pubDate"));
        byId("nova-apod-explanation").textContent = explanationDocument.body.textContent.trim();
        const credit = creditDocument.body.textContent.trim();
        byId("nova-apod-credit").textContent = credit ? `NASA APOD · ${credit}` : "NASA Astronomy Picture of the Day";
        byId(statusId).hidden = true;
    } catch (error) {
        console.error("Could not load NASA Astronomy Picture of the Day:", error);
        setApiStatus(statusId, "NASA's daily astronomy discovery is temporarily unavailable. Please try again later.", "error");
    }
}

byId("begin-button").addEventListener("click", openNameModal);
byId("close-modal").addEventListener("click", closeNameModal);
entryModal.addEventListener("click", (event) => {
    if (event.target === entryModal) closeNameModal();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !entryModal.hidden) closeNameModal();
});
byId("astronaut-form").addEventListener("submit", (event) => {
    event.preventDefault();
    astronautName = nameInput.value.trim();
    if (!astronautName) {
        nameInput.focus();
        return;
    }
    sessionStorage.setItem("missionNovaName", astronautName);
    entryModal.hidden = true;
    showExplorer();
    requestAnimationFrame(() => byId("nova-home-button").focus());
});

function showExplorer() {
    stopExplorer();
    document.getElementById("nova-explorer")?.remove();
    const explorer = document.createElement("section");
    explorer.id = "nova-explorer";
    explorer.setAttribute("aria-label", "Interactive Solar System explorer");
    explorer.innerHTML = `
        <header class="nova-topbar">
            <div class="nova-brand">✦ MISSION NOVA</div>
            <div class="nova-callsign">ASTRONAUT: <span id="nova-name"></span></div>
            <button class="nova-back-button" id="nova-home-button" type="button">← Home</button>
        </header>
        <div class="nova-heading">
            <div class="nova-kicker">YOUR COSMIC ATLAS</div>
            <h1>Explore the Solar System</h1>
            <p id="nova-welcome"></p>
        </div>
        <div class="nova-layout">
            <div class="nova-system-panel">
                <canvas id="nova-solar-canvas" aria-label="Interactive animated three-dimensional Solar System"></canvas>
                <div class="nova-system-hint">SELECT A PLANET · DRAG TO ORBIT · SCROLL OR PINCH TO ZOOM · DISTANCES NOT TO SCALE</div>
            </div>
            <aside class="nova-planet-info" aria-live="polite">
                <div class="nova-info-label" id="nova-info-kind">PLANET DATABASE</div>
                <h2 id="nova-info-name">Earth</h2>
                <p id="nova-info-description" class="nova-info-description"></p>
                <div class="nova-stat-grid">
                    <div class="nova-stat"><small id="nova-info-distance-label">DISTANCE FROM SUN</small><strong id="nova-info-distance"></strong></div>
                    <div class="nova-stat"><small>DIAMETER</small><strong id="nova-info-size"></strong></div>
                    <div class="nova-stat"><small>AVERAGE TEMPERATURE</small><strong id="nova-info-temperature"></strong></div>
                    <div class="nova-stat"><small>GRAVITY</small><strong id="nova-info-gravity"></strong></div>
                    <div class="nova-stat"><small>ATMOSPHERE</small><strong id="nova-info-atmosphere"></strong></div>
                    <div class="nova-stat"><small>MOONS</small><strong id="nova-info-moons"></strong></div>
                </div>
                <p id="nova-info-fact" class="nova-fact"></p>
                <p id="nova-info-discovery" class="nova-info-description"></p>
                <div class="nova-planet-picker" id="nova-planet-picker" aria-label="Choose a world"></div>
            </aside>
        </div>
        <section class="nova-missions" aria-labelledby="nova-mission-heading">
            <h2 id="nova-mission-heading">Choose your expedition</h2>
            <p>Every mission is a learning simulation. Pick a destination to begin.</p>
            <div class="nova-mission-grid">
                <article class="nova-mission-card">
                    <span class="mission-symbol" aria-hidden="true">🌙</span>
                    <h3>MOON MISSION</h3>
                    <p>Journey to Earth's closest neighbour. Explore the lunar surface and practise astronaut survival skills.</p>
                    <button id="nova-moon-button" type="button">START MOON MISSION →</button>
                    <p class="nova-api-status is-loading" id="nova-moon-gallery-status" role="status">Loading real NASA Moon photographs…</p>
                    <div class="nova-image-gallery" id="nova-moon-gallery" aria-label="NASA Moon photographs"></div>
                </article>
                <article class="nova-mission-card mars">
                    <span class="mission-symbol" aria-hidden="true">🔴</span>
                    <h3>MARS MISSION</h3>
                    <p>Travel to the Red Planet in a future-mission simulation. Explore its environment and prepare for life there.</p>
                    <button id="nova-mars-button" type="button">START MARS MISSION →</button>
                    <p class="nova-api-status is-loading" id="nova-mars-gallery-status" role="status">Loading real NASA Mars rover photographs…</p>
                    <div class="nova-image-gallery" id="nova-mars-gallery" aria-label="NASA Mars rover photographs"></div>
                </article>
            </div>
            <p class="nova-notice" id="nova-mission-notice" aria-live="polite"></p>
        </section>`;
    explorer.insertAdjacentHTML("beforeend", `
        <section class="nova-live-data" aria-label="Live NASA discoveries">
            <article class="nova-live-card" aria-labelledby="nova-epic-heading">
                <div class="nova-kicker">EARTH OBSERVATORY · DSCOVR</div>
                <h2 id="nova-epic-heading">Earth from NASA EPIC</h2>
                <p class="nova-api-status is-loading" id="nova-epic-status" role="status">Loading the latest Earth image from NASA EPIC…</p>
                <a class="nova-live-image" id="nova-epic-link" target="_blank" rel="noopener noreferrer" aria-label="Open full-size NASA EPIC Earth image" hidden>
                    <img id="nova-epic-image" alt="" loading="lazy">
                </a>
                <p id="nova-epic-caption" class="nova-live-caption"></p>
                <p id="nova-epic-info" class="nova-image-credit"></p>
                <p class="nova-source">Image: NASA EPIC / NOAA DSCOVR</p>
            </article>
            <article class="nova-live-card nova-apod-card" aria-labelledby="nova-apod-heading">
                <div class="nova-kicker">TODAY’S ASTRONOMY DISCOVERY</div>
                <h2 id="nova-apod-heading">NASA Astronomy Picture of the Day</h2>
                <p class="nova-api-status is-loading" id="nova-apod-status" role="status">Loading today’s official NASA APOD…</p>
                <a class="nova-live-image" id="nova-apod-link" target="_blank" rel="noopener noreferrer" aria-label="Open today's NASA Astronomy Picture of the Day" hidden>
                    <img id="nova-apod-image" alt="" loading="lazy">
                </a>
                <h3 id="nova-apod-title"></h3>
                <p id="nova-apod-date" class="nova-image-credit"></p>
                <p id="nova-apod-explanation" class="nova-live-explanation"></p>
                <p id="nova-apod-credit" class="nova-source"></p>
            </article>
        </section>`);
    document.body.appendChild(explorer);
    byId("nova-name").textContent = astronautName;
    byId("nova-welcome").textContent = `Welcome, ${astronautName}. Explore our planetary neighbourhood, select a world to discover its secrets, then choose your mission.`;
    byId("nova-home-button").addEventListener("click", () => {
        stopExplorer();
        explorer.remove();
        byId("begin-button").focus();
    });
    byId("nova-moon-button").addEventListener("click", () => startMission("Moon"));
    byId("nova-mars-button").addEventListener("click", () => startMission("Mars"));
    buildPlanetPicker();
    updatePlanetInfo(selectedPlanet);
    startExplorer();
    void loadNASAImageGallery("Moon", "Apollo lunar surface");
    void loadNASAImageGallery("Mars", "Mars rover");
    void loadEPICImage();
    void loadAPOD();
}

function buildPlanetPicker() {
    const picker = byId("nova-planet-picker");
    picker.replaceChildren();
    planets.forEach((planet) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = planet.name === "Pluto" ? "Pluto · dwarf" : planet.name;
        button.dataset.planet = planet.name;
        button.classList.toggle("active", planet.name === selectedPlanet);
        button.setAttribute("aria-pressed", String(planet.name === selectedPlanet));
        button.addEventListener("click", () => selectPlanet(planet.name));
        picker.appendChild(button);
    });
}

function updatePlanetInfo(name) {
    const planet = planets.find((item) => item.name === name);
    if (!planet) return;
    byId("nova-info-kind").textContent = planet.kind.toUpperCase();
    byId("nova-info-name").textContent = planet.name;
    byId("nova-info-description").textContent = planet.description;
    byId("nova-info-distance-label").textContent = name === "Moon" ? "DISTANCE FROM EARTH" : "DISTANCE FROM SUN";
    byId("nova-info-distance").textContent = planet.distance;
    byId("nova-info-size").textContent = planet.size;
    byId("nova-info-temperature").textContent = planet.temperature;
    byId("nova-info-gravity").textContent = planet.gravity;
    byId("nova-info-atmosphere").textContent = planet.atmosphere;
    byId("nova-info-moons").textContent = planet.moons;
    byId("nova-info-fact").textContent = `✦ DID YOU KNOW? ${planet.fact}`;
    byId("nova-info-discovery").textContent = `Exploration: ${planet.discovery}`;
}

function selectPlanet(name) {
    selectedPlanet = name;
    updatePlanetInfo(name);
    document.querySelectorAll(".nova-planet-picker button").forEach((button) => {
        const active = button.dataset.planet === name;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });
    const target = explorerTargets.find((item) => item.userData.planetName === name);
    if (target) {
        target.getWorldPosition(explorerView);
        explorerViewTarget.copy(explorerView);
        focusDistance = Math.max(5, target.userData.planetRadius * 5);
    }
}

let explorerViewTarget = new THREE.Vector3();
let focusDistance = 21;

function makePlanetTexture(name, color) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const hex = `#${color.toString(16).padStart(6, "0")}`;
    const gradient = ctx.createLinearGradient(0, 0, 512, 0);
    gradient.addColorStop(0, "#111827");
    gradient.addColorStop(.24, hex);
    gradient.addColorStop(.72, hex);
    gradient.addColorStop(1, "#111827");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    let seed = name.length * 971;
    const random = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
    };
    if (["Jupiter", "Saturn", "Uranus", "Neptune"].includes(name)) {
        for (let y = 0; y < 256; y += 14) {
            ctx.globalAlpha = .12 + random() * .28;
            ctx.fillStyle = random() > .5 ? "#fff0d5" : "#291d34";
            ctx.fillRect(0, y, 512, 4 + random() * 9);
        }
        if (name === "Jupiter") {
            ctx.globalAlpha = .65;
            ctx.fillStyle = "#a74b38";
            ctx.beginPath();
            ctx.ellipse(335, 165, 40, 16, -.08, 0, Math.PI * 2);
            ctx.fill();
        }
    } else {
        for (let i = 0; i < 95; i += 1) {
            const x = random() * 512;
            const y = random() * 256;
            const r = 2 + random() * 13;
            ctx.globalAlpha = .08 + random() * .2;
            ctx.fillStyle = random() > .5 ? "#fff" : "#171b27";
            ctx.beginPath();
            ctx.ellipse(x, y, r * 1.4, r, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.globalAlpha = 1;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function startExplorer() {
    const canvas = byId("nova-solar-canvas");
    try {
        explorerScene = new THREE.Scene();
        explorerScene.background = new THREE.Color(0x030714);
        explorerCamera = new THREE.PerspectiveCamera(42, 1, .1, 120);
        explorerCamera.position.set(0, 15, 20);
        explorerCamera.lookAt(0, 0, 0);
        explorerRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
        explorerRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        explorerRenderer.outputColorSpace = THREE.SRGBColorSpace;
        explorerRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        explorerRenderer.toneMappingExposure = 1.15;
        explorerScene.add(new THREE.AmbientLight(0xc5d5ff, 1.2));
        const sunlight = new THREE.PointLight(0xffedc4, 420, 100);
        explorerScene.add(sunlight);

        const sun = new THREE.Mesh(
            new THREE.SphereGeometry(.9, 48, 36),
            new THREE.MeshBasicMaterial({ color: 0xffc64d })
        );
        explorerScene.add(sun);
        const glow = new THREE.Mesh(
            new THREE.SphereGeometry(1.14, 32, 24),
            new THREE.MeshBasicMaterial({ color: 0xff922d, transparent: true, opacity: .16, side: THREE.BackSide })
        );
        explorerScene.add(glow);

        const starPositions = new Float32Array(4000 * 3);
        for (let i = 0; i < starPositions.length; i += 1) starPositions[i] = (Math.random() - .5) * 90;
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
        explorerScene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xd8e6ff, size: .075, sizeAttenuation: true })));

        explorerTargets = [];
        const orbiting = [];
        planets.forEach((planet, index) => {
            const orbit = new THREE.Mesh(
                new THREE.RingGeometry(planet.orbit - .009, planet.orbit + .009, 128),
                new THREE.MeshBasicMaterial({ color: 0x536889, side: THREE.DoubleSide, transparent: true, opacity: .42 })
            );
            orbit.rotation.x = -Math.PI / 2;
            explorerScene.add(orbit);
            const pivot = new THREE.Group();
            pivot.rotation.y = index * .71;
            explorerScene.add(pivot);
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(planet.radius, 36, 28),
                new THREE.MeshStandardMaterial({ map: makePlanetTexture(planet.name, planet.color), roughness: .88 })
            );
            sphere.position.x = planet.orbit;
            sphere.userData.planetName = planet.name;
            sphere.userData.planetRadius = planet.radius;
            sphere.userData.orbitSpeed = planet.speed;
            pivot.add(sphere);
            if (planet.name === "Saturn") {
                const ring = new THREE.Mesh(
                    new THREE.RingGeometry(planet.radius * 1.27, planet.radius * 1.9, 80),
                    new THREE.MeshStandardMaterial({ color: 0xd8c49b, side: THREE.DoubleSide, transparent: true, opacity: .78, roughness: 1 })
                );
                ring.rotation.x = Math.PI / 2.25;
                sphere.add(ring);
            }
            explorerTargets.push(sphere);
            orbiting.push({ pivot, sphere, planet, angle: index * .71 });
        });

        const moon = planets.find((planet) => planet.name === "Moon");
        const moonMesh = explorerTargets.find((mesh) => mesh.userData.planetName === "Moon");
        const earthMesh = explorerTargets.find((mesh) => mesh.userData.planetName === "Earth");
        if (moon && moonMesh && earthMesh) {
            moonMesh.scale.setScalar(.78);
            moonMesh.userData.orbitEarth = true;
        }

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        let dragStart = null;
        let lastPointer = null;
        let yaw = Math.PI;
        let pitch = .58;
        canvas.addEventListener("pointerdown", (event) => {
            dragStart = { x: event.clientX, y: event.clientY };
            lastPointer = dragStart;
            canvas.setPointerCapture(event.pointerId);
        });
        canvas.addEventListener("pointermove", (event) => {
            if (!lastPointer) return;
            yaw -= (event.clientX - lastPointer.x) * .006;
            pitch = THREE.MathUtils.clamp(pitch + (event.clientY - lastPointer.y) * .004, .12, 1.42);
            lastPointer = { x: event.clientX, y: event.clientY };
        });
        const clearDrag = (event) => {
            if (dragStart && lastPointer && Math.hypot(lastPointer.x - dragStart.x, lastPointer.y - dragStart.y) < 5) {
                const rect = canvas.getBoundingClientRect();
                pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
                raycaster.setFromCamera(pointer, explorerCamera);
                const hits = raycaster.intersectObjects(explorerTargets, false);
                if (hits.length) selectPlanet(hits[0].object.userData.planetName);
            }
            dragStart = null;
            lastPointer = null;
        };
        canvas.addEventListener("pointerup", clearDrag);
        canvas.addEventListener("pointercancel", () => { dragStart = null; lastPointer = null; });
        canvas.addEventListener("wheel", (event) => {
            event.preventDefault();
            focusDistance = THREE.MathUtils.clamp(focusDistance + event.deltaY * .018, 6, 32);
        }, { passive: false });

        explorerResize = () => {
            if (!explorerRenderer || !canvas.isConnected) return;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            if (!width || !height) return;
            explorerRenderer.setSize(width, height, false);
            explorerCamera.aspect = width / height;
            explorerCamera.updateProjectionMatrix();
        };
        window.addEventListener("resize", explorerResize);
        explorerResize();
        const clock = new THREE.Clock();
        const cameraOffset = new THREE.Vector3();
        function animate() {
            if (!explorerRenderer || !canvas.isConnected) return;
            explorerFrame = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();
            orbiting.forEach(({ pivot, sphere, planet, angle }) => {
                pivot.rotation.y = angle + elapsed * planet.speed * .12;
                sphere.rotation.y += .002;
            });
            const moonObject = explorerTargets.find((mesh) => mesh.userData.planetName === "Moon");
            if (moonObject) {
                const earthObject = explorerTargets.find((mesh) => mesh.userData.planetName === "Earth");
                if (earthObject) {
                    const earthPosition = new THREE.Vector3();
                    earthObject.getWorldPosition(earthPosition);
                    moonObject.parent.position.copy(earthPosition);
                    moonObject.position.set(Math.cos(elapsed * .34) * .73, 0, Math.sin(elapsed * .34) * .73);
                }
            }
            const follow = explorerTargets.find((mesh) => mesh.userData.planetName === selectedPlanet);
            const desiredTarget = follow ? follow.getWorldPosition(new THREE.Vector3()) : explorerViewTarget;
            explorerViewTarget.lerp(desiredTarget, .045);
            cameraOffset.set(
                Math.sin(yaw) * Math.cos(pitch) * focusDistance,
                Math.sin(pitch) * focusDistance,
                Math.cos(yaw) * Math.cos(pitch) * focusDistance
            );
            explorerCamera.position.lerp(explorerViewTarget.clone().add(cameraOffset), .07);
            explorerCamera.lookAt(explorerViewTarget);
            explorerRenderer.render(explorerScene, explorerCamera);
        }
        animate();
    } catch (error) {
        console.error("Mission Nova Solar System failed to start.", error);
        const errorMessage = document.createElement("p");
        errorMessage.className = "nova-error";
        errorMessage.setAttribute("role", "alert");
        errorMessage.textContent = "The 3D Solar System could not start. Check your connection and browser WebGL support, then reload. The planet list and mission buttons are still available.";
        canvas.after(errorMessage);
    }
}

function stopExplorer() {
    if (explorerFrame) cancelAnimationFrame(explorerFrame);
    explorerFrame = 0;
    if (explorerResize) window.removeEventListener("resize", explorerResize);
    if (explorerRenderer) {
        const oldCanvas = explorerRenderer.domElement;
        explorerRenderer.dispose();
        if (oldCanvas.isConnected) oldCanvas.replaceWith(oldCanvas.cloneNode(false));
    }
    if (explorerScene) {
        explorerScene.traverse((object) => {
            object.geometry?.dispose();
            if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
            else object.material?.dispose();
            if (object.material?.map) object.material.map.dispose();
        });
        explorerScene = null;
    }
    explorerRenderer = null;
    explorerCamera = null;
    explorerTargets = [];
    explorerResize = null;
}

const missionStages = [
    { id: "launchpad", title: "Welcome to the launch site", phase: "EARTH · LAUNCH COMPLEX", message: "Welcome aboard, Astronaut {name}. Your {destination} expedition begins on Earth. Take a look at the rocket, then enter the spacecraft when you're ready.", button: "ENTER SPACECRAFT →" },
    { id: "cockpit", title: "Flight deck ready", phase: "PRE-LAUNCH CHECKS", message: "You're in the cockpit. The crew checks communication, power and life support before launch. When you're ready, begin the countdown.", button: "BEGIN COUNTDOWN →" },
    { id: "ascent", title: "Up through Earth's atmosphere", phase: "ASCENT · ATMOSPHERIC LAYERS", message: "The engines push us upward through thicker air, then into thinner layers. Watch as the empty booster falls away and the payload fairings open once the air is thin enough.", button: "CONTINUE FLIGHT →" },
    { id: "separation", title: "Crew capsule separation", phase: "ORBITAL INSERTION", message: "The upper stage has finished its burn. The crew capsule separates from the spent stage and prepares for the quiet coast through space.", button: "CONTINUE FLIGHT →" },
    { id: "cruise", title: "Cruising through space", phase: "DEEP SPACE TRANSIT", message: "Earth is behind us. In the quiet of space, the spacecraft coasts between engine burns. Our destination is growing brighter ahead.", button: "CONTINUE FLIGHT →" },
    { id: "approach", title: "Destination in sight", phase: "ORBITAL APPROACH", message: "We are approaching {destination}. The crew checks navigation, landing systems and the surface conditions before descent.", button: "PREPARE TO LAND →" },
    { id: "landing", title: "Touchdown", phase: "CONTROLLED DESCENT", message: "A careful descent brings the lander to the surface. The engines slow our fall for a gentle touchdown. Welcome to {destination}.", button: "EXPLORE THE SURFACE →" },
    { id: "surface", title: "First look outside", phase: "SURFACE EXPLORATION", message: "{surfaceIntro} Before stepping outside, the crew checks the suit, oxygen and communications.", button: "START SURVIVAL TRAINING →" },
    { id: "survival", title: "Survival training", phase: "HABITAT · SUIT · SCIENCE", message: "Complete the three field tasks to prepare a safe habitat, check your suit and bring back a sample. Watch your supplies as you work.", button: "PREPARE FOR DEPARTURE →" },
    { id: "departure", title: "Ready to head home", phase: "DEPARTURE PREPARATION", message: "The sample is secure, the crew is aboard and life-support supplies are checked. It's time to leave {destination} and start the return journey.", button: "BEGIN RETURN JOURNEY →" },
    { id: "return", title: "Homeward bound", phase: "RETURN TRANSIT", message: "Our simulated return flight is underway. Earth is growing in the window. The crew monitors the spacecraft all the way home.", button: "BEGIN RE-ENTRY →" },
    { id: "reentry", title: "Back through the atmosphere", phase: "EARTH · RE-ENTRY", message: "The heat shield protects the spacecraft as it slows in Earth's atmosphere. Recovery teams are ready to meet the crew.", button: "COMPLETE MISSION →" },
    { id: "recovery", title: "Welcome home!", phase: "MISSION COMPLETE · EARTH", message: "You made it home safely, Astronaut {name}. Your {destination} mission is complete. Let's see what you learned.", button: "START MISSION ASSESSMENT →" }
];

function startMission(destination) {
    stopExplorer();
    const explorer = document.getElementById("nova-explorer");
    if (explorer) explorer.hidden = true;
    const mission = document.createElement("section");
    mission.id = "nova-mission";
    mission.setAttribute("aria-label", `${destination} astronaut training mission`);
    mission.innerHTML = `
        <header class="mission-topbar">
            <div><div class="mission-topline">MISSION NOVA · ${destination.toUpperCase()} EXPEDITION</div><div class="mission-destination">Astronaut ${escapeHTML(astronautName)} · Training simulation</div></div>
            <button class="nova-button" id="mission-exit" type="button">← EXIT TO EXPLORER</button>
        </header>
        <div class="mission-stage">
            <canvas id="nova-mission-canvas" aria-label="Three-dimensional mission scene"></canvas>
            <div class="mission-hud">
                <div class="mission-status-row"><span id="mission-status">FLIGHT SYSTEMS READY</span><span id="mission-phase" class="mission-phase"></span></div>
                <div class="mission-center"><h1 id="mission-title"></h1><p id="mission-description"></p></div>
                <div class="mission-bottom">
                    <div class="mira-card" aria-live="polite"><div class="mira-name">COMMANDER MIRA</div><span id="mira-caption"></span></div>
                    <div class="mission-controls">
                        <button id="mission-repeat" type="button">REPLAY GUIDANCE</button>
                        <button id="mission-next" class="primary" type="button"></button>
                    </div>
                </div>
            </div>
            <div id="mission-overlay"></div>
        </div>
        <footer class="mission-footer">
            <div class="mission-resources" aria-label="Mission supplies">
                <span class="resource-pill">O₂ <strong>100%</strong></span><span class="resource-pill">WATER <strong>100%</strong></span>
                <span class="resource-pill">POWER <strong>100%</strong></span><span class="resource-pill">FOOD <strong>100%</strong></span>
            </div>
            <div class="mission-accessibility">
                <button id="voice-toggle" type="button" aria-pressed="false">VOICE: OFF</button>
                <button id="subtitle-toggle" type="button" aria-pressed="true">SUBTITLES: ON</button>
            </div>
        </footer>`;
    document.body.appendChild(mission);
    const app = createMissionController(destination, mission);
    app.showStage(missionStages[0].id);
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

function createMissionController(destination, root) {
    const details = missionData[destination];
    const canvas = root.querySelector("#nova-mission-canvas");
    const nextButton = root.querySelector("#mission-next");
    const overlay = root.querySelector("#mission-overlay");
    const caption = root.querySelector("#mira-caption");
    let renderer = null;
    let scene = null;
    let camera = null;
    let animation = 0;
    let resizeHandler = null;
    let countdownTimer = 0;
    let stageUnlockTimer = 0;
    let countdownActive = false;
    let currentStage = "launchpad";
    let voiceOn = false;
    let subtitlesOn = true;
    let currentLine = "";
    let resources = { oxygen: 100, water: 100, power: 100, food: 100 };
    let completedTasks = new Set();
    let selectedFieldTask = 0;
    let fieldFeedback = "";
    let fieldFeedbackCorrect = false;
    let assessmentIndex = 0;
    let score = 0;
    let answered = false;
    let missionGroup = null;
    let rocket = null;
    let booster = null;
    let upperStage = null;
    let capsule = null;
    let fairingPanels = [];
    let fairingStarts = [];
    let flame = null;
    let upperStageFlame = null;
    let launchSmoke = null;
    let detachedStage = false;
    let fairingsReleased = false;
    let capsuleSeparated = false;
    let boosterStart = new THREE.Vector3();
    let capsuleStart = new THREE.Vector3();
    let launchTowerArms = [];
    let activeWorld = null;
    let cloudLayer = null;
    let dustField = null;
    let movingClouds = [];
    let starField = null;
    let planetaryBodies = [];
    let parachute = null;
    let cameraTargetPosition = new THREE.Vector3(17, 10, 28);
    let cameraTargetLookAt = new THREE.Vector3(0, 0, 0);
    let sceneStartedAt = 0;
    let sceneClock = 0;
    const clock = new THREE.Clock();

    function speak(text) {
        currentLine = text;
        caption.textContent = subtitlesOn ? text : "";
        if (voiceOn && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = .93;
            utterance.pitch = 1.08;
            utterance.volume = 1;
            const voices = window.speechSynthesis.getVoices();
            utterance.voice = voices.find((voice) => /female|samantha|victoria|aria|jenny|zira|susan/i.test(voice.name)) || voices.find((voice) => voice.lang.startsWith("en")) || null;
            window.speechSynthesis.speak(utterance);
        }
    }

    function contextual(text) {
        return text.replaceAll("{name}", astronautName).replaceAll("{destination}", destination);
    }

    function makeSurfaceTexture(kind) {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");
        const randomSource = kind.length * 971 + (destination === "Mars" ? 317 : 73);
        let seed = randomSource;
        const random = () => {
            seed = (seed * 1664525 + 1013904223) % 4294967296;
            return seed / 4294967296;
        };
        const base = kind === "earth" ? "#174f8b" : kind === "mars" ? "#a95335" : "#767a7b";
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, kind === "earth" ? "#102d60" : kind === "mars" ? "#642f2a" : "#4c5158");
        gradient.addColorStop(.5, base);
        gradient.addColorStop(1, kind === "earth" ? "#092d64" : kind === "mars" ? "#733a2d" : "#454a50");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (kind === "earth") {
            const land = "#58945e";
            const landLight = "#8b9b61";
            const continents = [
                [[.09,.22],[.17,.12],[.24,.15],[.29,.24],[.27,.33],[.22,.39],[.2,.51],[.16,.58],[.12,.47],[.1,.35]],
                [[.22,.55],[.29,.58],[.3,.68],[.27,.83],[.24,.94],[.2,.83],[.19,.7]],
                [[.45,.18],[.52,.14],[.58,.2],[.62,.29],[.58,.34],[.61,.42],[.58,.52],[.55,.61],[.51,.56],[.49,.46],[.45,.38],[.43,.28]],
                [[.57,.22],[.65,.17],[.75,.2],[.82,.25],[.87,.34],[.81,.42],[.73,.43],[.69,.51],[.63,.47],[.61,.36]],
                [[.74,.56],[.82,.51],[.88,.58],[.87,.69],[.82,.79],[.78,.74],[.74,.65]],
                [[.02,.08],[.07,.04],[.12,.1],[.1,.17],[.04,.18]],
                [[.91,.16],[.98,.2],[.99,.39],[.94,.45],[.9,.35]]
            ];
            continents.forEach((shape, index) => {
                ctx.beginPath();
                shape.forEach(([x, y], point) => {
                    if (point === 0) ctx.moveTo(x * canvas.width, y * canvas.height);
                    else ctx.lineTo(x * canvas.width, y * canvas.height);
                });
                ctx.closePath();
                ctx.fillStyle = index % 2 ? landLight : land;
                ctx.fill();
                ctx.globalAlpha = .24;
                ctx.strokeStyle = "#d1c48b";
                ctx.lineWidth = 6;
                ctx.stroke();
                ctx.globalAlpha = 1;
            });
            for (let i = 0; i < 70; i += 1) {
                ctx.globalAlpha = .12 + random() * .24;
                ctx.fillStyle = random() > .5 ? "#e5d4a0" : "#164d47";
                ctx.beginPath();
                ctx.ellipse(random() * canvas.width, random() * canvas.height, 8 + random() * 50, 4 + random() * 18, random(), 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            for (let i = 0; i < 850; i += 1) {
                const x = random() * canvas.width;
                const y = random() * canvas.height;
                const radius = (kind === "moon" ? 3 : 2) + random() * (kind === "moon" ? 22 : 14);
                ctx.globalAlpha = .09 + random() * .3;
                ctx.fillStyle = random() > .53 ? (kind === "moon" ? "#c1c2bd" : "#d58a57") : (kind === "moon" ? "#353b43" : "#512a2a");
                ctx.beginPath();
                ctx.ellipse(x, y, radius * (1.2 + random() * .45), radius, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = .15;
                ctx.strokeStyle = kind === "moon" ? "#dedbd1" : "#f1ad6b";
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
            if (kind === "mars") {
                ctx.globalAlpha = .6;
                ctx.fillStyle = "#e9c79e";
                ctx.fillRect(0, 0, canvas.width, 13);
                ctx.fillRect(0, canvas.height - 11, canvas.width, 11);
            }
        }
        ctx.globalAlpha = 1;
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        return texture;
    }

    function makeCloudTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let seed = 919;
        const random = () => {
            seed = (seed * 1664525 + 1013904223) % 4294967296;
            return seed / 4294967296;
        };
        for (let i = 0; i < 440; i += 1) {
            const x = random() * canvas.width;
            const y = random() * canvas.height;
            const r = 5 + random() * 38;
            const cloud = ctx.createRadialGradient(x, y, 0, x, y, r);
            cloud.addColorStop(0, `rgba(255,255,255,${.16 + random() * .25})`);
            cloud.addColorStop(1, "rgba(255,255,255,0)");
            ctx.fillStyle = cloud;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }

    function makeTerrainTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext("2d");
        const mars = destination === "Mars";
        const base = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        base.addColorStop(0, mars ? "#854637" : "#767b7e");
        base.addColorStop(.48, mars ? "#b36b4c" : "#a1a09a");
        base.addColorStop(1, mars ? "#754036" : "#5c6166");
        ctx.fillStyle = base;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let seed = mars ? 12037 : 8101;
        const random = () => {
            seed = (seed * 1664525 + 1013904223) % 4294967296;
            return seed / 4294967296;
        };
        for (let i = 0; i < 26000; i += 1) {
            const x = random() * canvas.width;
            const y = random() * canvas.height;
            const radius = 1 + random() * (mars ? 7 : 12);
            const shade = Math.floor(random() * 65);
            ctx.globalAlpha = .12 + random() * .28;
            ctx.fillStyle = random() > .5
                ? (mars ? `rgb(180,${111 + Math.floor(random() * 20)},${82 + Math.floor(random() * 18)})` : `rgb(${155 + Math.floor(random() * 25)},${155 + Math.floor(random() * 24)},${150 + Math.floor(random() * 24)})`)
                : `rgb(${shade},${shade},${shade + 4})`;
            ctx.beginPath();
            ctx.ellipse(x, y, radius * (1.2 + random() * .8), radius, random(), 0, Math.PI * 2);
            ctx.fill();
        }
        const craterCount = mars ? 62 : 105;
        for (let i = 0; i < craterCount; i += 1) {
            const x = random() * canvas.width;
            const y = random() * canvas.height;
            const radius = (mars ? 4 : 7) + random() * (mars ? 32 : 52);
            const crater = ctx.createRadialGradient(x, y, radius * .12, x, y, radius);
            crater.addColorStop(0, mars ? "rgba(54,34,32,.42)" : "rgba(35,40,44,.4)");
            crater.addColorStop(.63, mars ? "rgba(80,48,39,.2)" : "rgba(68,73,77,.16)");
            crater.addColorStop(.78, mars ? "rgba(228,157,113,.42)" : "rgba(196,194,185,.3)");
            crater.addColorStop(1, "rgba(20,20,20,0)");
            ctx.globalAlpha = .55 + random() * .4;
            ctx.fillStyle = crater;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        if (mars) {
            ctx.globalAlpha = .16;
            ctx.strokeStyle = "#f0ac7b";
            ctx.lineWidth = 3;
            for (let i = 0; i < 180; i += 1) {
                const y = random() * canvas.height;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.bezierCurveTo(canvas.width * .28, y - 45, canvas.width * .7, y + 38, canvas.width, y - 12);
                ctx.stroke();
            }
        }
        ctx.globalAlpha = 1;
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(6, 6);
        texture.anisotropy = 8;
        return texture;
    }

    function loadPlanetMap(material, url) {
        const loader = new THREE.TextureLoader();
        loader.load(url, (texture) => {
            if (!material || !material.userData.isMissionMaterial) {
                texture.dispose();
                return;
            }
            const oldMap = material.map;
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = 4;
            material.map = texture;
            material.needsUpdate = true;
            oldMap?.dispose();
        }, undefined, (error) => {
            console.warn(`Using the built-in ${url.split("/").pop()} surface texture because the detailed map was unavailable.`, error);
        });
    }

    function setScene(stage) {
        if (!scene || !missionGroup) return;
        while (missionGroup.children.length) {
            const child = missionGroup.children[0];
            missionGroup.remove(child);
            child.traverse((object) => {
                object.geometry?.dispose();
                if (Array.isArray(object.material)) object.material.forEach((material) => {
                    material.userData.isMissionMaterial = false;
                    material.map?.dispose();
                    material.dispose();
                });
                else {
                    if (object.material) object.material.userData.isMissionMaterial = false;
                    object.material?.map?.dispose();
                    object.material?.dispose();
                }
            });
        }
        rocket = null;
        booster = null;
        upperStage = null;
        capsule = null;
        fairingPanels = [];
        fairingStarts = [];
        flame = null;
        upperStageFlame = null;
        launchSmoke = null;
        detachedStage = false;
        fairingsReleased = false;
        capsuleSeparated = false;
        boosterStart.set(0, 0, 0);
        capsuleStart.set(0, 0, 0);
        launchTowerArms = [];
        activeWorld = null;
        cloudLayer = null;
        dustField = null;
        movingClouds = [];
        starField = null;
        planetaryBodies = [];
        parachute = null;
        sceneStartedAt = clock.getElapsedTime();
        sceneClock = 0;
        const spaceStages = ["ascent", "separation", "cruise", "approach", "landing", "departure", "return", "reentry"];
        const surfaceScene = ["landing", "surface", "survival", "departure"].includes(stage);
        const daytimeScene = stage === "launchpad";
        const skyColor = stage === "launchpad" || stage === "ascent" ? 0x84b9dd
            : stage === "cockpit" || spaceStages.includes(stage) ? 0x020611
            : destination === "Mars" ? 0xa9644f : 0x03050a;
        scene.background = new THREE.Color(skyColor);
        scene.fog = stage === "launchpad" || stage === "ascent" ? new THREE.Fog(0x84b9dd, 90, 300)
            : destination === "Mars" && surfaceScene ? new THREE.Fog(0xa9644f, 85, 250)
            : null;
        const surfaceLight = stage === "surface" || stage === "survival";
        const ambient = new THREE.HemisphereLight(surfaceLight ? details.color : 0xe2edff, 0x343b4a,
            surfaceLight ? (destination === "Moon" ? .32 : .62) : 1.05);
        missionGroup.add(ambient);
        const light = new THREE.DirectionalLight(0xfff0d7, stage === "surface" || stage === "survival" ? 3.7 : 3.2);
        light.position.set(-24, 34, 30);
        missionGroup.add(light);
        const starPositions = new Float32Array(2800 * 3);
        for (let i = 0; i < starPositions.length; i += 1) starPositions[i] = (Math.random() - .5) * 230;
        const starsGeo = new THREE.BufferGeometry();
        starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
        const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xf0f6ff, size: .14, sizeAttenuation: true }));
        stars.userData.staticStars = true;
        stars.visible = !daytimeScene && stage !== "ascent" && stage !== "cockpit" && !(destination === "Mars" && surfaceScene);
        stars.material.transparent = true;
        stars.material.opacity = .82;
        starField = stars;
        missionGroup.add(stars);

        const setCamera = (position, target) => {
            cameraTargetPosition.copy(position);
            cameraTargetLookAt.copy(target);
        };
        const addParticles = (count, color, size, area, origin, rise = .02) => {
            const positions = new Float32Array(count * 3);
            const velocities = new Float32Array(count * 3);
            for (let i = 0; i < count; i += 1) {
                positions[i * 3] = origin.x + (Math.random() - .5) * area.x;
                positions[i * 3 + 1] = origin.y + Math.random() * area.y;
                positions[i * 3 + 2] = origin.z + (Math.random() - .5) * area.z;
                velocities[i * 3] = (Math.random() - .5) * .035;
                velocities[i * 3 + 1] = rise + Math.random() * .035;
                velocities[i * 3 + 2] = (Math.random() - .5) * .035;
            }
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            const particleCanvas = document.createElement("canvas");
            particleCanvas.width = 64;
            particleCanvas.height = 64;
            const particleContext = particleCanvas.getContext("2d");
            const particleGradient = particleContext.createRadialGradient(32, 32, 2, 32, 32, 31);
            particleGradient.addColorStop(0, "rgba(255,255,255,0.92)");
            particleGradient.addColorStop(.24, "rgba(255,255,255,0.65)");
            particleGradient.addColorStop(1, "rgba(255,255,255,0)");
            particleContext.fillStyle = particleGradient;
            particleContext.fillRect(0, 0, 64, 64);
            const particleTexture = new THREE.CanvasTexture(particleCanvas);
            const particles = new THREE.Points(geometry, new THREE.PointsMaterial({
                color, size, map: particleTexture, transparent: true, opacity: .55, depthWrite: false, sizeAttenuation: true
            }));
            particles.userData.velocities = velocities;
            particles.userData.origin = origin.clone();
            particles.userData.area = area;
            particles.userData.active = false;
            missionGroup.add(particles);
            return particles;
        };

        const make = (geometry, color, x, y, z, materialOptions = {}) => {
            const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, roughness: .78, ...materialOptions }));
            mesh.position.set(x, y, z);
            missionGroup.add(mesh);
            return mesh;
        };
        const makeCloudCluster = (x, y, z, scale, color = 0xf0f4f4) => {
            const cluster = new THREE.Group();
            const material = new THREE.MeshStandardMaterial({ color, roughness: 1, metalness: 0, transparent: true, opacity: .14, depthWrite: false });
            const sphere = new THREE.SphereGeometry(1, 24, 16);
            const lobes = [
                [-.72, 0, 0, 1.05], [.35, .02, .05, 1.35], [1.12, -.18, -.12, .9],
                [-.15, .55, -.08, 1.05], [.74, .53, .14, .92], [-1.22, -.22, .1, .72],
                [.1, -.32, .25, 1.1], [1.52, .12, .2, .62]
            ];
            lobes.forEach(([lx, ly, lz, size]) => {
                const lobe = new THREE.Mesh(sphere, material);
                lobe.position.set(lx, ly, lz);
                lobe.scale.set(1.35 * size, .75 * size, 1.1 * size);
                cluster.add(lobe);
            });
            cluster.position.set(x, y, z);
            cluster.scale.setScalar(scale);
            cluster.userData.drift = .002 + Math.random() * .004;
            missionGroup.add(cluster);
            movingClouds.push(cluster);
            return cluster;
        };
        const makeDisplayTexture = (screenIndex) => {
            const canvas = document.createElement("canvas");
            canvas.width = 256;
            canvas.height = 160;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#061321";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(91,191,223,.22)";
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 24) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 20) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            const accent = screenIndex % 2 ? "#68e5d0" : "#6fceff";
            ctx.fillStyle = accent;
            ctx.font = "bold 12px monospace";
            ctx.fillText(["FLIGHT", "NAV", "POWER", "CABIN", "GUIDANCE"][screenIndex], 12, 19);
            ctx.font = "10px monospace";
            ctx.fillStyle = "#bcecff";
            ctx.fillText(["NOVA-01", "LUNAR ORBIT", "NOMINAL", "O₂ 100%", "AUTO"][screenIndex], 12, 37);
            ctx.strokeStyle = accent;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i < 9; i += 1) {
                const x = 14 + i * 27;
                const y = 94 + Math.sin(i * 1.1 + screenIndex) * (15 + screenIndex);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            for (let i = 0; i < 5; i += 1) {
                ctx.fillStyle = i < 4 ? accent : "rgba(135,180,201,.24)";
                ctx.fillRect(14 + i * 28, 132, 18, 7);
            }
            const texture = new THREE.CanvasTexture(canvas);
            texture.colorSpace = THREE.SRGBColorSpace;
            return texture;
        };
        const makeWorld = (type, radius, position) => {
            const color = type === "earth" ? 0xffffff : type === "mars" ? 0xb45636 : 0xa2a3a2;
            const material = new THREE.MeshStandardMaterial({
                map: makeSurfaceTexture(type),
                roughness: type === "earth" ? .92 : 1,
                metalness: 0
            });
            material.userData.isMissionMaterial = true;
            const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 96, 64), material);
            sphere.position.copy(position);
            sphere.rotation.z = type === "earth" ? -.12 : .08;
            missionGroup.add(sphere);
            planetaryBodies.push(sphere);
            activeWorld = sphere;
            if (type === "earth") {
                loadPlanetMap(material, "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg");
                const clouds = new THREE.Mesh(
                    new THREE.SphereGeometry(radius * 1.007, 72, 48),
                    new THREE.MeshPhongMaterial({ map: makeCloudTexture(), transparent: true, opacity: .58, depthWrite: false })
                );
                clouds.position.copy(position);
                clouds.rotation.z = sphere.rotation.z;
                missionGroup.add(clouds);
                cloudLayer = clouds;
                const atmosphere = new THREE.Mesh(
                    new THREE.SphereGeometry(radius * 1.035, 64, 48),
                    new THREE.ShaderMaterial({
                        vertexShader: "varying vec3 vNormal; void main(){ vNormal=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
                        fragmentShader: "varying vec3 vNormal; void main(){ float rim=pow(0.72-max(dot(normalize(vNormal),vec3(0.0,0.0,1.0)),0.0),3.0); gl_FragColor=vec4(0.24,0.58,1.0,rim*0.68); }",
                        blending: THREE.AdditiveBlending,
                        side: THREE.BackSide,
                        transparent: true,
                        depthWrite: false
                    })
                );
                atmosphere.position.copy(position);
                missionGroup.add(atmosphere);
            } else {
                const atmosphere = new THREE.Mesh(
                    new THREE.SphereGeometry(radius * 1.025, 64, 48),
                    new THREE.MeshBasicMaterial({ color: type === "mars" ? 0xd7734f : 0xb7c9dd, transparent: true, opacity: type === "mars" ? .09 : .055, side: THREE.BackSide, depthWrite: false })
                );
                atmosphere.position.copy(position);
                missionGroup.add(atmosphere);
                if (type === "moon") {
                    loadPlanetMap(material, "https://threejs.org/examples/textures/planets/moon_1024.jpg");
                }
            }
            return sphere;
        };
        const makeRocket = (x = 0, y = 0, z = 0, scale = 1) => {
            const group = new THREE.Group();
            const firstStage = new THREE.Group();
            const upperStage = new THREE.Group();
            const white = new THREE.MeshStandardMaterial({ color: 0xe5e8e8, metalness: .18, roughness: .48 });
            const dark = new THREE.MeshStandardMaterial({ color: 0x26323b, metalness: .58, roughness: .37 });
            const steel = new THREE.MeshStandardMaterial({ color: 0x77838a, metalness: .78, roughness: .31 });
            const red = new THREE.MeshStandardMaterial({ color: 0xb43832, metalness: .28, roughness: .43 });
            const black = new THREE.MeshStandardMaterial({ color: 0x151b21, metalness: .25, roughness: .52 });
            const makeBand = (parent, radius, height, y, material) => {
                const band = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 40), material);
                band.position.y = y;
                parent.add(band);
                return band;
            };
            const makeEnginePlume = (parent, radius, length) => {
                const plume = new THREE.Group();
                const outer = new THREE.Mesh(new THREE.ConeGeometry(radius, length, 28), new THREE.MeshBasicMaterial({
                    color: 0xff7728, transparent: true, opacity: .78, depthWrite: false
                }));
                outer.rotation.x = Math.PI;
                const core = new THREE.Mesh(new THREE.ConeGeometry(radius * .42, length * .82, 24), new THREE.MeshBasicMaterial({
                    color: 0xffe6a0, transparent: true, opacity: .92, depthWrite: false
                }));
                core.rotation.x = Math.PI;
                plume.add(outer, core);
                plume.userData.core = core;
                plume.visible = false;
                parent.add(plume);
                return plume;
            };

            const firstBody = new THREE.Mesh(new THREE.CylinderGeometry(.82, .91, 9.2, 40), white);
            firstBody.position.y = 4.65;
            firstStage.add(firstBody);
            makeBand(firstStage, .925, .3, 8.95, steel);
            makeBand(firstStage, .925, .22, 7.95, black);
            makeBand(firstStage, .925, .22, 1.45, black);
            const interstage = new THREE.Mesh(new THREE.CylinderGeometry(.88, .88, .85, 40), dark);
            interstage.position.y = 9.55;
            firstStage.add(interstage);
            for (let i = 0; i < 12; i += 1) {
                const angle = i * Math.PI * 2 / 12;
                const pipe = new THREE.Mesh(new THREE.CylinderGeometry(.024, .024, 6.2, 8), steel);
                pipe.position.set(Math.cos(angle) * .91, 4.1, Math.sin(angle) * .91);
                firstStage.add(pipe);
            }
            const finShape = new THREE.Shape();
            finShape.moveTo(.72, .45);
            finShape.lineTo(1.65, .05);
            finShape.lineTo(1.65, 1.55);
            finShape.lineTo(.79, 2.25);
            finShape.lineTo(.76, 1.6);
            finShape.closePath();
            const finGeometry = new THREE.ExtrudeGeometry(finShape, { depth: .12, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: .04, bevelThickness: .04 });
            for (let i = 0; i < 4; i += 1) {
                const fin = new THREE.Mesh(finGeometry, red);
                fin.rotation.y = i * Math.PI / 2;
                fin.position.y = .05;
                firstStage.add(fin);
            }
            for (let i = 0; i < 4; i += 1) {
                const angle = i * Math.PI / 2 + Math.PI / 4;
                const bell = new THREE.Mesh(new THREE.CylinderGeometry(.28, .46, .95, 24, 1, true), steel);
                bell.position.set(Math.cos(angle) * .37, -.2, Math.sin(angle) * .37);
                firstStage.add(bell);
                const nozzleRim = new THREE.Mesh(new THREE.TorusGeometry(.44, .055, 8, 24), dark);
                nozzleRim.rotation.x = Math.PI / 2;
                nozzleRim.position.set(Math.cos(angle) * .37, -.68, Math.sin(angle) * .37);
                firstStage.add(nozzleRim);
            }
            const fire = makeEnginePlume(firstStage, .7, 4.8);
            fire.position.y = -3.0;
            const exhaustLight = new THREE.PointLight(0xff7c36, 0, 18);
            exhaustLight.position.y = -1.15;
            firstStage.add(exhaustLight);
            fire.userData.light = exhaustLight;

            upperStage.position.y = 9.95;
            const upperEngineBell = new THREE.Mesh(new THREE.CylinderGeometry(.24, .38, .82, 24, 1, true), steel);
            upperEngineBell.position.y = .02;
            upperStage.add(upperEngineBell);
            const upperEngineRim = new THREE.Mesh(new THREE.TorusGeometry(.36, .045, 8, 24), dark);
            upperEngineRim.rotation.x = Math.PI / 2;
            upperEngineRim.position.y = -.41;
            upperStage.add(upperEngineRim);
            const upperBody = new THREE.Mesh(new THREE.CylinderGeometry(.56, .65, 4.5, 40), white);
            upperBody.position.y = 2.62;
            upperStage.add(upperBody);
            makeBand(upperStage, .67, .23, .62, black);
            makeBand(upperStage, .62, .2, 4.75, steel);
            for (let i = 0; i < 8; i += 1) {
                const angle = i * Math.PI / 4;
                const antenna = new THREE.Mesh(new THREE.CylinderGeometry(.018, .018, 2.8, 6), steel);
                antenna.position.set(Math.cos(angle) * .61, 2.5, Math.sin(angle) * .61);
                upperStage.add(antenna);
            }
            const fairings = [];
            for (let side = 0; side < 2; side += 1) {
                const panel = new THREE.Mesh(
                    new THREE.CylinderGeometry(.68, .68, 1.65, 24, 1, true, side * Math.PI, Math.PI),
                    white
                );
                panel.position.y = 5.95;
                upperStage.add(panel);
                fairings.push(panel);
            }
            const capsule = new THREE.Group();
            const capsuleBody = new THREE.Mesh(new THREE.SphereGeometry(.62, 32, 24), white);
            capsuleBody.position.y = .55;
            capsuleBody.scale.set(1, .9, 1);
            capsule.add(capsuleBody);
            const capsuleBase = new THREE.Mesh(new THREE.CylinderGeometry(.57, .68, .25, 32), dark);
            capsuleBase.position.y = .12;
            capsule.add(capsuleBase);
            const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x173e58, emissive: 0x082033, emissiveIntensity: .35, metalness: .62, roughness: .16 });
            for (let i = 0; i < 4; i += 1) {
                const angle = i * Math.PI / 2;
                const port = new THREE.Mesh(new THREE.SphereGeometry(.14, 16, 10), windowMaterial);
                port.position.set(Math.sin(angle) * .59, .66, Math.cos(angle) * .59);
                port.scale.set(.85, .72, .35);
                capsule.add(port);
            }
            const nose = new THREE.Mesh(new THREE.ConeGeometry(.36, 1.05, 32), red);
            nose.position.y = 1.35;
            capsule.add(nose);
            capsule.position.y = 5.15;
            upperStage.add(capsule);
            const upperStageFlame = makeEnginePlume(upperStage, .39, 3.2);
            upperStageFlame.position.y = -1.95;
            group.add(firstStage, upperStage);
            group.position.set(x, y, z);
            group.scale.setScalar(scale);
            missionGroup.add(group);
            return { group, fire, firstStage, upperStage, upperStageFlame, capsule, fairings };
        };
        const makeSpacecraft = (x, y, z, scale = 1) => {
            const group = new THREE.Group();
            const hull = new THREE.MeshStandardMaterial({ color: 0xe7edf2, metalness: .48, roughness: .38 });
            const darkHull = new THREE.MeshStandardMaterial({ color: 0x536879, metalness: .58, roughness: .34 });
            const solar = new THREE.MeshStandardMaterial({ color: 0x16416d, metalness: .38, roughness: .28, emissive: 0x07192b });
            const core = new THREE.Mesh(new THREE.CylinderGeometry(.48, .55, 3.2, 24), hull);
            core.rotation.z = -Math.PI / 2;
            core.position.x = -.3;
            group.add(core);
            const capsule = new THREE.Mesh(new THREE.SphereGeometry(.7, 28, 20), new THREE.MeshStandardMaterial({ color: 0xe4e8e9, metalness: .35, roughness: .3 }));
            capsule.position.x = 1.35;
            capsule.scale.set(1.05, .86, .86);
            group.add(capsule);
            const window = new THREE.Mesh(new THREE.SphereGeometry(.32, 20, 14), new THREE.MeshStandardMaterial({ color: 0x16415f, metalness: .55, roughness: .18, emissive: 0x071b2b }));
            window.position.set(1.57, .08, .55);
            window.scale.set(.7, .78, .35);
            group.add(window);
            const adapter = new THREE.Mesh(new THREE.CylinderGeometry(.35, .57, .72, 20), darkHull);
            adapter.rotation.z = -Math.PI / 2;
            adapter.position.x = -2.05;
            group.add(adapter);
            [-1, 1].forEach((side) => {
                const boom = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, 4.1, 8), darkHull);
                boom.position.set(-.35, 0, side * 2.05);
                boom.rotation.x = Math.PI / 2;
                group.add(boom);
                const panel = new THREE.Mesh(new THREE.BoxGeometry(1.8, .12, 3.1), solar);
                panel.position.set(-.45, 0, side * 3.5);
                group.add(panel);
                for (let line = 0; line < 5; line += 1) {
                    const rib = new THREE.Mesh(new THREE.BoxGeometry(1.82, .02, .025), new THREE.MeshBasicMaterial({ color: 0x7dbdea }));
                    rib.position.set(-.45, .075, side * (2.3 + line * .58));
                    group.add(rib);
                }
            });
            const engine = new THREE.Mesh(new THREE.ConeGeometry(.31, 1.1, 16), new THREE.MeshBasicMaterial({ color: 0xff9a38, transparent: true, opacity: .76 }));
            engine.rotation.z = Math.PI / 2;
            engine.position.x = -2.75;
            engine.visible = false;
            group.add(engine);
            group.position.set(x, y, z);
            group.scale.setScalar(scale);
            missionGroup.add(group);
            return { group, fire: engine };
        };
        const makeLander = (x, y, z, scale = 1) => {
            const group = new THREE.Group();
            const body = new THREE.Mesh(new THREE.CylinderGeometry(.8, 1, 1.3, 8), new THREE.MeshStandardMaterial({ color: destination === "Moon" ? 0xd4c59d : 0xd8dedf, metalness: .38, roughness: .5 }));
            group.add(body);
            const top = new THREE.Mesh(new THREE.ConeGeometry(.8, .85, 8), new THREE.MeshStandardMaterial({ color: destination === "Moon" ? 0xbeb08a : 0xc3c8c9, metalness: .45, roughness: .5 }));
            top.position.y = .98;
            group.add(top);
            const window = new THREE.Mesh(new THREE.SphereGeometry(.24, 16, 10), new THREE.MeshStandardMaterial({ color: 0x163b55, emissive: 0x0b2436, metalness: .6, roughness: .2 }));
            window.position.set(0, .28, .79);
            window.scale.set(1, .72, .35);
            group.add(window);
            for (let i = 0; i < 4; i += 1) {
                const angle = i * Math.PI / 2;
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(.045, .06, 1.7, 8), new THREE.MeshStandardMaterial({ color: 0xb8c3d0, metalness: .5 }));
                leg.position.set(Math.cos(angle) * .62, -.95, Math.sin(angle) * .62);
                leg.rotation.z = Math.cos(angle) * .45;
                leg.rotation.x = Math.sin(angle) * .45;
                group.add(leg);
            }
            const engine = new THREE.Mesh(new THREE.ConeGeometry(.38, 1.4, 20), new THREE.MeshBasicMaterial({ color: 0xffa340, transparent: true, opacity: .78 }));
            engine.position.y = -1.15;
            engine.rotation.x = Math.PI;
            engine.visible = false;
            group.add(engine);
            group.userData.engine = engine;
            group.position.set(x, y, z);
            group.scale.setScalar(scale);
            missionGroup.add(group);
            return group;
        };
        const makeAstronaut = (x, y, z) => {
            const group = new THREE.Group();
            const suit = new THREE.MeshStandardMaterial({ color: 0xe7edf2, roughness: .8 });
            const visor = new THREE.MeshStandardMaterial({ color: 0x17344d, metalness: .25, roughness: .22 });
            const torso = new THREE.Mesh(new THREE.SphereGeometry(.48, 16, 12), suit);
            torso.scale.set(.8, 1.15, .65);
            torso.position.y = .8;
            group.add(torso);
            const helmet = new THREE.Mesh(new THREE.SphereGeometry(.34, 18, 14), suit);
            helmet.position.y = 1.48;
            group.add(helmet);
            const faceplate = new THREE.Mesh(new THREE.SphereGeometry(.24, 16, 12), visor);
            faceplate.position.set(0, 1.49, .19);
            faceplate.scale.set(1, .78, .35);
            group.add(faceplate);
            const pack = new THREE.Mesh(new THREE.BoxGeometry(.48, .7, .28), new THREE.MeshStandardMaterial({ color: 0x668094, metalness: .2 }));
            pack.position.set(0, .85, -.34);
            group.add(pack);
            [-1, 1].forEach((side) => {
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(.13, .15, .62, 10), suit);
                leg.position.set(side * .18, .2, 0);
                group.add(leg);
                const arm = new THREE.Mesh(new THREE.CylinderGeometry(.11, .13, .62, 10), suit);
                arm.position.set(side * .48, .86, 0);
                arm.rotation.z = side * -.32;
                group.add(arm);
            });
            group.position.set(x, y, z);
            group.scale.setScalar(.78);
            missionGroup.add(group);
        };
        const makeRover = (x, y, z) => {
            const group = new THREE.Group();
            const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, .45, 1.45), new THREE.MeshStandardMaterial({ color: 0xc3b27e, metalness: .22, roughness: .7 }));
            chassis.position.y = .75;
            group.add(chassis);
            const deck = new THREE.Mesh(new THREE.BoxGeometry(1.35, .18, .9), new THREE.MeshStandardMaterial({ color: 0x6d8990, metalness: .2 }));
            deck.position.set(0, 1.05, 0);
            group.add(deck);
            [-1, 1].forEach((side) => {
                [-1, 1].forEach((front) => {
                    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.35, .35, .24, 14), new THREE.MeshStandardMaterial({ color: 0x27323b, roughness: .9 }));
                    wheel.rotation.x = Math.PI / 2;
                    wheel.position.set(front * .78, .4, side * .76);
                    group.add(wheel);
                });
            });
            const mast = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, .75, 8), new THREE.MeshStandardMaterial({ color: 0xd5dce1, metalness: .4 }));
            mast.position.set(.65, 1.45, 0);
            group.add(mast);
            group.position.set(x, y, z);
            missionGroup.add(group);
        };
        const earth = () => {
            return makeWorld("earth", 9, new THREE.Vector3(0, -3.2, -24));
        };
        const world = (radius = destination === "Moon" ? 11 : 13, position = new THREE.Vector3(0, 0, -25)) =>
            makeWorld(destination === "Moon" ? "moon" : "mars", radius, position);
        const ground = (color) => {
            const geometry = new THREE.PlaneGeometry(250, 250, 100, 100);
            const positions = geometry.attributes.position;
            for (let i = 0; i < positions.count; i += 1) {
                const x = positions.getX(i);
                const y = positions.getY(i);
                const rolling = Math.sin(x * .17) * .16 + Math.cos(y * .13) * .14 + Math.sin((x + y) * .28) * .07;
                positions.setZ(i, rolling);
            }
            geometry.computeVertexNormals();
            const terrainTexture = makeTerrainTexture();
            const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xffffff, map: terrainTexture, roughness: 1, metalness: 0 }));
            mesh.rotation.x = -Math.PI / 2;
            mesh.position.y = -.25;
            missionGroup.add(mesh);
            for (let layer = 0; layer < 3; layer += 1) {
                const ridgeShape = new THREE.Shape();
                const span = 220;
                const segments = 28;
                const ridgePoints = [];
                for (let i = 0; i <= segments; i += 1) {
                    const x = -span / 2 + span * i / segments;
                    const broadPeak = (Math.sin(i * .72 + layer) * .5 + .5) * (3 + layer * .5);
                    const smallerPeak = (Math.sin(i * 1.9 + layer * 1.7) * .5 + .5) * 1.4;
                    ridgePoints.push({ x, y: broadPeak + smallerPeak + layer * .45 });
                }
                ridgeShape.moveTo(-span / 2, -2);
                for (let i = 0; i < ridgePoints.length - 1; i += 1) {
                    const current = ridgePoints[i];
                    const next = ridgePoints[i + 1];
                    const midX = (current.x + next.x) / 2;
                    const midY = (current.y + next.y) / 2;
                    ridgeShape.quadraticCurveTo(current.x, current.y, midX, midY);
                }
                ridgeShape.lineTo(span / 2, -2);
                ridgeShape.closePath();
                const ridge = new THREE.Mesh(
                    new THREE.ShapeGeometry(ridgeShape, 2),
                    new THREE.MeshStandardMaterial({
                        color: destination === "Moon"
                            ? [0x41454b, 0x50545a, 0x60646a][layer]
                            : [0x673c35, 0x7a4940, 0x8a5548][layer],
                        roughness: 1,
                        side: THREE.DoubleSide
                    })
                );
                ridge.position.set(0, -.2, -74 + layer * 8);
                missionGroup.add(ridge);
            }
            const craterCount = destination === "Moon" ? 18 : 10;
            for (let i = 0; i < craterCount; i += 1) {
                const radius = destination === "Moon" ? .5 + Math.random() * 2 : .8 + Math.random() * 2.4;
                const x = (Math.random() - .5) * 95;
                const z = -12 - Math.random() * 53;
                const crater = new THREE.Mesh(
                    new THREE.TorusGeometry(radius, Math.max(.12, radius * .12), 8, 24),
                    new THREE.MeshStandardMaterial({ color: destination === "Moon" ? 0xb2aea5 : 0xd0845d, roughness: 1 })
                );
                crater.rotation.x = Math.PI / 2;
                crater.position.set(x, -.12 + radius * .025, z);
                crater.scale.set(1, .55, 1);
                missionGroup.add(crater);
                const inside = new THREE.Mesh(
                    new THREE.CircleGeometry(radius * .88, 24),
                    new THREE.MeshStandardMaterial({ color: destination === "Moon" ? 0x57595d : 0x6c3830, roughness: 1 })
                );
                inside.rotation.x = -Math.PI / 2;
                inside.position.set(x, -.16 + radius * .025, z);
                missionGroup.add(inside);
            }
        };
        const buildLaunchSite = (showHorizonClouds = true) => {
            const tarmac = make(new THREE.PlaneGeometry(420, 420), 0x424b51, 0, -.34, 0, { roughness: .94 });
            tarmac.rotation.x = -Math.PI / 2;
            make(new THREE.BoxGeometry(15, .55, 16), 0x68747a, 0, .15, -2);
            make(new THREE.BoxGeometry(9, .8, 9), 0x303a40, 0, .78, -2);
            make(new THREE.BoxGeometry(6.6, .18, 7.2), 0x10171c, 0, 1.24, -2);
            make(new THREE.BoxGeometry(4.5, .28, 12), 0x202a30, 0, .08, 7);
            const towerX = -5.3;
            [-1, 1].forEach((side) => {
                make(new THREE.BoxGeometry(.52, 25, .65), 0x83929a, towerX + side * 1.2, 12.5, -2.6);
                for (let y = 1.3; y < 25; y += 1.9) {
                    make(new THREE.BoxGeometry(2.9, .14, .16), 0x71828c, towerX, y, -2.6);
                    make(new THREE.BoxGeometry(.12, 1.7, .12), 0x9cabb2, towerX + side * 1.2, y + .85, -2.6);
                    const brace = make(new THREE.BoxGeometry(2.5, .1, .1), 0xa3b1b8, towerX + side * .6, y + .85, -2.6);
                    brace.rotation.z = side * -.58;
                }
            });
            make(new THREE.BoxGeometry(.42, 25, .48), 0x84949d, towerX, 12.5, -5.5);
            for (const height of [8.8, 12.8, 16.8]) {
                const arm = make(new THREE.BoxGeometry(4.3, .34, .4), 0x9caab0, -3.15, height, -2.6);
                arm.userData.launchArm = true;
                launchTowerArms.push(arm);
                make(new THREE.BoxGeometry(.42, .62, .5), 0xd5a64c, -1.05, height - .04, -2.6);
            }
            make(new THREE.BoxGeometry(5, 9, 4), 0x566976, 7.2, 4.5, -5.5);
            make(new THREE.BoxGeometry(6.5, .65, 5.2), 0x748895, 7.2, 9.2, -5.5);
            for (let i = 0; i < 3; i += 1) {
                const window = make(new THREE.BoxGeometry(.72, 1.25, .08), 0x8bc4db, 5.6 + i * 1.6, 5.7, -3.44, {
                    emissive: 0x17445b, emissiveIntensity: .35, metalness: .32, roughness: .25
                });
                window.userData.launchWindow = true;
            }
            if (showHorizonClouds) {
                for (let i = 0; i < 7; i += 1) {
                    makeCloudCluster(-52 + i * 17, 26 + (i % 3) * 2, -72 - (i % 2) * 18, 6 + (i % 3), i % 2 ? 0xdce5eb : 0xf3f5f4);
                }
            }
        };
        const buildSpaceWindow = () => {
            const frameColor = 0x18232d;
            const trimColor = 0x667783;
            const depth = 1.05;
            const frontZ = 5.4;
            make(new THREE.BoxGeometry(12.4, .5, depth), frameColor, 0, 4.95, frontZ, { metalness: .48, roughness: .42 });
            make(new THREE.BoxGeometry(12.4, .55, depth), frameColor, 0, -4.95, frontZ, { metalness: .48, roughness: .42 });
            make(new THREE.BoxGeometry(.5, 10, depth), frameColor, -6.15, 0, frontZ, { metalness: .48, roughness: .42 });
            make(new THREE.BoxGeometry(.5, 10, depth), frameColor, 6.15, 0, frontZ, { metalness: .48, roughness: .42 });
            make(new THREE.BoxGeometry(12.1, .1, .13), trimColor, 0, 4.68, 4.82, { metalness: .65, roughness: .3 });
            make(new THREE.BoxGeometry(12.1, .1, .13), trimColor, 0, -4.68, 4.82, { metalness: .65, roughness: .3 });
            make(new THREE.BoxGeometry(.1, 9.5, .13), trimColor, -5.9, 0, 4.82, { metalness: .65, roughness: .3 });
            make(new THREE.BoxGeometry(.1, 9.5, .13), trimColor, 5.9, 0, 4.82, { metalness: .65, roughness: .3 });
            for (let i = 0; i < 10; i += 1) {
                const bolt = make(new THREE.SphereGeometry(.055, 10, 8), 0x9aa9ae, -5.3 + i * 1.18, 4.94, 4.78, { metalness: .72, roughness: .3 });
                bolt.scale.z = .35;
            }
            make(new THREE.BoxGeometry(11, .5, 1.5), 0x25343e, 0, -5.2, 4.35, { metalness: .38, roughness: .5 });
        };

        if (stage === "launchpad") {
            buildLaunchSite();
            const model = makeRocket(0, .35, -2, 1.08);
            rocket = model.group;
            flame = model.fire;
            upperStageFlame = model.upperStageFlame;
            flame.visible = false;
            setCamera(new THREE.Vector3(19, 10, 31), new THREE.Vector3(0, 8, -3));
        } else if (stage === "cockpit") {
            makeWorld("earth", 11, new THREE.Vector3(0, -7, -42));
            const cockpitTrim = 0x18283a;
            make(new THREE.BoxGeometry(16, .65, .9), cockpitTrim, 0, 4.45, 2);
            make(new THREE.BoxGeometry(16, .65, .9), cockpitTrim, 0, -4.45, 2);
            make(new THREE.BoxGeometry(.42, 9, .9), cockpitTrim, -6.2, 0, 2);
            make(new THREE.BoxGeometry(.42, 9, .9), cockpitTrim, 6.2, 0, 2);
            make(new THREE.BoxGeometry(10, .45, 1.1), 0x202c3b, 0, -2.6, .8);
            for (let i = 0; i < 5; i += 1) {
                const display = makeDisplayTexture(i);
                const screen = make(new THREE.BoxGeometry(1.35, .84, .12), 0xffffff, -3.4 + i * 1.7, -1.55, .75, {
                    map: display,
                    emissive: i % 2 ? 0x1b8c8d : 0x174f76,
                    emissiveMap: display,
                    emissiveIntensity: .35,
                    roughness: .3
                });
                screen.rotation.z = (i - 2) * .035;
            }
            for (let i = 0; i < 12; i += 1) make(new THREE.CylinderGeometry(.07, .07, .08, 12), i % 2 ? 0x71d6ff : 0xebbc61, -3.8 + (i % 6) * 1.5, -2.25 - Math.floor(i / 6) * .28, .72);
            [-1, 1].forEach((side) => {
                make(new THREE.BoxGeometry(1.25, .35, 1.25), 0x465b6b, side * 1.65, -4.15, 3.4, { roughness: .85 });
                make(new THREE.BoxGeometry(1.25, 1.7, .35), 0x344c5e, side * 1.65, -3.05, 3.9, { roughness: .85 });
                make(new THREE.BoxGeometry(.78, .35, .38), 0x52697a, side * 1.65, -2.05, 3.9, { roughness: .82 });
            });
            const warning = make(new THREE.SphereGeometry(.11, 12, 8), 0xff3030, 0, 3.7, .9, { emissive: 0xff1515, emissiveIntensity: 2 });
            warning.userData.warningLight = true;
            setCamera(new THREE.Vector3(0, 0, 14), new THREE.Vector3(0, 0, -8));
        } else if (stage === "ascent") {
            buildLaunchSite(false);
            makeWorld("earth", 155, new THREE.Vector3(0, -115, -320));
            const model = makeRocket(0, .35, -2, 1.08);
            rocket = model.group;
            booster = model.firstStage;
            upperStage = model.upperStage;
            capsule = model.capsule;
            fairingPanels = model.fairings;
            flame = model.fire;
            upperStageFlame = model.upperStageFlame;
            flame.visible = true;
            if (flame.userData.core) flame.userData.core.visible = true;
            launchSmoke = addParticles(900, 0x9ba5aa, 1.05, new THREE.Vector3(8, 12, 8), new THREE.Vector3(0, 2, -2), .01);
            launchSmoke.material.opacity = .24;
            launchSmoke.userData.active = true;
            dustField = launchSmoke;
            for (let i = 0; i < 13; i += 1) {
                const side = i % 2 ? -1 : 1;
                const lane = Math.floor(i / 2) % 3;
                const cloud = makeCloudCluster(side * (28 + lane * 12), 17 + Math.floor(i / 6) * 16, -24 - (i % 3) * 12, 4 + (i % 3) * 1.1, i % 3 ? 0xf0f4f3 : 0xdce5eb);
                cloud.userData.drift *= .35;
            }
            setCamera(new THREE.Vector3(25, 18, 43), new THREE.Vector3(0, 8, -3));
        } else if (stage === "separation") {
            makeWorld("earth", 32, new THREE.Vector3(0, -33, -112));
            const model = makeRocket(0, .5, -1, .85);
            rocket = model.group;
            model.firstStage.visible = false;
            upperStage = model.upperStage;
            capsule = model.capsule;
            fairingPanels = model.fairings;
            fairingPanels.forEach((panel) => { panel.visible = false; });
            flame = model.fire;
            upperStageFlame = model.upperStageFlame;
            flame.visible = true;
            if (flame.userData.core) flame.userData.core.visible = true;
            upperStageFlame.visible = true;
            setCamera(new THREE.Vector3(18, 14, 33), new THREE.Vector3(0, 12, -6));
        } else if (stage === "cruise" || stage === "approach" || stage === "return" || stage === "reentry") {
            if (stage === "reentry") {
                makeWorld("earth", 42, new THREE.Vector3(0, -8, -94));
            } else if (stage === "return") {
                makeWorld("earth", 25, new THREE.Vector3(4, 1, -70));
            } else if (stage === "approach") {
                makeWorld("earth", 17, new THREE.Vector3(-25, 4, -105));
                world(destination === "Moon" ? 15 : 17, new THREE.Vector3(2, 1, -58));
            } else {
                makeWorld("earth", 15, new THREE.Vector3(-11, 3, -72));
                world(destination === "Moon" ? 3.8 : 6, new THREE.Vector3(15, 2, -105));
            }
            buildSpaceWindow();
            if (stage === "reentry") {
                for (let i = 0; i < 5; i += 1) {
                    const glow = make(new THREE.SphereGeometry(4 + i * 1.4, 24, 16), 0xff6a23, -12 + i * 6, -7 + i * 2, -37 - i * 5, {
                        transparent: true, opacity: .08, emissive: 0xff4218, emissiveIntensity: .8, depthWrite: false
                    });
                    glow.scale.set(1.2, .12, 1);
                }
            }
            setCamera(new THREE.Vector3(0, 1.1, 17), new THREE.Vector3(0, .6, -35));
        } else if (stage === "landing") {
            ground(destination === "Moon" ? 0x777878 : 0x96604e);
            const model = makeLander(0, 7, 0, .8);
            rocket = model;
            if (rocket.userData.engine) rocket.userData.engine.visible = true;
            if (destination === "Mars") {
                parachute = new THREE.Group();
                const canopy = new THREE.Mesh(
                    new THREE.SphereGeometry(3.2, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2),
                    new THREE.MeshStandardMaterial({ color: 0xe7d6c6, side: THREE.DoubleSide, roughness: .9 })
                );
                parachute.add(canopy);
                for (let i = 0; i < 10; i += 1) {
                    const angle = i * Math.PI * 2 / 10;
                    const cord = new THREE.Mesh(new THREE.CylinderGeometry(.018, .018, 6, 5), new THREE.MeshStandardMaterial({ color: 0xd7d0c8 }));
                    cord.position.set(Math.cos(angle) * 1.15, -2.75, Math.sin(angle) * 1.15);
                    cord.rotation.z = Math.cos(angle) * .17;
                    cord.rotation.x = Math.sin(angle) * .17;
                    parachute.add(cord);
                }
                parachute.position.set(0, 11, 0);
                missionGroup.add(parachute);
            }
            dustField = addParticles(420, destination === "Moon" ? 0xb9b8b2 : 0xc98766, .9, new THREE.Vector3(14, 3, 14), new THREE.Vector3(0, .05, 0), .035);
            dustField.userData.active = true;
            setCamera(new THREE.Vector3(14, 9, 24), new THREE.Vector3(0, 2, -2));
        } else if (stage === "surface" || stage === "survival" || stage === "departure") {
            ground(destination === "Moon" ? 0x73747a : 0x8b513d);
            makeLander(-3, 2.1, -4, .8);
            for (let i = 0; i < 13; i += 1) {
                const rock = make(                new THREE.IcosahedronGeometry(.35 + Math.random() * .85, 1), destination === "Moon" ? 0x91939a : 0x9c5e45, (Math.random() - .5) * 22, .1, -8 + Math.random() * 16);
                rock.rotation.set(Math.random(), Math.random(), Math.random());
            }
            const habitat = make(new THREE.CylinderGeometry(2.4, 2.4, 2.2, 24), destination === "Moon" ? 0x8cb5c5 : 0x9a8b76, 4.5, 1.1, -3, { metalness: .2, roughness: .62 });
            make(new THREE.SphereGeometry(2.4, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), destination === "Moon" ? 0x8cb5c5 : 0x9a8b76, 4.5, 2.2, -3);
            for (let i = -1; i <= 1; i += 1) {
                make(new THREE.SphereGeometry(.3, 14, 10), 0x183a50, 4.5 + i * .8, 1.45, -.78, {
                metalness: .62, roughness: .2, emissive: 0x0b2433, emissiveIntensity: .3
                }).scale.set(1.25, .75, .2);
            }
            const habitatPanel = make(new THREE.BoxGeometry(1.7, .1, 1), 0x1b4770, 6.1, 1.4, -2.6, {
                metalness: .4, roughness: .3, emissive: 0x0b2440, emissiveIntensity: .2
            });
            habitatPanel.rotation.z = -.16;
            if (stage !== "departure") {
                makeAstronaut(-.7, 0, 1.2);
                makeRover(1.7, 0, -1.7);
            }
            if (stage === "departure") {
                makeLander(0, 2.2, 0, .8);
                setCamera(new THREE.Vector3(13, 8, 22), new THREE.Vector3(0, 2, -2));
            } else setCamera(new THREE.Vector3(18, 11, 25), new THREE.Vector3(0, 1, -2));
            if (destination === "Mars" && stage !== "departure") {
                dustField = addParticles(900, 0xd89074, .65, new THREE.Vector3(110, 30, 95), new THREE.Vector3(0, 8, -24), .005);
                dustField.userData.active = true;
            }
        } else {
            earth();
            setCamera(new THREE.Vector3(12, 8, 22), new THREE.Vector3(0, 0, 0));
        }
    }

    function showStage(id) {
        if (stageUnlockTimer) window.clearTimeout(stageUnlockTimer);
        stageUnlockTimer = 0;
        currentStage = id;
        const stage = missionStages.find((item) => item.id === id);
        if (!stage) return;
        const stagePanel = root.querySelector(".mission-stage");
        stagePanel.dataset.missionStage = id;
        stagePanel.classList.add("is-transitioning");
        setScene(id);
        window.setTimeout(() => stagePanel.classList.remove("is-transitioning"), 650);
        root.querySelector("#mission-status").textContent = id === "recovery" ? "MISSION COMPLETE" : "MISSION SYSTEMS NOMINAL";
        root.querySelector("#mission-phase").textContent = stage.phase;
        root.querySelector("#mission-title").textContent = stage.title;
        root.querySelector("#mission-description").textContent = id === "surface" ? details.intro : contextual(stage.message);
        root.querySelector("#mission-description").hidden = id === "survival";
        nextButton.textContent = stage.button;
        const stageDelay = id === "ascent" ? 18000 : id === "separation" ? 7500 : id === "landing" ? 6500 : 0;
        nextButton.disabled = (id === "survival" && completedTasks.size < details.fieldLessons.length) || stageDelay > 0;
        if (stageDelay) {
            stageUnlockTimer = window.setTimeout(() => {
                if (root.isConnected && currentStage === id) nextButton.disabled = false;
            }, stageDelay);
        }
        overlay.replaceChildren();
        if (id === "survival") buildSurvivalActivity();
        if (id === "recovery") {
            root.querySelector("#mission-title").textContent = `Mission complete, ${astronautName}!`;
            root.querySelector("#mission-description").textContent = `Your simulated ${destination} expedition has returned safely to Earth. Next up: a short mission assessment.`;
        }
        const spoken = id === "surface" ? details.intro : contextual(stage.message);
        speak(spoken);
    }

    function beginCountdown() {
        if (countdownActive) return;
        countdownActive = true;
        root.querySelector(".mission-stage").classList.add("countdown-mode");
        nextButton.disabled = true;
        let seconds = 10;
        const heading = root.querySelector("#mission-title");
        const description = root.querySelector("#mission-description");
        root.querySelector("#mission-status").textContent = "FLIGHT COMPUTERS CHECKED";
        heading.textContent = "T−10";
        description.textContent = "Commander Mira is checking the launch sequence.";
        speak("Flight systems are responding. We are beginning the final countdown.");
        countdownTimer = window.setInterval(() => {
            seconds -= 1;
            if (!root.isConnected) {
                window.clearInterval(countdownTimer);
                return;
            }
            if (seconds > 0) {
                heading.textContent = `T−${seconds}`;
                if ([5, 3, 1].includes(seconds)) root.querySelector("#mission-status").textContent = `T−${seconds} · ALL SYSTEMS GO`;
                root.querySelector(".mission-stage").classList.toggle("countdown-pulse", seconds <= 5 && seconds % 2 === 0);
                return;
            }
            window.clearInterval(countdownTimer);
            countdownTimer = 0;
            root.querySelector(".mission-stage").classList.remove("countdown-pulse", "countdown-mode");
            heading.textContent = "LIFTOFF!";
            root.querySelector("#mission-status").textContent = "ENGINE IGNITION · ASCENT";
            if (flame) flame.visible = true;
            speak("Ignition. Liftoff! We are climbing into the sky.");
            window.setTimeout(() => {
                if (!root.isConnected) return;
                countdownActive = false;
                showStage("ascent");
            }, 1700);
        }, 1000);
    }

    function renderResources() {
        const labels = [["O₂", "oxygen"], ["WATER", "water"], ["POWER", "power"], ["FOOD", "food"]];
        root.querySelector(".mission-resources").innerHTML = labels.map(([label, key]) =>
            `<span class="resource-pill">${label} <strong>${resources[key]}%</strong></span>`
        ).join("");
    }

    function buildSurvivalActivity() {
        const card = document.createElement("div");
        card.className = "mission-activity";
        card.innerHTML = `<div class="nova-info-label">${destination.toUpperCase()} FIELD SIMULATION · 3 LESSONS</div>
            <h2>Make the safe science choice</h2>
            <p class="field-intro">${destination === "Moon"
                ? "There is no breathable air and radiation reaches the surface. Choose a safe site, protect the habitat and check suit life support before an EVA."
                : "Mars has a thin carbon-dioxide atmosphere, fine dust and radiation exposure. Make decisions that protect the crew while preserving the science mission."}</p>
            <div class="field-task-list" role="group" aria-label="Field lessons"></div>
            <section class="field-challenge" aria-live="polite"></section>
            <p class="activity-progress"></p>`;
        const effects = [
            { oxygen: -2, water: -4, power: -5, food: -1 },
            { oxygen: -5, water: -1, power: -2, food: -2 },
            { oxygen: -3, water: -3, power: -1, food: -3 }
        ];
        const taskList = card.querySelector(".field-task-list");
        const challenge = card.querySelector(".field-challenge");
        details.fieldLessons.forEach((lesson, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = `${completedTasks.has(index) ? "✓ " : ""}${index + 1}. ${details.habitat[index]}`;
            button.setAttribute("aria-pressed", String(selectedFieldTask === index));
            button.addEventListener("click", () => {
                selectedFieldTask = index;
                fieldFeedback = "";
                renderResources();
                buildSurvivalActivity();
            });
            taskList.appendChild(button);
        });
        const lesson = details.fieldLessons[selectedFieldTask];
        const complete = completedTasks.has(selectedFieldTask);
        const heading = document.createElement("h3");
        heading.textContent = lesson.prompt;
        challenge.appendChild(heading);
        const options = document.createElement("div");
        options.className = "field-options";
        lesson.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = option;
            button.disabled = complete;
            button.addEventListener("click", () => {
                if (index !== lesson.answer) {
                    fieldFeedbackCorrect = false;
                    fieldFeedback = `Try again. Hint: ${lesson.hint}`;
                    buildSurvivalActivity();
                    speak(fieldFeedback);
                    return;
                }
                completedTasks.add(selectedFieldTask);
                Object.entries(effects[selectedFieldTask]).forEach(([key, amount]) => {
                    resources[key] = Math.max(0, resources[key] + amount);
                });
                fieldFeedbackCorrect = true;
                fieldFeedback = `Good call. ${lesson.explanation}`;
                nextButton.disabled = completedTasks.size < details.fieldLessons.length;
                renderResources();
                buildSurvivalActivity();
                speak(fieldFeedback);
            });
            options.appendChild(button);
        });
        challenge.appendChild(options);
        if (complete) {
            const explanation = document.createElement("p");
            explanation.className = "field-explanation";
            explanation.textContent = lesson.explanation;
            challenge.appendChild(explanation);
        }
        if (fieldFeedback) {
            const feedback = document.createElement("p");
            feedback.className = `field-feedback${fieldFeedbackCorrect ? " is-correct" : ""}`;
            feedback.setAttribute("role", "status");
            feedback.textContent = fieldFeedback;
            challenge.appendChild(feedback);
        }
        card.querySelector(".activity-progress").textContent =
            `${completedTasks.size} of ${details.fieldLessons.length} lessons complete · Supplies are tracked below.`;
        overlay.replaceChildren(card);
    }

    function showAssessment() {
        currentStage = "assessment";
        assessmentIndex = 0;
        score = 0;
        answered = false;
        root.querySelector("#mission-phase").textContent = "FINAL MISSION ASSESSMENT";
        root.querySelector("#mission-title").textContent = "What did you discover?";
        root.querySelector("#mission-description").hidden = true;
        nextButton.hidden = true;
        overlay.innerHTML = `<div class="mission-assessment"><section class="assessment-card" aria-live="polite"></section></div>`;
        renderQuestion();
        speak(`You are safely back on Earth, ${astronautName}. Let's review what you discovered.`);
    }

    function renderQuestion() {
        const card = overlay.querySelector(".assessment-card");
        const question = details.quiz[assessmentIndex];
        if (!question) {
            renderAchievement(card);
            return;
        }
        card.innerHTML = `<div class="nova-info-label">QUESTION ${assessmentIndex + 1} OF ${details.quiz.length}</div><h2>${question.q}</h2><div class="assessment-options"></div><p class="assessment-feedback" aria-live="polite"></p>`;
        const options = card.querySelector(".assessment-options");
        question.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = option;
            button.addEventListener("click", () => {
                if (answered) return;
                answered = true;
                const correct = index === question.answer;
                if (correct) score += 1;
                options.querySelectorAll("button").forEach((choice, choiceIndex) => {
                    choice.disabled = true;
                    if (choiceIndex === question.answer) choice.setAttribute("aria-label", `${choice.textContent} — correct answer`);
                });
                card.querySelector(".assessment-feedback").textContent = `${correct ? "That's right!" : "Good try."} ${question.explain}`;
                const next = document.createElement("button");
                next.className = "nova-button";
                next.type = "button";
                next.textContent = assessmentIndex === details.quiz.length - 1 ? "SEE MY RESULTS →" : "NEXT QUESTION →";
                next.addEventListener("click", () => {
                    assessmentIndex += 1;
                    answered = false;
                    renderQuestion();
                });
                card.appendChild(next);
            });
            options.appendChild(button);
        });
    }

    function renderAchievement(card) {
        card.innerHTML = `<div class="nova-info-label">MISSION NOVA · CERTIFICATE OF COMPLETION</div>
            <h2>Space explorer, ${escapeHTML(astronautName)}!</h2>
            <p>You completed the simulated ${destination} mission and safely returned to Earth.</p>
            <p class="assessment-score">✦ ${score} / ${details.quiz.length} correct · ${destination.toUpperCase()} MISSION BADGE</p>
            <p>${score >= 4 ? "Excellent work, Commander!" : "Every explorer learns something new. You can try the assessment again on your next mission."}</p>`;

        const actions = document.createElement("div");
        actions.className = "assessment-actions";

        const outpostButton = document.createElement("button");
        outpostButton.type = "button";
        outpostButton.className = "nova-button outpost-launch";
        outpostButton.dataset.destination = destination;
        outpostButton.textContent = "ENTER OUTPOST COMMAND →";
        outpostButton.addEventListener("click", () => startOutpostSimulation(destination));

        const returnButton = document.createElement("button");
        returnButton.type = "button";
        returnButton.className = "nova-button";
        returnButton.id = "return-to-explorer";
        returnButton.textContent = "RETURN TO SOLAR SYSTEM →";
        returnButton.addEventListener("click", closeMission);

        actions.append(outpostButton, returnButton);
        card.appendChild(actions);
    }

    function advance() {
        if (currentStage === "launchpad") return showStage("cockpit");
        if (currentStage === "cockpit") return beginCountdown();
        if (currentStage === "survival") return showStage("departure");
        if (currentStage === "recovery") return showAssessment();
        const index = missionStages.findIndex((stage) => stage.id === currentStage);
        if (index >= 0 && missionStages[index + 1]) showStage(missionStages[index + 1].id);
    }

    nextButton.addEventListener("click", advance);
    root.querySelector("#mission-repeat").addEventListener("click", () => speak(currentLine));
    root.querySelector("#mission-exit").addEventListener("click", closeMission);
    root.querySelector("#voice-toggle").addEventListener("click", (event) => {
        voiceOn = !voiceOn;
        event.currentTarget.setAttribute("aria-pressed", String(voiceOn));
        event.currentTarget.textContent = `VOICE: ${voiceOn ? "ON" : "OFF"}`;
        if (!voiceOn && "speechSynthesis" in window) window.speechSynthesis.cancel();
        else if (currentLine) speak(currentLine);
    });
    root.querySelector("#subtitle-toggle").addEventListener("click", (event) => {
        subtitlesOn = !subtitlesOn;
        event.currentTarget.setAttribute("aria-pressed", String(subtitlesOn));
        event.currentTarget.textContent = `SUBTITLES: ${subtitlesOn ? "ON" : "OFF"}`;
        caption.textContent = subtitlesOn ? currentLine : "";
    });

    function closeMission() {
        if (countdownTimer) window.clearInterval(countdownTimer);
        if (stageUnlockTimer) window.clearTimeout(stageUnlockTimer);
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        if (animation) cancelAnimationFrame(animation);
        if (resizeHandler) window.removeEventListener("resize", resizeHandler);
        if (renderer) {
            renderer.dispose();
            if (canvas.isConnected) canvas.replaceWith(canvas.cloneNode(false));
        }
        if (scene) {
            scene.traverse((object) => {
                object.geometry?.dispose();
                if (Array.isArray(object.material)) object.material.forEach((material) => {
                    material.userData.isMissionMaterial = false;
                    material.map?.dispose();
                    material.dispose();
                });
                else {
                    if (object.material) object.material.userData.isMissionMaterial = false;
                    object.material?.map?.dispose();
                    object.material?.dispose();
                }
            });
        }
        root.remove();
        const explorer = document.getElementById("nova-explorer");
        if (explorer) {
            explorer.hidden = false;
            startExplorer();
        }
    }

    try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(48, 1, .1, 300);
        camera.position.set(17, 10, 28);
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        missionGroup = new THREE.Group();
        scene.add(missionGroup);
        resizeHandler = () => {
            if (!renderer || !canvas.isConnected) return;
            const { clientWidth: width, clientHeight: height } = canvas;
            if (!width || !height) return;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        const daytimeSky = new THREE.Color(0x84b9dd);
        const orbitalSky = new THREE.Color(0x020611);
        function animate() {
            if (!renderer || !canvas.isConnected) return;
            animation = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();
            sceneClock = elapsed - sceneStartedAt;
            camera.position.lerp(cameraTargetPosition, .035);
            camera.lookAt(cameraTargetLookAt);
            planetaryBodies.forEach((body, index) => {
                body.rotation.y += index === 0 ? .00009 : .00015;
            });
            if (cloudLayer) cloudLayer.rotation.y += .00018;
            movingClouds.forEach((cloud, index) => {
                cloud.position.x += cloud.userData.drift || .002 + index * .0004;
                if (cloud.position.x > 45) cloud.position.x = -45;
            });
            if (starField) starField.material.opacity = .68 + Math.sin(elapsed * 1.4) * .14;
            if (dustField?.userData.active) {
                const positions = dustField.geometry.attributes.position;
                const velocities = dustField.userData.velocities;
                const origin = dustField.userData.origin;
                const area = dustField.userData.area;
                for (let i = 0; i < positions.count; i += 1) {
                    let x = positions.getX(i) + velocities[i * 3];
                    let y = positions.getY(i) + velocities[i * 3 + 1];
                    let z = positions.getZ(i) + velocities[i * 3 + 2];
                    if (y > origin.y + area.y / 2 || y < origin.y - area.y / 2) {
                        x = origin.x + (Math.random() - .5) * area.x;
                        y = origin.y + (Math.random() - .5) * area.y;
                        z = origin.z + (Math.random() - .5) * area.z;
                    }
                    positions.setXYZ(i, x, y, z);
                }
                positions.needsUpdate = true;
            }
            if (currentStage === "cockpit" && countdownActive) {
                missionGroup.traverse((object) => {
                    if (object.userData.warningLight) {
                        object.material.emissiveIntensity = Math.sin(elapsed * 8) > 0 ? 2.5 : .25;
                    }
                });
            }
            if (rocket && currentStage === "ascent") {
                const flightTime = Math.max(0, sceneClock - .35);
                rocket.position.y = .35 + flightTime * 1.2 + flightTime * flightTime * .18;
                rocket.rotation.z = Math.sin(elapsed * .65) * .004;
                cameraTargetPosition.set(rocket.position.x + 25, rocket.position.y + 18, rocket.position.z + 43);
                cameraTargetLookAt.set(rocket.position.x, rocket.position.y + 8, rocket.position.z - 5);
                const altitude = rocket.position.y;
                const orbitalProgress = THREE.MathUtils.smoothstep(altitude, 20, 85);
                scene.background.lerpColors(daytimeSky, orbitalSky, orbitalProgress);
                if (scene.fog) {
                    scene.fog.color.lerpColors(daytimeSky, orbitalSky, orbitalProgress);
                    scene.fog.near = THREE.MathUtils.lerp(90, 900, orbitalProgress);
                    scene.fog.far = THREE.MathUtils.lerp(300, 1600, orbitalProgress);
                }
                if (starField) {
                    starField.visible = orbitalProgress > .28;
                    starField.material.opacity = THREE.MathUtils.smoothstep(orbitalProgress, .28, .8) * .82;
                    starField.position.y = altitude * orbitalProgress;
                }
                launchTowerArms.forEach((arm) => {
                    arm.position.x = -3.15 - Math.min(2.2, Math.max(0, sceneClock - .3) * 2);
                });
                if (launchSmoke) {
                    launchSmoke.material.opacity = Math.max(0, .24 - altitude * .017);
                    launchSmoke.visible = altitude < 16;
                }
                if (flame) {
                    const pulse = 1 + Math.sin(elapsed * 18) * .08;
                    flame.scale.set(pulse, pulse, pulse);
                    if (flame.userData.core) flame.userData.core.visible = true;
                    if (flame.userData.light) flame.userData.light.intensity = 3.5 + Math.sin(elapsed * 17) * .6;
                }
                if (!detachedStage && booster && flightTime > 7) {
                    missionGroup.attach(booster);
                    boosterStart.copy(booster.position);
                    detachedStage = true;
                    if (flame) {
                        flame.visible = false;
                        if (flame.userData.light) flame.userData.light.intensity = 0;
                    }
                    if (upperStageFlame) upperStageFlame.visible = true;
                    const phase = root.querySelector("#mission-phase");
                    const status = root.querySelector("#mission-status");
                    const title = root.querySelector("#mission-title");
                    if (phase) phase.textContent = "BOOSTER SEPARATION";
                    if (status) status.textContent = "FIRST STAGE · RELEASED";
                    if (title) title.textContent = "First-stage separation";
                    const line = "The first stage is spent, so it drops away while the upper-stage engine continues to push the crew toward orbit.";
                    currentLine = line;
                    if (subtitlesOn) caption.textContent = line;
                    if (voiceOn) speak(line);
                }
                if (detachedStage && booster) {
                    const separationTime = Math.max(0, flightTime - 7);
                    booster.position.set(
                        boosterStart.x - separationTime * 1.2,
                        boosterStart.y - separationTime * .38 - separationTime * separationTime * .16,
                        boosterStart.z + separationTime * .1
                    );
                    booster.rotation.z = separationTime * .11;
                    booster.rotation.x = separationTime * .065;
                }
                if (!fairingsReleased && detachedStage && flightTime > 12) {
                    fairingStarts = fairingPanels.map((panel) => {
                        missionGroup.attach(panel);
                        return panel.position.clone();
                    });
                    fairingsReleased = true;
                    const phase = root.querySelector("#mission-phase");
                    const status = root.querySelector("#mission-status");
                    const title = root.querySelector("#mission-title");
                    if (phase) phase.textContent = "PAYLOAD FAIRING JETTISON";
                    if (status) status.textContent = "THIN AIR · FAIRINGS RELEASED";
                    if (title) title.textContent = "Payload fairings released";
                    const line = "The atmosphere is thin enough now to release the protective fairings. The exposed capsule can continue toward orbit with less mass.";
                    currentLine = line;
                    if (subtitlesOn) caption.textContent = line;
                    if (voiceOn) speak(line);
                }
                if (fairingsReleased) {
                    fairingPanels.forEach((panel, index) => {
                        const separationTime = Math.max(0, flightTime - 12);
                        const direction = index === 0 ? -1 : 1;
                        panel.position.set(
                            fairingStarts[index].x + direction * separationTime * 1.1,
                            fairingStarts[index].y - separationTime * separationTime * .1,
                            fairingStarts[index].z - separationTime * .18
                        );
                        panel.rotation.z = direction * separationTime * .09;
                        panel.rotation.y += direction * .004;
                    });
                }
                if (upperStageFlame && detachedStage) {
                    const pulse = 1 + Math.sin(elapsed * 20) * .07;
                    upperStageFlame.scale.set(pulse, pulse, pulse);
                    if (upperStageFlame.userData.core) upperStageFlame.userData.core.visible = true;
                }
            }
            if (rocket && currentStage === "separation") {
                const stageTime = Math.max(0, sceneClock - 1);
                rocket.position.y = .5 + stageTime * .2;
                cameraTargetPosition.set(rocket.position.x + 18, rocket.position.y + 16, rocket.position.z + 33);
                cameraTargetLookAt.set(rocket.position.x + .5, rocket.position.y + 12, rocket.position.z - 6);
                if (upperStage) {
                    upperStage.rotation.z = Math.sin(elapsed * .4) * .015;
                    if (!upperStageFlame.visible) upperStageFlame.visible = true;
                }
                if (!capsuleSeparated && capsule && sceneClock > 3) {
                    missionGroup.attach(capsule);
                    capsuleStart.copy(capsule.position);
                    capsuleSeparated = true;
                    if (upperStageFlame) upperStageFlame.visible = false;
                    const phase = root.querySelector("#mission-phase");
                    const status = root.querySelector("#mission-status");
                    const title = root.querySelector("#mission-title");
                    if (phase) phase.textContent = "ORBITAL INSERTION";
                    if (status) status.textContent = "CREW CAPSULE · FREE FLIGHT";
                    if (title) title.textContent = "Capsule separation";
                    const line = "The capsule has separated from the spent upper stage. The crew is now coasting in orbit, with the old stage safely drifting behind.";
                    currentLine = line;
                    if (subtitlesOn) caption.textContent = line;
                    if (voiceOn) speak(line);
                }
                if (capsuleSeparated && capsule) {
                    const separationTime = sceneClock - 3;
                    capsule.position.set(
                        capsuleStart.x + separationTime * .28,
                        capsuleStart.y + separationTime * .12,
                        capsuleStart.z - separationTime * .22
                    );
                    capsule.rotation.z = Math.sin(elapsed * .7) * .012;
                }
            }
            if (currentStage === "landing" && rocket) {
                rocket.position.y = Math.max(1.45, 7 - Math.min(5.55, sceneClock * .78));
                if (rocket.userData.engine) rocket.userData.engine.scale.y = .8 + Math.sin(elapsed * 16) * .1;
                if (parachute) {
                    parachute.position.y = 11 - Math.min(3, sceneClock * .22);
                    parachute.position.x = Math.max(0, sceneClock - 4.2) * .5;
                    parachute.rotation.z = Math.max(0, sceneClock - 4.2) * .025;
                    if (sceneClock > 5.2) parachute.visible = false;
                }
            }
            if (currentStage === "launchpad" && rocket) {
                rocket.rotation.z = Math.sin(elapsed * .7) * .003;
                if (flame?.visible) flame.scale.set(1 + Math.sin(elapsed * 18) * .12, 1.2 + Math.sin(elapsed * 14) * .15, 1);
            }
            renderer.render(scene, camera);
        }
        animate();
    } catch (error) {
        console.error("Mission Nova scene failed to start.", error);
        const errorBox = document.createElement("p");
        errorBox.className = "mission-loading-error";
        errorBox.setAttribute("role", "alert");
        errorBox.textContent = "The 3D scene is unavailable in this browser. You can still follow the mission using the controls.";
        root.querySelector(".mission-stage").appendChild(errorBox);
    }
    return { showStage };
}

addStars(byId("space-background"));

const outpostDefinitions = {
    Moon: {
        title: "LUNAR OUTPOST COMMAND",
        intro: "Congratulations, Astronaut! Your landing was successful. But your mission is not over. You are now responsible for establishing and maintaining a planetary outpost. Your crew depends on your decisions. Every resource matters. Welcome to Outpost Command!",
        environment: "Radiation spikes, lunar dust, extreme temperature swings and limited water create constant survival pressure.",
        events: [
            {
                id: "power-failure",
                title: "Power failure",
                prompt: "The habitat's power supply is dropping!",
                choices: [
                    { label: "Deploy additional solar panels", effect: { power: 12, crewSafety: 4 }, result: "New panels add generation, although lunar dust will require cleaning and upkeep." },
                    { label: "Switch off non-essential equipment", effect: { power: 10, habitatCondition: -4, lifeSupport: -2 }, result: "Power use drops immediately, but comfort and equipment condition suffer in the short term." },
                    { label: "Activate backup batteries", effect: { power: 14, water: -4, crewSafety: -3 }, result: "Backup batteries protect critical systems, but they consume stored reserves and leave less margin for later." }
                ]
            },
            {
                id: "water-shortage",
                title: "Water shortage",
                prompt: "Water reserves are becoming critical!",
                choices: [
                    { label: "Activate water recycling", effect: { water: 16, power: -7, lifeSupport: 5 }, result: "Recycling raises reserves, but extra equipment draw increases power demand." },
                    { label: "Reduce water consumption", effect: { water: 10, crewSafety: 3, habitatCondition: -2 }, result: "A strict usage plan buys time, but the crew feels discomfort and habitat standards slip." },
                    { label: "Use emergency stored water", effect: { water: 18, lifeSupport: -4, crewSafety: -3 }, result: "Stored reserves calm the emergency now, but future supply becomes tighter." }
                ]
            },
            {
                id: "food-shortage",
                title: "Food shortage",
                prompt: "Food supplies may not last until the mission ends!",
                choices: [
                    { label: "Expand greenhouse production", effect: { food: 14, water: -7, power: -5 }, result: "Growing more food helps the long term, but it needs more water and power." },
                    { label: "Ration stored food", effect: { food: 10, crewSafety: -4, lifeSupport: -2 }, result: "Rationing preserves the stockpile for now, but morale and operational flexibility drop." },
                    { label: "Allocate additional power to food production", effect: { food: 16, power: -12, lifeSupport: -2 }, result: "More power yields more crops, but it leaves the habitat energy poor for other systems." }
                ]
            },
            {
                id: "radiation-warning",
                title: "Radiation warning",
                prompt: "Radiation exposure outside the habitat is dangerous!",
                choices: [
                    { label: "Move the crew into the protected shelter", effect: { radiationProtection: 12, crewSafety: 6, lifeSupport: -2 }, result: "Sheltering the crew sharply reduces risk, though support systems must work harder for a while." },
                    { label: "Improve radiation shielding", effect: { radiationProtection: 18, power: -8, habitatCondition: -3 }, result: "Shielding reduces future exposure but requires materials and energy to install." },
                    { label: "Cancel outdoor exploration", effect: { radiationProtection: 9, crewSafety: 5, water: -3 }, result: "Stopping EVA work keeps the crew safe now and gives the habitat time to recover." }
                ]
            },
            {
                id: "oxygen-system-malfunction",
                title: "Oxygen system malfunction",
                prompt: "The oxygen generation unit has stopped working!",
                choices: [
                    { label: "Activate backup oxygen", effect: { oxygen: 18, power: -8, lifeSupport: -2 }, result: "Backup oxygen stabilizes the habitat immediately, but it drains reserves and power." },
                    { label: "Repair the oxygen generator", effect: { oxygen: 10, power: -6, habitatCondition: -2 }, result: "Repair restores long-term production, but the crew must accept a brief reduction in reserves while work is underway." },
                    { label: "Reduce non-essential activities", effect: { oxygen: 8, crewSafety: 2, lifeSupport: 3, power: -4 }, result: "Lower demand buys time and keeps the habitat working, though routine work slows down." }
                ]
            }
        ]
    },
    Mars: {
        title: "MARTIAN OUTPOST COMMAND",
        intro: "Congratulations, Astronaut! Your landing was successful. But your mission is not over. You are now responsible for establishing and maintaining a planetary outpost. Your crew depends on your decisions. Every resource matters. Welcome to Outpost Command!",
        environment: "Dust storms, thin atmosphere, communication delays and extreme cold place the Martian base under constant environmental stress.",
        events: [
            {
                id: "dust-storm",
                title: "Dust storm",
                prompt: "A violent dust storm is reducing solar generation!",
                choices: [
                    { label: "Deploy additional solar panels", effect: { power: 13, habitatCondition: 2 }, result: "More solar capacity improves resilience, though the storm still burdens panel cleaning and maintenance." },
                    { label: "Switch off non-essential equipment", effect: { power: 11, lifeSupport: -3, crewSafety: 1 }, result: "Reduced power draw stabilizes the grid and protects critical systems for the moment." },
                    { label: "Activate emergency batteries", effect: { power: 15, water: -5, crewSafety: -2 }, result: "The battery reserve keeps the habitat alive, but the crew loses some flexibility for future emergencies." }
                ]
            },
            {
                id: "water-extraction-failure",
                title: "Water extraction challenge",
                prompt: "Water recovery is falling below mission targets!",
                choices: [
                    { label: "Activate the recycling loop", effect: { water: 17, power: -6, habitatCondition: 4 }, result: "Recycling recovers precious water, but it needs electrical support and repairs." },
                    { label: "Reduce water usage", effect: { water: 9, lifeSupport: 3, crewSafety: 2 }, result: "Conservation buys time while the habitat scales back non-critical demand." },
                    { label: "Drain emergency stores", effect: { water: 18, crewSafety: -3, lifeSupport: -4 }, result: "Emergency reserves keep the crew going now, but they cannot be spent without future risk." }
                ]
            },
            {
                id: "food-shortage",
                title: "Food shortage",
                prompt: "Food supplies may not last until the mission ends!",
                choices: [
                    { label: "Expand greenhouse production", effect: { food: 14, water: -7, power: -5 }, result: "The greenhouse increases resilience, but it needs water and power to operate effectively." },
                    { label: "Ration food reserves", effect: { food: 9, crewSafety: -4, lifeSupport: -2 }, result: "Rationing protects the crop plan and delays crisis, but morale drops." },
                    { label: "Allocate more power to food production", effect: { food: 16, power: -12, lifeSupport: -2 }, result: "The crop system works harder, but the habitat must run with less margin for other systems." }
                ]
            },
            {
                id: "radiation-warning",
                title: "Radiation warning",
                prompt: "High-energy radiation outside the habitat is becoming dangerous!",
                choices: [
                    { label: "Move the crew into the protected shelter", effect: { radiationProtection: 12, crewSafety: 6 }, result: "The shelter sharply reduces risk and keeps the crew under controlled conditions." },
                    { label: "Improve radiation shielding", effect: { radiationProtection: 18, power: -8, habitatCondition: -3 }, result: "Shielding pays off over time, but the base must sacrifice short-term power and structural resilience." },
                    { label: "Cancel outdoor exploration", effect: { radiationProtection: 9, crewSafety: 5, water: -2 }, result: "Stopping EVA operations protects the crew and allows the habitat to recover." }
                ]
            },
            {
                id: "oxygen-system-malfunction",
                title: "Oxygen system malfunction",
                prompt: "The oxygen generation unit has stopped working!",
                choices: [
                    { label: "Activate backup oxygen", effect: { oxygen: 18, power: -8, lifeSupport: -2 }, result: "Backup oxygen saves the crew immediately, but it drains reserves and electrical support." },
                    { label: "Repair the oxygen generator", effect: { oxygen: 10, power: -6, habitatCondition: -2 }, result: "Repair restores more sustainable life support, though the temporary system loss still hurts operations." },
                    { label: "Reduce non-essential activities", effect: { oxygen: 8, crewSafety: 2, lifeSupport: 3, power: -4 }, result: "Lower demand buys time and keeps the base stable while the crew remains focused on repairs." }
                ]
            }
        ]
    }
};

const outpostModules = [
    {
        id: "crew-habitat",
        name: "Crew Habitat",
        purpose: "Provides a durable living and work space for astronauts.",
        cost: { power: 10, water: 8, food: 6 },
        benefits: { habitatCondition: 18, lifeSupport: 12, crewSafety: 8 },
        restrictions: "Requires a stable power and water network to stay healthy.",
        summary: "Better shelter quality improves habitability and reduces crew stress."
    },
    {
        id: "radiation-shielding",
        name: "Radiation Shielding",
        purpose: "Protects the crew from harmful surface radiation.",
        cost: { power: 12, water: 9 },
        benefits: { radiationProtection: 18, crewSafety: 11 },
        restrictions: "Adds mass and must be maintained against dust and temperature swings.",
        summary: "Good shielding helps prevent exposure from the environment."
    },
    {
        id: "solar-power-station",
        name: "Solar Power Station",
        purpose: "Generates extra electricity for habitat systems.",
        cost: { power: 8, water: 7 },
        benefits: { power: 18, lifeSupport: 5 },
        restrictions: "Dust, shadow and weather reduce its long-term output.",
        summary: "Reliable power is essential for water, oxygen and heat control."
    },
    {
        id: "oxygen-generator",
        name: "Oxygen Generator",
        purpose: "Creates breathable oxygen for the outpost.",
        cost: { power: 12, water: 6 },
        benefits: { oxygen: 18, lifeSupport: 8 },
        restrictions: "Needs steady power and periodic maintenance to remain efficient.",
        summary: "This balances the crew's continuous oxygen demand."
    },
    {
        id: "water-recycling-unit",
        name: "Water Recycling Unit",
        purpose: "Recovers and purifies water for reuse.",
        cost: { power: 10, food: 5 },
        benefits: { water: 18, lifeSupport: 9 },
        restrictions: "Works best when the habitat is well maintained and powered.",
        summary: "It makes limited water reserves last longer."
    },
    {
        id: "food-production-greenhouse",
        name: "Food Production Greenhouse",
        purpose: "Grows fresh food to reduce reliance on stored rations.",
        cost: { water: 12, power: 11 },
        benefits: { food: 20, crewSafety: 7 },
        restrictions: "Food production needs a reliable water and power supply.",
        summary: "Farming improves long-term survival and morale."
    },
    {
        id: "emergency-battery",
        name: "Emergency Battery",
        purpose: "Stores reserve electricity for critical outages.",
        cost: { power: 8, water: 5 },
        benefits: { power: 14, crewSafety: 8 },
        restrictions: "Useful in emergencies, but it cannot replace normal generation.",
        summary: "Battery reserves help during storms, faults and sudden failures."
    },
    {
        id: "communication-station",
        name: "Communication Station",
        purpose: "Improves transmissions and mission coordination.",
        cost: { power: 9, water: 4 },
        benefits: { crewSafety: 11, habitatCondition: 6 },
        restrictions: "It cannot fully resolve environmental hazards by itself.",
        summary: "Stable communication keeps the crew informed and safer."
    }
];

function startOutpostSimulation(destination) {
    const existing = document.getElementById("outpost-command");
    if (existing) existing.remove();

    const config = outpostDefinitions[destination] || outpostDefinitions.Moon;
    const state = {
        destination,
        day: 1,
        resources: {
            oxygen: 82,
            water: 74,
            food: 70,
            power: 72,
            radiationProtection: 68,
            habitatCondition: 64,
            lifeSupport: 71,
            crewSafety: 76
        },
        builtModules: [],
        activeEmergency: null,
        log: [
            "Commander Mira: Welcome to Outpost Command. Your crew is counting on your first decisions.",
            `${destination} environmental conditions are being monitored in real time.`
        ],
        alert: "Mission systems are stable, but conditions can change quickly."
    };

    const panel = document.createElement("section");
    panel.id = "outpost-command";
    panel.className = "outpost-command";
    panel.setAttribute("aria-label", `${destination} planetary outpost simulator`);
    panel.innerHTML = `
        <div class="outpost-shell">
            <header class="outpost-header">
                <div>
                    <div class="outpost-kicker">OUTPOST COMMAND • ${destination.toUpperCase()}</div>
                    <h2>Planetary Survival Simulator</h2>
                </div>
                <button id="outpost-close" class="outpost-close" type="button">CLOSE SIMULATOR</button>
            </header>

            <div class="outpost-summary">
                <div class="summary-box">
                    <span>Mission day</span>
                    <strong id="outpost-day">1</strong>
                </div>
                <div class="summary-box">
                    <span>Mission condition</span>
                    <strong id="outpost-condition">0%</strong>
                </div>
                <div class="summary-box wide">
                    <span>Environmental conditions</span>
                    <strong id="outpost-environment">${config.environment}</strong>
                </div>
            </div>

            <div class="outpost-grid">
                <div class="panel resources-panel">
                    <div class="panel-head">
                        <h3>Resource dashboard</h3>
                        <span>Values are simplified game measurements, not real engineering specifications.</span>
                    </div>
                    <div id="resource-list" class="resource-list"></div>
                </div>

                <div class="panel status-panel">
                    <div class="panel-head">
                        <h3>Mission watch</h3>
                        <span>Live alerts and crew updates</span>
                    </div>
                    <div class="alert-banner" id="outpost-alert">${state.alert}</div>
                    <div class="section-box">
                        <h4>Current alerts</h4>
                        <div id="alert-list" class="alert-list"></div>
                    </div>
                    <div class="section-box">
                        <h4>Mission log</h4>
                        <div id="mission-log" class="mission-log"></div>
                    </div>
                </div>
            </div>

            <div class="outpost-lower">
                <div class="panel build-panel">
                    <div class="panel-head">
                        <h3>Outpost construction</h3>
                        <span>Build modules to improve survival and reduce future risk.</span>
                    </div>
                    <div id="module-list" class="module-list"></div>
                </div>

                <div class="panel emergency-panel">
                    <div class="panel-head">
                        <h3>Emergency response</h3>
                        <span>Choose how the crew responds.</span>
                    </div>
                    <div id="emergency-panel" class="emergency-panel-inner"></div>
                </div>
            </div>

            <div class="outpost-controls">
                <button id="advance-day" class="major-button" type="button">ADVANCE MISSION DAY</button>
                <button id="reset-outpost" class="secondary-button" type="button">RESET OUTPOST</button>
            </div>
        </div>
    `;

    document.body.appendChild(panel);

    const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
    const resourceOrder = ["oxygen", "water", "food", "power", "radiationProtection", "habitatCondition", "lifeSupport", "crewSafety"];
    const resourceLabels = {
        oxygen: "Oxygen",
        water: "Water",
        food: "Food",
        power: "Electrical power",
        radiationProtection: "Radiation protection",
        habitatCondition: "Habitat condition",
        lifeSupport: "Life-support condition",
        crewSafety: "Crew safety"
    };

    function updateMissionSummary() {
        const values = resourceOrder.map((key) => state.resources[key]);
        const overall = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
        const alertMessages = [];

        if (state.resources.oxygen < 35) alertMessages.push("Oxygen is dropping.");
        if (state.resources.water < 35) alertMessages.push("Water reserves are low.");
        if (state.resources.food < 35) alertMessages.push("Food stockpile is thin.");
        if (state.resources.power < 35) alertMessages.push("Power reserves are critical.");
        if (state.resources.radiationProtection < 35) alertMessages.push("Radiation shielding is weak.");
        if (state.resources.habitatCondition < 35) alertMessages.push("Habitat integrity is at risk.");
        if (state.resources.lifeSupport < 35) alertMessages.push("Life-support systems are failing.");
        if (state.resources.crewSafety < 35) alertMessages.push("Crew safety is under threat.");

        state.alert = alertMessages.length ? alertMessages[0] : "Mission systems are stable, but conditions can change quickly.";

        panel.querySelector("#outpost-day").textContent = String(state.day);
        panel.querySelector("#outpost-condition").textContent = `${overall}%`;
        panel.querySelector("#outpost-alert").textContent = state.alert;
    }

    function applyDelta(key, value) {
        state.resources[key] = clamp(state.resources[key] + value, 0, 100);
    }

    function renderResourceList() {
        const list = panel.querySelector("#resource-list");
        list.innerHTML = resourceOrder.map((key) => {
            const value = state.resources[key];
            const percent = Math.round((value / 100) * 100);
            const severity = value < 35 ? "critical" : value < 60 ? "watch" : "stable";
            return `
                <div class="resource-row ${severity}">
                    <div class="resource-topline">
                        <span>${resourceLabels[key]}</span>
                        <strong>${percent}%</strong>
                    </div>
                    <div class="resource-track"><span style="width:${percent}%"></span></div>
                </div>
            `;
        }).join("");
    }

    function renderModules() {
        const list = panel.querySelector("#module-list");
        list.innerHTML = outpostModules.map((module) => {
            const isBuilt = state.builtModules.includes(module.id);
            const canBuild = !isBuilt && Object.entries(module.cost).every(([key, amount]) => state.resources[key] >= amount);
            return `
                <div class="module-card ${isBuilt ? "built" : ""}">
                    <div class="module-header">
                        <div>
                            <h4>${module.name}</h4>
                            <span>${module.summary}</span>
                        </div>
                        <span class="module-status">${isBuilt ? "Built" : "Ready"}</span>
                    </div>
                    <p><strong>Purpose:</strong> ${module.purpose}</p>
                    <p><strong>Cost:</strong> ${Object.entries(module.cost).map(([key, amount]) => `${resourceLabels[key]} ${amount}%`).join(" · ")}</p>
                    <p><strong>Benefits:</strong> ${Object.entries(module.benefits).map(([key, amount]) => `${resourceLabels[key]} +${amount}`).join(" · ")}</p>
                    <p><strong>Limitations:</strong> ${module.restrictions}</p>
                    <button type="button" data-module-id="${module.id}" ${isBuilt || !canBuild ? "disabled" : ""}>${isBuilt ? "Constructed" : "Build module"}</button>
                </div>
            `;
        }).join("");

        list.querySelectorAll("button[data-module-id]").forEach((button) => {
            button.addEventListener("click", () => {
                const module = outpostModules.find((entry) => entry.id === button.dataset.moduleId);
                if (!module) return;

                const affordable = Object.entries(module.cost).every(([key, amount]) => state.resources[key] >= amount);
                if (!affordable) {
                    state.alert = `Not enough resources to build ${module.name}.`;
                    updateMissionSummary();
                    renderAll();
                    return;
                }

                state.builtModules.push(module.id);
                Object.entries(module.cost).forEach(([key, amount]) => applyDelta(key, -amount));
                Object.entries(module.benefits).forEach(([key, amount]) => applyDelta(key, amount));
                state.log.unshift(`${module.name} installed. ${module.summary}`);
                state.alert = `${module.name} is now online. ${module.summary}`;
                renderAll();
            });
        });
    }

    function renderEmergency() {
        const host = panel.querySelector("#emergency-panel");
        if (!state.activeEmergency) {
            host.innerHTML = `
                <div class="emergency-empty">
                    <strong>No active emergency.</strong>
                    <p>Mission operations are stable and the crew is ready for the next day.</p>
                </div>
            `;
            return;
        }

        const emergency = state.activeEmergency;
        const choiceMarkup = emergency.choices.map((choice, index) => `
            <button type="button" data-choice-index="${index}">
                <span>${choice.label}</span>
                <small>${choice.result}</small>
            </button>
        `).join("");

        host.innerHTML = `
            <div class="emergency-box">
                <h4>${emergency.title}</h4>
                <p>${emergency.prompt}</p>
                <div class="choice-list">${choiceMarkup}</div>
            </div>
        `;

        host.querySelectorAll("button[data-choice-index]").forEach((button) => {
            button.addEventListener("click", () => {
                const choice = emergency.choices[Number(button.dataset.choiceIndex)];
                if (!choice) return;

                Object.entries(choice.effect).forEach(([key, amount]) => {
                    applyDelta(key, amount);
                });

                state.log.unshift(`${emergency.title}: ${choice.result}`);
                state.activeEmergency = null;
                state.alert = `${choice.label} was selected. ${choice.result}`;
                updateMissionSummary();
                renderAll();
            });
        });
    }

    function renderAlertList() {
        const list = panel.querySelector("#alert-list");
        const alerts = [];

        if (state.resources.oxygen < 40) alerts.push("Low oxygen reserve");
        if (state.resources.water < 40) alerts.push("Low water reserve");
        if (state.resources.food < 40) alerts.push("Low food reserve");
        if (state.resources.power < 40) alerts.push("Low power reserve");
        if (state.resources.radiationProtection < 40) alerts.push("Radiation protection weak");
        if (state.resources.habitatCondition < 40) alerts.push("Habitat integrity falling");
        if (state.resources.lifeSupport < 40) alerts.push("Life support degraded");
        if (state.resources.crewSafety < 40) alerts.push("Crew safety risk");

        if (!alerts.length) alerts.push("No immediate alerts");
        list.innerHTML = alerts.map((item) => `<div class="alert-pill">${item}</div>`).join("");
    }

    function renderMissionLog() {
        const log = panel.querySelector("#mission-log");
        log.innerHTML = state.log.slice(0, 6).map((entry) => `<div>${entry}</div>`).join("");
    }

    function queueRandomEvent() {
        const pool = config.events;
        if (!pool.length) return;
        const next = pool[Math.floor(Math.random() * pool.length)];
        state.activeEmergency = next;
        state.log.unshift(`${next.title}: ${next.prompt}`);
        state.alert = `${next.title}: ${next.prompt}`;
    }

    function advanceDay() {
        state.day += 1;

        const baseProduction = {
            oxygen: 4,
            water: 4,
            food: 4,
            power: 7,
            radiationProtection: 2,
            habitatCondition: 2,
            lifeSupport: 3,
            crewSafety: 2
        };

        const baseConsumption = {
            oxygen: 7,
            water: 7,
            food: 8,
            power: 9,
            radiationProtection: 4,
            habitatCondition: 4,
            lifeSupport: 6,
            crewSafety: 4
        };

        const climatePenalty = destination === "Moon"
            ? { power: -6, radiationProtection: -7, habitatCondition: -4, crewSafety: -3 }
            : { power: -9, radiationProtection: -4, habitatCondition: -5, crewSafety: -2 };

        state.builtModules.forEach((moduleId) => {
            const module = outpostModules.find((entry) => entry.id === moduleId);
            if (!module) return;
            Object.entries(module.benefits).forEach(([key, amount]) => {
                if (key === "power") baseProduction.power += amount * 0.5;
                if (key === "oxygen") baseProduction.oxygen += amount * 0.5;
                if (key === "water") baseProduction.water += amount * 0.6;
                if (key === "food") baseProduction.food += amount * 0.7;
                if (key === "radiationProtection") baseProduction.radiationProtection += amount * 0.6;
                if (key === "habitatCondition") baseProduction.habitatCondition += amount * 0.6;
                if (key === "lifeSupport") baseProduction.lifeSupport += amount * 0.5;
                if (key === "crewSafety") baseProduction.crewSafety += amount * 0.5;
            });
        });

        resourceOrder.forEach((key) => {
            const production = baseProduction[key] || 0;
            const consumption = baseConsumption[key] || 0;
            const climate = climatePenalty[key] || 0;
            const delta = production - consumption + climate;
            applyDelta(key, delta);
        });

        if (state.resources.power < 30) {
            applyDelta("lifeSupport", -9);
            applyDelta("crewSafety", -6);
        }
        if (state.resources.radiationProtection < 30) {
            applyDelta("crewSafety", -10);
        }
        if (state.resources.habitatCondition < 30) {
            applyDelta("lifeSupport", -8);
            applyDelta("crewSafety", -5);
        }
        if (state.resources.lifeSupport < 30) {
            applyDelta("crewSafety", -8);
        }

        if (Math.random() < 0.85) {
            queueRandomEvent();
        }

        state.log.unshift(`Mission day ${state.day} complete. ${destination} environmental conditions continue to shape the crew's decisions.`);
        updateMissionSummary();
        renderAll();
    }

    function renderAll() {
        updateMissionSummary();
        renderResourceList();
        renderModules();
        renderAlertList();
        renderMissionLog();
        renderEmergency();
    }

    panel.querySelector("#outpost-close").addEventListener("click", () => {
        panel.remove();
    });

    panel.querySelector("#advance-day").addEventListener("click", advanceDay);
    panel.querySelector("#reset-outpost").addEventListener("click", () => {
        state.day = 1;
        state.resources = {
            oxygen: 82,
            water: 74,
            food: 70,
            power: 72,
            radiationProtection: 68,
            habitatCondition: 64,
            lifeSupport: 71,
            crewSafety: 76
        };
        state.builtModules = [];
        state.activeEmergency = null;
        state.log = [
            "Commander Mira: Welcome to Outpost Command. Your crew is counting on your first decisions.",
            `${destination} environmental conditions are being monitored in real time.`
        ];
        renderAll();
    });

    renderAll();
}

const startAssessmentButtons = document.querySelectorAll(".outpost-launch");
if (startAssessmentButtons.length) {
    startAssessmentButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const destination = button.dataset.destination || "Moon";
            startOutpostSimulation(destination);
        });
    });
}
