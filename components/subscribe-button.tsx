"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';

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
        window.location.href = data.subscriptionUrl;
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
    <Button onClick={handleSubscribe} disabled={isLoading}>
      {isLoading ? 'გთხოვთ მოითმინოთ...' : 'შეძენა'}
    </Button>
  );
};

export default SubscribeButton;