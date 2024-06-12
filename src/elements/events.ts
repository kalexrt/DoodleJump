import { player } from "../main";
import { rightImage, leftImage } from "./Doodler";
import { gameOver, startGame } from "../main";

export function moveDoodler(e:KeyboardEvent) {
    if (e.code === "ArrowRight" || e.code === "KeyD") {
      player.dx = 4;
      player.image = rightImage;
    } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
      player.dx = -4;
      player.image = leftImage;
    } else if (e.code === 'Space' && gameOver) {
      startGame();
    }
  }
  
  export function stopDoodler(e:KeyboardEvent) {
    if (e.code === "ArrowRight" || e.code === "KeyD" || e.code === "ArrowLeft" || e.code === "KeyA") {
      player.dx = 0;
    }
  }
  
  export function initializeControls() {
    document.addEventListener("keydown", moveDoodler);
    document.addEventListener("keyup", stopDoodler);
  }