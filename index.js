window.onload = function () {
  const colorArray = ["#F6D8AE", "#2E4057", "#083D77", "#DA4167", "#F4D35E"];
  const svgElement = document.getElementById("poland"); // Zmień 'mojSvg' na id swojego elementu SVG
  const svgPath = document.querySelectorAll(".path");
  const btn = document.querySelectorAll(".btn");

  const limitX = 1000;
  const limitY = 948;

  // svgElement.addEventListener("click", function (e) {
  //   console.log(e.target);
  //   console.log(isPointInsideObject(e.target, point));
  // });

  btn.forEach(function (e) {
    e.addEventListener("click", function (e) {
      const color = e.target.dataset.color;
      const score = e.target.dataset.score;
      let paragraph = document.getElementById(score);
      let value = Number(paragraph.innerText) + 1;
      paragraph.innerText = value;
      console.log(value);
      createInsideCircle(svgElement, limitX, limitY, color);
    });
  });

  // createInsideCircle(svgElement, limitX, limitY, "#fff");
  // createInsideCircle(svgElement, limitX, limitY, "#fff");
  // createInsideCircle(svgElement, limitX, limitY, "red");

  function createInsideCircle(svgElement, limitX, limitY, color) {
    let isCoordRight = false;
    let counter = 0;

    while (!isCoordRight) {
      // let X = Math.random() * limitX;
      let X = rand(0, limitX);
      let Y = rand(0, limitY);
      // let Y = Math.random() * limitY;
      let point = createSVGPoint(svgElement, X, Y);

      svgPath.forEach(function (elem) {
        let check = isPointInsideObject(elem, point);
        if (check === true) {
          isCoordRight = true;
          return createCircle(svgElement, point, 30, color);
        }
        counter++;
        // while counter
        // console.log(counter);
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
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", color); // Ustaw kolor wypełnienia okręgu
    circle.setAttribute("stroke", "#000"); // Ustaw kolor wypełnienia okręgu
    svgElement.appendChild(circle);
  }

  function isPointInsideObject(svgElement, punktSVG) {
    const isPointInPath = svgElement.isPointInFill(punktSVG);
    return isPointInPath;
  }

  function rand(lowest, highest) {
    let adjustedHigh = highest - lowest + 1;
    return Math.floor(Math.random() * adjustedHigh) + parseFloat(lowest);
  }
};
