'use client'
import React, { useEffect, useState } from 'react';

interface Subscription {
  Id: string
  ProductId: string
  LastBillingDate: string
  NextBillingDate: string
  Price: string,
  Currency: string,
  OccurrenceType: string,
  OccurrenceNumber: string,
  OccurrenceDuration: string,
  Name: string,
  Email: string,
  Phone: string,
  ImageUrl: string,
  SendEmails: string,
  Status: string,
  ProductStatus: string
}

const SubscriptionsList = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch('/api/subscriptions');

        if (res.ok) {
          const data = await res.json();
          setSubscriptions(data);
        } else {
          setError('Failed to fetch subscriptions');
        }
      } catch (err) {
        setError('An error occurred while fetching subscriptions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div>
      <h1>Active Subscriptions</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {subscriptions.map((sub, index) => (
            <li key={index}>{sub.Name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubscriptionsList;
