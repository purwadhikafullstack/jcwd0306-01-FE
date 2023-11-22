function formatDate(moment, dateString) {
  const formattedDate = moment(dateString).format('dddd, D MMMM YYYY');
  return formattedDate;
}

export default formatDate;
