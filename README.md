# WeddingInvitation

A self-contained wedding invitation website with:

- static cinematic hero
- countdown timer
- event schedule
- venue and directions
- story/gallery sections
- RSVP form ready for Google Sheets
- calendar invite download

## Edit the Invite

Update the `inviteDetails` object in `script.js`:

- names and monogram
- wedding date and display text
- venue and map link
- Google Sheets Web App URL
- event schedule
- invitation copy
- story text

The site does not load a video by default. Add photos or other artwork later if you want a more personalized visual section.

## Connect RSVP to Google Sheets

RSVP sheet:
https://docs.google.com/spreadsheets/d/12tNFSUdWr4wkpq0ri_pp0IM08li3iQNAMcS5ekF3_xg/edit?usp=sharing

Spreadsheet ID:
`12tNFSUdWr4wkpq0ri_pp0IM08li3iQNAMcS5ekF3_xg`

1. Open the Google Sheet and create a tab named `RSVP`.
2. Add these columns in row 1:
   `submittedAt`, `invitation`, `guestName`, `phone`, `attending`, `functions`, `message`
3. Open Extensions > Apps Script.
4. Paste this script:

```javascript
const SPREADSHEET_ID = "12tNFSUdWr4wkpq0ri_pp0IM08li3iQNAMcS5ekF3_xg";
const SHEET_NAME = "RSVP";

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.submittedAt,
    data.invitation,
    data.guestName,
    data.phone,
    data.attending,
    data.functions,
    data.message
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Deploy > New deployment > Web app.
6. Set `Execute as` to yourself.
7. Set access to `Anyone`.
8. Copy the Web App URL into `googleSheetsWebAppUrl` in `script.js`.

## Preview

Open `index.html` in a browser.

No build step or server is required.
