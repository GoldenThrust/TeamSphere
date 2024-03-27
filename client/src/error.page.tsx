import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  interface RouteError {
    statusText: string;
    message: string;
  }

  //@ts-ignore
  const error: RouteError = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
