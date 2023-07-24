'use client'
import styles from "../styles/contact.module.css"

import { useRef } from "react"

export default function Contact() {

  const firstNameRef = useRef("")
  const lastNameRef = useRef("")
  const emailRef = useRef("")
  const messageRef = useRef("")

  async function sendMessage(e) {
    e.preventDefault()
    let firstName, lastName, email, message

    firstName = firstNameRef.current.value
    lastName = lastNameRef.current.value
    email = emailRef.current.value
    message = messageRef.current.value

    if (!firstName || !lastName || !email || !message) {
      alert("Failed: some field missed")
      return
    }

    firstNameRef.current.value =
    lastNameRef.current.value =
    emailRef.current.value =
    messageRef.current.value = ""

    let formValues = { firstName, lastName, email, message }
    let result

    try {
      let data = await fetch("api/contact", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })

      result = await data.json()
    } catch (error) {
      result = { message: `Failed ${error.message}`}
    }

    alert(result.message)
  }

  return (
    <main className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.second_overlay}></div>
      <h2>
        Get in touch
      </h2>
      <p>
        Description
      </p>
      <p>
        Email@gmail.com
      </p>
      <p>
        Or please complete the enquiry bellow 
      </p>
      <form onSubmit={sendMessage}>
        <h3>
          Name *
        </h3>
        <div className={styles.upperFields}>
          <input type="text" name="firstName" className={styles.inputField} ref={firstNameRef} required/>
          <label htmlFor="firstName">
            First Name
          </label>
          <input type="text" name="lastName" className={styles.inputField} ref={lastNameRef} required/>
          <label htmlFor="lastName">
            Last Name
          </label>
        </div>
        <div className={styles.lowerFields}>
          <label htmlFor="email">
            Email *
          </label>
          <input type="email" name="email" className={styles.inputField} ref={emailRef} required />
          <label htmlFor="message">
            Message *
          </label>
          <textarea name="message" rows={5} className={styles.inputField} ref={messageRef} required />
        </div>
        <button className={styles.submit} type="submit">
          Submit
        </button>
      </form>
    </main>
  )
}
