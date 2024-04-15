# TODOList feito em Express.js e React.js com banco de dados Firebase Realtime.

Case de estudos na Robbyson Data!

### Para rodar os contêineres:
Run: `./run.sh`

### Para buildar o docker backend:
Build: `docker build -t todolist-backend backend/`

Run: `docker run -p 3000:3000 todolist-backend`

### Para buildar o docker frontend:
Build: `docker build -t todolist-frontend frontend/`

Run: `docker run -p 3001:3000 todolist-frontend`

#### Para parar os contêineres:
`docker stop $(docker ps -q)`

Algumas obs:
FIREBASE -> dificuldade com o MongoDB por causa de versão, e Firebase é noSQL, fez mais sentido pra mim.
MATERIAL UI -> gosto desse design, tenho familiaridade com ele nos meus projetos Flutter.
Botão de pesquisar -> removi justamente porque fazia sentido com o Firebase Realtime e quis implementar o debounce.

