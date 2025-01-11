
var Module = (() => {
  var _scriptName = import.meta.url;
  
  return (
function(moduleArg = {}) {
  var moduleRtn;

var b=moduleArg,f,g,h=new Promise((a,c)=>{f=a;g=c}),k="object"==typeof window,l="undefined"!=typeof WorkerGlobalScope,m=Object.assign({},b),n="",p,q;
if(k||l)l?n=self.location.href:"undefined"!=typeof document&&document.currentScript&&(n=document.currentScript.src),_scriptName&&(n=_scriptName),n.startsWith("blob:")?n="":n=n.substr(0,n.replace(/[?#].*/,"").lastIndexOf("/")+1),l&&(q=a=>{var c=new XMLHttpRequest;c.open("GET",a,!1);c.responseType="arraybuffer";c.send(null);return new Uint8Array(c.response)}),p=async a=>{a=await fetch(a,{credentials:"same-origin"});if(a.ok)return a.arrayBuffer();throw Error(a.status+" : "+a.url);};
var r=b.printErr||console.error.bind(console);Object.assign(b,m);m=null;var t=b.wasmBinary,u,v=!1,w,x;function y(){var a=u.buffer;b.HEAP8=new Int8Array(a);b.HEAP16=new Int16Array(a);b.HEAPU8=x=new Uint8Array(a);b.HEAPU16=new Uint16Array(a);b.HEAP32=new Int32Array(a);b.HEAPU32=new Uint32Array(a);b.HEAPF32=new Float32Array(a);b.HEAPF64=new Float64Array(a)}var z=[],A=[],B=[];function C(){var a=b.preRun.shift();z.unshift(a)}var D=0,E=null;
function F(a){b.onAbort?.(a);a="Aborted("+a+")";r(a);v=!0;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");g(a);throw a;}var G=a=>a.startsWith("data:application/octet-stream;base64,"),H;async function I(a){if(!t)try{var c=await p(a);return new Uint8Array(c)}catch{}if(a==H&&t)a=new Uint8Array(t);else if(q)a=q(a);else throw"both async and sync fetching of the wasm failed";return a}
async function J(a,c){try{var e=await I(a);return await WebAssembly.instantiate(e,c)}catch(d){r(`failed to asynchronously prepare wasm: ${d}`),F(d)}}async function K(a){var c=H;if(!t&&"function"==typeof WebAssembly.instantiateStreaming&&!G(c)&&"function"==typeof fetch)try{var e=fetch(c,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(e,a)}catch(d){r(`wasm streaming compile failed: ${d}`),r("falling back to ArrayBuffer instantiation")}return J(c,a)}
class L{name="ExitStatus";constructor(a){this.message=`Program terminated with exit(${a})`;this.status=a}}
var M=a=>{for(;0<a.length;)a.shift()(b)},N=b.noExitRuntime||!0,O=0,Q={},R=a=>{if(!(a instanceof L||"unwind"==a))throw a;},S=a=>{w=a;N||0<O||(b.onExit?.(a),v=!0);throw new L(a);},T=a=>{if(!v)try{if(a(),!(N||0<O))try{w=a=w,S(a)}catch(c){R(c)}}catch(c){R(c)}},V={c:()=>F(""),b:()=>{N=!1;O=0},d:(a,c)=>{Q[a]&&(clearTimeout(Q[a].id),delete Q[a]);if(!c)return 0;var e=setTimeout(()=>{delete Q[a];T(()=>U(a,performance.now()))},c);Q[a]={id:e,l:c};return 0},e:a=>{var c=x.length;a>>>=0;if(2147483648<a)return!1;
for(var e=1;4>=e;e*=2){var d=c*(1+.2/e);d=Math.min(d,a+100663296);a:{d=(Math.min(2147483648,65536*Math.ceil(Math.max(a,d)/65536))-u.buffer.byteLength+65535)/65536|0;try{u.grow(d);y();var P=1;break a}catch(aa){}P=void 0}if(P)return!0}return!1},a:S},W;
(async function(){function a(d){W=d.exports;u=W.f;y();A.unshift(W.g);D--;b.monitorRunDependencies?.(D);0==D&&E&&(d=E,E=null,d());return W}D++;b.monitorRunDependencies?.(D);var c={a:V};if(b.instantiateWasm)try{return b.instantiateWasm(c,a)}catch(d){r(`Module.instantiateWasm callback failed with error: ${d}`),g(d)}H??=b.locateFile?G("countup.wasm")?"countup.wasm":b.locateFile?b.locateFile("countup.wasm",n):n+"countup.wasm":(new URL("countup.wasm",import.meta.url)).href;try{var e=await K(c);
a(e.instance);return e}catch(d){g(d)}})();b._countColors=(a,c)=>(b._countColors=W.h)(a,c);var U=(a,c)=>(U=W.i)(a,c);b._malloc=a=>(b._malloc=W.j)(a);b._free=a=>(b._free=W.k)(a);var X;E=function Y(){X||Z();X||(E=Y)};
function Z(){function a(){if(!X&&(X=!0,b.calledRun=!0,!v)){M(A);f(b);b.onRuntimeInitialized?.();if(b.postRun)for("function"==typeof b.postRun&&(b.postRun=[b.postRun]);b.postRun.length;){var c=b.postRun.shift();B.unshift(c)}M(B)}}if(!(0<D)){if(b.preRun)for("function"==typeof b.preRun&&(b.preRun=[b.preRun]);b.preRun.length;)C();M(z);0<D||(b.setStatus?(b.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>b.setStatus(""),1);a()},1)):a())}}
if(b.preInit)for("function"==typeof b.preInit&&(b.preInit=[b.preInit]);0<b.preInit.length;)b.preInit.pop()();Z();moduleRtn=h;


  return moduleRtn;
}
);
})();
export default Module;
