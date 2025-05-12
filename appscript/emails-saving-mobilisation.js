const sendSavingsEmails = () => {
  const { accountingMonthName: month } = getFinancialYearAndMonth();
  const daysRemaining = getDaysRemaining();
  if (daysRemaining < 4) {
    const unclearedMembers = getUnclearedMembers();
    unclearedMembers.forEach((member) => {
      const body = getEmailBody(member, month, daysRemaining);
      const subject =
        daysRemaining === 0
          ? `MISSED SAVINGS PENALTY FOR ${month}`
          : `MONTHLY SAVING REMAINDER FOR ${month}`;
      const email = member.email;
      if (email) {
        sendEmails(subject, body, email);
      }
    });
    const mobiliserEmails = emailsByPost("MOBILISER").join(",");
    const mobiliserBody = getMobiliserBody(unclearedMembers);
    MailApp.sendEmail({
      to: mobiliserEmails,
      subject: `List of members who haven't yet cleared ${month.toLowerCase()}`,
      htmlBody: mobiliserBody,
    });
  }
};
const getEmailBody = (unclearedMember, month, daysRemaining) => {
  let emailBody = `
Dear ${unclearedMember.memberName},

This is a reminder that your savings for ${month} are due soon.
    `;

  if (daysRemaining === 0) {
    emailBody += `
Unfortunately, you have missed the deadline for making your savings payment for ${month}. 
Please be aware that penalties will be applied.
      `;
  } else {
    emailBody += `
You have ${daysRemaining} day(s) remaining to make your payment. 
Please ensure you make your payment on time to avoid any penalties.
      `;
  }

  emailBody += `
      
Please contact the treasurer if you have any questions or concerns. Do not reply to this email

Best regards,
NEON FRATERNITY
    `;

  return emailBody;
};

const getMobiliserBody = (unclearedMembers) => {
  const { accountingMonthName: month } = getFinancialYearAndMonth();

  const htmlTemplate = HtmlService.createTemplateFromFile(
    "mobiliser-email-template"
  );
  htmlTemplate.month = month;
  htmlTemplate.unclearedMembers = unclearedMembers;

  return htmlTemplate.evaluate().getContent();
};

/*The group accounting month starts from 8th and ends at 7th day in new month to enable salary earners to clear their minimum savings reqirement*/
/*There is a 6,000 penalty of missed savings*/
const getDaysRemaining = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const startDate = new Date(currentYear, currentMonth, 8);

  let endMonth, endYear;
  if (currentDay <= 7) {
    endMonth = currentMonth;
    endYear = currentYear;
  } else {
    if (currentMonth === 11) {
      endMonth = 0;
      endYear = currentYear + 1;
    } else {
      endMonth = currentMonth + 1;
      endYear = currentYear;
    }
  }
  const endDate = new Date(endYear, endMonth, 7);
  const daysRemaining =
    Math.floor((endDate - today) / (1000 * 60 * 60 * 24)) + 1;
  return daysRemaining;
};

const getUnclearedMembers = () => {
  const { data } = checkSheetData("Database");
  const headers = data[0];
  const emailsIndex = headers.indexOf("Email ID");
  const memberId = headers.indexOf("No/ID");
  const memberName = headers.indexOf("first Name");
  const memberCleared = headers.indexOf("Current month Savings");

  const unclearedMembers = data
    .slice(1)
    .filter((member) => {
      return member[memberCleared] !== "CLEARED";
    })
    .map((member) => {
      return {
        email: member[emailsIndex],
        memberName: member[memberName],
        memberId: member[memberId],
      };
    });

  return unclearedMembers;
};
