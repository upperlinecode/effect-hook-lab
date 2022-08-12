export interface Clue {
  id: number;
  answer: string;
  question: string;
  value: number;
  airdate: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  game_id: number;
  invalid_count?: null;
  category: Category;
}
export interface Category {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  clues_count: number;
}

export const getRandomItemFrom = (arr: any[]) => {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
};

export const getFiveClues = (clues: Clue[]) => {
  // Organize clues by value
  const valueSortedClues: { [key: string]: Clue[] } = {};
  clues.forEach((clue) => {
    console.log(clue);
    if (!valueSortedClues[clue.value]) {
      valueSortedClues[clue.value] = [clue];
    } else {
      valueSortedClues[clue.value].push(clue);
    }
  });
  // Generate final list of clues, 1 per point value 100-500
  const finalFive: Clue[] = [100, 200, 300, 400, 500].map((val) =>
    getRandomItemFrom(valueSortedClues[val])
  );
  return finalFive;
};

export const cleanAnswer = (answer: string) => {
  const substringsToRemove = ["<i>", "</i>", '"', "<", "a ", "the ", "\\", "."];
  substringsToRemove.forEach((substring) => {
    answer = answer.replace(substring, "").replace(substring, "");
  });
  return answer.trim();
};
