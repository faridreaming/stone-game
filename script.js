// dom
const levels = document.querySelectorAll(".level");
const changeLevel = document.querySelector(".change-level");
const changeLevelButton = document.querySelector(".change-level-button");
const cancelLevelButton = document.querySelector(".cancel-level-button");
let level = 1;
let infoLevel = document.querySelector(".info-level");
let divGame = document.querySelector(".game");
infoLevel.textContent = `Level ${level}`;

// function restart() {
//   divGame.style.opacity = "0";

//   setTimeout(() => {
//     divGame.textContent = "";
//     divGame.style.opacity = "1";
//     level = 1;
//     infoLevel.textContent = `Level ${level}`;
//   }, 250);
// }

levels.forEach((level) => {
  level.addEventListener("click", () => {
    if (!level.classList.contains("selected")) {
      levels.forEach((level) => {
        if (level.classList.contains("selected")) {
          level.classList.remove("selected");
          level.classList.add("previous-level");
        }
        level.classList.remove("temp-selected");
      });
      level.classList.add("temp-selected");
      changeLevel.style.display = "flex";
      setTimeout(() => {
        changeLevel.style.opacity = "1";
      }, 100);
    }
  });
});

let rowLength = 6;
let rows = [];

let generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let shiftElement = (arr, times, direction) => {
  if (times === 0) return arr;
  const n = arr.length;
  times %= n; // Menggunakan modulo untuk menghindari pergeseran berulang
  if (times < 0) times += n; // Menyesuaikan nilai times jika negatif

  let shifted = [...arr];
  for (let i = 0; i < times; i++) {
    if (direction === "r") {
      let lastElement = shifted.pop();
      shifted.unshift(lastElement);
    } else if (direction === "l") {
      let firstElement = shifted.shift();
      shifted.push(firstElement);
    }
  }
  return shifted;
};

// inisialisasi baris berdasarkan level
for (let i = 0; i < level + 1; i++) {
  let row = [];
  for (let j = 0; j < rowLength; j++) {
    row.push(generateRandomNumber(1, 3));
  }
  // console.log("Number of rows:", rows.length);
  rows.push(row);
}

// buat 3 angka dari penjumlahan beberapa kolom dan baris sebagai angka final
let expectedResults = [];
for (let i = 0; i < rowLength; i += 2) {
  let result = 0;
  for (let j = 0; j < rows.length; j++) {
    result += rows[j][i];
  }
  expectedResults.push(result);
}

for (i in rows) {
  rows[i] = shiftElement(rows[i], generateRandomNumber(3, 12), "l");
}

let rowResults = [];
for (let i = 0; i < rowLength; i += 2) {
  let result = 0;
  for (let j = 0; j < rows.length; j++) {
    result += rows[j][i];
  }
  rowResults.push(result);
}

let sameResult = 0;
for (let i in rowResults) {
  if (rowResults[i] == expectedResults[i]) sameResult++;
}

while (sameResult >= 2) {
  for (i in rows) {
    rows[i] = shiftElement(rows[i], generateRandomNumber(3, 12), "l");
  }

  rowResults = [];
  for (let i = 0; i < rowLength; i += 2) {
    let result = 0;
    for (let j = 0; j < rows.length; j++) {
      result += rows[j][i];
    }
    rowResults.push(result);
  }

  sameResult = 0;
  for (let i in rowResults) {
    if (rowResults[i] == expectedResults[i]) sameResult++;
  }
}

const thunder = document.querySelectorAll(".thunder");
thunder.forEach((el, i) => {
  el.textContent = expectedResults[i];
});

const row1 = document.querySelectorAll(".row-1>*");
row1.forEach((el, i) => {
  el.textContent = rows[0][i];
});

const row2 = document.querySelectorAll(".row-2>*");
row2.forEach((el, i) => {
  el.textContent = rows[1][i];
});

