"use client";

import { supabase } from "@/lib/supabaseClient";
import { Question, User } from "@/lib/supabaseTypes";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
  const [activeWindow, setActiveWindow] = useState<"questions" | "users">(
    "questions"
  );
  const [questionInfo, setQuestionInfo] = useState<"none" | number>("none");
  const [users, setUsers] = useState<User[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuetionTitle, setNewQuestionTitle] = useState<string>("");
  const [newAwnserA, setNewAwnserA] = useState<string>("");
  const [newAwnserB, setNewAwnserB] = useState<string>("");
  const [newAwnserC, setNewAwnserC] = useState<string>("");
  const [newAwnserD, setNewAwnserD] = useState<string>("");
  const [newAwnser, setNewAwnser] = useState<"a" | "b" | "c" | "d">("a");

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("correct", { ascending: false });
    if (error) {
      console.log(error);
    } else {
      setUsers(data);
    }
  };

  const deleteUser = async (id: number) => {
    const { data, error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      console.error(error.message);
    } else {
      console.log("Deleted: ", data);
    }
    fetchUsers();
  };

  const fetchQuestions = async () => {
    const { data, error } = await supabase.from("questions").select("*");
    if (error) {
      console.log(error);
    } else {
      setQuestions(data);
    }
  };

  const deleteQuestion = async (id: number) => {
    const { data, error } = await supabase
      .from("questions")
      .delete()
      .eq("id", id);
    if (error) {
      console.error(error.message);
    } else {
      console.log("Deleted: ", data);
    }
    fetchQuestions();
  };

  const addQuestion = async (question: Question) => {
    const { data, error } = await supabase.from("questions").insert([
      {
        question_title: question.question_title,
        awnser_a: question.awnser_a,
        awnser_b: question.awnser_b,
        awnser_c: question.awnser_c,
        awnser_d: question.awnser_d,
        correct_awnser: question.correct_awnser,
      },
    ]);

    if (error) {
      console.error(error.message);
    } else {
      console.log("Added: ", data);
    }

    fetchQuestions();
  };

  useEffect(() => {
    fetchQuestions();
    fetchUsers();
  }, []);

  return (
    <div className="flex items-center justify-center h-full flex-col">
      <div className="m-5">
        <button
          className={`m-2 shadow-lg border-2 font-bold px-4 py-2 rounded-2xl ${
            activeWindow === "questions"
              ? "bg-blue-500 border-blue-500 text-white"
              : "bg-gray-200 border-gray-200"
          }`}
          onClick={() => setActiveWindow("questions")}
        >
          Fragen
        </button>
        <button
          className={`m-2 shadow-lg border-2 font-bold px-4 py-2 rounded-2xl ${
            activeWindow === "users"
              ? "bg-blue-500 border-blue-500 text-white"
              : "bg-gray-200 border-gray-200"
          }`}
          onClick={() => setActiveWindow("users")}
        >
          Spieler
        </button>
      </div>
      <div className="h-full flex p-4 w-full">
        {activeWindow === "questions" && (
          <div className="w-full">
            {questions.map((question) => (
              <div key={question.id}>
                <div className="flex w-full text-nowrap justify-between mb-3">
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      deleteQuestion(question.id);
                    }}
                  >
                    <Image
                      src="/trash.svg"
                      width={25}
                      height={25}
                      alt="Delete"
                    />
                  </button>
                  <h1 className="font-bold w-2/3 text-nowrap overflow-hidden text-gray-700">
                    {question.question_title}
                  </h1>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      if (questionInfo === question.id) {
                        setQuestionInfo("none");
                      } else {
                        setQuestionInfo(question.id);
                      }
                    }}
                  >
                    <Image
                      src="/chevron.svg"
                      width={25}
                      height={25}
                      alt="Open"
                      className={
                        questionInfo === question.id
                          ? " transition rotate-180"
                          : "transition"
                      }
                    />
                  </button>
                </div>

                <div
                  className={`flex items-center justify-center flex-col ${
                    questionInfo === question.id ? "" : " hidden"
                  }`}
                >
                  <div className="flex w-full justify-between px-10">
                    <h2>{question.awnser_a}</h2>
                    <Image
                      src={
                        question.correct_awnser === "a"
                          ? "/checkbox-check.svg"
                          : "/checkbox-unchecked.svg"
                      }
                      width={25}
                      height={25}
                      alt=""
                    />
                  </div>
                  <div className="flex w-full justify-between px-10">
                    <h2>{question.awnser_b}</h2>
                    <Image
                      src={
                        question.correct_awnser === "b"
                          ? "/checkbox-check.svg"
                          : "/checkbox-unchecked.svg"
                      }
                      width={25}
                      height={25}
                      alt=""
                    />
                  </div>
                  <div className="flex w-full justify-between px-10">
                    <h2>{question.awnser_c}</h2>
                    <Image
                      src={
                        question.correct_awnser === "c"
                          ? "/checkbox-check.svg"
                          : "/checkbox-unchecked.svg"
                      }
                      width={25}
                      height={25}
                      alt=""
                    />
                  </div>
                  <div className="flex w-full justify-between px-10">
                    <h2>{question.awnser_d}</h2>
                    <Image
                      src={
                        question.correct_awnser === "d"
                          ? "/checkbox-check.svg"
                          : "/checkbox-unchecked.svg"
                      }
                      width={25}
                      height={25}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center mt-5 flex-col border-t-1 border-gray-500">
              <input
                type="text"
                className="border-2 mt-4 border-gray-700 font-bold shadow-lg rounded-2xl p-1"
                placeholder="Frage"
                onChange={(e) => {
                  setNewQuestionTitle(e.target.value);
                }}
              />
              <div className="flex w-full justify-between">
                <input
                  type="text"
                  className="border-2 mt-4 w-full border-gray-700 font-bold shadow-lg rounded-2xl p-1"
                  placeholder="Antwort A"
                  onChange={(e) => {
                    setNewAwnserA(e.target.value);
                  }}
                />
                <button
                  className="cursor-pointer ml-5 relative top-2"
                  onClick={() => {
                    setNewAwnser("a");
                  }}
                >
                  <Image
                    src={
                      newAwnser === "a"
                        ? "/checkbox-check.svg"
                        : "/checkbox-unchecked.svg"
                    }
                    width={25}
                    height={25}
                    alt=""
                  />
                </button>
              </div>
              <div className="flex w-full justify-between">
                <input
                  type="text"
                  className="border-2 mt-4 w-full border-gray-700 font-bold shadow-lg rounded-2xl p-1"
                  placeholder="Antwort B"
                  onChange={(e) => {
                    setNewAwnserB(e.target.value);
                  }}
                />
                <button
                  className="cursor-pointer ml-5 relative top-2"
                  onClick={() => {
                    setNewAwnser("b");
                  }}
                >
                  <Image
                    src={
                      newAwnser === "b"
                        ? "/checkbox-check.svg"
                        : "/checkbox-unchecked.svg"
                    }
                    width={25}
                    height={25}
                    alt=""
                  />
                </button>
              </div>
              <div className="flex w-full justify-between">
                <input
                  type="text"
                  className="border-2 mt-4 w-full border-gray-700 font-bold shadow-lg rounded-2xl p-1"
                  placeholder="Antwort C"
                  onChange={(e) => {
                    setNewAwnserC(e.target.value);
                  }}
                />
                <button
                  className="cursor-pointer ml-5 relative top-2"
                  onClick={() => {
                    setNewAwnser("c");
                  }}
                >
                  <Image
                    src={
                      newAwnser === "c"
                        ? "/checkbox-check.svg"
                        : "/checkbox-unchecked.svg"
                    }
                    width={25}
                    height={25}
                    alt=""
                  />
                </button>
              </div>
              <div className="flex w-full justify-between">
                <input
                  type="text"
                  className="border-2 mt-4 w-full border-gray-700 font-bold shadow-lg rounded-2xl p-1"
                  placeholder="Antwort D"
                  onChange={(e) => {
                    setNewAwnserD(e.target.value);
                  }}
                />
                <button
                  className="cursor-pointer ml-5 relative top-2"
                  onClick={() => {
                    setNewAwnser("d");
                  }}
                >
                  <Image
                    src={
                      newAwnser === "d"
                        ? "/checkbox-check.svg"
                        : "/checkbox-unchecked.svg"
                    }
                    width={25}
                    height={25}
                    alt=""
                  />
                </button>
              </div>
              <button
                className="bg-green-400 border-green-400 mt-5 shadow-lg text-white border-2 font-bold px-4 py-2 rounded-2xl"
                onClick={() => {
                  addQuestion({
                    id: 0,
                    question_title: newQuetionTitle,
                    awnser_a: newAwnserA,
                    awnser_b: newAwnserB,
                    awnser_c: newAwnserC,
                    awnser_d: newAwnserD,
                    correct_awnser: newAwnser,
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }}
              >
                Hinzufügen
              </button>
            </div>
          </div>
        )}
        {activeWindow === "users" && (
          <div className="w-full">
            <table className="table-auto w-full border-collapse rounded-2xl border border-gray-300 shadow-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border border-gray-300">Name</th>
                  <th className="px-4 py-2 border border-gray-300">Punkte</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="odd:bg-gray-50 even:bg-gray-100 hover:bg-blue-100 transition-colors"
                  >
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      <button
                        className="absolute left-6 cursor-pointer"
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        <Image
                          src="/trash.svg"
                          width={25}
                          height={25}
                          alt="Delete"
                        />
                      </button>
                      {user.username}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      {user.correct}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
