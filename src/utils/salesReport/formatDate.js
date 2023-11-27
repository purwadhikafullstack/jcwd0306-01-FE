function formatDate(moment, dateString) {
  const formattedDate = moment(dateString).format('ddd, MMM DD YYYY HH:mm:ss');
  return formattedDate;
}

export default formatDate;
