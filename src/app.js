const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id : uuid(),
    title,
    url,
    techs,
    likes : 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0)
    return response.status(400).json({ message: "Repository doesn't exists!"});
  
  const { title, url, techs } = request.body;
  
  const oldProject = repositories[repositoryIndex];

  const repositoryDataUpdated = {
    ...oldProject,
    title,
    url,
    techs
  };

  repositories[repositoryIndex] = repositoryDataUpdated;

  return response.json(repositoryDataUpdated);

});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id );

  if(repositoryIndex < 0)
    return response.status(400).json({ message: `Repositorie ${id} doesn't exists!`});

  repositories.splice(repositoryIndex, 1);

  console.log(repositoryIndex);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id );

  if(repositoryIndex < 0)
    return response.status(400).json({ message: `Repositorie ${id} doesn't exists!`});

  repositories[repositoryIndex].likes++;

  return response.json(repositories[repositoryIndex]);

});

module.exports = app;
