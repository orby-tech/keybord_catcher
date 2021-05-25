from app.state_controller.controller import StateController
from app.interval import setInterval
import keyboard
import time as _time
import threading


ignore_keys = [
    'ctrl',
    'alt'
]


class KeyStatistic:
    last_cayched = None

    def __init__(self, stateController: StateController) -> None:
        self.stateController = stateController
        # self.thread_of_loop = threading.Thread(target=self.loop,)

        # self.thread_of_loop.start()

        self.loop()

    @setInterval(1)
    def loop(self):
        keyboard.hook(self.add_new_click)
        while True:
            _time.sleep(1e6)

    def add_new_click(self, e) -> None:
        if e.name in ignore_keys:
            return

        if e.name == self.last_cayched:
            return

        if e.name == 'space' and self.last_cayched != 'space':
            self.stateController.new_keys_click(
                {e.name.lower(): 1, 'words': 1})
        if e.name == 'enter' and self.last_cayched != 'enter':
            self.stateController.new_keys_click(
                {e.name.lower(): 1, 'lines': 1})
        else:
            self.stateController.new_keys_click({e.name.lower(): 1})

        self.last_cayched = e.name
