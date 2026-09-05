const inviteDetails = {
  brideName: "Harshit",
  groomName: "Deepali",
  brideFullName: "Harshit Khandelwal",
  groomFullName: "Deepali Gupta",
  monogram: "H + D",
  weddingDate: "2026-11-20T10:00:00+05:30",
  celebrationEndDate: "2026-11-21T23:00:00+05:30",
  weddingDateDisplay: "20–21 November 2026",
  countdownTitle: "The royal celebration begins soon",
  heroCopy:
    "Two days of dancing, traditions, and making memories with the people we love. Join us as our forever begins.",
  invitationMessage:
    "With the blessings of our families, we invite you to share in our wedding celebrations. Bring your laughter, your dancing shoes, and your love—we’ll make the memories together.",
  hostLine: "Hosted by the Khandelwal and Gupta Families",
  venueName: "Dharnidhar",
  venueShortName: "Dharnidhar",
  venueAddress: "Kota, Rajasthan",
  venueCity: "Kota",
  mapUrl: "https://maps.app.goo.gl/aD5LV8jAASJrSXN46",
  rsvpSheetUrl:
    "https://docs.google.com/spreadsheets/d/12tNFSUdWr4wkpq0ri_pp0IM08li3iQNAMcS5ekF3_xg/edit?usp=sharing",
  googleSheetsWebAppUrl: "https://script.google.com/macros/s/AKfycbwRnBOuz89Sz1bQHQ5L16jLc9aldJ2hTz8f-Hof4P6CbOTknS_Xt48MBXpq_klXn79C/exec",
  footerLine: "Made with love for Harshit and Deepali",
  storyOneTitle: "The families gather",
  storyOneCopy: "Two families come together in Kota for a celebration filled with warmth and blessings.",
  storyTwoTitle: "The rituals",
  storyTwoCopy:
    "Sagai, Sangeet Night, Haldi, Barat, and the Wedding Procession mark each step of this joyful union.",
  storyThreeTitle: "The new beginning",
  storyThreeCopy:
    "With your love and good wishes, Harshit and Deepali begin their next chapter together.",
  outfitThemes: [
    {
      event: "Haldi",
      theme: "Pastel outfits",
      date: "21 November",
      slug: "haldi",
      note:
        "Soft yellows, blush pinks, mint greens, lilacs, and ivory tones for a gentle Haldi morning.",
      palette: ["#f7d66a", "#f6b8c8", "#b9debd", "#c9b7ed", "#fff4d9"],
    },
    {
      event: "Sangeet Night",
      theme: "Bollywood night",
      date: "20 November",
      slug: "bollywood",
      note:
        "Go glittery with champagne gold, silver sparkle, rose-gold shine, crystal white, and glossy magenta.",
      palette: ["#f9d86b", "#fff4bd", "#d9dde8", "#f4a7b9", "#ff4fb8", "#2a123f"],
    },
  ],
  programDays: [
    {
      title: "Let the celebrations begin",
      weekday: "Friday",
      attire: "Sangeet · Bollywood sparkle",
      attireNote: "A little shimmer, a favourite Bollywood look, and your dancing shoes.",
      palette: ["#c39a48", "#d9dde8", "#bb4e74"],
      mark: "20",
      date: "20 November",
      shortDate: "20 Nov",
      venue: "Dharnidhar, Kota",
      note: "Breakfast, lunch, Sagai, Sangeet Night, and dinner to begin the celebration.",
      functions: [
        { time: "10:00 AM", name: "Breakfast" },
        { time: "1:00 PM", name: "Lunch" },
        { time: "2:00 PM", name: "Sagai" },
        { time: "6:00 PM", name: "Sangeet Night" },
        { time: "8:00 PM", name: "Dinner" },
      ],
    },
    {
      title: "A beautiful new beginning",
      weekday: "Saturday",
      attire: "Haldi · Soft pastels",
      attireNote: "Think soft yellow, blush, mint, or lilac for a bright Haldi morning.",
      palette: ["#f7d66a", "#f6b8c8", "#b9debd", "#c9b7ed"],
      mark: "21",
      date: "21 November",
      shortDate: "21 Nov",
      venue: "Dharnidhar, Kota",
      note: "Haldi, Barat, dinner, and the wedding procession with blessings from everyone.",
      functions: [
        { time: "9:00 AM", name: "Breakfast" },
        { time: "10:00 AM", name: "Haldi" },
        { time: "1:00 PM", name: "Lunch" },
        { time: "6:00 PM", name: "Barat" },
        { time: "7:00 PM", name: "Dinner & Wedding Procession" },
      ],
    },
  ],
};

