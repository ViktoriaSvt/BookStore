import { useEffect, useState } from "react";
import { getUserById } from "../../api/user-requests";
import { useParams } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

export default function ProfileInfo() {

  

  const { userId } = useParams();
  const [user, setUser] = useState({});
  const clickHandler = useLogout()


  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const userData = await getUserById(userId);
          setUser(userData);

        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, [userId]);


  return (
    <div>
    <section className="relative py-16 bg-blueGray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div className="relative">
                  <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none -mt-16" />
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
            <div className="text-center mt-12">
              <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {user.username}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                Los Angeles, California
              </div>


              <div className="mb-2 text-blueGray-600 mt-10">
                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />Solution Manager - Creative Tim Officer
              </div>
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-university mr-2 text-lg text-blueGray-400" />University of Computer Science
              
              
              
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    {user.description}
                  </p>
                  <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                </div>
              </div>
            </div>
            {/* Logout Button */}
            <div className="text-center mb-10">
              <button 
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700"
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