# THRD CLOTHING


## Approach

### User Authentication
- Verify user credentials using a predefined users.CSV file
- Ensure secure and quick user identification

### Analyze Purchase History
- Extract and review the user's past purchase data
- Identify product categories already purchased

### Product Categorization and Sorting
- Divide products into two groups: purchased and unpurchased
- Sort each group alphabetically
- Display unpurchased products first for better user experience

## Implementation Steps

### 1. User Authentication
- **Input**: Username and password
- **Process**: Check these credentials against a CSV file containing user data
- **Output**: Grant access to valid users only

### 2. Analyze Purchase History
- **Retrieve Data**: Get the user's purchase history
- **Process**: Identify all categories of products the user has bought before

### 3. Organize Products into Categories
**Divide Products**:
- **Purchased Categories**: Products the user has already bought
- **Unpurchased Categories**: Products the user has not bought yet

### 4. <span style="color:red;">Remove purchased categories from unpurchased categories</span>


### 5. Sort Products
**Separate Sorting**:
- **Unpurchased Categories Products**: Sort alphabetically (A-Z)
- **Purchased Categories Products**: Sort alphabetically (A-Z)

### 6. Display Products
**Final Order**:
- Show the products of unpurchased categories first
- Follow with products of purchased categories 

