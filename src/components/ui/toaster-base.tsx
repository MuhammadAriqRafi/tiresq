"use client";

import { X } from "lucide-react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

export default function ToasterBase() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: Infinity,
        style: {
          width: "100%",
          boxShadow: "none",
          border: "1px solid #EAEAEA",
        },
      }}
      containerStyle={{
        bottom: 96,
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              <p>{message}</p>
              {t.type !== "loading" && (
                <button className="ml-auto" onClick={() => toast.dismiss(t.id)}>
                  <X size={16} />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
