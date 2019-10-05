const mapper = {
  0: "ЈАНУАРА",
  1: "ФЕБРУАРА",
  2: "МАРТА",
  3: "АПРИЛА",
  4: "МАЈА",
  5: "ЈУНА",
  6: "ЈУЛА",
  7: "АВГУСТА",
  8: "СЕПТЕМБРА",
  9: "ОКТОБРА",
  10: "НОВЕМБРА",
  11: "ДЕЦЕМБРА"
};

export function formatDate(dateString) {
  let date = new Date(Date.parse(dateString));

  return `${date.getDate()}. ${mapper[date.getMonth()]} ${date.getFullYear()}.`;
}
