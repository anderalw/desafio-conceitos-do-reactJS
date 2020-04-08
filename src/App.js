import React, { useState, useEffect} from 'react';

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, SetRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      SetRepositories(response.data);
    });
  }, []);
  
  
  async function handleAddRepository({title='Desafio ReactJS',url='https://github.com/Rocketseat/umbriel',techs=['NodeJS','ReactJS','React Native']}) {
    const response = await api.post('repositories', {
      title,
      url,
      techs
    });
    SetRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repoIndex = repositories.findIndex(repo => repo.id === id);
    repositories.splice(repoIndex, 1);
    const alteredRepositories = [...repositories];
    SetRepositories(alteredRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={() => handleAddRepository({})}>Adicionar</button>
    </div>
  );
}

export default App;
