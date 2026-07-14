import os
import json
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv
from langchain_core.messages import AIMessage
from langchain_groq import ChatGroq

from langgraph.graph import StateGraph, START, END, MessagesState

from .prompts import SYSTEM_PROMPT
from .tools import suggest_followups

# Load .env
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
)
def assistant(state: MessagesState):

    user_message = state["messages"][-1].content

    # Get current date from Python
    today = datetime.now().strftime("%Y-%m-%d")

    prompt = f"""
{SYSTEM_PROMPT}

Today's date is: {today}

If the user mentions "today", use the above date.
Always return dates in YYYY-MM-DD format.

User Input:
{user_message}

Return ONLY valid JSON.
"""

    response = llm.invoke(prompt)

    content = response.content.strip()

    # Remove markdown code block if present
    if content.startswith("```json"):
        content = content.replace("```json", "", 1)

    if content.startswith("```"):
        content = content.replace("```", "", 1)

    if content.endswith("```"):
        content = content[:-3]

    content = content.strip()

    try:

        data = json.loads(content)

        # Generate follow-up suggestions
        if data.get("action") == "log_interaction":

            followup_result = suggest_followups.invoke(
                {
                    "interaction": data["interaction"]
                }
            )

            data["followups"] = followup_result["followups"]

    except Exception:

        data = {
            "action": "chat",
            "message": content
        }

    return {
        "messages": [
            AIMessage(
                content=json.dumps(data)
            )
        ]
    }




builder = StateGraph(MessagesState)

builder.add_node("assistant", assistant)

builder.add_edge(START, "assistant")

builder.add_edge("assistant", END)

graph = builder.compile()