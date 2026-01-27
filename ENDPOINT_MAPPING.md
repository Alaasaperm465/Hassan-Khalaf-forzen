# Backend API to Angular Frontend Mapping

## Overview
This document maps all backend C# ASP.NET Core API endpoints to their corresponding Angular services and components.

---

## 1. Authentication Endpoints

### Backend: AuthController
- **Controller**: `AuthController`
- **Route**: `api/auth`

#### Endpoint: POST /api/auth/login
**Backend:**
```csharp
[HttpPost("login")]
[AllowAnonymous]
public async Task<IActionResult> Login([FromBody] LoginRequest request)
```

**Frontend Service**: [auth.service.ts](src/app/services/auth.service.ts#L18)
```typescript
login(username: string, password: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, request)
}
```

**Used by**: [LoginComponent](src/app/components/login/login.component.ts)
- Route: `/login`
- Redirects to: `/inbound` on success

---

## 2. Inbound Inventory Endpoints

### Backend: InboundController
- **Controller**: `InboundController`
- **Route**: `api/inbound`
- **Authorization**: `[Authorize(Roles = "StoreKeeper,Admin")]`

#### Endpoint: POST /api/inbound
**Backend:**
```csharp
[HttpPost]
public async Task<IActionResult> Create(CreateInboundRequest request)
```

**Frontend Service**: [inventory.service.ts](src/app/services/inventory.service.ts#L25)
```typescript
processInbound(dto: CreateInboundRequest): Observable<InboundResponse> {
  return this.http.post<InboundResponse>(`${this.apiUrl}/inbound`, dto)
}
```

**Used by**: [InboundComponent](src/app/components/inbound/inbound.component.ts)
- Route: `/inbound`
- Form fields: productName, quantity, warehouseLocation, expiryDate, notes
- Success redirect: `/dashboard`

---

## 3. Outbound Inventory Endpoints

### Backend: OutboundController
- **Controller**: `OutboundController`
- **Route**: `api/outbound`
- **Authorization**: `[Authorize(Roles = "StoreKeeper,Admin")]`

#### Endpoint: POST /api/outbound
**Backend:**
```csharp
[HttpPost]
public async Task<IActionResult> Create(CreateOutboundRequest request)
```

**Frontend Service**: [inventory.service.ts](src/app/services/inventory.service.ts#L29)
```typescript
processOutbound(dto: CreateOutboundRequest): Observable<OutboundResponse> {
  return this.http.post<OutboundResponse>(`${this.apiUrl}/outbound`, dto)
}
```

**Used by**: [OutboundComponent](src/app/components/outbound/outbound.component.ts)
- Route: `/outbound`
- Form fields: productName, quantity, destination, orderId, notes
- Success redirect: `/dashboard`

---

## 4. Product Management Endpoints

### Backend: ProductController
- **Controller**: `ProductController`
- **Route**: `api/product`

#### Endpoint: GET /api/product
**Backend:**
```csharp
[HttpGet]
public IActionResult GetAllProducts()
```

**Frontend Service**: [product.service.ts](src/app/services/product.service.ts#L17)
```typescript
getAllProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(this.apiUrl)
}
```

#### Endpoint: POST /api/product
**Backend:**
```csharp
[HttpPost]
public IActionResult CreateProduct([FromBody] Product product)
```

**Frontend Service**: [product.service.ts](src/app/services/product.service.ts#L22)
```typescript
createProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(this.apiUrl, product)
}
```

#### Endpoint: GET /api/product/{id}
**Backend:**
```csharp
[HttpGet("{id}")]
public IActionResult GetProductById(int id)
```

**Frontend Service**: [product.service.ts](src/app/services/product.service.ts#L27)
```typescript
getProductById(id: number): Observable<Product> {
  return this.http.get<Product>(`${this.apiUrl}/${id}`)
}
```

#### Endpoint: PUT /api/product/{id}
**Backend:**
```csharp
[HttpPut("{id}")]
public IActionResult UpdateProduct(int id, [FromBody] Product updatedProduct)
```

**Frontend Service**: [product.service.ts](src/app/services/product.service.ts#L32)
```typescript
updateProduct(id: number, product: Product): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, product)
}
```

#### Endpoint: DELETE /api/product/{id}
**Backend:**
```csharp
[HttpDelete("{id}")]
public IActionResult DeleteProduct(int id)
```

**Frontend Service**: [product.service.ts](src/app/services/product.service.ts#L37)
```typescript
deleteProduct(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`)
}
```

**Used by**: [ProductComponent](src/app/components/product/product.component.ts)
- Route: `/products`
- Operations: List, Create, Update, Delete products

---

## 5. Stock Management Endpoints

### Backend: StockController
- **Controller**: `StockController`
- **Route**: `api/stock`
- **Authorization**: `[Authorize]`

#### Endpoint: GET /api/stock
**Backend:**
```csharp
[HttpGet]
public async Task<IActionResult> Get([FromQuery] Guid clientId, [FromQuery] Guid productId, [FromQuery] Guid sectionId)
```

**Frontend Service**: [stock.service.ts](src/app/services/stock.service.ts#L17)
```typescript
getStock(clientId: string, productId: string, sectionId: string): Observable<StockResponse> {
  return this.http.get<StockResponse>(`${this.apiUrl}/stock`, {
    params: { clientId, productId, sectionId }
  })
}
```

**Also available in**: [inventory.service.ts](src/app/services/inventory.service.ts#L33)
```typescript
getStock(clientId: string, productId: string, sectionId: string): Observable<StockResponse> {
  // Same endpoint
}
```

---

## 6. API Configuration

### Base URL
- **Development**: `http://localhost:5000/api`
- Location: Services set `private apiUrl = 'http://localhost:5000/api'`
- **To update**: Modify the `apiUrl` in each service file

### Authentication
- Token storage: `localStorage` (key: `authToken`)
- Token retrieval: [auth.service.ts](src/app/services/auth.service.ts#L36)
- Auth interceptor: [auth.interceptor.ts](src/app/services/auth.interceptor.ts)

---

## 7. Routes Configuration

### Angular Routes
File: [app.routes.ts](src/app/app.routes.ts)

| Path | Component | Backend Endpoint |
|------|-----------|------------------|
| `/` | Redirect to `/login` | - |
| `/login` | LoginComponent | POST /api/auth/login |
| `/inbound` | InboundComponent | POST /api/inbound |
| `/outbound` | OutboundComponent | POST /api/outbound |
| `/products` | ProductComponent | /api/product/* |
| `**` | Redirect to `/login` | - |

---

## 8. Summary of Connections

✅ **Properly Connected:**
- ✓ Auth Service → AuthController
- ✓ Product Service → ProductController
- ✓ Inventory Service → InboundController & OutboundController
- ✓ Stock Service → StockController
- ✓ Auth Interceptor for token handling
- ✓ Components using correct services

---

## 9. Testing the Integration

### Prerequisites
1. Backend running on `http://localhost:5000`
2. Angular frontend running on `http://localhost:4200`
3. Database configured in backend

### Test Flow
1. Login with valid credentials → Token saved to localStorage
2. Navigate to Inbound → Create inbound transaction
3. Navigate to Outbound → Create outbound transaction
4. Navigate to Products → View, Create, Edit, Delete products
5. Check Stock → Query stock levels by client, product, section

---

## 10. Additional Notes

### API Port
If your backend is running on a different port, update the `apiUrl` in:
- `auth.service.ts`
- `product.service.ts`
- `inventory.service.ts`
- `stock.service.ts`

### CORS Configuration
Ensure your backend has CORS enabled for `http://localhost:4200` (or your frontend URL)

### Authorization
- Login endpoint: `[AllowAnonymous]`
- Inbound/Outbound: `[Authorize(Roles = "StoreKeeper,Admin")]`
- Stock: `[Authorize]`
- Products: No authorization (commented out)

