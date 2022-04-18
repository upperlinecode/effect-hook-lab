interface Category {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  clues_count: number;
}

export interface CardType {
  id: number;
  answer: string;
  question: string;
  value: string;
  airdate: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  game_id: number;
  invalid_count: number | null;
  category: Category;
}

export interface CategoryType {
  [categoryTitle: string]: CardType[];
}

type APIData = CardType[];

export const callAPI = (): Promise<APIData> => {
  return fetch("https://jservice.io/api/random?count=100")
    .then((data) => data.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const cleanData = (data: APIData) => {
  // re-organizes the raw API data to an object that looks like:
  // {
  //  categoryName: [{cardData}, {cardData}],
  //  categoryname: [{cardData}, {cardData}, {cardData}],
  //  ...
  // }
  const cleanedData = data.reduce((acc, currentValue) => {
    if (currentValue.category.title in acc) {
      acc[currentValue.category.title].push(currentValue);
    } else {
      acc[currentValue.category.title] = [currentValue];
    }
    return acc;
  }, {} as CategoryType);

  // filters out any categories with incomplete sets of cards
  const finalData: CategoryType = {};
  for (var category in cleanedData) {
    let countValues = 0;
    cleanedData[category].forEach((card) => {
      if (card.value) {
        countValues += 1;
      }
    });
    if (countValues === 5) {
      finalData[category] = cleanedData[category];
    }
  }
  return finalData;
};

export const cleanAnswer = (answer: string) => {
  const substringsToRemove = ["<i>", "</i>", '"', "<", "a ", "the ", "\\", "."];
  substringsToRemove.forEach((substring) => {
    answer = answer.replace(substring, "").replace(substring, "");
  });
  return answer.trim();
};
