# DinDin - Back End

## **About the project**

 This project is an RESTful API, made with Node.js and PostgreSQL, that was made as the backend for a website called "Dindin".
 
## **Database**
 
 The schema in the SQL database, can be found inside the `src` folder, named as "dump.sql". URL of dump.sql: `./src/dump.sql`.
 
## **Endpoints**

### **Sign up**

#### `POST` `/usuario`

-   **Request**  
    
    No route parameters or query.  
    The body must have an object with the following properties:

    -   name
    -   email
    -   password
    -   repeatPassword

#### **Request example**

```javascript
// POST /usuario
{
    "name": "Victor",
    "email": "victor@email.com",
    "password": "123456",
    "repeatPassword": "123456"
}
```

#### **Response examples**

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

### **Login user**

#### `POST` `/login`

-   **Request**  
    No route parameters or query.  
    The body must have an object with the following properties:

    -   email
    -   password
    
#### **Request example**

```javascript
// POST /usuario
{
    "email": "victor@email.com",
    "password": "123456"
}
```

#### **Response examples**

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

## **ATENTION**: All the following endpoints, from now on, require the authentication token of the logged in user, receiving a header with the Bearer Token format. 

-    **Header example**

```javascript
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

---

### **Detail user**

#### `GET` `/user`

-   **Request**  
    No route parameters or query.  
    No content in the body request.
    
#### **Request example**

```javascript
// GET /user
// No content in the body request.
```

#### **Response examples**

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

### **Update user**

#### `PUT` `/user`

-   **Request**  
    No route parameters or query.  
    The body must have an object with the following properties:

    -   name
    -   email
    -   password
    -   repeatPassword
    
#### **Request example**

```javascript
// POST /usuario
{
    "name": "Victor",
    "email": "victor@email.com",
    "password": "123456",
    "repeatPassword": "123456"
}
```

#### **Response examples**

```javascript
// HTTP Status 204
// No content in the body response.
```

```javascript
// HTTP Status 400
{
    "message": "O e-mail informado já está sendo utilizado por outro usuário."
}
```
### **List categories**

#### `GET` `/categoria`

-   **Request**  
    No route parameters or query.  
    No content in the body request.
    
#### **Request example**

```javascript
// GET /categoria
// No content in the body request.
```

#### **Response examples**

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

**P.S. The schema has categories by default, see the `dump.sql` file for more information.**

### **List transactions of logged in user**

#### `GET` `/transacao`

-   **Request**  
    No route parameters or query.  
    No content in the body request.
    
#### **Request example**

```javascript
// GET /transacao
// No content in the body request.
```

#### **Response examples**

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

### **Detail a transaction of the logged in user**

#### `GET` `/transacao/:id`

-   **Request**  
    The transaction ID must be sent in the endpoint's route parameter.  
    No content in the body request.
    
#### **Request example**

```javascript
// GET /transacao/2
// No content in the body request.
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

### **Register a transaction of the logged in user**

#### `POST` `/transacao`

-   **Request**  
    No route parameters or query.   
    The body must have an object with the following properties:

      -   description
      -   amount
      -   date (the date accepts the following formates: `dd/mm/yyyy`, `dd-mm-yyyy` or `dd.mm.yyyy`)
      -   category_id
      -   transaction_type (The type can be "entrada" or "saída")

#### **Request example**

```javascript
// POST /transacao
{
    "transaction_type": "entrada",
    "description": "Salário",
    "amount": 300000,
    "date": "24/03/2022",
    "category_id": 6
}
```

#### **Response example**

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

### **Update a transaction of the logged in user**

#### `POST` `/transacao/:id`

-   **Request**  
    The transaction ID must be sent in the endpoint's route parameter.  
    The body must have an object with the following properties:

      -   description
      -   amount
      -   date (the date accepts the following formates: `dd/mm/yyyy`, `dd-mm-yyyy` or `dd.mm.yyyy`)
      -   category_id
      -   transaction_type (The type can be "entrada" or "saída")

#### **Request example**

```javascript
// POST /transacao/:id
{
    "transaction_type": "entrada",
    "description": "Salário",
    "amount": 300000,
    "date": "24/03/2022",
    "category_id": 6
}
```

#### **Response example**

```javascript
// HTTP Status 204
// No content in the body response.
```

```javascript
// HTTP Status 400
{
    "message": "É necessário informar o tipo da transação."
}
```

### **Delete a transaction of the logged in user**

#### `DELETE` `/transacao/:id`

-   **Request**  
    The transaction ID must be sent in the endpoint's route parameter. 
    No content in the body request.

#### **Request example**

```javascript
// DELETE /transacao/2
// No content in the body request.
```

#### **Response example**

```javascript
// HTTP Status 204
// No content in the body response.
```

```javascript
// HTTP Status 404
{
    "message": "Transação não encontrada."
}
```

### **Get user statement**

#### `GET` `/transacao/extrato`

-   **Request**  
    No route parameters or query.   
    No content in the body request.

#### **Request example**

```javascript
// GET /transacao/extrato
// No content in the body request.
```

#### **Response example**

```javascript
// HTTP Status 200
{
	"cashIn": 300000,
	"cashOut": 15800
}
```
