import {  useRef } from "react";
import { useKey } from "./useKey";
export default function Search({ query, onSetQuery }) {
  const inputEl = useRef(null);

  //To contrast actual code vs this eventListener effect.
  //This is the useKey code.
  //   useEffect(
  //     function () {
  //       function callback(e) {
  //         if (e.code.toLowerCase() === key.toLowerCase()) action();
  //       }

  //       document.addEventListener("keydown", callback);

  //       return function () {
  //         document.removeEventListener("keydown", callback);
  //       };
  //     },
  //     [action, key]
  //   );

  // Lienzo effect dentro de useKey.
  //
  //     function () {
  //       function callback(e) {
  //         if (e.code.toLowerCase() === key.toLowerCase()) action();
  //       }

  //       document.addEventListener("keydown", callback);

  //       return function () {
  //         document.removeEventListener("keydown", callback);
  //       };
  //     },
  //     [action, key]
  //

  //Effect in this component
  //    function () {
  //      function callback(e) {
  //a       if (document.activeElement === inputEl.current) return;
  //        if (e.code === "Enter") {
  //a         inputEl.current.focus();
  //          onSetQuery("");
  //       }
  //     }
  //     document.addEventListener("keydown", callback);
  //     return () => document.removeEventListener("keydown", callback);
  //   },
  //   [onSetQuery]
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    onSetQuery("");
  });

  // useEffect(
  //   //esta funcion se pasa como parametro
  //   function () {
  //     //pero esta ya esta dentro de useKey. Rescatemos algunas lineas.
  //     function callback(e) {
  //       //extraer esta linea tambien
  //       if (document.activeElement === inputEl.current) return;

  //       //la reivsion ya se hace dentro de useKey, pero el cuerpo no. Extraer las 2 lineas
  //       if (e.code === "Enter") {
  //         inputEl.current.focus();
  //         onSetQuery("");
  //       }
  //     }

  //     //la adhesion tambien
  //     document.addEventListener("keydown", callback);
  //     //el cleanup tambien. Ya no es necesario escribir esto
  //     return () => document.removeEventListener("keydown", callback);
  //   },
  //   [onSetQuery]
  // );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
