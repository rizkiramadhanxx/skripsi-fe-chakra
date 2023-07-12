const convertDate = (e: Date) => {
  const date = new Date(e);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const sec = date.getSeconds();

  const bulanIndonesia = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return `${day} ${bulanIndonesia[month]} ${year}, pukul ${
    hour < 10 ? "0" + hour : hour
  }:${sec < 10 ? "0" + sec : sec}`;
};

export default convertDate;
