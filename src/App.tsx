import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import InputBox from "./components/InputBox"

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

  interface setArtistLookedUpInterface {
    
  }

  const [songsArray, setSongsArray] = useState<string[]>();

  const [artistLookedUp, setArtistLookedUp] = useState<string>("Zeds Dead")


  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.genius.com/search?q=${artistLookedUp}`,
        {
          headers: {
            Authorization:
              "Bearer z7fzzVCwih1VI38S3gFhNRnG-01H2hh6p9DJZIA_S7l2CGWypTTqeoS3XFfUjmkq",
          },
        }
      );
      const jsonData = await data.json();
      const songArray = jsonData.response.hits.map((song:SongNames) => song.result.full_title);
      setSongsArray(songArray);
    };
    fetchData();
  }, [artistLookedUp]);

  const displaySongsArray = songsArray?.map((song) => {
    return <li>{song}</li>;
  });

  const inputRef: React.RefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null)

  const setArtistLookedUpHandler: React.FormEventHandler<HTMLFormElement>  = (e)=> {
    e.preventDefault()
    let artist = inputRef.current?.value

    if (artist){
      let mappedArtist = artist.split(" ").map((namePart) => {
        let capitalizedLetter = namePart[0].toUpperCase()
        return namePart.replace(namePart[0], capitalizedLetter) + "%20"
      })

      let stringedArtist = mappedArtist.join().replaceAll(",","")
      setArtistLookedUp(stringedArtist.slice(0,stringedArtist.length - 3))
    }

  }



  return (
    <div className="App">
      <InputBox onSubmitHandler={setArtistLookedUpHandler} inputRef={inputRef}></InputBox>
      <ul>{displaySongsArray}</ul>
    </div>
  );
};

export default App;
