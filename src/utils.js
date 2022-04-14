import data from "./sample_data.json";

/**
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} title
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} clues_count
 */

/**
 * @typedef {Object} Data
 * @property {number} id
 * @property {string} answer
 * @property {string} question
 * @property {string} value
 * @property {string} airdate
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} category_id
 * @property {number} game_id
 * @property {number | null} invalid_count
 * @property {Category} category
 */

/**
 * @typedef {Object} DataMap
 * @property {Data} [categoryTitle]
 */

/**
 * @returns {Promise<Data[]>} - Returns the
 */
export const callAPI = () => {
  //WRITE YOUR API CALL HERE
};

/**
 * @param {Data[]} data
 *
 * @returns {DataMap}
 */
export const cleanData = (data) => {
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
  }, {});

  // filters out any categories with incomplete sets of cards
  const finalData = {};
  for (var category in cleanedData) {
    let countValues = 0;
    cleanedData[category].forEach((card) => {
      if (card.value != undefined) {
        countValues += 1;
      }
    });
    if (countValues == 5) {
      finalData[category] = cleanedData[category];
    }
  }
  return finalData;
};

/**
 * use this function as a starter to clean answers before you check if the user's guess is correct!
 *
 * @param {string} answer
 *
 * @returns {string}
 */
export const cleanAnswer = (answer) => {
  const substringsToRemove = ["<i>", "</i>", '"', "<", "a ", "the "];
  substringsToRemove.forEach((substring) => {
    answer = answer.replace(substring, "");
  });
  return answer.trim();
};
