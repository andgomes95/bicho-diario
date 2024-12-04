import './App.css';
import { useState } from 'react';
function App() {
  const [formData, setFormData] = useState({
    animalHere: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();  // Evita o comportamento padrão de recarregar a página
    // Aqui você pode processar os dados ou fazer a chamada API
    console.log(formData);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bicho Diario</h1>
        <form onSubmit={handleSubmit}>
          <input 
            name="animalHere"
            id="animalHere"
            type="text" 
            placeholder='Qual sera o Bicho de hoje?'
            value={formData.animalHere}
            onChange={handleChange}
          />
          <button type="submit">Enviar</button>
        </form>
      </header>
    </div>
  );
}

export default App;
