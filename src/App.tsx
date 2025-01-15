import React, { useState, useEffect } from "react";
import "./App.css";

type Termek = {
  id: number;
  nev: string;
  ar: number;
  kategoria: string;
  kep: string;
};

const App = () => {
  const [termekek, setTermekek] = useState<Termek[]>([]);
  const [keresesiSzoveg, setKeresesiSzoveg] = useState("");
  const [talalat, setTalalat] = useState<Termek | null>(null);
  const [hiba, setHiba] = useState("");

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((adatok) => setTermekek(adatok))
      .catch((hiba) => console.error("Hiba a termékek betöltésekor:", hiba));
  }, []);

  const kezelKereses = () => {
    const eredmeny = termekek.find((termek) =>
      termek.nev.toLowerCase().includes(keresesiSzoveg.toLowerCase())
    );
    if (eredmeny) {
      setTalalat(eredmeny);
      setHiba("");
    } else {
      setTalalat(null);
      setHiba("No product found with the given name.");
    }
  };

  return (
    <div className="termekkartya">
      <h1>Termék Információ</h1>
      <div className="kereses-szekcio">
        <label htmlFor="kereses">Írja be a keresett termék nevét:</label>
        <input
          id="kereses"
          type="text"
          value={keresesiSzoveg}
          onChange={(e) => setKeresesiSzoveg(e.target.value)}
        />
        <button onClick={kezelKereses}>Keresés</button>
      </div>
      <div className="eredmenyek-szekcio">
        {talalat ? (
          <div className="termek-info">
            <img
              src={talalat.kep}
              alt={talalat.nev}
              className="termek-kep"
            />
            <div className="termek-adatok">
              <p>ID: {talalat.id}</p>
              <p>Név: {talalat.nev}</p>
              <p>Ár: {talalat.ar} Ft</p>
              <p>Kategória: {talalat.kategoria}</p>
            </div>
          </div>
        ) : (
          hiba && <p className="hiba">{hiba}</p>
        )}
      </div>
    </div>
  );
};

export default App;
