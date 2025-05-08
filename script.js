console.log("Script Js Initializing");
let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
  currFolder = folder;
  let a = await fetch(`${currFolder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3"))
      songs.push(element.href.split(`/${currFolder}/`)[1]);
  }
  //Show All the songs
  let songsUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  songsUL.innerHTML = "";
  for (const song of songs) {
    songsUL.innerHTML =
      songsUL.innerHTML +
      `
            <li>
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div class="songName">${
                                  song
                                    .replaceAll("%20", " ")
                                    .split("-")[1]
                                    .split(".mp3")[0]
                                }</div>
                                <div class="songArtist">${song
                                  .split("-")[0]
                                  .replaceAll("%20", " ").replaceAll("%26", "&")}</div>
                                <div class="songPath">${song.replaceAll(
                                  "%20",
                                  " "
                                )}</div>
                            </div>
                            <div class="playNow">
                                <span>Play Now</span>
                                <img class="invert" src="/img/play.svg" alt="">
                            </div>
                        </li>
        `;

    //Attaching Eventlistener to each song
    Array.from(
      document.querySelector(".songList").getElementsByTagName("li")
    ).forEach((e) => {
      e.addEventListener("click", (element) => {
        console.log(e.querySelector(".info").innerHTML.trim());
        playMusic(e.querySelector(".info").lastElementChild.innerHTML);
      });
    });
  }
  return songs;
}

const playMusic = (track, pause = false) => {
  currentSong.src = `/${currFolder}/` + track;
  if (!pause) {
    currentSong.play();
    play.src = "/img/pause.svg";
  }
  document.querySelector(".songInfo").innerHTML = decodeURI(
    track.split(".mp3")[0].replaceAll("%26", "&")
  );
  document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
};

async function displayAlbums() {
  let a = await fetch(`songs/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".cardContainer");
  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/songs/")) {
      let folder = e.href.split("/").splice(-1)[0];
      console.log(folder);
      //Get Metadata
      let a = await fetch(`songs/${folder}/info.json`);
      let response = await a.json();
      cardContainer.innerHTML =
        cardContainer.innerHTML +
        `
        <div data-folder="${folder}" class="card">
            <div class="play">
              <svg
                width="50"
                height="50"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- Green Circle -->
                <circle cx="50" cy="50" r="45" fill="#1fdf64" />

                <!-- Play Triangle -->
                <polygon points="40,30 40,70 70,50" fill="black" />
              </svg>
            </div>
            <img src="/songs/${folder}/cover.jpg" alt="" />
            <h2>${response.title}</h2>
            <p>
              ${response.description}
            </p>
          </div>
      `;
    }
  }
  //Load the playlist
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
      console.log(songs[0])
      playMusic(songs[0],false)
    });
  });
}

async function main() {
  await getsongs("songs/atbsm");
  playMusic(songs[0], true);

  //Display all the albums
  displayAlbums();

  //Attaching Event listener to play, nextt and pause
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "/img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "img/play.svg";
    }
  });

  //listen for time update event
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )} / ${secondsToMinutesSeconds(currentSong.duration)}`;

    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  //Add a event listener to seekbar
  document.querySelector(".seekBar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });


//Add an eventlistener for hamburger
document.querySelector(".hamburger").addEventListener("click", () => {
  console.log("Ham");
  document.querySelector(".left").style.left = "0";
});

//Add an eventlistener for hamburger close
document.querySelector(".close").addEventListener("click", () => {
  console.log("Close");
  document.querySelector(".left").style.left = "-120%";
});

//Previos and Next Btns
previous.addEventListener("click", () => {
  currentSong.pause();
  console.log("Previous");

  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
  if (index - 1 > 0) {
    playMusic(songs[index - 1]);
  } else {
    console.log(songs.length);
    playMusic(songs[songs.length - 1]);
  }
});
next.addEventListener("click", () => {
  currentSong.pause();
  console.log("Next");

  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
  if (index + 1 < songs.length) {
    playMusic(songs[index + 1]);
  } else {
    playMusic(songs[0]);
  }
});

//Volume
document
  .querySelector(".range")
  .getElementsByTagName("input")[0]
  .addEventListener("change", (e) => {
    currentSong.volume = parseInt(e.target.value) / 100;
    if(currentSong.muted){
      currentSong.muted = !currentSong.muted;
      unmute.src = "/img/volume.svg";
    }
  });

//Mute
unmute.addEventListener("click", () => {
  currentSong.muted = !currentSong.muted;
  if (currentSong.muted) {
    unmute.src = "/img/mute.svg";
    document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
  } else {
    unmute.src = "/img/volume.svg";
    document.querySelector(".range").getElementsByTagName("input")[0].value = 40;
  }
  console.log(currentSong.muted);
});

document.addEventListener("keydown",(e)=>{
  if (e.code==="Space" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    e.preventDefault();
    if (currentSong.paused) {
      currentSong.play();
      play.src = "/img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "/img/play.svg";
    }
  }
})
}
main();
