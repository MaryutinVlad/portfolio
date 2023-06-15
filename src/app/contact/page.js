'use client'
import styles from "../styles/contact.module.css"

export default function Contact() {

  function sendMessage(e) {
    e.preventDefault()
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
      <form
        onSubmit={sendMessage}
      >
        <h3>
          Name *
        </h3>
        <div className={styles.upperFields}>
          <input type="text" name="firstName" className={styles.inputField} />
          <input type="text" name="lastName" className={styles.inputField} />
          <label htmlFor="firstName">
            First Name
          </label>
          <label htmlFor="lastName">
            Last Name
          </label>
        </div>
        <div className={styles.lowerFields}>
          <label htmlFor="email">
            Email *
          </label>
          <input type="email" name="email" className={styles.inputField} />
          <label htmlFor="message">
            Message *
          </label>
          <textarea name="message" rows={5} className={styles.inputField} />
        </div>
        <button
          className={styles.submit}
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  )
}
