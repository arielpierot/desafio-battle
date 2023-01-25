## Descrição

Para resolver esse desafio foi desenvolvido uma API Rest para o jogo de batalhas. Esse projeto foi criado com o [Nest framework](https://github.com/nestjs/nest) com Typescript. 

## Pré-requisitos

Esse projeto necessita de [Node.JS](https://nodejs.org/en/download/) (versão >= 12, exceto para v13) e [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instalados em sua máquina.


## Instalando
É necessário utilizar esse comando para instalar o projeto:
```bash
$ yarn install
```

## Rodando o projeto
A aplicação está rodando na porta 3000 por padrão. Para iniciar a aplicação localmente, você pode usar o comando:
```bash
$ yarn start
```

## Rodando os testes
Você pode rodar os testes com o comando:
```bash
$ yarn test
```

## Resources

### Criar um personagem
- **POST** /characters
```bash
curl --location --request POST 'http://localhost:3000/characters' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"Ariel",
    "profession":"thief"
}'
```

### Buscar um personagem pelo nome
- **GET** /characters/<***name***>
```bash
curl --location --request GET 'http://localhost:3000/characters/Ariel'
```

### Listar personagens
- **GET** /characters
```bash
curl --location --request GET 'http://localhost:3000/characters'
```

### Iniciar uma batalha entre personagens
- **POST** /battles
```bash
curl --location --request POST 'http://localhost:3000/battles' \
--header 'Content-Type: application/json' \
--data-raw '{
    "character_name_first": "CharacterOne",
    "character_name_second": "CharacterTwo"
}'
```

Decisões tomadas
================

- Foi necessário a utilização de orientação a objetos para reaproveitar métodos utilizados nas classes dos personagens como os métodos que calculam a velocidade calculada e ataque calculado, pois estas podem reaproveitar os atributos das classes. E também atributos compartilhados entre as classes que são privados (ex: life, name, type, dead)
- Foi utilizado o factory method para criar a classe da profissão baseada em uma classe abstrata de personagem que é extendida por essas que contém seus respectivos atributos.
- No método de challenge usei recursão e passei por referência o array de string com o response esperado ao fim da batalha.
- Criei uma variável dentro do arquivo de serviço de personagens para utilizar a memória da aplicação.
- Optei pelo uso de uma variável map<string, character> no serviço pela perfomance nas consultas do personagem.
- Optei por criar alguns personagens já no momento da iniciação da aplicação, para poder testar a funcionalidade de lista sem precisar criar novos personagens.
- Optei por criar um método para zerar a variável que guarda os personagens no serviço e que é utilizada a cada teste do serviço.
- Optei por criar um campo booleano para representar se o personagem está morto ou não por entender que não existe outro tipo de variável que o melhor represente.
- No método que verifica o personagem com maior velocidade calculada, preferi retornar a velocidade calculada de ambos para validar no teste que a função está correta.
- Decidi criar um novo recurso POST (/battles) em outro controller/service pensando que em algum momento seria necessário listar as batalhas que aconteceram. E também para respeitar o REST.