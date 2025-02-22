import { useEffect, useState } from "react";
import { getUserById } from "../api/user-requests";
import { getUserQuestions } from "../api/question-requests";



export function useGetUser(userId) {

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {

        const userData = await getUserById(userId);
        console.log(userData);
        
        setUser(userData);

      }
    };

    fetchUser();
  }, [userId]);

  return [user]
}

export function useGetMail(userId) {
  const [questions, setQuestions] = useState([])


  useEffect(() => {
    const fetchQuestions = async () => {
      if (userId) {
        const userQuestions = await getUserQuestions(userId)

        if(userQuestions) {
          setQuestions(userQuestions)
        }
       
      }
    };

    fetchQuestions();
  }, [userId]);
  
  return [questions]
}