"use client"
import React, { useState } from 'react';

const SubscribeButton = ({ productId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        const data = await res.json();
        window.location.href = data.subscriptionUrl;  // Redirect to the subscription URL
      } else {
        console.error('Failed to create subscription:', await res.text());
        setIsLoading(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleSubscribe} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Subscribe'}
    </button>
  );
};

export default SubscribeButton;