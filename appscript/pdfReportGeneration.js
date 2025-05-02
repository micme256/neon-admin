const generateMonthlyReport = () => {
  const storageFolderId = "14dAZPkztfqBNhOmY2CJBgRn1J7SiajjE";
  const folder = DriveApp.getFolderById(storageFolderId);
  const { pdfContent, month, year } = monthPdfReport();
  const pdfBlob = Utilities.newBlob(
    pdfContent,
    "text/html",
    "New " + month + "-" + year + " report"
  ).getAs("application/pdf");
  const file = folder.createFile(pdfBlob);

  sendReportToMgt(file, month, year);
};

const sendReportToMgt = (file, month, year) => {
  const recipients = emailsByExcludedPost("MEMBER").join(",");
  const subject = `📊 NEON Monthly Report - ${month} ${year}`;
  const body = `Dear Team,
  
  Please find attached the NEON Monthly Report for ${month} ${year}. The report includes savings, loan activities, withdrawals, and financial summaries for the month.
  
  Regards,
  NEON System`;

  MailApp.sendEmail({
    to: recipients,
    subject: subject,
    body: body,
    attachments: [file.getAs(MimeType.PDF)],
  });
};
