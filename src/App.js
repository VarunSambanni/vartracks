import './index.css';
import AudioSpectrum from 'react-audio-spectrum';
import { Grid, Stack, Card } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useState } from 'react';

function importAll(r) {
  let tracks = {};
  r.keys().map((item, index) => { tracks[item.replace('./', '')] = r(item); });
  return tracks;
}
const NumberOfTracks = 11;
const Tracks = importAll(require.context('./mp3', false, /\.(mp3)$/));

const Colors = ["#3396ff", '#3900bd', '#f3ff73', '#2effc4', '#1ffffb', '#ff1c24', '#ff911c', '#62ff4a']


function App() {
  const [currentTrack, setCurrentTrack] = useState('Track 1.mp3');
  console.log(currentTrack);

  const trackClickHandler = (e) => {
    setCurrentTrack(e.target.id);
  }

  const shuffleIconClickHandler = () => {
    let randomTrackNumber = Math.floor(Math.random() * NumberOfTracks) + 1;
    setCurrentTrack(`Track ${randomTrackNumber}.mp3`);
  }

  return (
    <>
      <header>
        <h1 className='header'>VarTracks</h1>
      </header>
      <div className='stackContainer'>
        <Stack spacing={3}>
          <div className='audioSpectrumContainer'>
            <AudioSpectrum
              id="audio-canvas"
              height={200}
              width={window.screen.width > 674 ? 642 : window.screen.width * 0.9} //642
              audioId={'audio-element'}
              capColor={Colors[Math.floor(Math.random() * Colors.length)]}
              capHeight={2}
              meterWidth={2}
              meterCount={512}
              meterColor={[
                { stop: 0, color: Colors[Math.floor(Math.random() * Colors.length)] },
                { stop: 0.5, color: Colors[Math.floor(Math.random() * Colors.length)] },
                { stop: 1, color: Colors[Math.floor(Math.random() * Colors.length)] }
              ]}
              gap={4}
            />
          </div>
          <div className='trackNameContainer'>
            <p className='trackName shiny'>Playing {currentTrack.split('.')[0]}</p>
          </div>
          <div className='iconContainer '>
            <ShuffleIcon onClick={shuffleIconClickHandler} sx={{ 'backgroundColor': 'white', 'height': '1em', 'width': '1em' }}></ShuffleIcon>
          </div>
          <div className='audioPlayerContainer' >
            <audio autoPlay className='audioElement' id={'audio-element'} controls src={Tracks[currentTrack]}>
            </audio>
          </div>
          <div className='tracksContainer'>
            {
              Object.keys(Tracks).map((key, index) => {
                return <div className={key === currentTrack ? 'selectedTrackContainer' : 'trackContainer'} key={index} onClick={(e) => trackClickHandler(e)} >
                  <p id={key} className={key === currentTrack ? 'selectedTrack' : 'track'} key={index}>{key.split('.')[0]}</p>
                </div>
              })
            }
          </div>
        </Stack>
      </div >
      <footer>
      </footer>
    </>
  );
}

export default App;
