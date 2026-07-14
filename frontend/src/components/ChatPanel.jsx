import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInteraction } from "../redux/interactionSlice";
import api from "../services/api";

function ChatPanel() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await api.post("/chat", {
        message,
      });

      // Save interaction in Redux
      if (response.data.interaction) {
        dispatch(setInteraction(response.data.interaction));
      }
      if (response.data.action === "edit_interaction") {

    dispatch({
        type: "interaction/updateField",
        payload: {
            field: response.data.field,
            value: response.data.value,
        },
    });

}


      // Show chat messages
      setChat((prev) => [
        ...prev,
        {
          role: "user",
          text: message,
        },
        {
          role: "assistant",
          text:
            response.data.message ||
            JSON.stringify(response.data, null, 2),
        },
      ]);

      setMessage("");
    } catch (error) {
      console.error(error);

      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          🤖 AI Assistant
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Describe your interaction with the HCP.
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto border rounded-xl p-4 bg-gray-50">
        {chat.length === 0 && (
          <div className="text-gray-500 text-sm">
            Example:
            <br />
            <br />
            Met Dr. Sharma today.
            <br />
            Discussed OnceoBoost.
            <br />
            Shared brochure.
            <br />
            Positive discussion.
            <br />
            Follow up next week.
          </div>
        )}

        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-[90%] px-4 py-3 rounded-xl ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              <pre className="whitespace-pre-wrap text-sm">
                {msg.text}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <textarea
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe the HCP interaction..."
        className="mt-4 w-full border rounded-lg p-3 resize-none"
      />

      <button
        onClick={sendMessage}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold"
      >
        Send
      </button>
    </div>
  );
}

export default ChatPanel;