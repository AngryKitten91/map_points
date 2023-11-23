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
  const svgElement = document.getElementById("poland"); // Zmień 'mojSvg' na id swojego elementu SVG
  const svgPath = document.querySelectorAll(".path");
  const btnContainer = document.querySelector(".button-cointainer");
  const btnContainerLeft = document.querySelector(".fixed-left");
  const btnContainerRight = document.querySelector(".fixed-right");

  const limitX = 1000;
  const limitY = 948;
  const safeBuffer = 50;

  // svgElement.addEventListener("click", function (e) {
  //   console.log(e.target);
  //   console.log(isPointInsideObject(e.target, point));
  // });
  // ! CREATE BUTTONS
  let titles = shuffle(teamNames);
  colorArray.forEach(function (e, i) {
    if (i < 5) {
      const newBtn = createButtons(e, i, titles);
      btnContainerLeft.innerHTML += newBtn;
    } else {
      const newBtn = createButtons(e, i, titles);
      btnContainerRight.innerHTML += newBtn;
    }
    // const newBtn = createButtons(e, i, titles);
    // btnContainer.innerHTML += newBtn;
  });

  // * ADD EVENT LISTENER TO BUTTONS
  const btn = document.querySelectorAll(".btn");

  btn.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
      const color = e.target.dataset.color;
      const score = e.target.dataset.score;
      let paragraph = document.getElementById(score);
      if (+paragraph.innerText < 15) {
        let value = Number(paragraph.innerText) + 1;
        paragraph.innerText = value;
        // console.log(value);
        createInsideCircle(svgElement, limitX, limitY, color, e);
      }
    });
  });

  // * highlight on hover
  btn.forEach(function (elem) {
    elem.addEventListener("mouseenter", function (e) {
      let target = e.target.dataset.name;
      if (circlesCollection[target]) {
        circlesCollection[target].forEach(function (element) {
          if (element.getAttribute("fill") !== "#000") {
            element.setAttribute("stroke", "red");
            element.setAttribute("fill", "red");
          }
        });
      }
    });
  });

  // * Remove highlight
  btn.forEach(function (elem) {
    elem.addEventListener("mouseleave", function (e) {
      let target = e.target.dataset.name;
      let color = e.target.dataset.color;
      if (circlesCollection[target]) {
        circlesCollection[target].forEach(function (element) {
          if (element.getAttribute("fill") !== "#000") {
            element.setAttribute("stroke", "#000");
            element.setAttribute("fill", color);
          }
        });
      }
    });
  });

  // * Color change
  document.addEventListener("keyup", (event) => {
    if (event.code === "KeyZ") {
      // console.log(event.code);
      switchColors(circlesCollection);
    }
  });

  function switchColors(object) {
    let keys = Object.keys(object);
    keys.forEach(function (team) {
      object[team].forEach(function (e) {
        if (e.getAttribute("stroke") === "red") {
        } else {
          svgElement.removeChild(e);
          e.setAttribute("r", "50");
          e.setAttribute("fill", "#000");
          e.setAttribute("stroke", "red");
          setTimeout(function () {
            svgElement.appendChild(e);
          }, rand(500, 1000));
        }
      });
    });
  }

  function createButtons(color, index, title) {
    let newColor = color;
    if (title[index] === "Barbie") {
      newColor = "#E0218A";
    } else if (title[index] === "Shrek") {
      newColor = "#c5ee7d";
    }
    if (index < 5) {
      let leftBtnScheme = `<div class="button-wrapper">
      <p class="team-title" style="text-shadow: 1px 1px 0 ${newColor};">${title[
        index
      ].toUpperCase()}</p>
      <div class="flex">
      <button style="background-color:${newColor}" data-name="${
        title[index]
      }" data-score="score${index}" data-color="${newColor}" class="btn glow-on-hover">
        ADD
      </button>
      <p id="score${index}" class="score">0</p>
      </div>
      </div>`;
      return leftBtnScheme;
    } else {
      let rightBtnScheme = `<div class="button-wrapper">
      <p class="team-title">${title[index].toUpperCase()}</p>
      <div class="flex">
      <p id="score${index}" class="score">0</p>
      <button style="background-color:${newColor}" data-name="${
        title[index]
      }" data-score="score${index}" data-color="${newColor}" class="btn glow-on-hover">
      ADD
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
          let okCircle = createCircle(svgElement, point, 30, color);

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
    circle.setAttribute("r", 15 + Math.floor(Math.random() * (radius - 15)));
    circle.setAttribute("fill", color); // Ustaw kolor wypełnienia okręgu
    circle.setAttribute("stroke", "#000"); // Ustaw kolor wypełnienia okręgu
    circle.setAttribute("stroke-width", "5"); // Ustaw kolor wypełnienia okręgu
    circle.classList.add("fade-in");
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

// function rand(lowest, highest) {
//   let adjustedHigh = highest - lowest + 1;
//   return Math.floor(Math.random() * adjustedHigh) + parseFloat(lowest);
// }