let answer = [];
[...document.querySelectorAll(".row-1, .row-2")].forEach((el) => {
  let rowElements = [];
  [...el.children].forEach((childEl) => {
    rowElements.push(childEl.textContent);
  });
  answer.push(rowElements);
});

for (let i in expectedResults) {
  if (expectedResults[i] == rowResults[i]) {
    // console.log("same");
    thunder[i].classList.add("correct");
  }
}

answer = answer.map((row) => {
  const indicesToFilter = [1, 3, 5];
  return row.filter((_, index) => !indicesToFilter.includes(index));
});

let yourAnswer = [];
for (let i in answer[0]) {
  let sum = 0;
  for (let j in answer) {
    sum += parseInt(answer[j][i]);
  }
  yourAnswer.push(sum);
}

function activate() {
  this.classList.toggle("active");
  // if (document.querySelectorAll(".row.active").length !== 0) {
  //   document.querySelectorAll(".control-button>*").forEach((button) => {
  //     // button.style.height = "5.5rem";
  //     setTimeout(() => {
  //       button.style.opacity = "1";
  //     }, 125);
  //   });
  // } else {
  //   document.querySelectorAll(".control-button>*").forEach((button) => {
  //     button.style.opacity = "0";
  //     // setTimeout(() => {
  //     //   button.style.height = "0";
  //     // }, 125);
  //   });
  // }
}

document.querySelectorAll(".row").forEach((el) => {
  el.addEventListener("click", activate);
});

const playElement = document.querySelector(".play");

playElement.addEventListener("click", (event) => {
  if (event.target === playElement.querySelector(".game")) {
    document.querySelectorAll(".row-1, .row-2, .row-3, .row-4").forEach((el) => {
      el.classList.remove("active");
    });
  }
});

cancelLevelButton.addEventListener("click", () => {
  levels.forEach((level) => {
    if (level.classList.contains("previous-level")) {
      levels.forEach((level) => {
        level.classList.remove("temp-selected");
      });
      level.classList.remove("previous-level");
      level.classList.add("selected");
    }
  });
  changeLevel.style.opacity = "0";
  setTimeout(() => {
    changeLevel.style.display = "none";
  }, 100);
  level = parseInt([...levels].find((level) => level.classList.contains("selected")).textContent);
  infoLevel.textContent = `Level ${level}`;
});

