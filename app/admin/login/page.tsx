"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full">
      <input
          type="password"
          className="border-2 border-gray-700 font-bold shadow-lg rounded-2xl p-2"
          placeholder="Passwort"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 border-blue-500 shadow-lg border-2 text-white font-bold px-4 py-2 rounded-2xl"
          onClick={() => {
            document.cookie = `password=${password}; path=/;`;
            router.push("/admin");
          }}
        >
          Login
        </button>
    </div>
  );
};