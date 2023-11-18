const dateService = (dateTime) => {
  const date = new Date(dateTime * 1000);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export default dateService;
