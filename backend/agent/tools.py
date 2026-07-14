from langchain_core.tools import tool


@tool
def log_interaction(interaction: dict):
    """Log a new interaction."""
    return {
        "status": "success",
        "interaction": interaction,
    }


@tool
def edit_interaction(interaction: dict, field: str, value: str):
    """Edit one interaction field."""

    interaction[field] = value

    return {
        "status": "updated",
        "interaction": interaction,
    }


@tool
def validate_interaction(interaction: dict):
    """
    Validate the interaction before saving.
    """

    required_fields = [
        "hcp_name",
        "interaction_type",
        "topics_discussed",
        "sentiment"
    ]

    missing_fields = []

    for field in required_fields:

        value = interaction.get(field)

        if value is None or str(value).strip() == "":
            missing_fields.append(field)

    if missing_fields:

        return {
            "valid": False,
            "missing_fields": missing_fields,
            "message": f"Missing fields: {', '.join(missing_fields)}"
        }

    return {
        "valid": True,
        "message": "Interaction is valid."
    }

@tool
def suggest_followups(interaction: dict):
    """
    Generate follow-up suggestions based on the interaction.
    """

    suggestions = []

    sentiment = interaction.get("sentiment", "").lower()
    interaction_type = interaction.get("interaction_type", "").lower()
    topics = interaction.get("topics_discussed", "")

    if sentiment == "positive":
        suggestions.append("Schedule a follow-up meeting next week.")
        suggestions.append("Share the latest clinical study.")
        suggestions.append("Send product brochure via email.")

    elif sentiment == "neutral":
        suggestions.append("Arrange another discussion.")
        suggestions.append("Share additional product information.")

    elif sentiment == "negative":
        suggestions.append("Understand the HCP's concerns.")
        suggestions.append("Provide supporting clinical evidence.")

    if interaction_type == "meeting":
        suggestions.append("Record meeting minutes.")

    if topics:
        suggestions.append(f"Prepare additional information about {topics}.")

    return {
        "followups": suggestions
    }

@tool
def save_interaction_tool(interaction: dict):
    """
    Prepare interaction for saving.
    """

    return {
        "ready": True,
        "interaction": interaction
    }