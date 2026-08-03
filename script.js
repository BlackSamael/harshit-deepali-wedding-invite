const inviteDetails = {
  brideName: "Harshit",
  groomName: "Deepali",
  brideFullName: "Harshit Khandelwal",
  groomFullName: "Deepali Gupta",
  monogram: "H + D",
  weddingDate: "2026-11-20T10:00:00+05:30",
  celebrationEndDate: "2026-11-21T23:00:00+05:30",
  weddingDateDisplay: "20 and 21 November 2026",
  countdownTitle: "The royal celebration begins soon",
  heroCopy:
    "Harshit Khandelwal and Deepali Gupta invite you to Kota for two days of blessings, music, rituals, and royal celebration.",
  invitationMessage:
    "Your presence would make our wedding celebrations warmer, brighter, and complete. Join us as our families come together in Kota to bless this beautiful beginning.",
  hostLine: "Hosted by the Gupta and Khandelwal families",
  venueName: "Dharnidhar",
  venueShortName: "Dharnidhar",
  venueAddress: "Kota, Rajasthan",
  venueCity: "Kota",
  mapUrl: "https://maps.app.goo.gl/aD5LV8jAASJrSXN46",
  friendsStayName: "Stay Location for Friends",
  friendsStayCopy: "Use this map link for the friends' accommodation during the wedding celebrations.",
  friendsStayMapUrl: "https://maps.app.goo.gl/tU2F9nR4g6uxysSUA",
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
  programDays: [
    {
      title: "20th November Programs",
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
      title: "21st November",
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
const functionPicker = document.querySelector("[data-function-picker]");
const rsvpForm = document.querySelector("[data-rsvp-form]");
const saveDateButton = document.querySelector('[data-action="download-calendar"]');
const countdownDate = new Date(inviteDetails.weddingDate);
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

  const friendsStayLinks = document.querySelectorAll('[data-link="friendsStayMapUrl"]');
  friendsStayLinks.forEach((link) => {
    link.href = inviteDetails.friendsStayMapUrl;
  });
}

function renderEvents() {
  eventContainer.innerHTML = "";

  inviteDetails.programDays.forEach((day) => {
    const scheduleItems = day.functions
      .map(
        (item) => `
        <li>
          <time>${item.time}</time>
          <span>${item.name}</span>
        </li>
      `
      )
      .join("");

    const article = document.createElement("article");
    article.className = "event-card program-card";
    article.innerHTML = `
      <div class="event-mark">${day.mark}</div>
      <div>
        <div class="event-date">${day.date}</div>
        <h3>${day.title}</h3>
        <p>${day.note}</p>
      </div>
      <ul class="program-list">
        ${scheduleItems}
      </ul>
      <div class="event-meta">
        <span>${day.venue}</span>
      </div>
    `;
    eventContainer.appendChild(article);
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

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(countdownDate.getTime() - now.getTime(), 0);
  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  countdownEls.days.textContent = String(days).padStart(2, "0");
  countdownEls.hours.textContent = String(hours).padStart(2, "0");
  countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
  countdownEls.seconds.textContent = String(remainingSeconds).padStart(2, "0");
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

if (saveDateButton) {
  saveDateButton.addEventListener("click", downloadCalendarInvite);
}

applyContent();
renderEvents();
renderFunctionOptions();
updateCountdown();
setInterval(updateCountdown, 1000);
