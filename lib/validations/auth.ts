import * as z from "zod"

export const userAuthSchema = z.object({
  username: z.string().min(3).max(100),
  first_name: z.string().min(3, { message: "სახელი უნდა იყოს მინიმუმ 3 სიმბოლო" }).max(100).optional(),
  last_name: z.string().min(3, { message: "გვარი უნდა იყოს მინიმუმ 3 სიმბოლო" }).max(100).optional(),
  email: z.string().email({ message: "შეიყვანეთ ელ.ფოსტის ვალიდური მისამართი" }),
  phone_number: z.string().min(9, { message: "ტელეფონის ნომერი უნდა შედგებოდეს მინიმუმ 9 სიმბოლოსგან" }).max(16).optional(),
  
  password: z.string().min(8, { message: "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს" }).max(30)
})
