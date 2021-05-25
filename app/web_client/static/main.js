class DayStatistic {
  element = document.getElementById("statistic");
  statistic = {};
  filtered_statistic = {};
  ignoreList = [];
  id = "DayStatistic";
  statisticGradesElement = null;
  statisticPointsElement = null;

  newData = (data) => {
    this.statistic = data;
    this.drawStatistic();
  };
  newIgnoreList = (data) => {
    this.ignoreList = data;
    this.drawStatistic();
  };

  drawStatistic = () => {
    this.drawGrades();
    this.drawPoints();
  };
  drawPoints = () => {
    this.clearPointsEElementInPage();
    this.createPointsStatisticElement();
    this.fillPointsStatisticElement();
  };
  clearPointsEElementInPage = () => {
    this.statisticPointsElement?.remove();
  };
  createPointsStatisticElement = () => {
    this.statisticPointsElement = document.createElement("div");

    const simbolsElement = document.createElement("h2");
    simbolsElement.innerText = `Символы: ${this.statistic["simbols"] || '0'}`;

    const linesElement = document.createElement("h2");
    linesElement.innerText = `Строки: ${this.statistic["lines"] || '0'}`;

    const wordsElement = document.createElement("h2");
    wordsElement.innerText = `Слова: ${this.statistic["words"] || '0'}`;

    this.statisticPointsElement.appendChild(simbolsElement);
    this.statisticPointsElement.appendChild(linesElement);
    this.statisticPointsElement.appendChild(wordsElement);

    this.element.appendChild(this.statisticPointsElement);
  };
  fillPointsStatisticElement = () => {};
  drawGrades = () => {
    this.clearGradesElementInPage();
    this.createGradesStatisticElement();
    this.getRounds();
    this.fillGradesStatisticElement();
  };

  getRounds = () => {
    this.maximalValue = Math.max(
      ...Object.keys(this.statistic)
        .filter((element) => !this.ignoreList.includes(element))
        .map((key) => this.statistic[key])
    );
    this.minimalValue = Math.min(
      ...Object.keys(this.statistic)
        .filter((element) => !this.ignoreList.includes(element))
        .map((key) => this.statistic[key])
    );
  };
  fillGradesStatisticElement = () => {
    Object.keys(this.statistic)
      .filter((element) => !this.ignoreList.includes(element))
      .sort((a, b) => this.statistic[b] - this.statistic[a])
      .forEach((item) => {
        const itemElement = document.createElement("li");
        const titleElement = document.createElement("div");
        const countElement = document.createElement("div");
        // itemElement.innerText = `${item}:  ${this.statistic[item]}`;
        itemElement.classList = "statistic-element-item";

        titleElement.classList = "statistic-element-item-title";
        titleElement.innerText = `${item}`;
        countElement.classList = "statistic-element-item-count";

        countElement.style.width =
          10 + (this.statistic[item] / this.maximalValue) * 80 + "%";
        countElement.innerText = `${this.statistic[item]}`;

        itemElement.appendChild(titleElement);
        itemElement.appendChild(countElement);
        this.statisticGradesElement.appendChild(itemElement);
      });
  };

  createGradesStatisticElement = () => {
    this.statisticGradesElement = document.createElement("div");
    this.element.appendChild(this.statisticGradesElement);
  };

  clearGradesElementInPage = () => {
    this.statisticGradesElement?.remove();
  };
}

class Header {
  header = document.getElementById("header");
  list_of_elements = [];
  scroll_element = null;

  new_data = (data) => {
    this.list_of_elements = data;
    this.clear_header();
    this.fill_header();
  };

  clear_header = () => {
    this.scroll_element?.remove;
  };

  fill_header = () => {
    this.scroll_element = document.createElement("div");
    this.scroll_element.classList = "header-scroll";
    this.list_of_elements.forEach((element) => {
      const item = document.createElement("li");
      const button = document.createElement("div");
      button.innerText = element.split(".")[0];
      button.classList = "header-scroll-button";
      button.onclick = () => click_event(element);
      item.appendChild(button);
      this.scroll_element.appendChild(item);
    });
    this.header.appendChild(this.scroll_element);
  };
}

const click_event = (e) => {
  axios
    .get("/get_statistic_by_file_name/" + e)
    .then(function (response) {
      const statistic = response.data;
      dayStatistic.newData(statistic);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const dayStatistic = new DayStatistic();
const headerElement = new Header();
axios
  .get("/get_ignore_list")
  .then(function (response) {
    const statistic = response.data;
    dayStatistic.newIgnoreList(statistic);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// axios
//   .get("/get_statistic")
//   .then(function (response) {
//     const statistic = response.data;
//     dayStatistic.newData(statistic);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   });

axios
  .get("/get_list_of_statistics")
  .then(function (response) {
    const statistic = response.data;
    console.log(statistic);
    headerElement.new_data(statistic);
    click_event(statistic[0])
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
