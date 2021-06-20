import React from "react";

const Theme1 = React.lazy(() => import("./Theme1"));
const Theme2 = React.lazy(() => import("./Theme2"));

const ThemeSelector = (WrappedComponent) => () =>
  (
    <>
      <React.Suspense fallback={() => null}>
        {localStorage.getItem("motiveCss") !== "cyberpunk" && <Theme1 />}
        {localStorage.getItem("motiveCss") === "cyberpunk" && <Theme2 />}
      </React.Suspense>
      <WrappedComponent />
    </>
  );

export default ThemeSelector;