changeLevelButton.addEventListener("click", () => {
  // document.querySelectorAll(".control-button>*").forEach((el) => {
  //   el.style.opacity = "0";
  // });

  document.querySelectorAll(".row").forEach((el) => {
    el.classList.remove("active");
  });

  divGame.style.transition = ".25s";
  divGame.style.opacity = "0";

  levels.forEach((level) => {
    if (level.classList.contains("temp-selected")) {
      levels.forEach((level) => {
        level.classList.remove("previous-level");
      });
      level.classList.remove("temp-selected");
      level.classList.add("selected");
    }
  });
  changeLevel.style.opacity = "0";
  setTimeout(() => {
    changeLevel.style.display = "none";
  }, 100);
  level = parseInt([...levels].find((level) => level.classList.contains("selected")).textContent);
  infoLevel.textContent = `Level ${level}`;

  // level 1 coy
  if (level == 1) {
    rows = [];

    for (let i = 0; i < level + 1; i++) {
      let row = [];
      for (let j = 0; j < rowLength; j++) {
        row.push(generateRandomNumber(1, 3));
      }
      rows.push(row);
    }

    let expectedResults = [];
    for (let i = 0; i < rowLength; i += 2) {
      let result = 0;
      for (let j = 0; j < rows.length; j++) {
        result += rows[j][i];
      }
      expectedResults.push(result);
    }

    for (i in rows) {
      rows[i] = shiftElement(rows[i], generateRandomNumber(3, 12), "l");
    }

    let rowResults = [];
    for (let i = 0; i < rowLength; i += 2) {
      let result = 0;
      for (let j = 0; j < rows.length; j++) {
        result += rows[j][i];
      }
      rowResults.push(result);
    }

    let sameResult = 0;
    for (let i in rowResults) {
      if (rowResults[i] == expectedResults[i]) sameResult++;
    }

    while (sameResult >= 2) {
      for (i in rows) {
        rows[i] = shiftElement(rows[i], generateRandomNumber(3, 12), "l");
      }

      rowResults = [];
      for (let i = 0; i < rowLength; i += 2) {
        let result = 0;
        for (let j = 0; j < rows.length; j++) {
          result += rows[j][i];
        }
        rowResults.push(result);
      }

      sameResult = 0;
      for (let i in rowResults) {
        if (rowResults[i] == expectedResults[i]) sameResult++;
      }
    }
    setTimeout(() => {
      divGame.textContent = "";
      function createRow(className, columnCount) {
        let divRow = document.createElement("div");
        divRow.className = className;
        for (let i = 1; i <= columnCount; i++) {
          let divColumn = document.createElement("div");
          divColumn.className = `white-thunder column-${i}`;
          divColumn.textContent = i;
          divRow.appendChild(divColumn);
        }
        return divRow;
      }

      let center = document.createElement("div");
      center.className = "center";
      for (let i = 1; i <= 3; i++) {
        let divResult = document.createElement("div");
        divResult.className = `thunder result-${i}`;
        divResult.textContent = expectedResults[i - 1];
        center.appendChild(divResult);
      }

      let divRow1 = createRow("row row-1", 6);
      let divRow2 = createRow("row row-2", 6);

      divGame.style.height = "20rem";
      divGame.append(center, divRow1, divRow2);

      [".row-1", ".row-2"].forEach((selector, index) => {
        document.querySelectorAll(`${selector} > *`).forEach((el, i) => {
          el.textContent = rows[index][i];
        });
      });
    }, 250);

    setTimeout(() => {
      let answer = [];
      [...document.querySelectorAll(".row-1, .row-2")].forEach((el) => {
        let rowElements = [];
        [...el.children].forEach((childEl) => {
          rowElements.push(childEl.textContent);
        });
        answer.push(rowElements);
      });

      answer = answer.map((row) => {
        const indicesToFilter = [1, 3, 5];
        return row.filter((_, index) => !indicesToFilter.includes(index));
      });

      let yourAnswer = [];
      for (let i in answer[0]) {
        let sum = 0;
        for (let j in answer) {
          sum += parseInt(answer[j][i]);
        }
        yourAnswer.push(sum);
      }

      const thunder = document.querySelectorAll(".thunder");
      for (let i in expectedResults) {
        if (expectedResults[i] == yourAnswer[i]) {
          // console.log("same");
          thunder[i].classList.add("correct");
        }
      }
    }, 250);
  }
  // level 2 coy
  else if (level == 2) {
    rows = [];

    for (let i = 0; i < level + 1; i++) {
      let row = [];
      for (let j = 0; j < rowLength; j++) {
        row.push(generateRandomNumber(1, 3));
      }
      rows.push(row);
    }

    let expectedResults = [];
    for (let i = 0; i < rowLength; i += 2) {
      let result = 0;
      for (let j = 0; j < rows.length; j++) {
        result += rows[j][i];
      }
      expectedResults.push(result);
    }

    for (i in rows) {
      rows[i] = shiftElement(rows[i], generateRandomNumber(3, 12), "l");
    }

    let rowResults = [];
    for (let i = 0; i < rowLength; i += 2) {
      let result = 0;
      for (let j = 0; j < rows.length; j++) {
        result += rows[j][i];
      }
      rowResults.push(result);
    }

    let sameResult = 0;
    for (let i in rowResults) {
      if (rowResults[i] == expectedResults[i]) sameResult++;
    }

    while (sameResult >= 2) {
      for (i in rows) {
        rows[i] = shiftElement(rows[i], generateRandomNumber(3, 12), "l");
      }

      rowResults = [];
      for (let i = 0; i < rowLength; i += 2) {
        let result = 0;
        for (let j = 0; j < rows.length; j++) {
          result += rows[j][i];
        }
        rowResults.push(result);
      }

      sameResult = 0;
      for (let i in rowResults) {
        if (rowResults[i] == expectedResults[i]) sameResult++;
      }
    }

    setTimeout(() => {
      divGame.textContent = "";
      function createRow(className, columnCount) {
        let divRow = document.createElement("div");
        divRow.className = className;
        for (let i = 1; i <= columnCount; i++) {
          let divColumn = document.createElement("div");
          divColumn.className = `white-thunder column-${i}`;
          divColumn.textContent = i;
          divRow.appendChild(divColumn);
        }
        return divRow;
      }

      let center = document.createElement("div");
      center.className = "center";
      for (let i = 1; i <= 3; i++) {
        let divResult = document.createElement("div");
        divResult.className = `thunder result-${i}`;
        divResult.textContent = expectedResults[i - 1];
        center.appendChild(divResult);
      }

      let divRow1 = createRow("row row-1", 6);
      let divRow2 = createRow("row row-2", 6);
      let divRow3 = createRow("row row-3", 6);

      divGame.style.height = "25rem";
      divGame.append(center, divRow1, divRow2, divRow3);

      [".row-1", ".row-2", ".row-3"].forEach((selector, index) => {
        document.querySelectorAll(`${selector} > *`).forEach((el, i) => {
          el.textContent = rows[index][i];
        });
      });
    }, 250);

    setTimeout(() => {
      let answer = [];
      [...document.querySelectorAll(".row-1, .row-2, .row-3")].forEach((el) => {
        let rowElements = [];
        [...el.children].forEach((childEl) => {
          rowElements.push(childEl.textContent);
        });
        answer.push(rowElements);
      });

      answer = answer.map((row) => {
        const indicesToFilter = [1, 3, 5];
        return row.filter((_, index) => !indicesToFilter.includes(index));
      });

      let yourAnswer = [];
      for (let i in answer[0]) {
        let sum = 0;
        for (let j in answer) {
          sum += parseInt(answer[j][i]);
        }
        yourAnswer.push(sum);
      }

      const thunder = document.querySelectorAll(".thunder");
      for (let i in expectedResults) {
        if (expectedResults[i] == yourAnswer[i]) {
          // console.log("same");
          thunder[i].classList.add("correct");
        }
      }
    }, 250);
  }
  // level 3 coy
  else if (level == 3) {
    rows = [];

    for (let i = 0; i < level + 1; i++) {
      let row = [];
      for (let j = 0; j < rowLength; j++) {
        row.push(generateRandomNumber(1, 3));
      }
      rows.push(row);
    }

    let expectedResults = [];
    for (let i = 0; i < rowLength; i += 2) {
      let result = 0;
      for (let j = 0; j < rows.length; j++) {
        result += rows[j][i];
      }
      expectedResults.push(result);
    }

    for (i in rows) {
      rows[i] = shiftElement(rows[i], generateRandomNumber(3, 12), "l");
    }

    let rowResults = [];
    for (let i = 0; i < rowLength; i += 2) {
      let result = 0;
      for (let j = 0; j < rows.length; j++) {
        result += rows[j][i];
      }
      rowResults.push(result);
    }

    let sameResult = 0;
    for (let i in rowResults) {
      if (rowResults[i] == expectedResults[i]) sameResult++;
    }

    while (sameResult >= 2) {
      for (i in rows) {
        rows[i] = shiftElement(rows[i], generateRandomNumber(3, 12), "l");
      }

      rowResults = [];
      for (let i = 0; i < rowLength; i += 2) {
        let result = 0;
        for (let j = 0; j < rows.length; j++) {
          result += rows[j][i];
        }
        rowResults.push(result);
      }

      sameResult = 0;
      for (let i in rowResults) {
        if (rowResults[i] == expectedResults[i]) sameResult++;
      }
    }

    setTimeout(() => {
      divGame.textContent = "";
      function createRow(className, columnCount) {
        let divRow = document.createElement("div");
        divRow.className = className;
        for (let i = 1; i <= columnCount; i++) {
          let divColumn = document.createElement("div");
          divColumn.className = `white-thunder column-${i}`;
          divColumn.textContent = i;
          divRow.appendChild(divColumn);
        }
        return divRow;
      }

      let center = document.createElement("div");
      center.className = "center";
      for (let i = 1; i <= 3; i++) {
        let divResult = document.createElement("div");
        divResult.className = `thunder result-${i}`;
        divResult.textContent = expectedResults[i - 1];
        center.appendChild(divResult);
      }

      let divRow1 = createRow("row row-1", 6);
      let divRow2 = createRow("row row-2", 6);
      let divRow3 = createRow("row row-3", 6);
      let divRow4 = createRow("row row-4", 6);

      divGame.style.height = "30rem";
      divGame.append(center, divRow1, divRow2, divRow3, divRow4);

      [".row-1", ".row-2", ".row-3", ".row-4"].forEach((selector, index) => {
        document.querySelectorAll(`${selector} > *`).forEach((el, i) => {
          el.textContent = rows[index][i];
        });
      });
    }, 250);

    setTimeout(() => {
      let answer = [];
      [...document.querySelectorAll(".row-1, .row-2")].forEach((el) => {
        let rowElements = [];
        [...el.children].forEach((childEl) => {
          rowElements.push(childEl.textContent);
        });
        answer.push(rowElements);
      });

      answer = answer.map((row) => {
        const indicesToFilter = [1, 3, 5];
        return row.filter((_, index) => !indicesToFilter.includes(index));
      });

      let yourAnswer = [];
      for (let i in answer[0]) {
        let sum = 0;
        for (let j in answer) {
          sum += parseInt(answer[j][i]);
        }
        yourAnswer.push(sum);
      }

      const thunder = document.querySelectorAll(".thunder");
      for (let i in expectedResults) {
        if (expectedResults[i] == yourAnswer[i]) {
          // console.log("same");
          thunder[i].classList.add("correct");
        }
      }
    }, 250);
  }

  // document.querySelectorAll(".row").forEach((el) => {
  //   el.addEventListener("click", activate);
  // });
  // document.querySelectorAll(".row").forEach((el) => {
  //   el.removeEventListener("click", activate);
  // });

  setTimeout(() => {
    document.querySelectorAll(".row").forEach((el) => {
      el.addEventListener("click", activate);
    });
    divGame.style.opacity = "1";
    const msgContainer = document.querySelector(".msg-container");
    msgContainer.style.opacity = "0";
    msgContainer.style.height = "0";
  }, 250);
});

