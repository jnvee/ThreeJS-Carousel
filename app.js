import { renderLoadingScreen } from "./Pages/loading";
import { renderModel1 } from "./Pages/model1";
import { renderModel2 } from "./Pages/model2";
import { renderModel3 } from "./Pages/model3";
import { renderModel4 } from "./Pages/model4";
import { renderModel5 } from "./Pages/model5";
import page from "page";

const appContainer = document.getElementById("app");
const desc = document.getElementById("desc");
const title = document.getElementById("title");

//Buttons
const prevArrow = document.getElementById("prev-btn");
prevArrow.addEventListener("click", function () {
  const currentLocation = location.href;
  if (currentLocation.includes("/One")) {
    location.href = "/Five";
  } else if (currentLocation.includes("/Two")) {
    location.href = "/One";
  } else if (currentLocation.includes("/Three")) {
    location.href = "/Two";
  } else if (currentLocation.includes("/Four")) {
    location.href = "/Three";
  } else if (currentLocation.includes("/Five")) {
    location.href = "/Four";
  }
});
const nextArrow = document.getElementById("next-btn");
nextArrow.addEventListener("click", function () {
  const currentLocation = location.href;
  if (currentLocation.includes("/One")) {
    location.href = "/Two";
  } else if (currentLocation.includes("/Two")) {
    location.href = "/Three";
  } else if (currentLocation.includes("/Three")) {
    location.href = "/Four";
  } else if (currentLocation.includes("/Four")) {
    location.href = "/Five";
  } else if (currentLocation.includes("/Five")) {
    location.href = "/One";
  }
});

page("/", () => {
  appContainer.innerHTML = "";
  renderLoadingScreen();
  title.innerText = "";
  desc.innerText = "";
  prevArrow.style.display = "none";
  nextArrow.style.display = "none";
  setTimeout(function () {
    location.href = "/One";
  }, 5000);
});

page("/One", (ctx) => {
  appContainer.innerHTML = "";
  renderModel1();
  console.log(ctx.state);
  title.innerText = "Kitten by Nyilonelycompany";
  desc.innerHTML =
    '<a href="https://sketchfab.com/3d-models/kitten-walk-921471cbf0c64bd792d056d25889bce1">SketchFab</a>';
});

page("/Two", () => {
  appContainer.innerHTML = "";
  renderModel2();
  title.innerText = "Porsche";
  desc.innerText = "Sample GLBs";
});

page("/Three", () => {
  appContainer.innerHTML = "";
  renderModel3();
  title.innerText = "Gun Bot by 3DHaupt";
  desc.innerHTML =
    '<a href="https://sketchfab.com/3d-models/gun-bot-with-walk-and-idle-animation-22c14d0bc65e41c4b2e936b67a958cf6">SketchFab</a>';
});

page("/Four", () => {
  appContainer.innerHTML = "";
  renderModel4();
  title.innerText = "Smol Ame in an Terrarium by Seafoam";
  desc.innerHTML =
    '<a href="https://sketchfab.com/3d-models/smol-ame-in-an-upcycled-terrarium-hololiveen-490cecc249d242188fda5ad3160a4b24">SketchFab</a>';
});

page("/Five", () => {
  appContainer.innerHTML = "";
  renderModel5();
  title.innerText = "CyberPunk Model by Piotr Pisiak";
  desc.innerHTML =
    '<a href="https://sketchfab.com/3d-models/cyberpunk-speeder-78cf4a37a1604ddeb99651d531d7a0ff">SketchFab Model</a>';
});

page.start();
