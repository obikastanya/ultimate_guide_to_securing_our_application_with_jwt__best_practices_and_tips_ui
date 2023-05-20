import Link from "next/link";

export default function Forbidden({ message }) {
  if (!message) message = "You are not authorized to access this page.";
  return (
    <div className="textCenter">
      <h3>403 Forbidden</h3>
      <p>{message}</p>
      <Link href="/">
        <button className="buttonPrimary">Back To Home</button>
      </Link>
    </div>
  );
}
