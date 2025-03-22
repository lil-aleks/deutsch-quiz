export type User = {
  id: number;
  username: string;
  correct: number;
};

export type Question = {
  id: number;
  question_title: string;
  awnser_a: string;
  awnser_b: string;
  awnser_c: string;
  awnser_d: string;
  correct_awnser: string;
}