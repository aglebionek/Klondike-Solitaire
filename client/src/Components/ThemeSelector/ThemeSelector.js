import React, { useState } from "react";

const CyberpunkTheme = React.lazy(() => import("./CyberpunkTheme"));
const KlondikeTheme = React.lazy(() => import("./KlondikeTheme"));

const ThemeSelector = (WrappedComponent) => (props) =>
  (
    <>
      <React.Suspense fallback={() => null}>
        {(localStorage.getItem("motiveCss") !== "cyberpunk" ||
          localStorage.getItem("isLogged") === "false") && <KlondikeTheme />}
        {localStorage.getItem("motiveCss") === "cyberpunk" &&
          localStorage.getItem("isLogged") === "true" && <CyberpunkTheme />}
      </React.Suspense>
      <WrappedComponent {...props} />
    </>
  );
export default ThemeSelector;
