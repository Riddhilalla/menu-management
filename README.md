# Menu Management API (Full README)

Backend API for managing restaurant menus: Categories, Subcategories, Items, and Search.

This repository implements a Node.js + Express API with MongoDB (Mongoose). It supports CRUD operations for Categories, Subcategories and Items, plus a search endpoint for items.

## Quick setup

1. Install dependencies

```powershell
npm install
```

2. Start the server (development):

```powershell
npm run dev
```


3. Health check: GET `http://localhost:3000/health` should return `{ "status": "ok" }`.


## All routes (for Postman)

Base URL: `http://localhost:3000`

### Categories (mounted at `/api/categories`)

- POST `/api/categories`
  - Create a category
  - Body (JSON):
    ```json
    {
      "name": "Drinks",
      "image": "https://.../drinks.png",
      "description": "Beverages",
      "taxApplicable": true,
      "taxPercent": 5,
      "taxType": "exclusive"
    }
    ```
- GET `/api/categories` — list all categories
- GET `/api/categories/:idOrName` — get by MongoDB id or by name
- PUT `/api/categories/:id` — update category by id 

eg: id: 6734f0010000000000000003
{
  "name": "Desserts",
  "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
  "description": "Beverages",
  "taxApplicable": true,
  "taxPercent": 5,
  "taxType": "exclusive"
}

### Subcategories (registered under `/api`)

- POST `/api/categories/:categoryId/subcategories`
  - Create a subcategory under a category
  - Body (JSON):
    ```json
    {
      "name": "Cold Drinks",
      "image": "https://.../cold.png",
      "description": "Chilled beverages",
      "taxApplicable": true,
      "taxPercent": 5
    }
    ```
- GET `/api/subcategories` — list all subcategories
- GET `/api/subcategories/:id` — get subcategory by id
- PUT `/api/subcategories/:id` — update subcategory by id

### Items (registered under `/api`)

- POST `/api/items`
  - Create an item
  - Body (JSON):
    ```json
    {
      "categoryId": "<categoryId>",
      "subCategoryId": "<subCategoryId>",
      "name": "Cola",
      "image": "https://.../cola.png",
      "description": "Sparkling cola",
      "taxApplicable": true,
      "taxPercent": 5,
      "baseAmount": 1.5,
      "discount": 0
    }
    ```
  - Note: `totalAmount` is computed by the model (baseAmount - discount + tax if applicable)
- GET `/api/items` — list all items
- GET `/api/items/:id` — get item by id
- PUT `/api/items/:id` — update item by id (body same as POST)
- GET `/api/items/search?name=<query>` — search items by partial name (case-insensitive)
- GET `/api/categories/:id/items` — list items in a category
- GET `/api/subcategories/:id/items` — list items in a subcategory


## Postman testing tips

- Create an environment with `baseUrl = http://localhost:3000` and `MONGO_URI` if you want to run any scripts that require DB connection (not necessary for simple API calls once the server is running locally).
- Use the Create Category endpoint first to obtain a `categoryId` for creating subcategories and items.
- The API returns JSON errors with status codes 400 (validation), 404 (not found), 409 (duplicate category name), and 500 (server error).


