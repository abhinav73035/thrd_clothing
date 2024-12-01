'use client';

import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ProductPage from './components/ProductPage';

export interface User {
  UserID: string;
  Username: string;
  Password: string;
}

export interface Product {
  ProductID: string;
  ProductName: string;
  Category: string;
  Price: number;
  ImageURL: string;
}

export interface PurchaseHistory {
  UserID: string;
  ProductID: string;
  PurchaseDate: string;
}

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [loginError, setLoginError] = useState<string | null>(null); // State for login error

  useEffect(() => {
    // Load CSV data
    const loadData = async () => {
      try {
        const productsModule = await import('../data/products.csv');
        const purchaseHistoryModule = await import('../data/purchase_history.csv');
        const usersModule = await import('../data/users.csv');
        
        setProducts(productsModule.default);
        setPurchaseHistory(purchaseHistoryModule.default);
        setUsers(usersModule.default);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();

    // Check local storage for logged in user
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const userFound = users.find(item => item.Username === username && item.Password === password);

    if (userFound) {
      const userToStore = {
        UserID: userFound.UserID,
        Username: username,
        Password: password
      };
      setLoggedInUser(userToStore);
      localStorage.setItem('loggedInUser', JSON.stringify(userToStore)); // Store in localStorage
      setLoginError(null); // Clear any previous error
    } else {
      setLoginError('Username or password is incorrect.'); // Set error message
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setLoginError(null); // Clear error on logout
    localStorage.removeItem('loggedInUser'); // Clear from localStorage
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {!loggedInUser ? (
        <>
          <LoginForm onLogin={handleLogin} />
          {loginError && <p className="text-red-500">{loginError}</p>} {/* Show error message */}
        </>
      ) : (
        <ProductPage 
          user={loggedInUser} 
          products={products} 
          purchaseHistory={purchaseHistory} 
          onLogout={handleLogout} 
        />
      )}
    </main>
  );
}
