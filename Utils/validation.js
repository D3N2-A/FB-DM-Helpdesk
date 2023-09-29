export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

export function UTCTime(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = dateObj.getDate().toString().padStart(2, "0");
  const simplifiedDate = `${year}-${month}-${day}`;
  return simplifiedDate;
}
