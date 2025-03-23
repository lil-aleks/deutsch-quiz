"use client"

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Page() {
  const [correctAwnsers, setCorrectAwnsers] = useState<number>(0);
  const [maxCorrectAwnsers, setMaxCorrectAwnsers] = useState<number>(0);

  const getCookie = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : null;
  };

  const fetchUser  = async () => {
    const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", getCookie("name"))
    .single();
    
    if (error) {
      console.error(error.message);
    } else {
      setCorrectAwnsers(data.correct);
    }
  }

  const maxQuetions = async () => {
    const { data, error } = await supabase.from("questions").select("*");
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setMaxCorrectAwnsers(data.length);
    }
  };

  useEffect(() => {
    fetchUser();
    maxQuetions();
  }, [])

  return (
    <div className="flex items-center w-full h-full justify-center flex-col">
      <h1 className="text-4xl font-bold m-3">Quiz beendet.</h1>
      <h1 className={`text-xl font-bold m-3 before:text-2xl ${
        correctAwnsers === maxCorrectAwnsers ? "text-green-500 before:content-['🎉']" : 
        correctAwnsers * 1.5 >= maxCorrectAwnsers ? "text-yellow-300 before:content-['👍']" : 
        correctAwnsers * 2 >= maxCorrectAwnsers ? "text-orange-400 before:content-['🙂']" : "text-red-500 before:content-['😭']"
      }`}>
        Du hast {correctAwnsers} von {maxCorrectAwnsers} richtig.
      </h1>
    </div>
  );
}
