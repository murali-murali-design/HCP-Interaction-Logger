import {useSelector} from "react-redux";
import api from "../services/api";
function InteractionForm() {

  const interaction=useSelector(
    (state)=>state.interaction.interaction
  );

  const saveInteraction = async () => {

    try {

        const response = await api.post(
            "/save",
            interaction
        );

        alert(response.data.message);

    } catch (error) {

        console.error(error);

        alert("Failed to save interaction");

    }

};
  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Interaction Details
        </h2>
      </div>

      {/* HCP Name & Interaction Type */}

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            HCP Name
          </label>

          <input
            type="text"
            value={interaction.hcp_name}
            readOnly
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Interaction Type
          </label>

          <input
            type="text"
            value={interaction.interaction_type}
            readOnly
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
          />
        </div>

      </div>

      {/* Date & Time */}

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date
          </label>

          <input
            type="date"
            value={interaction.interaction_date}
            readOnly
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Time
          </label>

          <input
            type="time"
            value={interaction.interaction_time}
            readOnly
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
          />
        </div>

      </div>
            {/* Attendees */}

            <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Attendees
                </label>

                <textarea
                    rows="2"
                    value={interaction.attendees}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
                />

            </div>

            {/* Topics Discussed */}

            <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Topics Discussed
                </label>

                <textarea
                    rows="5"
                    value={interaction.topics_discussed}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
                />

            </div>

            {/* Materials & Samples */}

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Materials Shared
                    </label>

                    <textarea
                        rows="2"
                        value={interaction.materials_shared}
                        readOnly
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
                    />

                </div>

                <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Samples Distributed
                    </label>

                    <input
                        type="text"
                        value={interaction.samples_distributed}
                        readOnly
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
                    />

                </div>

            </div>

            {/* Sentiment */}

            <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Observed / Inferred HCP Sentiment
                </label>

                <div className="flex gap-8">

                    <label className="flex items-center gap-2">

                        <input
                            type="radio"
                            checked={interaction.sentiment === "Positive"}
                            readOnly
                        />

                        Positive

                    </label>

                    <label className="flex items-center gap-2">

                        <input
                            type="radio"
                            checked={interaction.sentiment === "Neutral"}
                            readOnly
                        />

                        Neutral

                    </label>

                    <label className="flex items-center gap-2">

                        <input
                            type="radio"
                            checked={interaction.sentiment === "Negative"}
                            readOnly
                        />

                        Negative

                    </label>

                </div>

            </div>

             {/* Outcomes */}

            <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Outcomes
                </label>

                <textarea
                    rows="4"
                    value={interaction.outcomes}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
                />

            </div>

            {/* Follow-up Actions */}

            <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Follow-up Actions
                </label>

                <textarea
                    rows="4"
                    value={interaction.follow_up_actions}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
                />

            </div>

            {/* AI Suggestions */}

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

                <h3 className="text-lg font-bold text-blue-700 mb-3">
                    AI Suggested Follow-ups
                </h3>

                <ul className="list-disc ml-6 space-y-2 text-gray-700">

                    <li>Schedule follow-up meeting</li>

                    <li>Share product brochure</li>

                    <li>Email clinical paper</li>

                </ul>

            </div>
            <div className="flex justify-end mt-6">

    <button
        onClick={saveInteraction}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
    >
        Save Interaction
    </button>

</div>

        </div>

    );

}

export default InteractionForm;     