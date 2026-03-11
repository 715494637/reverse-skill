const gv = require('../src/handler/globalVarible');
gv.wrap(require('../utils/initGv'))();
const { ascii2string } = gv.utils;

const valueMap = {
  [ascii2string(gv.keys[7])]: "rug1Bzf5;OWNRL2Cu;9RWLJWOi;9a1zRVha;9BnFcqHD;NOh8RTWx6K2d;z5gPWiiwO6ht;3P7DWp44pSlp;2h9AIDg9eZgY.b4c45da.js;2HA1rNA9S1Ml.b4c45da.js;TLghakBQwZeH.b4c45da.js;17wg5rLIscGt.js;5e4AHUfhB3an;Km8OKJFfSI3v;QyAdZS0JgYOu;wnqk6Cjd171e.b4c45da.js;ZWLVrARbr6Qh.b4c45da.js;.b4c45da.js;K5MK4FPPNWrv;dhfbg8v2FSeO",
  [ascii2string(gv.keys[11])]: "http:352363362:80",
  [ascii2string(gv.keys[19])]: "4066587924",
  [ascii2string(gv.keys[21])]: "1757038222",
  [ascii2string(gv.keys[22])]: "pGNZAUKk5T5E.QTpqQ_Lp4JvqhoXqCGaDyBNljsn3B9",
  [ascii2string(gv.keys[24])]: "4",
  [ascii2string(gv.keys[27])]: "7z,aac,amr,asm,avi,bak,bat,bmp,bin,c,cab,css,csv,com,cpp,dat,dll,doc,dot,docx,exe,eot,fla,flc,fon,fot,font,gdb,gif,gz,gho,hlp,hpp,htc,ico,ini,inf,ins,iso,js,jar,jpg,jpeg,json,java,lib,log,mid,mp4,mpa,m4a,mp3,mpg,mkv,mod,mov,mim,mpp,msi,mpeg,obj,ocx,ogg,olb,ole,otf,py,pyc,pas,pgm,ppm,pps,ppt,pdf,pptx,png,pic,pli,psd,qif,qtx,ra,rm,ram,rmvb,reg,res,rtf,rar,so,sbl,sfx,swa,swf,svg,sys,tar,taz,tif,tiff,torrent,txt,ttf,vsd,vss,vsw,vxd,woff,woff2,wmv,wma,wav,wps,xbm,xpm,xls,xlsx,xsl,xml,z,zip,apk,plist,ipa",
  [ascii2string(gv.keys[29])]: "_$be",
  [ascii2string(gv.keys[30])]: "_$$1",
  [ascii2string(gv.keys[31])]: "_$$Z",
  [ascii2string(gv.keys[32])]: "_$gw",
  [ascii2string(gv.keys[33])]: "6",
  [ascii2string(gv.keys[34])]: "84",
  [ascii2string(gv.keys[40])]: "k:AAQB",
  [ascii2string(gv.keys[41])]: "[\"var headersStringSub&&&response.headers.forEach((value, key)&&&headersString += key\"]\n",
}

test('r2mka数据对比', () => {
  Object.entries(valueMap).forEach(([tb, ex]) => {
    expect(tb).toBe(ex);
  })
});
