// src/hooks/useTitle.js
import { useEffect } from "react";

/**
 * Custom hook to set dynamic page title with a base app name.
 * @param {string} title - Page specific title
 * @param {string} base - Base title (default: "UrbanNest")
 */
const useTitle = (title, base = "UrbanNest") => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${base}`;
    } else {
      document.title = base;
    }
  }, [title, base]);
};

export default useTitle;
