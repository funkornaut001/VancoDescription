import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [titleInput, settitleInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate-vanco", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: titleInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      settitleInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Vanco</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>

      <main className={styles.main}>
        {/* <img src="/dog.png" className={styles.icon} /> */}
        <h3>Donation Description Generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter a title"
            value={titleInput}
            onChange={(e) => settitleInput(e.target.value)}
          />
          <input type="submit" value="Generate Description" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
