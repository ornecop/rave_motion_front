# Documentación rutas del maldito back

## Rutas del modelo Event

### Create Event
````
POST
http://localhost:3001/events/eventcreate

expected: JSON por body
{
	"name":"Megajodita2",
	"image":"https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
	"description":"en la pera",
	"date":"2024-09-20",
	"hour":"02:00:00",
	"venue":"Calle Falsa 456",
	"producer":"The Bow",
	"userId":"33bf78c3-51b7-41fc-a5b3-a85b7161ccc4"
}
recived:
{
	"id": "5f366c0a-36c0-4f3f-ae4a-c21e7114fd53",
	"status": true,
	"image": "https://res.cloudinary.com/dv8oxhsmk/image/upload/v1683816264/vpokk5tyxuxt6osewvho.jpg",
	"description": "en la pera",
	"date": "2024-09-20T03:00:00.000Z",
	"hour": "02:00:00",
	"venue": "Calle Falsa 456",
	"producer": "The Bow",
	"userId": "48ee4976-c98e-4fca-b4d9-7431ee7c923e",
	"name": "Megajodita2",
	"updatedAt": "2023-05-11T14:44:21.171Z",
	"createdAt": "2023-05-11T14:44:21.171Z",
	"UserId": null
}
````

### Get Event By Id
````
GET
http://localhost:3001/events/:id

expected: 
id del evento por params

recived:
{
	"id": "5f366c0a-36c0-4f3f-ae4a-c21e7114fd53",
	"userId": "48ee4976-c98e-4fca-b4d9-7431ee7c923e",
	"name": "Megajodita2",
	"image": "https://res.cloudinary.com/dv8oxhsmk/image/upload/v1683816264/vpokk5tyxuxt6osewvho.jpg",
	"description": "en la pera",
	"date": "2024-09-20",
	"hour": "02:00:00",
	"venue": "Calle Falsa 456",
	"producer": "The Bow",
	"status": true,
	"createdAt": "2023-05-11T14:44:21.171Z",
	"updatedAt": "2023-05-11T14:44:21.171Z",
	"UserId": null
}
````

### Get Event By Name
````
GET
http://localhost:3001/events/name?name=...

expected:
parte o nombre completo del evento, sin importar minusculas o mayusculas por Query

recived:
[
	{
		"id": "5f366c0a-36c0-4f3f-ae4a-c21e7114fd53",
		"userId": "48ee4976-c98e-4fca-b4d9-7431ee7c923e",
		"name": "Megajodita2",
		"image": "https://res.cloudinary.com/dv8oxhsmk/image/upload/v1683816264/vpokk5tyxuxt6osewvho.jpg",
		"description": "en la pera",
		"date": "2024-09-20",
		"hour": "02:00:00",
		"venue": "Calle Falsa 456",
		"producer": "The Bow",
		"status": true,
		"createdAt": "2023-05-11T14:44:21.171Z",
		"updatedAt": "2023-05-11T14:44:21.171Z",
		"UserId": null
	}
]
puede ser mas de un objeto adentro del array

````

### Get All Events
````
GET
http://localhost:3001/events

expected: nada

recived:
[
	{
		"id": "5f366c0a-36c0-4f3f-ae4a-c21e7114fd53",
		"userId": "48ee4976-c98e-4fca-b4d9-7431ee7c923e",
		"name": "Megajodita2",
		"image": "https://res.cloudinary.com/dv8oxhsmk/image/upload/v1683816264/vpokk5tyxuxt6osewvho.jpg",
		"description": "en la pera",
		"date": "2024-09-20",
		"hour": "02:00:00",
		"venue": "Calle Falsa 456",
		"producer": "The Bow",
		"status": true,
		"createdAt": "2023-05-11T14:44:21.171Z",
		"updatedAt": "2023-05-11T14:44:21.171Z",
		"UserId": null
	}
]

````

### Put Event
````
PUT
http://localhost:3001/events/:id

expected:
*id del evento por params
*JSON por body con los datos nuevos
{
	"name":"MegaJoda2",
	"imagen":"https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
	"description":"en la pera",
	"date":"2023-09-20",
	"hour":"02:00:00",
	"venue":"Calle Falsa 4567",
	"producer":"The Bow"
}

recived:
{
	"message": "Evento actualizado correctamente."
}
````

## Rutas del modelo Ticket

### Create Tickets
````
POST
http://localhost:3001/tickets/createtickets

expected:
JSON por body
{
	 "tickets":[
		 {
		 "eventId":"166c02cc-835c-485c-b7ef-168921c9237b",
      "name":"Tanda 1",
      "description":"aaaa",
      "maxQuantity":100,
      "price": 200,
      "accessType":"vip"
	 		},
		 {
		 "eventId":"166c02cc-835c-485c-b7ef-168921c9237b",
      "name":"Tanda 2",
      "description":"aaaa",
      "maxQuantity":100,
      "price": 200,
      "accessType":"vip"
	 		}
	 ]
}
es un array de objetos, donde cada objeto es la tanda del evento

