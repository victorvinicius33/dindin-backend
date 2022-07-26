# DinDin - Back End

### Selecione um idioma: Português (Brasil), <a href="./README.md">Inglês<a/>.

## Autor

| [<img src="https://avatars.githubusercontent.com/u/94022088?s=400&u=829c8531a69be7d30b1096c762a5ff4f9a7172fe&v=4" width=115><br><sub>Victor Vinícius da Silva Galvão</sub>](https://github.com/victorvinicius33) 
| :---: |

[![Linkedin Badge](https://img.shields.io/badge/-Victor-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/victor-v-s-galvao/)](https://www.linkedin.com/in/victor-v-s-galvao/) 
[![Gmail Badge](https://img.shields.io/badge/-victorvinicius33.vv@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:victorvinicius33.vv@gmail.com)](mailto:victorvinicius33.vv@gmail.com)

## **Sobre o projeto**

 Esse projeto é uma API RESTful, feito com Node.js e PostgreSQL, e é o backend de um Website chamado "Dindin". A API foi feita para armazenar, e organizar as finanças do usuário.
 
## **Database**
 
 O schema do database SQL, pode ser encontrado dentro da pasta `src`, com o nome de "dump.sql". URL do dump.sql: `./src/dump.sql`.
 
## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

-   **Request**  
    
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades:

    -   name
    -   email
    -   password
    -   repeatPassword

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "name": "Victor",
    "email": "victor@email.com",
    "password": "123456",
    "repeatPassword": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 201
{
    "id": 1,
    "name": "Victor",
    "email": "victor@email.com"
}
```

```javascript
// HTTP Status 400
{
    "message": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

### **Login do usuário**

#### `POST` `/login`

-   **Request**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades:

    -   email
    -   password
    
#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "email": "victor@email.com",
    "password": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "user": {
        "id": 1,
        "name": "Victor",
        "email": "victor@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400
{
    "message": "O e-mail ou senha estão incorretos."
}
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado. 

-    **exemplo de Header**

```javascript
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

---

### **Detalhar usuário**

#### `GET` `/user`

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.
    
#### **Request example**

```javascript
// GET /user
// No content in the body request.
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "id": 1,
    "name": "Victor",
    "email": "victor@email.com"
}
```

```javascript
// HTTP Status 401
{
    "message": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

### **Atualizar usuário**

#### `PUT` `/user`

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades:

    -   name
    -   email
    -   password (optional)
    -   repeatPassword
    
#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "name": "Victor",
    "email": "victor@email.com",
    "password": "123456",
    "repeatPassword": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta.
```

```javascript
// HTTP Status 400
{
    "message": "O e-mail informado já está sendo utilizado por outro usuário."
}
```
### **Listar categorias**

#### `GET` `/categoria`

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.
    
#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição.
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
[
    {
        id: 1,
        description: "Roupas",
    },
    {
        id: 2,
        description: "Mercado",
    },
]
```

```javascript
// HTTP Status 200
[]
```

**Obs: O schema tem categorias por padrão, veja o arquivo `dump.sql` para mais informações.**

### **Listar transações do usuário logado**

#### `GET` `/transacao`

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.
    
#### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição.
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
[
	  {
		    id: 1,
		    description: "salário do funcionário",
		    amount: 200000,
		    date: "2022-05-13T03:00:00.000Z",
		    category_id: 12,
		    transaction_type: "entrada",
		    user_id: 1
	  },
	  {
		    id: 3,
		    description: "salário do funcionário",
		    amount: 200000,
		    date: "2022-05-13T03:00:00.000Z",
		    category_id: 12,
		    transaction_type: "saída",
		    user_id: 1
	  },
]
```



```javascript
// HTTP Status 404
{
    "message": "Nenhuma transação encontrada."
}
```

### **Detalhar uma transação do usuário logado**

#### `GET` `/transacao/:id`

-   **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.
    
#### **Exemplo de requisição**

```javascript
// GET /transacao/2
// Sem conteúdo no corpo (body) da requisição.
```

#### **Response examples**

```javascript
// HTTP Status 200
{
        id: 3,
        description: "Salário",
        amount: 300000,
        date: "2022-05-13T03:00:00.000Z",
        category_id: 6,
        transaction_type: "entrada",     
        user_id: 5       
}
```

```javascript
// HTTP Status 404
{
    "message": "Transação não encontrada."
}
```

### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades:

      -   description
      -   amount
      -   date
      -   category_id
      -   transaction_type (O tipo pode ser "entrada" ou "saída")

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "transaction_type": "entrada",
    "description": "Salário",
    "amount": 300000,
    "date": "2022-03-24T15:30:00.000Z",
    "category_id": 6
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 201
{
    "id": 3,
    "transaction_type": "entrada",
    "descricao": "Salário",
    "amount": 300000,
    "date": "2022-05-13T03:00:00.000Z",
    "user_id": 5,
    "category_id": 6
}
```

```javascript
// HTTP Status 400
{
    "message": "É necessário informar o valor da transação."
}
```

### **Atualizar transação do usuário logado**

#### `POST` `/transacao/:id`

-   **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades:

      -   description
      -   amount
      -   date
      -   category_id
      -   transaction_type (O tipo pode ser "entrada" ou "saída")

#### **Exemplo de requisição**

```javascript
// POST /transacao/:id
{
    "transaction_type": "entrada",
    "description": "Salário",
    "amount": 300000,
    "date": "2022-05-13T03:00:00.000Z",
    "category_id": 6
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta.
```

```javascript
// HTTP Status 400
{
    "message": "É necessário informar o tipo da transação."
}
```

### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

-   **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/2
// Sem conteúdo no corpo (body) da requisição.
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta.
```

```javascript
// HTTP Status 404
{
    "message": "Transação não encontrada."
}
```

### **Obter extrato do usuário**

#### `GET` `/transacao/extrato`

-   **Request**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

#### **Request example**

```javascript
// GET /transacao/extrato
// Sem conteúdo no corpo (body) da requisição.
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
	"cashIn": 300000,
	"cashOut": 15800
}
```
