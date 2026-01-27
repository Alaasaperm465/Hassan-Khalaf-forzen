# Backend API Endpoints Integration Summary

## Endpoints Configuration

Your Angular application is now integrated with the following backend endpoints:

### Authentication
- **Endpoint**: `POST /api/auth/login`
- **Component**: [LoginComponent](src/app/components/login/login.component.ts)
- **Service**: [AuthService](src/app/services/auth.service.ts)
- **Response Format**: `{ access_token: string }`
- **Token Storage**: Stored in `localStorage` as `authToken`
- **Authorization**: None required (AllowAnonymous)

### Inbound Management
- **Endpoint**: `POST /api/inbound`
- **Component**: [InboundComponent](src/app/components/inbound/inbound.component.ts)
- **Service**: [InventoryService](src/app/services/inventory.service.ts)
- **Method**: `processInbound(dto)`
- **Response Format**: `{ id: string }`
- **Authorization**: Bearer Token (Roles: StoreKeeper, Admin)
- **Form Fields**: productName, quantity, warehouseLocation, expiryDate, notes

### Outbound Management
- **Endpoint**: `POST /api/outbound`
- **Component**: [OutboundComponent](src/app/components/outbound/outbound.component.ts)
- **Service**: [InventoryService](src/app/services/inventory.service.ts)
- **Method**: `processOutbound(dto)`
- **Response Format**: `{ id: string }`
- **Authorization**: Bearer Token (Roles: StoreKeeper, Admin)
- **Form Fields**: productName, quantity, destination, orderId, notes

### Stock Inquiry
- **Endpoint**: `GET /api/stock?clientId={id}&productId={id}&sectionId={id}`
- **Service**: [StockService](src/app/services/stock.service.ts) or [InventoryService](src/app/services/inventory.service.ts)
- **Method**: `getStock(clientId, productId, sectionId)`
- **Response Format**: `{ clientId, productId, sectionId, quantity }`
- **Authorization**: Bearer Token (Required)

### Product Management
- **Endpoints**:
  - `GET /api/product` - Get all products
  - `POST /api/product` - Create new product
  - `GET /api/product/{id}` - Get product by ID
  - `PUT /api/product/{id}` - Update product
  - `DELETE /api/product/{id}` - Delete product
- **Component**: [ProductComponent](src/app/components/product/product.component.ts)
- **Service**: [ProductService](src/app/services/product.service.ts)
- **Methods**: 
  - `getAllProducts()` - Returns Product[]
  - `createProduct(product)` - Returns Product
  - `getProductById(id)` - Returns Product
  - `updateProduct(id, product)` - Returns void
  - `deleteProduct(id)` - Returns void
- **Authorization**: Bearer Token (Required)
- **Route**: `/products`

## Key Features Implemented

✅ **HTTP Interceptor** - Automatically attaches Bearer token to all API requests
✅ **Auth Service** - Handles login and token management
✅ **Error Handling** - Proper error responses from backend
✅ **Route Protection** - Authorization interceptor excludes login endpoint
✅ **Type Safety** - TypeScript interfaces for all DTOs
✅ **Navigation** - Auto-redirect after successful login

## Configuration

- **Base API URL**: `http://localhost:5000/api`
- **Port**: 5000 (adjust in service files if needed)

## Notes

1. Make sure your backend server is running on `http://localhost:5000`
2. Update the `apiUrl` in the service files if your backend is running on a different port
3. The auth token is stored in localStorage under key `authToken`
4. All protected endpoints (except login) will automatically include the Bearer token in the Authorization header