recived:
[
	{
		"id": "7d83257a-8910-4f9d-9cdf-d2cbf364960b",
		"sells": 0,
		"status": true,
		"eventId": "166c02cc-835c-485c-b7ef-168921c9237b",
		"name": "Tanda 1",
		"description": "aaaa",
		"maxQuantity": 100,
		"price": 200,
		"accessType": "vip"
	},
	{
		"id": "2aa7811b-9df0-4b70-b747-43ee856da249",
		"sells": 0,
		"status": true,
		"eventId": "166c02cc-835c-485c-b7ef-168921c9237b",
		"name": "Tanda 2",
		"description": "aaaa",
		"maxQuantity": 100,
		"price": 200,
		"accessType": "vip"
	}
]


````

### Get Tickets
````
GET
http://localhost:3001/tickets/

expected: nada

recived:
[
	{
		"id": "b2188c91-be0b-4c1c-b34f-f8b3adfc66b1",
		"eventId": "87949d78-4077-40e1-a8d5-b5e0f4fab7f1",
		"name": "Tanda 1",
		"description": "aaaa",
		"accessType": "vip",
		"price": 200,
		"maxQuantity": 100,
		"sells": 10,
		"status": true
	}
]
puede ser mas de un objeto adentro del array
````

### Get Tickets By Id del Event
````
GET
http://localhost:3001/tickets/ticketsByEvent/:eventId

expected:
id del evento por params

recived:
[
	{
		"id": "dfa7a221-ea0c-4fc0-902c-1215c49cc5cc",
		"eventId": "dfcbe5f0-1132-40d5-85ec-43e18441e69a",
		"name": "Tanda 1",
		"description": "aaaa",
		"accessType": "vip",
		"price": 200,
		"maxQuantity": 100,
		"sells": 10,
		"status": true
	}
]
array con todas las tandas de tickets del evento
````

## Rutas del modelo User

### Create User
````
POST
http://localhost:3001/users/singUp

expected:
JSON con la info por body
{
	"firstName":"Denis",
	"lastName":"Torres",
	"mail":"mai2l@gmail.com",
	"password":"asdf1234",
	"documentType":"DNI",
	"document":"12548548",
  "birthDay":"2000-04-03",
	"adress":{
		"street":"Calle Falsa",
		"number":123,
		"city":"Springfield"
	}
}

recived:
{
	"id": "56c1f787-5bcc-44dc-b67b-479d44701bec",
	"accessType": "user",
	"status": true,
	"firstName": "Denis",
	"lastName": "Torres",
	"mail": "mai2l@gmail.com",
	"password": "asdf1234",
	"documentType": "DNI",
	"document": "12548548",
	"birthDay": "2000-04-03T00:00:00.000Z",
	"adress": {
		"street": "Calle Falsa",
		"number": 123,
		"city": "Springfield"
	},
	"updatedAt": "2023-05-11T15:15:21.628Z",
	"createdAt": "2023-05-11T15:15:21.628Z"
}

````

### Get user
````
GET
http://localhost:3001/users/Loging

expected:
JSON por body
{
	"mail":"mai2l@gmail.com",
    "password":"asdf1234"
}

recived:{
    {
	"message": "Bienvenido Denis"
    }
}
````

### Put User
````
PUT
http://localhost:3001/users/edit

expected:
JSON por body
{
	"firstName":"Denis",
	"lastName":"Torres",
	"mail":"mai2l@gmail.com",
	"password":"asdf1234",
	"documentType":"DNI",
	"document":"12548548",
  "birthDay":"2000-04-03",
	"adress":{
		"street":"Calle Falsaaaaaaa",
		"number":123,
		"city":"Springfield"
	}
}
busca usuario por su mail

recived:
{
	"id": "56c1f787-5bcc-44dc-b67b-479d44701bec",
	"firstName": "Denis",
	"lastName": "Torres",
	"mail": "mai2l@gmail.com",
	"password": "asdf1234",
	"documentType": "DNI",
	"document": "12548548",
	"birthDay": "2000-04-03T00:00:00.000Z",
	"adress": {
		"street": "Calle Falsaaaaaaa",
		"number": 123,
		"city": "Springfield"
	},
	"accessType": "user",
	"status": true,
	"createdAt": "2023-05-11T15:15:21.628Z",
	"updatedAt": "2023-05-11T15:23:29.777Z"
}
````

## Rutas del modelo TicketSold

### Crear Tickets vendidos para usuario
````
POST
http://localhost:3001/userTickets/newUserTickets

expected:
JSON por body

{
	"tickets":[
		{
			"ticketId":"dfa7a221-ea0c-4fc0-902c-1215c49cc5cc",
			"userId":"56c1f787-5bcc-44dc-b67b-479d44701bec",
			"mail":"mai2l@gmail.com",
			"qrImage":"cloudinaryLink"
		}
	]
}
tickets es un array de objetos, donde cada objeto es un ticket unico que compra el usuario

