const inviteDetails = {
  brideName: "Deepali",
  groomName: "Harshit",
  brideFullName: "Deepali Gupta",
  groomFullName: "Harshit Khandelwal",
  monogram: "D + H",
  weddingDate: "2026-11-20T10:00:00+05:30",
  weddingDateDisplay: "20 and 21 November 2026",
  countdownTitle: "The royal celebration begins soon",
  heroCopy:
    "Deepali Gupta and Harshit Khandelwal invite you to Kota for two days of blessings, music, rituals, and royal celebration.",
  invitationMessage:
    "Your presence would make our wedding celebrations warmer, brighter, and complete. Join us as our families come together in Kota to bless this beautiful beginning.",
  hostLine: "Hosted by the Gupta and Khandelwal families",
  venueName: "Dharnidhar",
  venueShortName: "Dharnidhar",
  venueAddress: "Kota, Rajasthan",
  venueCity: "Kota",
  mapUrl: "https://maps.app.goo.gl/aD5LV8jAASJrSXN46",
  rsvpSheetUrl:
    "https://docs.google.com/spreadsheets/d/12tNFSUdWr4wkpq0ri_pp0IM08li3iQNAMcS5ekF3_xg/edit?usp=sharing",
  googleSheetsWebAppUrl: "https://script.google.com/macros/s/AKfycbwRnBOuz89Sz1bQHQ5L16jLc9aldJ2hTz8f-Hof4P6CbOTknS_Xt48MBXpq_klXn79C/exec",
  footerLine: "Made with love for Deepali and Harshit",
  storyOneTitle: "The families gather",
  storyOneCopy: "Two families come together in Kota for a celebration filled with warmth and blessings.",
  storyTwoTitle: "The rituals",
  storyTwoCopy:
    "Haldi, Mehendi, Sangeet, Wedding, and Reception mark each step of this joyful union.",
  storyThreeTitle: "The new beginning",
  storyThreeCopy:
    "With your love and good wishes, Deepali and Harshit begin their next chapter together.",
  events: [
    {
      title: "Haldi",
      date: "20 November",
      time: "Time to be announced",
      venue: "Dharnidhar, Kota",
      note: "A bright start to the celebrations with blessings, color, and laughter.",
    },
    {
      title: "Mehendi",
      date: "20 November",
      time: "Time to be announced",
      venue: "Dharnidhar, Kota",
      note: "An evening of intricate mehendi, music, and family joy.",
    },
    {
      title: "Sangeet",
      date: "20 November",
      time: "Time to be announced",
      venue: "Dharnidhar, Kota",
      note: "Dance, performances, and a royal night of celebration.",
    },
    {
      title: "Wedding",
      date: "21 November",
      time: "Time to be announced",
      venue: "Dharnidhar, Kota",
      note: "The wedding ceremony, followed by blessings and dinner.",
    },
    {
      title: "Reception",
      date: "21 November",
      time: "Time to be announced",
      venue: "Dharnidhar, Kota",
      note: "A graceful evening to meet, greet, and celebrate the newlyweds.",
    },
  ],
};

const byDataText = document.querySelectorAll("[data-text]");
const eventContainer = document.querySelector("[data-events]");
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
}

function renderEvents() {
  eventContainer.innerHTML = "";

  inviteDetails.events.forEach((event) => {
    const article = document.createElement("article");
    article.className = "event-card";
    article.innerHTML = `
      <div>
        <div class="event-date">${event.date}</div>
        <h3>${event.title}</h3>
        <p>${event.note}</p>
      </div>
      <div class="event-meta">
        <span>${event.time}</span>
        <span>${event.venue}</span>
      </div>
    `;
    eventContainer.appendChild(article);
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
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const formatIcsDate = (date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//Invite//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding-invitation`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${inviteDetails.brideFullName} & ${inviteDetails.groomFullName} Wedding`,
    `LOCATION:${inviteDetails.venueName}, ${inviteDetails.venueAddress}`,
    `DESCRIPTION:${inviteDetails.heroCopy}`,
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

document.querySelector("[data-rsvp-form]").addEventListener("submit", submitRsvp);
document
  .querySelector('[data-action="download-calendar"]')
  .addEventListener("click", downloadCalendarInvite);

applyContent();
renderEvents();
updateCountdown();
setInterval(updateCountdown, 1000);