const byDataText = document.querySelectorAll("[data-text]");
const eventContainer = document.querySelector("[data-events]");
const outfitContainer = document.querySelector("[data-outfits]");
const functionPicker = document.querySelector("[data-function-picker]");
const rsvpForm = document.querySelector("[data-rsvp-form]");
const openingVeil = document.querySelector("[data-opening-veil]");
const petalField = document.querySelector("[data-petal-field]");
const saveDateButton = document.querySelector('[data-action="download-calendar"]');
const countdownDate = new Date(inviteDetails.weddingDate);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const countdownEls = {
  days: document.querySelector("[data-countdown-days]"),
  hours: document.querySelector("[data-countdown-hours]"),
  minutes: document.querySelector("[data-countdown-minutes]"),
  seconds: document.querySelector("[data-countdown-seconds]"),
};

function textValue(key) {
  return inviteDetails[key] ?? "";
}

function applyContent() {
  byDataText.forEach((el) => {
    const key = el.dataset.text;
    el.textContent = textValue(key);
  });

  document.title = `${inviteDetails.brideName} & ${inviteDetails.groomName} Wedding Invitation`;

  const mapLinks = document.querySelectorAll('[data-link="mapUrl"]');
  mapLinks.forEach((link) => {
    link.href = inviteDetails.mapUrl;
  });

}

function renderEvents() {
  eventContainer.innerHTML = "";

  inviteDetails.programDays.forEach((day) => {
    const scheduleItems = day.functions
      .map(
        (item) => `
        <li class="${/Breakfast|Lunch|Dinner/.test(item.name) ? "meal-row" : "ceremony-row"}">
          <time>${item.time}</time>
          <span>${item.name}</span>
        </li>
      `
      )
      .join("");

    const article = document.createElement("article");
    article.className = "event-card program-card";
    article.innerHTML = `
      <div class="day-heading"><div class="event-mark">${day.mark}</div><span>${day.weekday}<br>November 2026</span></div>
      <div>
        <h3>${day.title}</h3>
      </div>
      <ul class="program-list">
        ${scheduleItems}
      </ul>
      <div class="day-attire"><p class="attire-label">Suggested attire</p><h4>${day.attire}</h4><div class="attire-swatches" aria-hidden="true">${day.palette.map(color => `<span style="background:${color}"></span>`).join("")}</div><p>${day.attireNote}</p></div>
    `;
    eventContainer.appendChild(article);
  });
}

function renderOutfitThemes() {
  if (!outfitContainer) {
    return;
  }

  outfitContainer.innerHTML = "";

  inviteDetails.outfitThemes.forEach((theme) => {
    const swatches = theme.palette
      .map((color) => `<span style="--swatch: ${color}"></span>`)
      .join("");
    const article = document.createElement("article");
    article.className = `outfit-card ${theme.slug}`;
    article.innerHTML = `
      <div class="outfit-card-header">
        <span class="outfit-date">${theme.date}</span>
        <div class="outfit-swatches" aria-label="${theme.event} color palette">
          ${swatches}
        </div>
      </div>
      <div>
        <p class="outfit-event">${theme.event}</p>
        <h3>${theme.theme}</h3>
        <p>${theme.note}</p>
      </div>
    `;
    outfitContainer.appendChild(article);
  });
}

function renderFunctionOptions() {
  if (!functionPicker) {
    return;
  }

  functionPicker.querySelectorAll("label").forEach((label) => label.remove());

  inviteDetails.programDays.forEach((day) => {
    day.functions.forEach((item) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const copy = document.createElement("span");
      const meta = document.createElement("span");
      const name = document.createElement("span");

      input.name = "functions";
      input.type = "checkbox";
      input.value = `${day.date} - ${item.time} ${item.name}`;

      copy.className = "function-option-copy";
      meta.className = "function-option-date";
      name.className = "function-option-name";
      meta.textContent = `${day.shortDate} | ${item.time}`;
      name.textContent = item.name;

      copy.append(meta, name);
      label.append(input, copy);
      functionPicker.appendChild(label);
    });
  });
}

