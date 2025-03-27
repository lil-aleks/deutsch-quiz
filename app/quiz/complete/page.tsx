"use client";

import { supabase } from "@/lib/supabaseClient";
import { Question } from "@/lib/supabaseTypes";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
  const [correctAwnsers, setCorrectAwnsers] = useState<number>(0);
  const [maxCorrectAwnsers, setMaxCorrectAwnsers] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[] | null>(null);

  const fetchUser = async () => {
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
  };

  const fetchQuetions = async () => {
    const { data, error } = await supabase.from("questions").select("*");
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setMaxCorrectAwnsers(data.length);
      setQuestions(data);
    }
  };

  function getCookie(name: string) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : null;
  }

  useEffect(() => {
    fetchUser();
    fetchQuetions();
  }, []);

  return (
    <div className="flex items-center w-full h-full justify-center flex-col">
      <h1 className="text-4xl font-bold m-3">Quiz beendet.</h1>
      <h1
        className={`text-xl font-bold m-3 before:text-2xl ${
          correctAwnsers === maxCorrectAwnsers
            ? "text-green-500 before:content-['🎉']"
            : correctAwnsers * 1.5 >= maxCorrectAwnsers
            ? "text-yellow-300 before:content-['👍']"
            : correctAwnsers * 2 >= maxCorrectAwnsers
            ? "text-orange-400 before:content-['🙂']"
            : "text-red-500 before:content-['😭']"
        }`}
      >
        Du hast {correctAwnsers} von {maxCorrectAwnsers} richtig.
      </h1>
      <div className=" m-3 overflow-y-scroll">
        {questions !== null &&
          questions.map((question) => (
            <div key={question.id} className="my-5">
              <div className="flex w-full justify-center items-center mb-3">
                <h1 className="font-bold w-2/3 text-gray-700">
                  {question.question_title}
                </h1>
              </div>
              <div className="flex w-full my-3 justify-between px-10">
                <h2>{question.awnser_a}</h2>
                <Image
                  src={
                    question.correct_awnser === "a"
                      ? getCookie(`${question.id}`) === "a"
                        ? "/check-orange.svg"
                        : "/checkbox-check.svg"
                      : getCookie(`${question.id}`) === "a"
                      ? "/unchecked-orange.svg"
                      : "/checkbox-unchecked.svg"
                  }
                  width={25}
                  height={25}
                  alt=""
                />
              </div>
              <div className="flex w-full my-3 justify-between px-10">
                <h2>{question.awnser_b}</h2>
                <Image
                  src={
                    question.correct_awnser === "b"
                      ? getCookie(`${question.id}`) === "b"
                        ? "/check-orange.svg"
                        : "/checkbox-check.svg"
                      : getCookie(`${question.id}`) === "b"
                      ? "/unchecked-orange.svg"
                      : "/checkbox-unchecked.svg"
                  }
                  width={25}
                  height={25}
                  alt=""
                />
              </div>
              <div className="flex w-full my-3 justify-between px-10">
                <h2>{question.awnser_c}</h2>
                <Image
                  src={
                    question.correct_awnser === "c"
                      ? getCookie(`${question.id}`) === "c"
                        ? "/check-orange.svg"
                        : "/checkbox-check.svg"
                      : getCookie(`${question.id}`) === "c"
                      ? "/unchecked-orange.svg"
                      : "/checkbox-unchecked.svg"
                  }
                  width={25}
                  height={25}
                  alt=""
                />
              </div>
              <div className="flex w-full my-3 justify-between px-10">
                <h2>{question.awnser_d}</h2>
                <Image
                  src={
                    question.correct_awnser === "d"
                      ? getCookie(`${question.id}`) === "d"
                        ? "/check-orange.svg"
                        : "/checkbox-check.svg"
                      : getCookie(`${question.id}`) === "d"
                      ? "/unchecked-orange.svg"
                      : "/checkbox-unchecked.svg"
                  }
                  width={25}
                  height={25}
                  alt=""
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
