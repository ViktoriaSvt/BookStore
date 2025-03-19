import { useEffect, useState } from "react";
import { getAllUsers, getUserById } from "../api/user-requests";
import { getUserQuestions } from "../api/question-requests";



export function useGetUser(userId) {

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {

        const userData = await getUserById(userId);
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

export function useGetUsers() {
  const [users, setUsers] = useState([])


  useEffect(() => {
    const fetchUsers = async () => {
      
        const userData = await getAllUsers()

        if(userData) {
          setUsers(userData);
        }
       
    };

    fetchUsers();
  }, []);
  
  return [users, setUsers]
}