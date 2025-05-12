const transactionEmail = (transactionData) => {
  const { memberId, transactionType, transactionId, amount, transactionDate } =
    transactionData;

  const email = emailsById(memberId);
  const name = nameById(memberId);
  let transaction;
  switch (transactionType) {
    case "newLoan":
      transaction = "loan";
      break;
    case "shares":
      transaction = "shares purchase";
      break;
    case "interest":
      transaction = "interest payment";
      break;
    case "loanRepay":
      transaction = "loan payment";
      break;
    case "savings":
      transaction = "deposit";
      break;
    default:
      transaction = transactionType;
  }
  const subject = "New " + transaction + " recorded";
  const body = `Dear Mr. ${name} A new ${transaction} has been registered on your KIU ALUMNI DIH SACCO account on ${transactionDate}.
    TRANSACTION DETAILS:
    TRANSACTION ID: ${transactionId}
    AMOUNT: ${amount}.
    
    visit https://script.google.com/macros/s/AKfycbwGjkTeMGzxxwDjC0LZpmF2QVlq6QsVdiioWXEhsVM/dev to check your account
    
    Kind Regards: DIH TREASURY`;
  if (email) {
    sendEmails(subject, body, email);
  }
};
