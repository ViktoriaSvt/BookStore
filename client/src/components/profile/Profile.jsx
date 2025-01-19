import { useEffect, useState } from "react";
import { getUserById } from "../../api/user-requests";
import { useParams } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../contexts/AuthContext";
import AddBookModal from "./addBook/AddBook";

export default function ProfileInfo() {
  const { language, changeLanguage } = useAuthContext();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickHandler = useLogout();

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const userData = await getUserById(userId);
          setUser(userData);
          setUpdatedUserData(userData);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    changeLanguage(newLanguage);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedUserData(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img alt="profile" src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none -mt-16" />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0"></div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Info Section */}
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={updatedUserData.username}
                      onChange={handleInputChange}
                      className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 border-b-2 border-blueGray-400 focus:outline-none"
                    />
                  ) : (
                    user.username
                  )}
                </h3>

                {/* Location Field */}
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={updatedUserData.location}
                      onChange={handleInputChange}
                      className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 border-b-2 border-blueGray-400 focus:outline-none"
                    />
                  ) : (
                    "Los Angeles, California"
                  )}
                </div>

                {/* Language Selector */}
                <div className="mt-6 mb-10">
                  <select value={language} onChange={handleLanguageChange} className="border px-4 py-2 rounded-lg">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="bg">Bulgarian</option>
                  </select>
                </div>

                {/* Edit Profile Button */}
                {!isEditing ? (
                  <button
                    onClick={handleEditClick}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      onClick={handleSaveClick}
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

              {/* Books Section */}
              <div className="mt-10 text-center">
                <h3 className="text-2xl font-semibold text-blueGray-700">Books Added</h3>
                <div className="flex justify-center mt-6 gap-6">
                  <div
                    className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-all ease-in-out"
                    onClick={openModal}
                  >
                    <i className="fas fa-plus text-3xl text-gray-500" />
                  </div>
                  <div className="w-40 h-40 bg-gray-100 rounded-lg shadow-lg">
                    <div className="flex justify-center items-center h-full">
                      <span className="text-blueGray-500">Book 1</span>
                    </div>
                  </div>
                  <div className="w-40 h-40 bg-gray-100 rounded-lg shadow-lg">
                    <div className="flex justify-center items-center h-full">
                      <span className="text-blueGray-500">Book 2</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal for Adding Book */}
              <AddBookModal isOpen={isModalOpen} closeModal={closeModal} />

              {/* Logout Button */}
              <div className="text-center mt-10">
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
