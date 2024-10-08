
var Module = (() => {
  var _scriptName = import.meta.url;
  
  return (
async function(moduleArg = {}) {
  var moduleRtn;

var b=moduleArg,f,g,h=new Promise((a,c)=>{f=a;g=c}),l="object"==typeof window,m="function"==typeof importScripts,n="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node&&"renderer"!=process.type;if(n){const {createRequire:a}=await import("module");let c=import.meta.url;c.startsWith("data:")&&(c="/");var require=a(c)}var p=Object.assign({},b),q=(a,c)=>{throw c;},r="",t,u;
if(n){var fs=require("fs"),v=require("path");import.meta.url.startsWith("data:")||(r=v.dirname(require("url").fileURLToPath(import.meta.url))+"/");u=a=>{a=w(a)?new URL(a):v.normalize(a);return fs.readFileSync(a)};t=a=>{a=w(a)?new URL(a):v.normalize(a);return new Promise((c,d)=>{fs.readFile(a,void 0,(e,k)=>{e?d(e):c(k.buffer)})})};process.argv.slice(2);q=(a,c)=>{process.exitCode=a;throw c;}}else if(l||m)m?r=self.location.href:"undefined"!=typeof document&&document.currentScript&&
(r=document.currentScript.src),_scriptName&&(r=_scriptName),r.startsWith("blob:")?r="":r=r.substr(0,r.replace(/[?#].*/,"").lastIndexOf("/")+1),m&&(u=a=>{var c=new XMLHttpRequest;c.open("GET",a,!1);c.responseType="arraybuffer";c.send(null);return new Uint8Array(c.response)}),t=a=>w(a)?new Promise((c,d)=>{var e=new XMLHttpRequest;e.open("GET",a,!0);e.responseType="arraybuffer";e.onload=()=>{200==e.status||0==e.status&&e.response?c(e.response):d(e.status)};e.onerror=d;e.send(null)}):fetch(a,{credentials:"same-origin"}).then(c=>
c.ok?c.arrayBuffer():Promise.reject(Error(c.status+" : "+c.url)));b.print||console.log.bind(console);var x=b.printErr||console.error.bind(console);Object.assign(b,p);p=null;var y=b.wasmBinary,z,A=!1,B,C;function D(){var a=z.buffer;b.HEAP8=new Int8Array(a);b.HEAP16=new Int16Array(a);b.HEAPU8=C=new Uint8Array(a);b.HEAPU16=new Uint16Array(a);b.HEAP32=new Int32Array(a);b.HEAPU32=new Uint32Array(a);b.HEAPF32=new Float32Array(a);b.HEAPF64=new Float64Array(a)}var E=[],F=[],G=[];
function H(){var a=b.preRun.shift();E.unshift(a)}var I=0,J=null,K=null;function L(a){b.onAbort?.(a);a="Aborted("+a+")";x(a);A=!0;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");g(a);throw a;}var M=a=>a.startsWith("data:application/octet-stream;base64,"),w=a=>a.startsWith("file://"),N;function O(a){if(a==N&&y)return new Uint8Array(y);if(u)return u(a);throw"both async and sync fetching of the wasm failed";}
function aa(a){return y?Promise.resolve().then(()=>O(a)):t(a).then(c=>new Uint8Array(c),()=>O(a))}function P(a,c,d){return aa(a).then(e=>WebAssembly.instantiate(e,c)).then(d,e=>{x(`failed to asynchronously prepare wasm: ${e}`);L(e)})}
function ba(a,c){var d=N;return y||"function"!=typeof WebAssembly.instantiateStreaming||M(d)||w(d)||n||"function"!=typeof fetch?P(d,a,c):fetch(d,{credentials:"same-origin"}).then(e=>WebAssembly.instantiateStreaming(e,a).then(c,function(k){x(`wasm streaming compile failed: ${k}`);x("falling back to ArrayBuffer instantiation");return P(d,a,c)}))}function Q(a){this.name="ExitStatus";this.message=`Program terminated with exit(${a})`;this.status=a}
var R=a=>{for(;0<a.length;)a.shift()(b)},S=b.noExitRuntime||!0,T={},U=0,V=a=>{B=a;S||0<U||(b.onExit?.(a),A=!0);q(a,new Q(a))},ca=a=>{if(!A)try{if(a(),!(S||0<U))try{B=a=B,V(a)}catch(c){c instanceof Q||"unwind"==c||q(1,c)}}catch(c){c instanceof Q||"unwind"==c||q(1,c)}},da={c:()=>{L("")},b:()=>{S=!1;U=0},d:(a,c)=>{T[a]&&(clearTimeout(T[a].id),delete T[a]);if(!c)return 0;var d=setTimeout(()=>{delete T[a];ca(()=>W(a,performance.now()))},c);T[a]={id:d,l:c};return 0},e:a=>{var c=C.length;a>>>=0;if(2147483648<
a)return!1;for(var d=1;4>=d;d*=2){var e=c*(1+.2/d);e=Math.min(e,a+100663296);a:{e=(Math.min(2147483648,65536*Math.ceil(Math.max(a,e)/65536))-z.buffer.byteLength+65535)/65536;try{z.grow(e);D();var k=1;break a}catch(fa){}k=void 0}if(k)return!0}return!1},a:V},X=function(){function a(d){X=d.exports;z=X.f;D();F.unshift(X.g);I--;b.monitorRunDependencies?.(I);0==I&&(null!==J&&(clearInterval(J),J=null),K&&(d=K,K=null,d()));return X}var c={a:da};I++;b.monitorRunDependencies?.(I);if(b.instantiateWasm)try{return b.instantiateWasm(c,
a)}catch(d){x(`Module.instantiateWasm callback failed with error: ${d}`),g(d)}N??=b.locateFile?M("countup.wasm")?"countup.wasm":b.locateFile?b.locateFile("countup.wasm",r):r+"countup.wasm":(new URL("countup.wasm",import.meta.url)).href;ba(c,function(d){a(d.instance)}).catch(g);return{}}();b._countColors=(a,c)=>(b._countColors=X.h)(a,c);var W=(a,c)=>(W=X.i)(a,c);b._malloc=a=>(b._malloc=X.j)(a);b._free=a=>(b._free=X.k)(a);var Y;K=function ea(){Y||Z();Y||(K=ea)};
function Z(){function a(){if(!Y&&(Y=!0,b.calledRun=!0,!A)){R(F);f(b);b.onRuntimeInitialized?.();if(b.postRun)for("function"==typeof b.postRun&&(b.postRun=[b.postRun]);b.postRun.length;){var c=b.postRun.shift();G.unshift(c)}R(G)}}if(!(0<I)){if(b.preRun)for("function"==typeof b.preRun&&(b.preRun=[b.preRun]);b.preRun.length;)H();R(E);0<I||(b.setStatus?(b.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>b.setStatus(""),1);a()},1)):a())}}
if(b.preInit)for("function"==typeof b.preInit&&(b.preInit=[b.preInit]);0<b.preInit.length;)b.preInit.pop()();Z();moduleRtn=h;


  return moduleRtn;
}
);
})();
export default Module;
