// YHYAQ Danang RSVP — Google Apps Script
// 1. Создай Google Sheet с колонками: A=Timestamp, B=Name, C=Guests, D=Contact, E=PlaySports
// 2. Extensions → Apps Script → вставь этот код
// 3. Deploy → New deployment → Web app → Anyone → Deploy
// 4. Полученный URL вставь в RSVPSection.tsx вместо GOOGLE_SCRIPT_URL_PLACEHOLDER

const SHEET_NAME = "Responses";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
      return respond({ success: false, error: "Sheet created, retry" });
    }

    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.name,
      data.guestsCount,
      data.contact,
      data.willPlaySports ? "Да" : "Нет",
    ]);

    return respond({ success: true });
  } catch (err) {
    return respond({ success: false, error: err.message });
  }
}

function doGet(e) {
  if (e.parameter.action === "counts") {
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
      if (!sheet || sheet.getLastRow() < 2) {
        return respond({ guests: 0, sport: 0 });
      }

      const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues();
      let guests = 0;
      let sport = 0;

      for (const row of rows) {
        guests += Number(row[2]) || 0;
        if (row[4] === "Да") sport++;
      }

      return respond({ guests, sport });
    } catch (err) {
      return respond({ guests: 0, sport: 0 });
    }
  }

  return respond({ status: "ok" });
}

function respond(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
