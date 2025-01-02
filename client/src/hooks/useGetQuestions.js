import { useEffect, useState } from "react";
import { getFaqTranslations } from "../api/translation-requests";
import { postQuestion } from "../api/question-requests";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


export function useGetQuestions() {

    const submitCallback = async ({ text }) => {
        await postQuestion(text);
        toast.success("Question is pending... Check for answers in profile page");
    }


    return { submitCallback }

}

