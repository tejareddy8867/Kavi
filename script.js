
/* ---------- 1. FEATHER COLOUR (white -> soft gold) ---------- */
document.body.insertAdjacentHTML("afterbegin",
  '<svg width="0" height="0" style="position:absolute"><defs>' +
  '<linearGradient id="wg" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#fff3fa"/><stop offset="1" stop-color="#ffe9b0"/>' +
  '</linearGradient></defs></svg>');

/* ---------- 2. ANGEL WINGS ---------- */
// One wing = 7 feathers. Each pair is [angle, length]. Change numbers to reshape the wing.
function angel() {
  var feathers = [[-20,40],[-36,38],[-52,34],[-68,30],[-84,26],[-102,20],[-120,15]], left = "";
  feathers.forEach(function (f) {
    var len = f[1];
    left += '<path d="M0 0C-6 -7 -6.5 -' + (len * .7) + ' 0 -' + len + 'C6.5 -' + (len * .7) + ' 6 -7 0 0Z"' +
            ' transform="translate(46 44) rotate(' + f[0] + ')" fill="url(#wg)" stroke="#f6c96b" stroke-width=".5"/>';
  });
  // right wing = the left wing flipped like a mirror
  return '<svg viewBox="0 0 100 60" style="animation-duration:' + (3 + Math.random() * 3) + 's">' +
         '<g class="w" style="animation-delay:-' + Math.random() + 's"><g>' + left + '</g>' +
         '<g transform="translate(100 0) scale(-1 1)">' + left + '</g></g></svg>';
}

var WING_COUNT = 15;                       // how many wings fly around
var sky = document.getElementById("wings");
for (var i = 0; i < WING_COUNT; i++) {
  var d = document.createElement("div");
  d.className = "fly";
  d.style.left   = Math.random() * 95 + "%";              // random position across the screen
  d.style.width  = (300 + Math.random() * 46) + "px";      // random size
  d.style.animationDuration = (14 + Math.random() * 16) + "s";   // random speed
  d.style.animationDelay    = "-" + Math.random() * 25 + "s";    // start at different heights
  d.innerHTML = angel();
  sky.appendChild(d);
}

/* ---------- 3. TWINKLING STARS ---------- */
for (var j = 0; j < 30; j++) {
  var s = document.createElement("i");
  s.className = "star";
  s.style.left = Math.random() * 100 + "%";
  s.style.top  = Math.random() * 100 + "%";
  s.style.animationDelay = "-" + Math.random() * 3 + "s";
  document.body.appendChild(s);
}

//* ---------- 4. MUSIC (your own song) - GALLERY PAGE ONLY ---------- */
var SONG = "song.mp3";                       // ✏️ your song file name

if (document.getElementById("grid")) {       // true only on gallery.html
  var song = new Audio(SONG);
  song.loop = true;                          // repeats until she pauses it
  var btn = document.getElementById("mus");
  var muted = false;                         // true if she paused it herself

  function startMusic() {
    song.play().then(function () {
      btn.className = "on";                  // show the 🎵 button
    }).catch(function () {});                // browser blocked it: first tap will retry
  }

  // 🎵 button: pause / play
  btn.onclick = function () {
    if (song.paused) { muted = false; startMusic(); }
    else { muted = true; song.pause(); btn.className = "off"; }
  };

  startMusic();                              // try to play as soon as the gallery opens

  // if the browser blocked it, the first tap or key press anywhere starts it
  ["pointerdown", "keydown"].forEach(function (ev) {
    document.addEventListener(ev, function () {
      if (song.paused && !muted) startMusic();
    });
  });
}

/* ############ PART B - HOME PAGE ONLY ############
   This runs only if the page has the element id="nm" (index.html has it). */
function setupHome() {
  // ✏️ Write her name here (it appears under "Happy Birthday"):
  var NAME = "My Best Person";  // e.g. "My Princess" or "My Angel"
  document.getElementById("nm").textContent = NAME;

  // The "Tap for a secret" button reveals the hidden message.
  // CSS (style.css, section 5) animates it when the class "show" is added.
  document.getElementById("sec").onclick = function () {
    document.getElementById("secret").classList.add("show");
  };
}
if (document.getElementById("nm")) setupHome();

/* ############ PART C - GALLERY PAGE ONLY ############
   This runs only if the page has the element id="grid" (gallery.html has it). */
function setupGallery() {
  // ✏️ STEP 1: your photos. Put 20 pictures in the "photos" folder and list them in order.
  // While the list is empty, the frames show 👼 and 💖 instead.
  var photos = [
    "photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg",
    "photo6.jpg", "photo7.jpg", "photo8.jpg", "photo9.jpg", "photo10.jpg",
    "photo11.jpg", "photo12.jpg", "photo13.jpg", "photo14.jpg", "photo15.jpg",
    "photo16.jpg", "photo17.jpg", "photo18.jpg", "photo19.jpg", "photo20.jpg"
  ];
  var photos = [];
for (var p = 1; p <= 20; p++) {
  photos.push("photo" + p + ".jpg");
}


  // ✏️ STEP 2: one caption per photo, in the same order.
  var captions = [
    "The pic i look anain and again", "Sweet memories", "Matching smiles", "Best day ever", "princess in the sky",
    "You, shining as always", "The day i never forget", "The you look like an angel", "Never forget this day", "Pure happiness",
    "Angel in Green dress", "My favourite view", "Always in my heart", "Magic moments", "The day i feel blessed",
    "Together always", "Our First Pic together", "Little angel", "Little things I like", "Gorgeous princess"
  ];

  var grid = document.getElementById("grid");   // the empty box in gallery.html
  var box  = document.getElementById("lb");     // big photo view
  var boxInner = document.getElementById("lbc");

  function makeFrame(n) {
    var frame = document.createElement("div");
    frame.className = "ph";
    var emoji = (n % 2 ? "💖" : "👼");
    // photo if we have one, otherwise an emoji; plus the caption
    frame.innerHTML = (photos[n] ? '<img src="' + photos[n] + '" alt="Memory ' + (n + 1) + '">'
                                 : '<div class="icon">' + emoji + '</div>') +
                      '<div class="cap">' + captions[n] + '</div>';
    // tap a frame -> show it big with its caption
    frame.onclick = function () {
      boxInner.innerHTML = (photos[n] ? '<img src="' + photos[n] + '" alt="">'
                                      : '<div class="big">' + emoji + '</div>') +
                           '<p class="script">' + captions[n] + '</p>';
      box.classList.add("on");
    };
    grid.appendChild(frame);
  }

  for (var n = 0; n < 20; n++) makeFrame(n);       // make the 20 frames

  // tap anywhere on the big view -> close it
  box.onclick = function () { box.classList.remove("on"); };
}
if (document.getElementById("grid")) setupGallery();
