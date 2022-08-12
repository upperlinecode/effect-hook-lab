export const getRandomItemFrom = (arr) => {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

export const getFiveClues = (apiResponse) => {
  // Organize clues by value
  const valueSortedClues = {};
  console.log(apiResponse)
  for (let clue of apiResponse) {
    console.log(clue)
    if (valueSortedClues[clue.value]) {
      valueSortedClues[clue.value].push(clue)
    } else {
      valueSortedClues[clue.value] = [clue]
    }
  }
  // Generate final list of clues, 1 per point value 100-500
  const finalFive = [100,200,300,400,500].map(val => (
    getRandomItemFrom(valueSortedClues[val])
  ))
  return finalFive;
}

export const cleanAnswer = (answer) => {
  const substringsToRemove = ["<i>", "</i>", '"', "<", "a ", "the ", "\\", "."];
  substringsToRemove.forEach((substring) => {
    answer = answer.replace(substring, "").replace(substring, "");
  });
  return answer.trim();
<<<<<<< HEAD
};
=======
};
>>>>>>> 7758ea4fddd6ffc7fbadbf151946b23022c3574c
