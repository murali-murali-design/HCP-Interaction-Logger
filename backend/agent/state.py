from typing import TypedDict, Annotated
from langgraph.interaction_graph.message import add_messages


class InteractionState(TypedDict):
    messages: Annotated[list, add_messages]
    interaction_data: dict
    response: str