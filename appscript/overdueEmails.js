const sendOverDueLoanEmails = () => {
  const overdueLoansArray = overDueLoans();
  overdueLoansArray.forEach((overdueLoan) => {
    overdueLoanEmail(overdueLoan);
  });
};

const overdueLoanEmail = (overDueLoan) => {
  const {
    transactionId,
    memberId,
    transactionDate,
    loanBalance,
    pendingInterest,
  } = overDueLoan;
  const name = nameById(memberId);
  const email = emailsById(memberId);
  const mobiliserEmails = emailsByPost("LOANS OFFICER");
  const subject = `📣 Overdue Loan Reminder - Transaction ${transactionId}`;
  const body = `
    Hello ${name},
    
    Our records show that your loan issued on ${transactionDate} is now overdue.
    
    OUTSTANDING BALANCE: UGX ${loanBalance} + INTEREST: ${pendingInterest}.
    
    Please make arrangements to repay this amount or contact us if you need assistance.
    
    Thank you,
    KIU Alumni DIH SACCO
    `;
  if (email) {
    sendEmails(subject, body, email);
  }

  mobiliserEmails.forEach((mobiliser) => {
    sendEmails(subject, body, mobiliser);
  });
};

// OVERDUE LOANS MOBILIZATION
const overDueLoans = () => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("loans");
  const dataRange = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("newLoan")
    .getDataRange()
    .getA1Notation(); //AVOID FORMULA PREPOPULATED  RANGE IN THE LOANS SHEET BY TAKING NEWLOANS REFERENCE
  const loansData = sheet.getRange(dataRange).getValues();
  const headers = loansData[0];
  const dueLoans = [];

  for (let i = 1; i < loansData.length; i++) {
    const loan = loansData[i];
    const loanStatus = loan[headers.indexOf("status")];
    if (loanStatus === "overdue") {
      const transactionDate = loan[headers.indexOf("transactionDate")];

      const today = new Date().getDate();
      const issueDay = new Date(transactionDate).getDate();

      //CHECK THOSE THAT ARE JUST ONE OR TWO DAYS OVERDEW EVERY MONTH
      if (today >= issueDay && today - issueDay < 2) {
        const dueLoan = {};
        headers.forEach((header, index) => {
          dueLoan[header] = loan[index];
        });
        dueLoans.push(dueLoan);
      }
    }
  }
  return dueLoans;
};
