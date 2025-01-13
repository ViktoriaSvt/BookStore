import { useEffect, useState } from "react";
import { getFaqTranslations } from "../api/translation-requests";
import { getQuestions, postQuestion } from "../api/question-requests";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


export function usePostQuestions() {

    const submitCallback = async ({ text }) => {
        await postQuestion(text);
        toast.success("Question is pending... Check for answers in profile page");
    }

    return { submitCallback }
}

export function useGetAllQuestions() {
  const [questions, setQuestions] = useState([]);


  useEffect(()=> {
    (async ()=> {
        const data = await getQuestions();
        setQuestions(data)
    })()
  }, [])
 
    return questions
}

