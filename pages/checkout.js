import { useState } from 'react';
import { supabase } from '../supabase'; // Make sure this path is correct for your project structure

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const handleTestOrder = async () => {
    setLoading(true);
    
    try {
        // Correctly destructure user from the data object, handling potential errors
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        // Check if the user is authenticated before proceeding
        if (userError || !user) {
             throw new Error("User not authenticated. Please log in to place an order.");
        }

        const res = await fetch('/.netlify/functions/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                user_id: user.id, 
                items: [{name: "Test Product", qty: 1, price: 10}]
            })
        });

        if (!res.ok) {
            // Handle HTTP errors (e.g., 500 Internal Server Error, 400 Bad Request)
            const errorData = await res.json().catch(() => ({})); // Attempt to parse error JSON, fallback to empty object
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }
        
        const result = await res.json();
        alert(JSON.stringify(result));

    } catch (error) {
        console.error("Order processing failed:", error);
        alert(`Error placing order: ${error.message}`);
    } finally {
        // Ensure loading state is always reset, even if an error occurs
        setLoading(false);
    }
  };
  
  return (
    <button onClick={handleTestOrder} disabled={loading}>
      {loading ? 'Placing...' : 'Place Test Order'}
    </button>
  );
}