function renderPetals() {
  if (!petalField || prefersReducedMotion) {
    return;
  }

  const petals = [
    [8, 9, -3, 15, 0.72],
    [16, 12, 1.8, -28, 0.68],
    [23, 10, -6.5, 34, 0.78],
    [31, 14, -1.3, -18, 0.62],
    [39, 8, -4.7, 26, 0.74],
    [47, 12, 0.4, -42, 0.7],
    [54, 10, -7.2, 38, 0.82],
    [61, 15, -2.6, -24, 0.66],
    [68, 9, -5.8, 30, 0.72],
    [76, 13, -0.9, -36, 0.76],
    [84, 11, -4.1, 22, 0.7],
    [92, 14, -6.9, -32, 0.68],
    [12, 8, -8.5, 40, 0.56],
    [35, 11, -9.4, -20, 0.62],
    [58, 8, -10.1, 30, 0.58],
    [88, 10, -11.2, -26, 0.64],
  ];

  petalField.innerHTML = "";
  petals.forEach(([left, size, delay, drift, opacity], index) => {
    const petal = document.createElement("span");
    petal.style.setProperty("--petal-left", `${left}%`);
    petal.style.setProperty("--petal-size", `${size}px`);
    petal.style.setProperty("--petal-delay", `${delay}s`);
    petal.style.setProperty("--petal-duration", `${10 + (index % 5) * 1.8}s`);
    petal.style.setProperty("--petal-drift", `${drift}px`);
    petal.style.setProperty("--petal-opacity", opacity);
    petalField.appendChild(petal);
  });
}

function setupRevealMotion() {
  const revealItems = document.querySelectorAll(
    ".arrival-card, .countdown-intro, .countdown-card, .section-copy, .note-panel, .event-card, .outfit-card, .venue-copy, .map-panel, .story-grid article"
  );

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
    observer.observe(item);
  });
}

function setupOpeningMoment() {
  if (!openingVeil) return;
  if (prefersReducedMotion) { openingVeil.remove(); return; }
  window.setTimeout(() => { openingVeil.remove(); }, 1600);
}

function setupHeaderTone() {
  const updateHeader = () => {
    document.body.classList.toggle("has-scrolled", window.scrollY > 48);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(countdownDate.getTime() - now.getTime(), 0);
  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  countdownEls.days.textContent = String(days);
  if (diff === 0) document.querySelector(".quiet-countdown").textContent = "With love and gratitude, Harshit & Deepali";
  if (countdownEls.hours) countdownEls.hours.textContent = String(hours).padStart(2, "0");
  if (countdownEls.minutes) countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
  if (countdownEls.seconds) countdownEls.seconds.textContent = String(remainingSeconds).padStart(2, "0");
}

async function submitRsvp(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const status = document.querySelector("[data-form-status]");
  const submitButton = form.querySelector('button[type="submit"]');
  const selectedFunctions = formData.getAll("functions");

  const payload = {
    submittedAt: new Date().toISOString(),
    invitation: `${inviteDetails.brideFullName} & ${inviteDetails.groomFullName}`,
    guestName: formData.get("guestName"),
    phone: formData.get("phone"),
    attending: formData.get("attending"),
    functions: selectedFunctions.join(", "),
    message: formData.get("message") || "",
  };

  if (!inviteDetails.googleSheetsWebAppUrl) {
    status.textContent =
      "RSVP is ready. Add your Google Apps Script Web App URL in script.js to save responses.";
    return;
  }

  submitButton.disabled = true;
  status.textContent = "Sending your RSVP...";

  try {
    await fetch(inviteDetails.googleSheetsWebAppUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    status.textContent = "Thank you. Your RSVP has been recorded.";
    form.reset();
  } catch (error) {
    status.textContent = "We could not send the RSVP. Please try again in a moment.";
  } finally {
    submitButton.disabled = false;
  }
}

function downloadCalendarInvite() {
  const start = new Date(inviteDetails.weddingDate);
  const end = new Date(inviteDetails.celebrationEndDate);
  const formatIcsDate = (date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const escapeIcsText = (value) =>
    value
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  const programDescription = inviteDetails.programDays
    .map((day) => {
      const functions = day.functions
        .map((item) => `${item.time} - ${item.name}`)
        .join("; ");
      return `${day.title}: ${functions}`;
    })
    .join("\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//Invite//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding-invitation`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${inviteDetails.brideFullName} & ${inviteDetails.groomFullName} Wedding Celebration`,
    `LOCATION:${inviteDetails.venueName}, ${inviteDetails.venueAddress}`,
    `DESCRIPTION:${escapeIcsText(`${inviteDetails.heroCopy}\n\nProgram:\n${programDescription}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${inviteDetails.brideName}-${inviteDetails.groomName}-wedding.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

if (rsvpForm) {
  rsvpForm.addEventListener("submit", submitRsvp);
}

document.querySelectorAll('[data-action="download-calendar"]').forEach(button => button.addEventListener("click", downloadCalendarInvite));

applyContent();
renderEvents();
renderOutfitThemes();
renderFunctionOptions();
renderPetals();
setupRevealMotion();
setupOpeningMoment();
setupHeaderTone();
updateCountdown();
setInterval(updateCountdown, 1000);
