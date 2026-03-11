function simpleEncrypt(text, key = 57) {
  if (!text) return;
  return Buffer.from(
    [...text].map(ch => ch.charCodeAt(0) ^ key)
  ).toString('base64');
}

function simpleDecrypt(text, key = 57) {
  if (!text) return;
  const bytes = Buffer.from(text, 'base64');
  return [...bytes].map(b => String.fromCharCode(b ^ key)).join('');
}

module.exports = {
  simpleEncrypt,
  simpleDecrypt,
}
