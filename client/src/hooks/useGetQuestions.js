import { useEffect, useState } from "react";
import { getQuestions, postQuestion } from "../api/question-requests";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


export function usePostQuestions() {

  const submitCallback = async ({ text }) => {
  try {
    await postQuestion(text);
  } catch {
    toast.error("Currently unable to submit question");
  }
};


  return { submitCallback }
}

export function useGetAllQuestions(refresh) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getQuestions();

      if(data) {
        setQuestions(data)
      }
  
    })()
  }, [refresh])

  return questions
}

