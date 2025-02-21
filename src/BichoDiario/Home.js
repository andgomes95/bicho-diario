import { useState } from "react";
import BorderedFrame from "../Pokedex/BorderedFrame";
import "./Home.css";

const Home = () => {
  const [formData, setFormData] = useState({
    animalHere: "",
  });
  const [db, setDb] = useState([
    { id: 1, nome: "Alice", idade: 25 },
    { id: 2, nome: "Bob", idade: 30 },
    { id: 3, nome: "Carlos", idade: 22 },
    { id: 4, nome: "Diana", idade: 28 },
    { id: 5, nome: "Eduardo", idade: 35 },
    { id: 6, nome: "Fernanda", idade: 27 },
    { id: 7, nome: "Gabriel", idade: 31 },
  ]);
  const [dados, setDados] = useState([]);

  const doDia = "Bob";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = db.find((item) => item.nome.toLowerCase() === formData.animalHere.toLowerCase());

    if (result) {
      result.color = result.nome.toLowerCase() === doDia.toLowerCase() ? 'green' : 'red';
      setDados((prevDados) => [...prevDados, result]);
    }
  };

  return (
    <BorderedFrame>
      <div className="App">
        <header className="App-header">
          <h1>Bicho Diario</h1>
          <form onSubmit={handleSubmit}>
            <input
              name="animalHere"
              id="animalHere"
              type="text"
              placeholder="Qual sera o Bicho de hoje?"
              value={formData.animalHere}
              onChange={handleChange}
            />
            <button type="submit">Enviar</button>
          </form>
        </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((linha) => (
              <tr key={linha.id} style={{ color: linha.color}}>
                <td>{linha.id}</td>
                <td>{linha.nome}</td>
                <td>{linha.idade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BorderedFrame>
  );
};

export default Home;