"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"

import { Button } from "./ui/button"

interface Subscription {
  Id: string
  ProductId: string
  LastBillingDate: string
  NextBillingDate: string
  Price: string
  Currency: string
  OccurrenceType: string
  OccurrenceNumber: string
  OccurrenceDuration: string
  Name: string
  Email: string
  Phone: string
  ImageUrl: string
  SendEmails: string
  Status: string
  ProductStatus: string
}

const SubscriptionsList = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch("/api/subscriptions")

        if (res.ok) {
          const data = await res.json()
          setSubscriptions(data)
        } else {
          setError("Failed to fetch subscriptions")
        }
      } catch (err) {
        setError("An error occurred while fetching subscriptions")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscriptions()
  }, [])

  if (subscriptions.length === 0) {
    return (
      <>
        <p>შენ ჯერ არ გაქვს შეძენილი ფასიანი სერვისები.</p>
        <p>
          შეგიძლია დაათვალიეროთ{" "}
          <Link
            href="/dashboard/programs"
            className="font-medium text-blue-600 underline hover:no-underline dark:text-blue-500"
          >
            სრული პროგრამები
          </Link>{" "}
          ან ცალკეული{" "}
          <Link
            href="/dashboard/subjects"
            className="font-medium text-blue-600 underline hover:no-underline dark:text-blue-500"
          >
            საგნები
          </Link>
          .
        </p>
        <p>
          შეძენის შემდეგ ამ გვერდზე გამოჩნდება აქტიური სერვისები და მოსაწვევი
          სასწავლო სივრცეში.
        </p>
      </>
    )
  }

  return (
    <div>
      {isLoading ? (
        <p>იტვირთება...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {subscriptions.map((subscription, index) => {
            return (
              <div
                key={index}
                className="relative mb-4 overflow-hidden rounded-lg border bg-background p-2"
              >
                <div className="flex flex-col justify-between rounded-md p-6">
                  <div className="space-y-2">
                    <h3 className="font-bold">
                      {subscription.Name} - {subscription.Price}{" "}
                      {subscription.Currency} / თვეში
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      ბოლო გადახდის თარიღი: {subscription.LastBillingDate}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      შემდეგი გადახდის თარიღი: {subscription.NextBillingDate}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      სტატუსი: {subscription.Status}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          <p>
            შეძენილი სერვისების მისაღებად შემოგვიერთდი სასწავლო სივრცეში და
            გაიარეთ ვერიფიკაცია.
          </p>
          <Button>
            <Link href={siteConfig.links.discord} target="_blank">
              სასწავლო სივრცის მოსაწვევი 🪄
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default SubscriptionsList
