"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full flex-col">
      <h1 className="text-2xl font-bold m-3">Hey, sag mir wie du heißt!</h1>
      <div>
        <input
          type="text"
          className="border-2 border-gray-700 font-bold shadow-lg rounded-2xl p-2"
          placeholder="Dein Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 cursor-pointer border-blue-500 border-2 shadow-lg text-white font-bold px-4 py-2 rounded-2xl"
          onClick={() => {
            document.cookie = `name=${name};`;
            router.push("/quiz");
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}
