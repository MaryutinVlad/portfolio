import styles from "../styles/popup.module.css"

export default function Popup() {
  return (
    <div className={styles.overlay}>
      <form
        className={styles.popup}
        action=""
      >
        <input type="text" />
      </form>
    </div>
  )
}