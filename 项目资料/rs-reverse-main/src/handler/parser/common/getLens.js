module.exports = function getLens(numarr, idx) {
  const item = numarr[idx++];
  let lens;
  if ((item & 128) === 0) {
    lens = item;
  } else if ((item & 192) == 128) {
    lens = (item & 63) << 8 | numarr[idx++];
  } else if ((item & 224) == 192) {
    lens = (item & 31) << 16 | numarr[idx++] << 8 | numarr[idx++];
  } else if ((item & 240) == 224) {
    lens = (item & 15) << 24 | numarr[idx++] << 16 | numarr[idx++] << 8 | numarr[idx++];
  } else if ((item & 248) == 240) {
    lens = (numarr[idx++] << 24 | numarr[idx++] << 16 | numarr[idx++] << 8 | numarr[idx++]) >>> 0;
  } else {
    lens = item;
  }
  return [lens, idx];
}
