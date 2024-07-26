

const WorkoutHeader = ({ title }) => {
  const newTitle = setNewTitle(title);

  return (
    <>
      <div id="workout-title-box">
        <div id="workout-title"> {newTitle} </div>
      </div>
    </>
  );
};

const setNewTitle = (title) => {
  let newTitle = "";
  let index = 0;
  while (index < title.length) {
    let nextWord = "";
    while (index < title.length && title.charAt(index) !== " ") {
      nextWord += title.charAt(index);
      index++;
    }
    // FIXME: this should be done in the backend
    switch (nextWord) {
      case "fdelt":
        nextWord = "front delts";
        break;
      case "bis":
        nextWord = "biceps";
        break;
      case "tris":
        nextWord = "triceps";
        break;
      case "sdelt":
        nextWord = "side delts";
        break;
      case "rdelt":
        nextWord = "rear delts";
        break;
      default:
    }
    newTitle += nextWord + ", ";
    index++;
  }

  if (
    newTitle.indexOf("front delts", 0) >= 0 &&
    newTitle.indexOf("side delts", 0) >= 0
  ) {
    newTitle = newTitle.replace("front delts, ", "");
    newTitle = newTitle.replace("side delts, ", "");
    newTitle = newTitle.replace("rear delts, ", "");
    newTitle = newTitle.replace("traps, ", "");

    newTitle += "shoulders, ";
  }

  if (
    newTitle.indexOf("back", 0) >= 0 &&
    newTitle.indexOf("rear delts", 0) >= 0
  ) {
    newTitle = newTitle.replace("rear delts, ", "");
  }

  if (newTitle.indexOf("back", 0) >= 0 && newTitle.indexOf("traps", 0) >= 0) {
    newTitle = newTitle.replace("traps, ", "");
  }

  if (
    newTitle.indexOf("biceps", 0) >= 0 &&
    newTitle.indexOf("triceps", 0) >= 0
  ) {
    newTitle = newTitle.replace("biceps, ", "");
    newTitle = newTitle.replace("triceps, ", "");

    newTitle += "arms, ";
  }

  return newTitle.substring(0, newTitle.length - 2);
};

export default WorkoutHeader;
