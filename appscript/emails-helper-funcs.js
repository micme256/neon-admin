const sendEmails = (subject, body, email) => {
  GmailApp.sendEmail(email, subject, body);
};

const emailsById = (memberId) => {
  const memberInfo = getMemberInfoById(memberId);
  return memberInfo ? memberInfo.email : null;
};

const nameById = (memberId) => {
  const memberInfo = getMemberInfoById(memberId);
  return memberInfo ? memberInfo.name : null;
};

const emailsByPost = (position) => {
  const membersMap = membersInfoMap();
  const emails = [];
  for (const [, memberData] of membersMap.entries()) {
    if (memberData.position === position) {
      emails.push(memberData.email);
    }
  }
  return emails;
};
const emailsByExcludedPost = (excludedPosition) => {
  const membersMap = membersInfoMap();
  const emails = [];
  for (const [, memberData] of membersMap.entries()) {
    if (memberData.position !== excludedPosition) {
      emails.push(memberData.email);
    }
  }
  return emails;
};

const getMemberInfoById = (memberId) => {
  const membersMap = membersInfoMap();
  return membersMap.get(memberId);
};
const membersInfoMap = () => {
  const sheetName = "Database";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const memberIdIndex = headers.indexOf("No/ID");
  const nameIndex = headers.indexOf("first Name");
  const positionIndex = headers.indexOf("Position");
  const emailIndex = headers.indexOf("Email ID");

  const memberMap = new Map();
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const memberId = row[memberIdIndex];
    const memberDetails = {
      name: row[nameIndex],
      position: row[positionIndex],
      email: row[emailIndex],
    };
    memberMap.set(memberId, memberDetails);
  }
  return memberMap;
};
