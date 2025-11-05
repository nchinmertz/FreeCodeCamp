const audioClips = {
  Q: 'Heater 1',
  W: 'Heater 2',
  E: 'Heater 3',
  A: 'Heater 4',
  S: 'Clap',
  D: 'Open HH',
  Z: 'Kick n Hat',
  X: 'Kick',
  C: 'Closed HH'
};

const playSound = (key) => {
  console.log(key);
  const audio = document.getElementById(key);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
    document.getElementById('display').innerText = audioClips[key];
  }
};

document.querySelectorAll('.drum-pad').forEach(pad => {
  pad.addEventListener('click', () => {
    const key = pad.id;
    playSound(key[0]);
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key.toUpperCase();
  if (audioClips[key]) { 
        playSound(key);
  }
});