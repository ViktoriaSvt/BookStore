import { useState } from "react";
import { updateProfile } from "../../api/user-requests";
import { useParams } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../contexts/AuthContext";
import AddBookModal from "./addBook/AddBook";
import { useForm } from "../../hooks/useForm";
import { useGetMail, useGetUser } from "../../hooks/useuserHooks";


export default function ProfileInfo() {
  const { language, changeLanguage, isAdmin } = useAuthContext();
  const { userId } = useParams();

  console.log(userId);
  

  const [user] = useGetUser(userId);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [questions] = useGetMail(userId)
  const [showQuestions, setShowQuestions] = useState(false)


  console.log(questions);
  
  const initialValues = { username: '', description: '' };

  const clickHandler = useLogout();

  const handleMailboxClick = () => {
    setShowQuestions(true)
  }

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    changeLanguage(newLanguage);
  };

  const handleEditClick = () => {
    values.username= user.username;
    values.description = user.description
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await updateProfile(values)
    setIsEditing(false);

  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const { values, changeHandler, submitHandler } = useForm(initialValues, handleSaveClick)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

   questions = questions || [];

  return (
    <div>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="profile"
                      src={user.profilePicture}
                      className="shadow-xl rounded-full h-auto align-middle border-none -mt-16"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0"></div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    {/* Mailbox button with a notification dot */}
                    <button
                      onClick={handleMailboxClick}
                      className="relative bg-transparent border-none cursor-pointer"
                    >
                      <i className="fa-solid fa-envelope-open-text text-3xl text-blueGray-600" />
                      {/* Notification Dot */}
                      { questions.length > 0 && (<span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />)}
                    </button>
                  </div>
                </div>
              </div>



              <div className="relative mt-6">

                {showQuestions && (
                  <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-white p-8 rounded-lg max-w-lg w-full">

                      <button
                        onClick={() => setShowQuestions(false)} 
                        className="absolute top-2 right-2 text-xl font-bold text-gray-500"
                      >
                        &times; 
                      </button>

                      <h2 className="text-2xl font-semibold text-center mb-4">Your Questions</h2>
                      {questions.length === 0 ? (
                        <p className="text-center text-gray-500">No questions available.</p>
                      ) : (
                        <div className="space-y-4">
                          {questions.map((question) => (
                            <div key={question._id} className="border-b pb-4">
                              <h1 className="font-medium text-blueGray-700">{question.text}</h1>
                              <p className="text-blueGray-500 mt-2">{question.answer }</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
         

              </div>



              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={changeHandler}
                      className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 border-b-2 border-blueGray-400 focus:outline-none"
                    />
                  ) : (
                    user.username
                  )}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={changeHandler}
                      className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 border-b-2 border-blueGray-400 focus:outline-none"
                    />
                  ) : (
                    <span>{user.description}</span>
                  )}
                </div>

                <div className="mt-6 mb-10">
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="border px-4 py-2 rounded-lg"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="bg">Bulgarian</option>
                  </select>
                </div>

                {!isEditing ? (
                  <button
                    onClick={handleEditClick}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition duration-300 ease-in-out"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      onClick={submitHandler}
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {isAdmin && (
                <div className="mt-10 text-center">
                  <h3 className="text-2xl font-semibold text-blueGray-700">Generate Stock</h3>
                  <div className="flex justify-center mt-6 gap-6">
                    <div
                      className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-all ease-in-out"
                      onClick={openModal}
                    >
                      <i className="fas fa-plus text-3xl text-gray-500" />
                    </div>
                  </div>
                </div>
              )}

              <AddBookModal isOpen={isModalOpen} closeModal={closeModal} />

              <div className="text-center mt-3 mb-10">
                <button
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition duration-300 ease-in-out"
                  onClick={clickHandler}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );


}
