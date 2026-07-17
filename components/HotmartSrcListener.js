"use client";
import { useEffect } from "react";

export default function HotmartSrcListener() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const src = params.get("src");
    const fbclid = params.get("fbclid");

    if (src) {
      localStorage.setItem("hotmart_src", src);
      console.log("✅ src guardado:", src);
    }
    if (fbclid) {
      localStorage.setItem("hotmart_fbclid", fbclid);
      console.log("✅ fbclid guardado:", fbclid);
    }
  }, []);

  return null;
}
