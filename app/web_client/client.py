from app.state_controller.controller import StateController
from typing import Any
from flask import Flask, render_template
import json
app = Flask(__name__)
# app.debug = True


class Client:

    def __init__(self, stateController: StateController) -> None:
        self.stateController = stateController
        self.listeners()
        app.run()

    def listeners(self):
        @app.route('/')
        def start_page():
            return render_template('page.html')

        @app.route('/get_statistic/')
        def get_statistic():
            return json.dumps(self.stateController.get_statistic())

        @app.route('/get_statistic_by_file_name/<file_name>')
        def get_statistic_by_file_name(file_name):
            return json.dumps(self.stateController.get_statistic_by_file_name(file_name))

        @app.route('/get_ignore_list/')
        def get_ignore_list():
            return json.dumps(self.stateController.get_ignore_list())

        @app.route('/get_list_of_statistics/')
        def get_list_of_statistics():
            return json.dumps(self.stateController.get_list_of_statistics())
