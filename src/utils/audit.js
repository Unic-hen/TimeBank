export const search = (e, setUsersdata, initdata) => {
  if (e !== "") {
    setUsersdata(initdata.filter((item) => item.name.includes(e)));
    return;
  }
  setUsersdata(initdata);
  return;
};
