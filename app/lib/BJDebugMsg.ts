"use client";

export const BJDebugMsg = (data: string | boolean | number, msg?: string) => {
  if (process.env.NODE_ENV !== "production") {
    if (typeof data === "boolean") {
      const message = data ? "✅ Успех" : "❌ Ошибка";
      console.log(msg ? `${msg}: ${message}` : message);
    } else {
      console.log(msg ? `${msg}: ${data}` : data);
    }
  }
};
