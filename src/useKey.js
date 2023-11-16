import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        //revisa tecla y dispara esa acción.
        if (e.code.toLowerCase() === key.toLowerCase()) action();
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