recived:
[
	{
		"validate": false,
		"ticketId": "dfa7a221-ea0c-4fc0-902c-1215c49cc5cc",
		"userId": "56c1f787-5bcc-44dc-b67b-479d44701bec",
		"mail": "mai2l@gmail.com",
		"qrImage": "https://res.cloudinary.com/dv8oxhsmk/raw/upload/v1683818911/code%2Ba1d37.png",
		"id": "a1d37fdc-e244-4774-8d85-5b8c9ab9d76e",
		"createdAt": "2023-05-11T15:28:29.023Z",
		"updatedAt": "2023-05-11T15:28:29.023Z",
		"TicketId": null,
		"UserId": null
	}
]

````

### Get TicketInfo by Id
````
GET
http://localhost:3001/userTickets/ticketsInfo/:id

expected:
id del ticketSold por params

recived:
{
	"id": "2d65e022-d28e-4e51-a5f5-31c9a6379146",
	"ticketId": "bc2e8637-46e9-4868-9b38-bf99967f0d76",
	"userId": "79b155bd-a885-4276-b18c-5306444f81be",
	"eventId": "145ea81b-c70d-48b1-a61f-0c63eb3e6c7c",
	"qrImage": "https://res.cloudinary.com/dv8oxhsmk/raw/upload/v1683823430/code%2B2d65e.png",
	"mail": "mai2l@gmail.com",
	"validate": false,
	"createdAt": "2023-05-11T16:43:47.941Z",
	"updatedAt": "2023-05-11T16:43:47.941Z",
	"TicketId": null,
	"UserId": null,
	"EventId": null,
	"Ticket": {
		"name": "Tanda 2",
		"accessType": "vip"
	},
	"Event": {
		"name": "MegaJoda"
	}
}
````

### Get ticketsSold By User
````
GET
http://localhost:3001/userTickets/ticketsByUser/:userId

expected:
id del usuario por params

recived:
[
	{
		"id": "2d65e022-d28e-4e51-a5f5-31c9a6379146",
		"ticketId": "bc2e8637-46e9-4868-9b38-bf99967f0d76",
		"userId": "79b155bd-a885-4276-b18c-5306444f81be",
		"eventId": "145ea81b-c70d-48b1-a61f-0c63eb3e6c7c",
		"qrImage": "https://res.cloudinary.com/dv8oxhsmk/raw/upload/v1683823430/code%2B2d65e.png",
		"mail": "mai2l@gmail.com",
		"validate": false,
		"createdAt": "2023-05-11T16:43:47.941Z",
		"updatedAt": "2023-05-11T16:43:47.941Z",
		"TicketId": null,
		"UserId": null,
		"EventId": null,
		"Ticket": {
			"accessType": "vip",
			"name": "Tanda 2"
		},
		"Event": {
			"name": "MegaJoda"
		}
	}
]
array con todos los tickets comprados(un objeto por cada uno) por usuario

````

### Get tickets sold By tanda
````
GET
http://localhost:3001/userTickets/ticketsTanda/:ticketId

expected:
id de la tanda por params

recived:
[
	{
		"id": "2d65e022-d28e-4e51-a5f5-31c9a6379146",
		"ticketId": "bc2e8637-46e9-4868-9b38-bf99967f0d76",
		"userId": "79b155bd-a885-4276-b18c-5306444f81be",
		"eventId": "145ea81b-c70d-48b1-a61f-0c63eb3e6c7c",
		"qrImage": "https://res.cloudinary.com/dv8oxhsmk/raw/upload/v1683823430/code%2B2d65e.png",
		"mail": "mai2l@gmail.com",
		"validate": false,
		"createdAt": "2023-05-11T16:43:47.941Z",
		"updatedAt": "2023-05-11T16:43:47.941Z",
		"TicketId": null,
		"UserId": null,
		"EventId": null,
		"Ticket": {
			"sells": 0,
			"name": "Tanda 2"
		}
	}
]
cada objeto adentro del array es un ticket vendido de la tanda
````

### Get tickets sold By Event
````
GET
http://localhost:3001/userTickets/eventUserTickets/:eventId

expected:
id del evento por params

recived:
[
	{
		"id": "2d65e022-d28e-4e51-a5f5-31c9a6379146",
		"ticketId": "bc2e8637-46e9-4868-9b38-bf99967f0d76",
		"userId": "79b155bd-a885-4276-b18c-5306444f81be",
		"eventId": "145ea81b-c70d-48b1-a61f-0c63eb3e6c7c",
		"qrImage": "https://res.cloudinary.com/dv8oxhsmk/raw/upload/v1683823430/code%2B2d65e.png",
		"mail": "mai2l@gmail.com",
		"validate": false,
		"createdAt": "2023-05-11T16:43:47.941Z",
		"updatedAt": "2023-05-11T16:43:47.941Z",
		"TicketId": null,
		"UserId": null,
		"EventId": null,
		"Ticket": {
			"name": "Tanda 2"
		}
	}
]
````