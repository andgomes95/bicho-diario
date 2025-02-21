import { useState, useEffect } from "react";
import "./Home.css";
import animals from "./animals.json";

const Home = () => {
  const [formData, setFormData] = useState({
    animalHere: "",
  });
  const [db] = useState(animals);
  const [dados, setDados] = useState([]);
  const [message, setMessage] = useState("");
  const [doDia, setDoDia] = useState({});
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    reset();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value.length > 0) {
      const filtered = db.filter((item) =>
        item.nome.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (nome) => {
    setFormData({ animalHere: nome });
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = db.find((item) => item.nome.toLowerCase() === formData.animalHere.toLowerCase());
    if (result) {
      if (result.nome.toLowerCase() === doDia.nome.toLowerCase()) {
        setMessage("YOU WIN");
      }
      const coloredResult = {
        ...result,
        classColor: result.class === doDia.class ? "green" : "red",
        nomeColor: result.nome.toLowerCase() === doDia.nome.toLowerCase() ? "green" : "red",
        subClassColor: result.subClass === doDia.subClass ? "green" : "red",
      };
      setDados((prevDados) => [coloredResult, ...prevDados]);
      setFormData({ animalHere: "" });
      setShowSuggestions(false);
    } else {
      setMessage("This animal does not exist in my database :(");
    }
  };

  const reset = () => {
    setDoDia(animals[Math.floor(Math.random() * animals.length)]);
    setMessage("");
    setDados([]);
    setFormData({ animalHere: "" });
  };

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>Bicho Diário</h1>
          {message}
          <form onSubmit={handleSubmit} style={{ position: "relative" }}>
            <input
              name="animalHere"
              id="animalHere"
              type="text"
              placeholder="Qual será o Bicho de hoje?"
              value={formData.animalHere}
              onChange={handleChange}
              disabled={message === "YOU WIN"}
            />
            {showSuggestions && (
              <ul className="suggestions">
                {filteredSuggestions.map((item) => (
                  <li key={item.id} onClick={() => handleSelectSuggestion(item.nome)}>
                    {item.nome}
                  </li>
                ))}
              </ul>
            )}
            <br />
            <button type="submit" disabled={message === "YOU WIN"}>
              Enviar
            </button>
            {message === "YOU WIN" && <button onClick={reset}>Enviar</button>}
          </form>
        </header>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Classe</th>
                <th>SubClasse</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((linha) => (
                <tr key={linha.id}>
                  <td style={{ color: linha.nomeColor }}>{linha.nome}</td>
                  <td style={{ color: linha.classColor }}>{linha.class}</td>
                  <td style={{ color: linha.subClassColor }}>{linha.subClass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Home;
