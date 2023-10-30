"use client";

import { X } from "lucide-react";
import { Fragment } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

export default function ToasterBase() {
  return (
    <Toaster
      position="bottom-center"
      containerClassName="--font-inter text-sm font-semibold tracking-tight mx-2"
      toastOptions={{
        duration: 2000,
        position: "top-center",
        style: {
          width: "100%",
          boxShadow: "none",
          border: "1px solid #EAEAEA",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <Fragment>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button className="ml-auto" onClick={() => toast.dismiss(t.id)}>
                  <X size={16} />
                </button>
              )}
            </Fragment>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
