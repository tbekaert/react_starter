let moveInArray = (a, o, n) => {
  while (o < 0) { o += a.length; }
  while (n < 0) { n += a.length; }
  if (n >= a.length) {
    let k = n - a.length;
    while ((k--) + 1) { a.push(undefined); }
  }
  a.splice(n, 0, a.splice(o, 1)[0]);  
  return a;
};

export default moveInArray;