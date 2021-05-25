from app.catcher.catcher import KeyStatistic
from app.state_controller.controller import StateController
from app.web_client.client import Client

import logging

logging.basicConfig(filename=r'.\debug\debug.log', level=logging.DEBUG)
try:

    stateController = StateController()
    keyStatistic = KeyStatistic(stateController)
    client = Client(stateController)

except Exception as e:
    logging.exception(str(e))
    raise
