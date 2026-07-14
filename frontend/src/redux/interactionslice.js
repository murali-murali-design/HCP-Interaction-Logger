import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interaction: {
    hcp_name: "",
    interaction_type: "",
    interaction_date: "",
    interaction_time: "",
    attendees: "",
    topics_discussed: "",
    materials_shared: "",
    samples_distributed: "",
    sentiment: "",
    outcomes: "",
    follow_up_actions: "",
  },
};

const interactionSlice = createSlice({
  name: "interaction",

  initialState,

  reducers: {
    setInteraction(state, action) {
      state.interaction = action.payload;
    },

    updateField(state, action) {
      state.interaction[action.payload.field] = action.payload.value;
    },

    clearInteraction(state) {
      state.interaction = initialState.interaction;
    },
  },
});

export const {
  setInteraction,
  updateField,
  clearInteraction,
} = interactionSlice.actions;

export default interactionSlice.reducer;