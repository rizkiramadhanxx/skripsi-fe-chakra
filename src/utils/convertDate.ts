const convertDate = (e: Date) => {
  const date = new Date(e);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();
  const sec = date.getSeconds();

  return `${year}/${month}/${day}, pukul ${hour < 10 ? "0" + hour : hour}:${
    sec < 10 ? "0" + sec : sec
  }`;
};

export default convertDate;
