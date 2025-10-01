import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export const ErrorPage: React.FC = () => {
  const error = useRouteError();

  let message: string;

  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Unknown error";
  }

  return (
    <div id="error-page">
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
