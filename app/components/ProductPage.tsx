import { useMemo } from 'react';
import Image from 'next/image';

import User from '../../data/users.csv';
import Product from '../../data/products.csv';
import PurchaseHistory from '../../data/purchase_history.csv';

interface ProductPageProps {
  user: User;
  products: Product[];
  purchaseHistory: PurchaseHistory[];
  onLogout: () => void;
}

export default function ProductPage({ 
  user, 
  products, 
  purchaseHistory, 
  onLogout 
}: ProductPageProps) {

  const sortedProducts = useMemo(() => {

    const userPurchases = purchaseHistory.filter(
      (purchase) => purchase.UserID == user.UserID
    );
    const purchasedProductIds = userPurchases.map(
      (purchase) => purchase.ProductID
    );
    const purchasedProducts = products.filter((product) =>
      purchasedProductIds.includes(product.ProductID)
    );

    const unpurchasedProducts = products.filter(
      (product) => !purchasedProductIds.includes(product.ProductID)
    );
    const purchasedCategories = [...new Set(purchasedProducts.map((product) => product.Category))];
   
    const unpurchasedCategories = [...new Set(unpurchasedProducts.map((product) => product.Category))];

    
    const removePurchasedCategories = unpurchasedCategories.filter(
        (category) => !purchasedCategories.includes(category)
      );
      
    const sortedUnpurchasedProducts = products
      .filter((product) => removePurchasedCategories.includes(product.Category))
      .sort((a, b) => a.ProductName.localeCompare(b.ProductName));


    const sortedPurchasedProducts = products
      .filter((product) => purchasedCategories.includes(product.Category))
      .sort((a, b) => a.ProductName.localeCompare(b.ProductName));

      
    return [...sortedUnpurchasedProducts, ...sortedPurchasedProducts];


  }, [user.UserID, products, purchaseHistory]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.Username}!</h1>
        <button 
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <div 
            key={product.ProductID} 
            className="border rounded-lg p-4 shadow-md"
          >
            <Image 
              src={product.ImageURL} 
              alt={product.ProductName} 
              width={150} 
              height={150} 
              className="mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold">{product.ProductName}</h2>
            <p className="text-gray-600">Category: {product.Category}</p>
            <p className="text-blue-600 font-bold">₹{product.Price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
