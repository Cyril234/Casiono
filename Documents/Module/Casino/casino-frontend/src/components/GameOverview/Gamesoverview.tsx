import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Gameoverview.css";
import Slideshow from "../GameOverview/Slideshow";
import { MdLogout } from 'react-icons/md';
import { MdSettings } from 'react-icons/md';
import { FaTrophy, FaUser } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";




export default function Gameoverview() {
  const [posXPink, setPosXPink] = useState(-2000);
  const [posYPink, setPosYPink] = useState(-2000);
  const [posXOrange, setPosXOrange] = useState(2000);
  const [posYOrange, setPosYOrange] = useState(2000);
  const [username, setUsername] = useState<String>("");
  const [volume, setVolume] = useState(0);
  const [soundstatus, setSoundstatus] = useState(false);
  const [coins, setCoins] = useState<Number>(0);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const token = sessionStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/players/byToken/${token}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP Fehler: ${response.status}`);
        }

        const data = await response.json();
        setUsername(data.username);
        setCoins(data.coins);
        setVolume(data.volume);
        setSoundstatus(data.soundstatus);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) return;
    fetch(`http://localhost:8080/api/players/byToken/${token}`)
      .then(res => {
        if (!res.ok) throw new Error("Fehler beim Laden des Users");
        return res.json();
      })
      .then(data => {
        setCoins(data.coins);
        setUsername(data.username);
      })
      .catch(err => {
        setCoins(0);
        setUsername("");
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter") {
        setLastKey(e.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const handleKeyUsed = () => setLastKey(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (posXPink < -400) {
        setPosXPink(prev => prev + Math.floor(Math.random() * (5 - 0 + 1)) + 0);
      } else if (posXPink > 2320) {
        setPosXPink(prev => prev + Math.floor(Math.random() * (0 - -5 + 1)) + -5);
      } else {
        setPosXPink(prev => prev + Math.floor(Math.random() * (5 - -5 + 1)) + -5);
      }

      if (posXPink < -400) {
        setPosYPink(prev => prev + Math.floor(Math.random() * (5 - 0 + 1)) + 0);
      } else if (posXPink > 1480) {
        setPosYPink(prev => prev + Math.floor(Math.random() * (0 - -5 + 1)) + -5);
      } else {
        setPosYPink(prev => prev + Math.floor(Math.random() * (5 - -5 + 1)) + -5);
      }

      if (posXPink < -400) {
        setPosXOrange(prev => prev + Math.floor(Math.random() * (5 - 0 + 1)) + 0);
      } else if (posXPink > 2320) {
        setPosXOrange(prev => prev + Math.floor(Math.random() * (0 - -5 + 1)) + -5);
      } else {
        setPosXOrange(prev => prev + Math.floor(Math.random() * (5 - -5 + 1)) + -5);
      }

      if (posXPink < -400) {
        setPosYOrange(prev => prev + Math.floor(Math.random() * (5 - 0 + 1)) + 0);
      } else if (posXPink > 1480) {
        setPosYOrange(prev => prev + Math.floor(Math.random() * (0 - -5 + 1)) + -5);
      } else {
        setPosYOrange(prev => prev + Math.floor(Math.random() * (5 - -5 + 1)) + -5);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="gameoverview diagonal-grid">
      <div className="bg-blobs-game">
        <div className="blob orange-blob-game"></div>
        <div className="blob pink-blob-game"></div>
      </div>
      <div className="bg-lines-game"></div>
      <img src="public/pokergeld.png" alt="Testbild" width="100" height="100" className="pokergeld" />
      <h1 className="cointext">{coins !== null ? coins.toString() : ''}</h1>
      <details className="dropdown">
        <summary>{username}</summary>
        <ul>
          <li><button onClick={() => navigate("/logout")}><MdLogout /> Abmelden</button></li>
          <li><button onClick={() => navigate("/settings")}><MdSettings /> Einstellungen</button></li>
          <li><button onClick={() => navigate("/leaderboard")}><FaTrophy /> Rangliste</button></li>
          <li>
            <button
              onClick={() => navigate("/edit-profile")}
              disabled={username === "gast"}
            >
              <FaUser /> Profil
            </button>
            <button
              onClick={() => navigate("/gaminghistory")}
              disabled={username === "gast"}
            >
              <GiConsoleController /> Letzte Spiele
            </button>
          </li>

        </ul>
      </details>
      <div className="content">
        <Slideshow input={lastKey} onKeyUsed={handleKeyUsed} />
      </div>
    </div>
  );
}
