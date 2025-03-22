import { useState } from 'react';
import { useGetAllQuestions } from '../../hooks/useGetQuestions';
import { useForm } from '../../hooks/useForm';
import { answerQuestion } from '../../api/question-requests';

export default function AdminFAQ() {

  const [isAnswerModalOpen, setAnswerModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const questions = useGetAllQuestions(refresh);

  const submitCallback = async () => {
    await answerQuestion(values.answer, selectedQuestion.id)
    setRefresh(prev => !prev);
    setAnswerModalOpen(false);
  };


  const initialValues = { answer: '' }
  const { values, submitHandler, changeHandler } = useForm(initialValues, submitCallback);

  const handleAnswerClick = (question) => {
    setSelectedQuestion(question);
    setAnswerModalOpen(true);
  };


  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h6 className="text-lg text-indigo-600 font-medium text-center mb-2">
            Admin FAQ Section
          </h6>
          <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
            User Questions
          </h2>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">User</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Question</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-6 px-6 text-center text-gray-600 text-lg">
                    No questions to be answered yet.
                  </td>
                </tr>
              ) : (
                questions.map((question) => (
                  <tr key={question._id} className="border-b border-gray-200">
                    <td className="py-3 px-6 text-sm text-gray-900">{question.creatorId}</td>
                    <td className="py-3 px-6 text-sm text-gray-900">{question.text}</td>
                    <td className="py-3 px-6 text-sm text-gray-900">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${question.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {question.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-sm">
                      {question.status === "PENDING" ? (
                        <button
                          onClick={() => handleAnswerClick(question)}
                          className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
                        >
                          Answer
                        </button>
                      ) : (
                        <button
                          disabled
                          className="text-white bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-md"
                        >
                          Answered
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* Answer Modal */}
        {isAnswerModalOpen && selectedQuestion && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white rounded-lg p-8 max-w-lg w-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Answer Question</h3>
              <div>

                <p className="text-md text-gray-900 mb-6">{selectedQuestion.text}</p>

                <label htmlFor="answer" className="block text-gray-900 text-sm mb-2">Your Answer:</label>
                <textarea
                  id="answer"
                  name="answer"
                  rows="4"
                  value={values.answer}
                  onChange={changeHandler}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Type your answer here..."
                ></textarea>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setAnswerModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitHandler}
                    className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}