// import React, { useEffect, useState } from "react";
// import "./App.css";
// import axios from 'axios'

// const App: React.FC = () => {

//   interface songNames {
//     result : {
//       full_title: string
//     }
//   }

//   interface artistSongs {
//     arrayOfSongs: songNames[]
//   }

//   useEffect(() => {

//   },[])

//   axios.get(
//     'https://cors-anywhere.herokuapp.com/https://api.genius.com/search?q=Zeds%20Dead',
//     {
//       headers: {
//         Authorization: 'Bearer z7fzzVCwih1VI38S3gFhNRnG-01H2hh6p9DJZIA_S7l2CGWypTTqeoS3XFfUjmkq'
//       }
//     }
//   ).then((res) => {
//     console.log(res)
//     let songArray: artistSongs | string[] = []
//     console.log(songArray)
//     const apiData = res.data.response.hits
//     for(let i = 0; i < apiData.length; i++){
//       let fullTitle: string = apiData[i]?.result.full_title
//       songArray.push(fullTitle)
//       console.log(songArray)
//     }
//     console.log(songArray)
//   }
//   ).catch(err => console.log(err))

//   return <div>Genius API Example</div>;
// };

// export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App: React.FC = () => {
  interface SongNames {
    result: {
      full_title: string;
    };
  }

  interface APIResponse {
    response: {
      hits: SongNames[];
    };
  }
  const [songsArray, setSongsArray] = useState<string[]>();

  useEffect(() => {
    axios
      .get<APIResponse>(
        "https://cors-anywhere.herokuapp.com/https://api.genius.com/search?q=King%20Gizzard%20&%20The%20Lizard%20Wizard",
        {
          headers: {
            Authorization:
              "Bearer z7fzzVCwih1VI38S3gFhNRnG-01H2hh6p9DJZIA_S7l2CGWypTTqeoS3XFfUjmkq",
          },
        }
      )
      .then((res) => {
        const apiData = res.data.response.hits;
        const songArray = apiData.map((song) => song.result.full_title);
        console.log(songArray);
        setSongsArray(songArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const displaySongsArray = songsArray?.map((song) => {
    return <li>{song}</li>;
  })

  return (
    <div className="App">
      <ul>
        {displaySongsArray}
      </ul>
    </div>
  );
};

export default App;
