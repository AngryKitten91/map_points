window.onload = function () {
  const colorArray = [
    "#9e0142",
    "#d53e4f",
    "#f46d43",
    "#fdae61",
    "#fee08b",
    "#e6f598",
    "#abdda4",
    "#66c2a5",
    "#3288bd",
    "#5e4fa2",
  ];
  const teamNames = [
    "Manhattan",
    "Chinatown",
    "Fargo",
    "Zodiac",
    "Django",
    "Barbie",
    "Ohio",
    "Amadeus",
    "Rebecca",
    "Shrek",
  ];

  let circlesCollection = {};
  let colorDeclaration = {};
  let finishScreenDisplayed = false;
  const svgElement = document.getElementById("poland"); // Zmień 'mojSvg' na id swojego elementu SVG
  const svgPath = document.querySelectorAll(".path");
  const finishScreen = document.querySelector(".finish-screen");
  // const btnContainer = document.querySelector(".button-cointainer");

  const btnContainerLeft = document.querySelector(".fixed-left");
  const btnContainerRight = document.querySelector(".fixed-right");

  const colorBlack = "#000";
  const colorRed = "red";
  const colorShrek = "#c5ee7d";
  const colorBarbie = "#E0218A";
  const addButtonColor = "#28B463";
  const minusButtonColor = "#E74C3C";

  const pointLimit = 100;
  const sideButtonLimit = 5;
  const limitX = 1000;
  const limitY = 948;
  const circleSize = 30;
  const safeBuffer = 50;

  // svgElement.addEventListener("click", function (e) {
  //   console.log(e.target);
  //   console.log(isPointInsideObject(e.target, point));
  // });

  // * CREATE BUTTONS
  let titles = shuffle(teamNames);
  colorArray.forEach(function (e, i) {
    const newBtn = createButtons(e, i, titles);
    if (i < sideButtonLimit) {
      btnContainerLeft.innerHTML += newBtn;
    } else {
      btnContainerRight.innerHTML += newBtn;
    }
  });
  // console.log(colorDeclaration);

  // * ADD EVENT LISTENER TO PLUS BUTTONS
  const btnPlus = document.querySelectorAll(".btn-plus");

  btnPlus.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
      const color = e.target.dataset.color;
      const score = e.target.dataset.score;
      const name = e.target.dataset.name;

      let paragraph = document.getElementById(score);

      if (+paragraph.innerText < pointLimit) {
        createInsideCircle(svgElement, limitX, limitY, color, e);
        const actualScore = circlesCollection[name]
          ? circlesCollection[name].length
          : 0;
        paragraph.innerText = actualScore;
        svgElement.lastChild.classList.add("circle-regular");
        // let value = Number(paragraph.innerText) + 1;
        // console.log(value);
        // console.log(actualScore);
      }
    });
  });

  // * ADD EVENT LISTENER TO MINUS BUTTONS
  const brtnMinus = document.querySelectorAll(".btn-minus");

  brtnMinus.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
      const targetName = e.target.dataset.name;
      const score = e.target.dataset.score;
      let paragraph = document.getElementById(score);

      let targetCollection = circlesCollection[targetName];
      // console.log(circlesCollection[targetName][0].classList);

      if (
        targetCollection &&
        targetCollection.length > 0 &&
        targetCollection[targetCollection.length - 1].classList[1] !==
          "circle-black"
      ) {
        let removeLastElement = targetCollection.pop();
        removeLastElement.classList.add("fade-out");
        setTimeout(function () {
          removeLastElement.remove();
        }, 1000);
        const actualScore = circlesCollection[targetName]
          ? circlesCollection[targetName].length
          : 0;
        paragraph.innerText = actualScore;
      }
    });
  });

  // * highlight on hover
  const teamTitle = document.querySelectorAll(".team-title");
  teamTitle.forEach(function (elem) {
    elem.addEventListener("mouseenter", function (e) {
      let target = e.target.dataset.name;
      if (circlesCollection[target]) {
        circlesCollection[target].forEach(function (element) {
          if (element.getAttribute("fill") !== colorBlack) {
            // element.setAttribute("stroke", colorRed);
            // element.setAttribute("fill", colorRed);
            element.classList.add("highlight");
          }
        });
      }
    });
  });

  // * Remove highlight
  teamTitle.forEach(function (elem) {
    elem.addEventListener("mouseleave", function (e) {
      let target = e.target.dataset.name;
      let color = e.target.dataset.color;
      if (circlesCollection[target]) {
        circlesCollection[target].forEach(function (element) {
          if (element.getAttribute("fill") !== colorBlack) {
            // element.setAttribute("stroke", colorBlack);
            // element.setAttribute("fill", color);
            element.classList.remove("highlight");
          }
        });
      }
    });
  });

  // * Z - color change
  document.addEventListener("keyup", (event) => {
    if (event.code === "KeyZ") {
      switchColors(circlesCollection);
    }
  });

  // * F - finish
  document.addEventListener("keyup", (event) => {
    if (event.code === "KeyF") {
      if (finishScreenDisplayed) {
        finishScreenDisplayed = false;
        finishScreen.innerHTML = "";
      } else {
        let finalScreen = `
        <div class="logo-container fade-in flex flex-align-content-center">
            <img class="block img-responsive" src="img/logo-placeholder.png" alt="" srcset="" />
        </div>
        `;
        finishScreen.innerHTML += finalScreen;
        const container = document.querySelector(".logo-container");
        // const container = document.querySelector(".finish-screen");
        const fireworks = new Fireworks.default(container);
        setTimeout(function () {
          // fireworks.start();
          fireworks.launch(20);
          setTimeout(function () {
            fireworks.launch(20);
            setTimeout(function () {
              fireworks.launch(20);
            }, 3000);
          }, 3000);
        }, 3000);
        finishScreenDisplayed = true;
      }
    }
  });

  function switchColors(object) {
    let keys = Object.keys(object);
    keys.forEach(function (team) {
      object[team].forEach(function (e) {
        const color = e.getAttribute("fill");
        // const stroke = e.getAttribute("stroke");
        if (color !== colorBlack) {
          setTimeout(function () {
            e.setAttribute("stroke", colorDeclaration[team]);
            e.setAttribute("fill", colorBlack);
            e.classList.remove("highlight");
            e.classList.add("circle-black");
          }, rand(500, 1000));
        } else {
          // svgElement.removeChild(e);
        }
      });
    });
  }

  function createButtons(color, index, title) {
    let newColor = color;
    if (title[index] === "Barbie") {
      newColor = colorBarbie;
    } else if (title[index] === "Shrek") {
      newColor = colorShrek;
    }
    colorDeclaration[title[index]] = newColor;
    if (index < 5) {
      let leftBtnScheme = `<div class="button-wrapper">
      <div class="flex-start">
      <div style="background-color:${newColor}" class="color-info "></div>
      <p class="team-title title-left " data-name="${
        title[index]
      }" data-score="score${index}" data-color="${newColor}">${title[
        index
      ].toUpperCase()}</p>
      </div>
      <div class="flex">
      <button style="background-color:${minusButtonColor}" data-name="${
        title[index]
      }" data-score="score${index}" data-color="${newColor}" class="btn btn-minus glow-on-hover">
        -
      </button>
      <button style="background-color:${addButtonColor}" data-name="${
        title[index]
      }" data-score="score${index}" data-color="${newColor}" class="btn btn-plus glow-on-hover">
        +
      </button>
      <p id="score${index}" class="score">0</p>
      </div>
      </div>`;
      return leftBtnScheme;
    } else {
      let rightBtnScheme = `<div class="button-wrapper">
      <div class="flex-end">
      <p class="team-title title-left" data-name="${
        title[index]
      }" data-score="score${index}" data-color="${newColor}">${title[
        index
      ].toUpperCase()}</p>
      <div style="background-color:${newColor}" class="color-info"></div>
      </div>
      <div class="flex">
      <p id="score${index}" class="score">0</p>
      <button style="background-color:${addButtonColor}" data-name="${
        title[index]
      }" data-score="score${index}" data-color="${newColor}" class="btn btn-plus glow-on-hover">
      +
      </button>
      <button style="background-color:${minusButtonColor}" data-name="${
        title[index]
      }" data-score="score${index}" data-color="${newColor}" class="btn btn-minus glow-on-hover">
        -
      </button>
      </div>
      </div>`;
      return rightBtnScheme;
    }
  }

  function createInsideCircle(svgElement, limitX, limitY, color, event) {
    let isCoordRight = false;
    let counter = 0;

    while (!isCoordRight) {
      // let X = Math.random() * limitX;
      let X = rand(safeBuffer, limitX - safeBuffer);
      let Y = rand(safeBuffer, limitY - safeBuffer);
      // let Y = Math.random() * limitY;
      let point = createSVGPoint(svgElement, X, Y);

      svgPath.forEach(function (elem) {
        let check = isPointInsideObject(elem, point);
        if (check === true) {
          isCoordRight = true;
          let okCircle = createCircle(svgElement, point, circleSize, color);

          if (circlesCollection[event.target.dataset.name]) {
            circlesCollection[event.target.dataset.name].push(okCircle);
          } else {
            circlesCollection[event.target.dataset.name] = [okCircle];
          }

          // console.log(circlesCollection);
          return okCircle;
        }
        counter++;
      });
      // removeSVGPoint(svgElement, point);
    }
  }

  function createSVGPoint(svgElement, x, y) {
    const point = svgElement.createSVGPoint();
    point.x = x;
    point.y = y;
    return point;
  }

  function removeSVGPoint(svgElement, point) {
    svgElement.removeChild(point);
  }

  function createCircle(svgElement, punktSVG, radius, color) {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", punktSVG.x);
    circle.setAttribute("cy", punktSVG.y);
    // circle.setAttribute("r", 15 + Math.floor(Math.random() * (radius - 15)));
    circle.setAttribute("r", 0);
    circle.setAttribute("fill", color); // Set circle color fill
    circle.setAttribute("stroke", colorBlack); // Set circle stroke color
    circle.setAttribute("stroke-width", "0"); // Set circle stroke width
    // circle.classList.add("fade-in");
    svgElement.appendChild(circle);
    return circle;
  }

  function isPointInsideObject(svgElement, punktSVG) {
    const isPointInPath = svgElement.isPointInFill(punktSVG);
    return isPointInPath;
  }

  function rand(lowest, highest) {
    let adjustedHigh = highest - lowest + 1;
    return Math.floor(Math.random() * adjustedHigh) + parseFloat(lowest);
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
};
