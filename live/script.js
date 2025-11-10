// Solid, lightweight player logic with icon states for Font Awesome v4
const STREAM_URL = "https://listen.openstream.co/6235/audio"; // <-- replace if needed

const audio    = document.getElementById("audio");
const playBtn  = document.getElementById("playBtn");
const vol      = document.getElementById("vol");
const icon     = playBtn.querySelector("i");
const statusEl = document.getElementById("status"); // optional (ok if missing)

let srcSet = false;
let retry  = 0;
let intendToPlay = false; // whether the user wants it playing

function setStatus(t){
   if (statusEl) statusEl.textContent = t;
}

function setIcon(state){
   // "play" | "pause" | "loading"
   if (state === "loading")      icon.className = "fa fa-spinner fa-spin";
   else if (state === "pause")   icon.className = "fa fa-pause";
   else                          icon.className = "fa fa-play";
}

// Restore volume
const savedVol = localStorage.getItem("ostm_vol");
if (savedVol !== null) {
   const v = Math.min(1, Math.max(0, parseFloat(savedVol)));
   audio.volume = v; vol.value = v;
} else {
   audio.volume = 1;
}

function start(){
   intendToPlay = true;
   if (!srcSet){ audio.src = STREAM_URL; srcSet = true; }
   setIcon("loading");
   setStatus("Connecting…");
   audio.play().then(()=>{
      retry = 0;
      setIcon("pause");
      setStatus("Playing");
      if ('mediaSession' in navigator){
         navigator.mediaSession.metadata = new MediaMetadata({
            title: "OSTM Radio", artist: "Live", album: "OSTM",
            artwork: [{ src: "/assets/img/ostm-logo-512.png", sizes: "512x512", type: "image/png" }]
         });
      }
   }).catch(()=>{
      // Autoplay/gesture blocked or immediate failure
      intendToPlay = false;
      setIcon("play");
      setStatus("Click play to start");
   });
}

function pause(){
   intendToPlay = false;
   audio.pause();
   setIcon("play");
   setStatus("Paused");
}

playBtn.addEventListener("click", ()=>{
   (audio.paused) ? start() : pause();
});

// Volume
vol.addEventListener("input", e=>{
   const v = parseFloat(e.target.value);
   audio.volume = v;
   localStorage.setItem("ostm_vol", v.toString());
});

// Keyboard: Space toggles, arrows change volume
document.addEventListener("keydown", (e)=>{
   if (e.code === "Space"){ e.preventDefault(); (audio.paused) ? start() : pause(); }
   if (e.code === "ArrowUp"){ e.preventDefault(); vol.value = Math.min(1, (+vol.value + 0.05)).toFixed(2); vol.dispatchEvent(new Event("input")); }
   if (e.code === "ArrowDown"){ e.preventDefault(); vol.value = Math.max(0, (+vol.value - 0.05)).toFixed(2); vol.dispatchEvent(new Event("input")); }
});

/* ---- Stream state → icon state ---- */
audio.addEventListener("loadstart", ()=> { if (intendToPlay) setIcon("loading"); });
audio.addEventListener("waiting",   ()=> { if (intendToPlay) setIcon("loading"); });
audio.addEventListener("stalled",   ()=> { if (intendToPlay) setIcon("loading"); });

audio.addEventListener("playing",   ()=> { setIcon("pause"); setStatus("Playing"); });
audio.addEventListener("pause",     ()=> { if (!intendToPlay) setIcon("play"); });
audio.addEventListener("ended",     ()=> { setIcon("play"); setStatus("Ended"); });

/* ---- Basic reconnect on error ---- */
audio.addEventListener("error", ()=>{
   setStatus("Connection error — retrying…");
   if (!intendToPlay){ setIcon("play"); return; } // user paused, don't retry
   setIcon("loading");
   retry = Math.min(retry + 1, 5);
   const delay = 900 * Math.pow(1.6, retry);
   setTimeout(()=> {
      if (intendToPlay) start();
   }, delay);
});

/* ---- Optional autoplay via ?autoplay=1 ---- */
if (new URLSearchParams(location.search).get("autoplay") === "1") {
   start();
}