// control button handling
const leftControlButton = document.querySelector(".control-button .left");
const rightControlButton = document.querySelector(".control-button .right");

let leftClicked = false;
let rightClicked = false;

function handleButtonClick(shiftDirection) {
  if (leftClicked || rightClicked) return;

  const direction = shiftDirection === "left" ? "l" : "r";

  // Mendapatkan semua elemen yang aktif
  const activeStones = document.querySelectorAll(".active");

  activeStones.forEach((activeStone) => {
    const activeRowIndex = Number(activeStone.classList[1].split("-")[1]) - 1;

    // Menggeser elemen dari rows berdasarkan elemen yang aktif saja
    rows[activeRowIndex] = shiftElement(rows[activeRowIndex], 1, direction);

    // Memperbarui tampilan elemen yang aktif saja
    const divs = Array.from(activeStone.childNodes).filter((node) => node.nodeName === "DIV");

    divs.forEach((div, number) => {
      div.style.transition = `transform .5s`;
      div.classList.add(`moved-${shiftDirection}`);

      setTimeout(() => {
        div.style.transition = "filter .25s";
        div.classList.remove(`moved-${shiftDirection}`);
        div.textContent = rows[activeRowIndex][number];
      }, 500);
    });
  });

  if (shiftDirection === "left") {
    leftClicked = true;
    setTimeout(() => {
      leftClicked = false;
    }, 1000); // Setelah semua animasi selesai
  } else {
    rightClicked = true;
    setTimeout(() => {
      rightClicked = false;
    }, 1000); // Setelah semua animasi selesai
  }

  setTimeout(() => {
    let expectedResults = [...document.querySelectorAll(".center>*")].map((el) => parseInt(el.textContent));

    let answer = [];
    [...document.querySelectorAll(".row-1, .row-2, .row-3, .row-4")].forEach((el) => {
      let rowElements = [];
      [...el.children].forEach((childEl) => {
        rowElements.push(childEl.textContent);
      });
      answer.push(rowElements);
    });

    answer = answer.map((row) => {
      const indicesToFilter = [1, 3, 5];
      return row.filter((_, index) => !indicesToFilter.includes(index));
    });

    let yourAnswer = [];
    for (let i in answer[0]) {
      let sum = 0;
      for (let j in answer) {
        sum += parseInt(answer[j][i]);
      }
      yourAnswer.push(sum);
    }

    let correctCount = 0;
    const thunder = document.querySelectorAll(".thunder");
    for (let i in expectedResults) {
      if (expectedResults[i] == yourAnswer[i]) {
        // console.log("same");
        thunder[i].classList.add("correct");
        correctCount++;
      } else {
        thunder[i].classList.remove("correct");
      }
    }

    if (correctCount == 3) {
      const rows = document.querySelectorAll(".row");
      // const columns = document.querySelectorAll(".white-thunder");

      rows.forEach((row) => {
        row.removeEventListener("click", activate);
      });

      // columns.forEach((column) => {
      //   column.removeEventListener("click", activate);
      // });

      setTimeout(() => {
        document.querySelector(".control-button").style.padding = "0";
      }, 125);

      const msgContainer = document.querySelector(".msg-container");

      setTimeout(() => {
        msgContainer.style.opacity = "1";
        msgContainer.style.height = "175.215px";
      }, 250);

      document.querySelectorAll(".row>*").forEach((el) => {
        el.style.filter = "none";
      });

      [1, 3, 5].forEach((i) => {
        document.querySelectorAll(`.column-${i}`).forEach((el) => {
          el.style.backgroundImage = "url(assets/thunder.svg)";
          el.style.filter = "drop-shadow(0 0 .125rem #FFFFFF) drop-shadow(0 0 .125rem #FFFFFF) drop-shadow(0 0 .25rem #FFDB47) drop-shadow(0 0 .25rem #FFDB47)";
        });
      });

      document.querySelectorAll(".row").forEach((el) => {
        el.removeEventListener("click", activate);
        el.classList.remove("active");
      });

      document.querySelector(".msg-button").addEventListener("click", () => {
        correctCount = 0;
        changeLevelButton.click();
        msgContainer.style.opacity = "0";
        msgContainer.style.height = "0";
      });
    }
  }, 500);
}

leftControlButton.addEventListener("click", () => handleButtonClick("right"));
rightControlButton.addEventListener("click", () => handleButtonClick("left"));

// document.querySelector("div.level3").click();
// changeLevelButton.click();
// setTimeout(() => {
//   document.querySelector("div.row-4").classList.add("active");
//   // document.querySelector(".left").click();
// }, 500);

// level = 2;

// if (level == 2) {
//   let divRow3 = document.createElement("div");
//   divRow3.className = "row row-3";

//   for (let i = 1; i <= 6; i++) {
//     let divColumn = document.createElement("div");
//     divColumn.className = `white-thunder column-${i}`;
//     divColumn.textContent = i;
//     divRow3.appendChild(divColumn);
//   }

//   setTimeout(() => {
//     divGame.style.height = "25rem";
//     divGame.appendChild(divRow3);

//     let row = document.querySelector(".row-3");
//     row.addEventListener("click", () => {
//       row.classList.toggle("active");
//     });
//     // row.classList.add("active");
//     console.log(divRow3);
//     divGame.style.opacity = "1";
//   }, 250);
// }
