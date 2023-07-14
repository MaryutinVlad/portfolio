import { NextResponse } from "next/server"

import nodemailer from "nodemailer"

const email = process.env.EMAIL
const password = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password
  }
})

export async function POST(request) {

  const formValues = await request.json()

  if (
    !formValues.firstName ||
    !formValues.lastName ||
    !formValues.email ||
    !formValues.message
  ) {
    return NextResponse.json({ message: `${formValues.firstName}`}, { status: 400}) 
  }

  try {

    await transporter.sendMail({
      from: email,
      to: email,
      text: `
        Name: ${formValues.firstName} ${formValues.lastName}
        Email: ${formValues.email}
        Message: ${formValues.message}`,
      subject: "feedback"
    })

    return NextResponse.json({ message: "Message sent"}, { status: 200 })

  } catch (error) {

    return NextResponse.json({ message: `${error.message}`})
  }
}