function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear().toString().substr(-2);
  return `${day}-${month}-${year}`;
}

export default formatDate;