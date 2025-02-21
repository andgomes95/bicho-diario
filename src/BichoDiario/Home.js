import { useState } from "react";
import "./Home.css";

const Home = () => {
  const [formData, setFormData] = useState({
    animalHere: "",
  });
  const [db, setDb] = useState([
    { id: 1, nome: "Alice", idade: 25 },
    { id: 1, nome: "Bob", idade: 30 },
    { id: 2, nome: "Carlos", idade: 25 },
    { id: 2, nome: "Diana", idade: 28 },
    { id: 3, nome: "Eduardo", idade: 30 },
    { id: 3, nome: "Fernanda", idade: 27 },
    { id: 4, nome: "Gabriel", idade: 31 },
  ]);
  const [dados, setDados] = useState([]);
  const [message,setMessage] = useState("");

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
      if(result.nome.toLowerCase() === doDia.toLowerCase()){
        setMessage("YOU WIN");
      }
      const coloredResult = {
        ...result,
        idColor: result.id === db.find(item => item.nome.toLowerCase() === doDia.toLowerCase()).id ? 'green' : 'red',
        nomeColor: result.nome.toLowerCase() === doDia.toLowerCase() ? 'green' : 'red',
        idadeColor: result.idade === db.find(item => item.nome.toLowerCase() === doDia.toLowerCase()).idade ? 'green' : 'red',
      };
      setDados((prevDados) => [...prevDados, coloredResult]);
    } else{
      setMessage("Wrong Person");
    }
  };

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>Bicho Diario</h1>
          {message}
          <form onSubmit={handleSubmit}>
            <input
              name="animalHere"
              id="animalHere"
              type="text"
              disabled={message === "YOU WIN"}
              placeholder="Qual sera o Bicho de hoje?"
              value={formData.animalHere}
              onChange={handleChange}
            />
            <button type="submit" disabled={message === "YOU WIN"}>Enviar</button>
          </form>
        </header>
        <div className="table-container">
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
                <tr key={linha.id}>
                  <td style={{ color: linha.idColor }}>{linha.id}</td>
                  <td style={{ color: linha.nomeColor }}>{linha.nome}</td>
                  <td style={{ color: linha.idadeColor }}>{linha.idade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;