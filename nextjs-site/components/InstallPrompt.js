"use client";
import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Mobile only — skip on desktop
    const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (localStorage.getItem("pwa-dismissed")) {
      const dismissed = parseInt(localStorage.getItem("pwa-dismissed"), 10);
      if (Date.now() - dismissed < 7 * 24 * 60 * 60 * 1000) return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isIOS && isSafari) {
      setTimeout(() => setShow(true), 3000);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else {
      alert("Tap the Share button at the bottom of your screen, then tap 'Add to Home Screen'");
    }
    setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("pwa-dismissed", Date.now().toString());
  };

  if (!show) return null;

  return (
    <>
      <div
        onClick={handleDismiss}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9998,
        }}
      />
      <div
        style={{
          position: "fixed", bottom: 24, left: 16, right: 16, zIndex: 9999,
          background: "#ffffff", borderRadius: 16, padding: "24px 20px",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.15)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          maxWidth: 400, margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <img
            src="/icons/icon-192x192.png"
            alt="Insurance Wheatridge"
            width={56}
            height={56}
            style={{ borderRadius: 12, flexShrink: 0 }}
          />
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#1a1a2e", marginBottom: 2 }}>
              Insurance Wheatridge
            </div>
            <div style={{ fontSize: 13, color: "#666" }}>
              Add to your home screen for quick access
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleDismiss}
            style={{
              flex: 1, padding: "12px 0", borderRadius: 10,
              border: "1px solid #ddd", background: "#fff",
              color: "#666", fontSize: 15, fontWeight: 500, cursor: "pointer",
            }}
          >
            No Thanks
          </button>
          <button
            onClick={handleInstall}
            style={{
              flex: 1.5, padding: "12px 0", borderRadius: 10,
              border: "none", background: "#0954a5", color: "#fff",
              fontSize: 15, fontWeight: 600, cursor: "pointer",
            }}
          >
            Add to Home Screen
          </button>
        </div>
      </div>
    </>
  );
}
