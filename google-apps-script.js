function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Leads');
    if (!sheet) {
      sheet = ss.insertSheet('Leads');
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'City', 'Message', 'Interest', 'Source']);
    }

    var p = e.parameter;
    sheet.appendRow([new Date(), p.name || '', p.phone || '', p.email || '', p.city || '', p.message || '', p.interest || '', p.source || '']);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
