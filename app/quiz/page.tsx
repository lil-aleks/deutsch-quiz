"use client";

import { supabase } from "@/lib/supabaseClient";
import { Question } from "@/lib/supabaseTypes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [shownQuestionIds, setShownQuestionIds] = useState<number[]>([0]);
  const [selectedAwnser, setSelectedAwnser] = useState<
    "a" | "b" | "c" | "d" | null
  >(null);
  const [correctAwnsers, setCorrectAwnsers] = useState<number>(0);
  const [awnser, setAwnser] = useState<"right" | "wrong" | null>(null);
  const [finished, setFinished] = useState<boolean>(false);
  const router = useRouter();

  const nextQuestion = async (correct: number) => {
    const { data, error } = await supabase
      .rpc("get_random_question", { excluded_ids: shownQuestionIds })
      .select()
      .limit(1)
      .single();
    if (error) {
      if (error.code === "PGRST116") {
        setFinished(true);
        setQuestion(null);
        console.log(correctAwnsers);
        addUser(correct);
      }
      console.log(error);
    } else {
      console.log(data);
      setQuestion(data);
      setShownQuestionIds((prevIds) => [...prevIds, data.id]);
      console.log(shownQuestionIds);
    }
  };

  const getCookie = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : null;
  };

  const addUser = async (correct: number) => {
    const { data, error } = await supabase.from("users").upsert([
      {
        username: getCookie("name"),
        correct
      },
    ]).select();

    if (error) {
      console.error(error.message);
    } else {
      console.log("Added: ", data);
    }
  };
    

  useEffect(() => {
    
    if (finished) {
      setTimeout(() => {
        router.push("/quiz/complete");
      }, 200);
    } else {
      if (shownQuestionIds.length === 1) {
        nextQuestion(0);
      }
    }
  }, [finished]);

  return (
    <div
      className={`flex transition-colors items-center justify-center w-full h-full flex-col ${
        awnser === "right"
          ? "bg-green-100"
          : awnser === "wrong"
          ? "bg-red-100"
          : ""
      }`}
    >
      {question === null ? (
        <h1 className="text-2xl font-bold m-3">Laden...</h1>
      ) : (
        <div className="flex items-center w-full justify-center flex-col">
          <h1 className="text-2xl font-bold m-3">{question.question_title}</h1>
          <div className="flex items-center w-full justify-center flex-col">
            <div className="flex w-full text-xl justify-between max-w-200 px-10">
              <h2>{question.awnser_a}</h2>
              <Image
                src={
                  selectedAwnser === "a"
                    ? "/checkbox-check.svg"
                    : "/checkbox-unchecked.svg"
                }
                width={30}
                height={30}
                alt=""
                onClick={() => {
                  if (selectedAwnser === "a") {
                    setSelectedAwnser(null);
                  } else {
                    setSelectedAwnser("a");
                  }
                }}
              />
            </div>
            <div className="flex w-full text-xl justify-between max-w-200 px-10">
              <h2>{question.awnser_b}</h2>
              <Image
                src={
                  selectedAwnser === "b"
                    ? "/checkbox-check.svg"
                    : "/checkbox-unchecked.svg"
                }
                width={30}
                height={30}
                alt=""
                onClick={() => {
                  if (selectedAwnser === "b") {
                    setSelectedAwnser(null);
                  } else {
                    setSelectedAwnser("b");
                  }
                }}
              />
            </div>
            <div className="flex w-full text-xl justify-between max-w-200 px-10">
              <h2>{question.awnser_c}</h2>
              <Image
                src={
                  selectedAwnser === "c"
                    ? "/checkbox-check.svg"
                    : "/checkbox-unchecked.svg"
                }
                width={30}
                height={30}
                alt=""
                onClick={() => {
                  if (selectedAwnser === "c") {
                    setSelectedAwnser(null);
                  } else {
                    setSelectedAwnser("c");
                  }
                }}
              />
            </div>
            <div className="flex w-full text-xl justify-between max-w-200 px-10">
              <h2>{question.awnser_d}</h2>
              <Image
                src={
                  selectedAwnser === "d"
                    ? "/checkbox-check.svg"
                    : "/checkbox-unchecked.svg"
                }
                width={30}
                height={30}
                alt=""
                onClick={() => {
                  if (selectedAwnser === "d") {
                    setSelectedAwnser(null);
                  } else {
                    setSelectedAwnser("d");
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
      {finished ? (
        <h1 className="text-xl font-bold mt-2">Danke für spielen!</h1>
      ) : (
        <button
          className="bg-green-400 cursor-pointer border-green-400 mt-5 shadow-lg text-white border-2 font-bold px-4 py-2 rounded-2xl"
          onClick={() => {
            if (selectedAwnser !== null) {
              let correct = correctAwnsers;
              if (question?.correct_awnser === selectedAwnser) {
                setCorrectAwnsers(correctAwnsers + 1);
                correct = correct + 1;
                setAwnser("right");
              } else {
                setAwnser("wrong");
              }
              
              setSelectedAwnser(null);
              setTimeout(async () => {
                await nextQuestion(correct);
                setAwnser(null);
              }, 500);
            }
          }}
        >
          Weiter
        </button>
      )}
      {/** For debugging */}
      {correctAwnsers}
    </div>
  );
}
