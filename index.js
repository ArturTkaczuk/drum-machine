function App() {
  const [powerOn, setPowerOn] = React.useState(false);
  const [bankOn, setBankOn] = React.useState(false);
  const [volume, setVolume] = React.useState(50);
  const [currentlyDisplayedButtonMessage, setCurrentlyDisplayedButtonMessage] =
    React.useState(null);

  return (
    <div className="app">
      <Buttons
        powerOn={powerOn}
        bankOn={bankOn}
        volume={volume}
        setCurrentlyDisplayedButtonMessage={setCurrentlyDisplayedButtonMessage}
      />
      <ControlPanel
        powerOn={powerOn}
        setPowerOn={setPowerOn}
        bankOn={bankOn}
        setBankOn={setBankOn}
        setVolume={setVolume}
        currentlyDisplayedButtonMessage={currentlyDisplayedButtonMessage}
        setCurrentlyDisplayedButtonMessage={setCurrentlyDisplayedButtonMessage}
      />
    </div>
  );
}

function Buttons({
  powerOn,
  bankOn,
  volume,
  setCurrentlyDisplayedButtonMessage,
}) {
  const buttonClass = `sound-button ${powerOn ? "" : "power-off"}`;

  const sounds = {
    "Ominous drums": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-ominous-drums-227.mp3"
    ),
    "Ominous drums appear": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-ominous-drums-appear-228.mp3"
    ),
    "Drum hit with eco": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-drum-hit-with-eco-544.mp3"
    ),
    "Mystery trailer drum": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-cinematic-mystery-trailer-drum-hit-546.mp3"
    ),
    "Synthetic power bass": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-synthetic-power-bass-transition-2296.mp3"
    ),
    "Futuristic bass hit": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-futuristic-bass-hit-2303.mp3"
    ),
    "Bass guitar": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-bass-guitar-single-note-2331.mp3"
    ),
    "Bell sound": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-modern-classic-door-bell-sound-113.mp3"
    ),
    "Siren tone": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-siren-tone-1649.mp3"
    ),
  };

  const soundsBankOn = {
    "Classic flute": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-flute-alert-2307.mp3"
    ),
    "Musical flute": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-musical-flute-alert-2308.mp3"
    ),
    "Indian flute": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-possitive-indian-flute-2312.mp3"
    ),
    "Long flute": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-melodical-flute-music-notification-2310.mp3"
    ),
    Trumpet: new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-trumpets-and-strings-off-beat-2286.mp3"
    ),
    "Drum bass hit": new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-drum-bass-hit-2294.mp3"
    ),
    Cymball: new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-relaxing-bell-chime-3109.mp3"
    ),
    Whoosh: new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-meteor-whoosh-3024.mp3"
    ),
    Click: new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-on-or-off-light-switch-tap-2585.mp3"
    ),
  };

  const handleClick = (e) => {
    if (!powerOn) return;
    const selectedBankSet = bankOn ? soundsBankOn : sounds;
    const clickedButtonIndex = Number(e.target.getAttribute("value"));
    const selectedAudioKey = Object.keys(selectedBankSet)[clickedButtonIndex];
    const selectedAudioValue =
      selectedBankSet[Object.keys(selectedBankSet)[clickedButtonIndex]];
    selectedAudioValue.pause();
    selectedAudioValue.currentTime = 0;
    selectedAudioValue.volume = volume / 100;
    selectedAudioValue.play();
    setCurrentlyDisplayedButtonMessage(selectedAudioKey);
  };

  return (
    <div className="buttons-container">
      <div value="0" onClick={(e) => handleClick(e)} className={buttonClass}>
        Q
      </div>
      <div value="1" onClick={(e) => handleClick(e)} className={buttonClass}>
        W
      </div>
      <div value="2" onClick={(e) => handleClick(e)} className={buttonClass}>
        E
      </div>
      <div value="3" onClick={(e) => handleClick(e)} className={buttonClass}>
        A
      </div>
      <div value="4" onClick={(e) => handleClick(e)} className={buttonClass}>
        S
      </div>
      <div value="5" onClick={(e) => handleClick(e)} className={buttonClass}>
        D
      </div>
      <div value="6" onClick={(e) => handleClick(e)} className={buttonClass}>
        Z
      </div>
      <div value="7" onClick={(e) => handleClick(e)} className={buttonClass}>
        X
      </div>
      <div value="8" onClick={(e) => handleClick(e)} className={buttonClass}>
        C
      </div>
    </div>
  );
}

function ControlPanel({
  powerOn,
  setPowerOn,
  bankOn,
  setBankOn,
  setVolume,
  currentlyDisplayedButtonMessage,
  setCurrentlyDisplayedButtonMessage,
}) {
  const handlePowerChange = () => {
    setPowerOn(!powerOn);
    setCurrentlyDisplayedButtonMessage(null);

    clearTimeout(localStorage.getItem("timeout"));
  };

  const handleBankChange = () => {
    setBankOn(!bankOn);
    if (!bankOn) {
      setCurrentlyDisplayedButtonMessage("Flute kit");
    } else {
      setCurrentlyDisplayedButtonMessage("Drum kit");
    }

    clearTimeout(localStorage.getItem("timeout"));
  };

  const handleRangeChange = (e) => {
    setVolume(Number(e.target.value));
    setCurrentlyDisplayedButtonMessage("Volume: " + Number(e.target.value));

    clearTimeout(localStorage.getItem("timeout"));
    localStorage.setItem(
      "timeout",
      setTimeout(() => {
        setCurrentlyDisplayedButtonMessage(null);
      }, 1000)
    );
  };

  const displayedMessage = () => {
    if (currentlyDisplayedButtonMessage === null) return;
    else {
      return <p>{currentlyDisplayedButtonMessage}</p>;
    }
  };

  return (
    <div className="control-panel">
      <div className="power">
        <p>Power</p>
        <div className="switch">
          <label>
            Off
            <input onChange={handlePowerChange} type="checkbox" />
            <span className="lever"></span>
            On
          </label>
        </div>
      </div>

      <div className="display">{displayedMessage()}</div>

      <form action="#">
        <p className="range-field">
          <input
            disabled={powerOn ? false : true}
            type="range"
            id="test5"
            min="0"
            max="100"
            onChange={(e) => handleRangeChange(e)}
          />
        </p>
      </form>

      <div className="bank">
        <p>Bank</p>
        <div className="switch">
          <label>
            Off
            <input
              disabled={powerOn ? false : true}
              type="checkbox"
              onChange={handleBankChange}
            />
            <span className="lever"></span>
            On
          </label>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
