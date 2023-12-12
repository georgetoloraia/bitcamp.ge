"use client"

import { useState } from "react"

import { Label } from "@/components/ui/label"

import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export default function PreRegistrationForm({ formTitle }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: "",
  })


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const postRoute = window.location.pathname;

      const response = await fetch("/api/pre-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
          source: postRoute,
        }),
      })

      if (!response.ok) throw new Error("Failed to save message")

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        message: "",
      })
    } catch (error) {
      console.error("Error saving message:", error)
    }
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-2xl font-semibold ">{formTitle}</h2>
      <div className="mb-4 flex flex-col">
        <Label htmlFor="firstName" className="mb-2">
          სახელი
        </Label>
        <Input
          type="text"
          placeholder="John Doe"
          id="firstName"
          name="firstName"
          required
          onChange={handleChange}
          value={formData.firstName}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <Label htmlFor="lastName" className="mb-2">
          გვარი
        </Label>
        <Input
          type="text"
          placeholder="John Doe"
          id="lastName"
          name="lastName"
          required
          onChange={handleChange}
          value={formData.lastName}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <Label htmlFor="email" className="mb-2">
          იმეილი:
        </Label>
        <Input
          type="email"
          placeholder="name@example.com"
          id="email"
          name="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          onChange={handleChange}
          value={formData.email}
          required
        />
      </div>
      <div className="mb-4 flex flex-col">
        <Label htmlFor="mobile" className="mb-2">
          მობილურის ნომერი:
        </Label>
        <Input
          type="tel"
          placeholder="+995 000 000 000"
          id="mobile"
          name="mobile"
          onChange={handleChange}
          value={formData.mobile}
          required
        />
      </div>

      <div className="mb-4 flex flex-col">
        <Label htmlFor="message" className="mb-2">
          კომენტარი:
        </Label>
        <Textarea
          onChange={handleChange}
          value={formData.message}
          id="message"
          name="message"
          required
        ></Textarea>
      </div>
      <button
        type="submit"
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  )
}
