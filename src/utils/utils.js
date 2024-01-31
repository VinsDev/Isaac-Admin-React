// get day from index . . .
export function getDayFromIndex(index) {
  switch (index) {
    case 0: return "Su";
    case 1: return "Mo";
    case 2: return "Tu";
    case 3: return "We";
    case 4: return "Th";
    case 5: return "Fr";
    case 6: return "Sa";
    default: return "";
  }
}

// Returns *** for hidden balance . . .
export function renderBalance(balance, isBalanceHidden) {
  if (isBalanceHidden) {
    return "****";
  } else {
    return "$" + balance;
  }
}

export function addCommasToNumber(numberString) {
  return Number(numberString).toLocaleString();
}

export function studentTabTitleExtractor(label) {
  switch (label) {
    case "offerSent": return "Offer sent";
    case "accepted": return "Accepted";
    case "registered": return "Registered";
    default: return {}
  }
}