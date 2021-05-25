from collections import Counter
from ..interval import setInterval
import json
from datetime import datetime
import os
from ..config import statistic_path


class StateController:
    updated = False
    file_name = ''

    def __init__(self) -> None:
        self.update_statistic_of_day()
        self.writer()

    def update_statistic_of_day(self):
        self.file_name = self.get_file_name()
        file_content = self.read_file(self.file_name)

        self.statistic_of_day = Counter(file_content)

    @setInterval(10)
    def writer(self):
        self.check_new_day()

        statistic_to_save = self.get_statistic()
        file_name = self.get_file_name()
        self.write_to_file(file_name, statistic_to_save)
        self.updated = False

    def new_keys_click(self, events):
        self.check_new_day()

        self.updated = True
        self.statistic_of_day += Counter(events)
        self.statistic_of_day += Counter({'simbols': 1})

    def check_new_day(self):
        if self.file_name != self.get_file_name():
            self.update_statistic_of_day()
            self.file_name = self.get_file_name()

    def print_statistic(self):
        print(self.statistic_of_day)

    def get_file_name(self):
        return datetime.today().strftime('%d_%m_%Y') + '.json'

    def get_statistic(self):
        return dict(self.statistic_of_day.most_common(20))

    def get_statistic_by_file_name(self, file_name):
        return dict(Counter(self.read_file(file_name)).most_common(20))

    def get_ignore_list(self):
        return ['lines', 'words', 'simbols']

    def get_list_of_statistics(self):
        return list(reversed(os.listdir(statistic_path)))

    def read_file(self, file_name):
        try:
            f = open('statistic\\' + file_name, 'r')
            stat = json.loads(f.read())
            f.close()
            return stat
        except FileNotFoundError:
            return {}
        except Exception as e:
            print(e)

    def write_to_file(self, file_name, statistic_to_save):
        f = open('statistic\\' + file_name, 'w')
        json.dump(statistic_to_save, f)
        f.close()
