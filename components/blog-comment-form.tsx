"use client"

import { useState } from "react"

import { Label } from "@/components/ui/label"

import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export default function BlogCommentForm({ formTitle, postRoute, postId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    comment: "",
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
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          comment: formData.comment,
          source: postRoute,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save comment")
      } else {
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          mobile: "",
          comment: "",
        })
      }
    } catch (error) {
      console.error("Error saving comment:", error)
    }
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-2xl font-semibold ">{formTitle}</h2>
      <div className="mb-4 flex flex-col">
        <Label htmlFor="name" className="mb-2">
          სახელი
        </Label>
        <Input
          type="text"
          placeholder="John Doe"
          id="name"
          name="name"
          required
          onChange={handleChange}
          value={formData.name}
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
        <Label htmlFor="comment" className="mb-2">
          კომენტარი:
        </Label>
        <Textarea
          onChange={handleChange}
          value={formData.comment}
          id="comment"
          name="comment"
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
