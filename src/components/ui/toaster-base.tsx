import React from "react";
import { ToastBar, Toaster, toast } from "react-hot-toast";
import { X } from "lucide-react";

export default function ToasterBase() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 2500,
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
              <div className="text text-left">{message}</div>
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
