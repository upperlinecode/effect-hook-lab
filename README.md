# This is...JEOPARDY! (useEffect & APIs Lab)

![jeopardy board](Jeopardy.png)

## The Goal

## Getting Started

- Clone this repository using `git clone`
- `cd` into the lab
- `npm install`
- `npm start`

## The Lab

### Part 1

Before you begin the lab, know that the data cleaning team has already built a handy cleaning function for you called `cleanData`, which is located in `utils.js`. You're welcome to study it if you like, but all you really need to know is that it takes the somewhat messy API response data you're likely to get, and repackages it as a list of clues organized roughly like a Jeopardy board. There's already an example of what the JSON response might look like `sample_data.json`, and in step 1, you'll inspect what that data looks like after it's been cleaned.

1. **Inspect the data** - Open the `App.jsx` and notice that the sample data has already been imported and cleaned. Use `console.log()` to display the `cleanedData`. Notice that it's an object - each key is the name of a category, and each value is an array of five clues.

2. **Render categories on the Board** - Notice that the `cleanedData` has been passed to the `Board` component. In `Board.jsx`, render one `<Category />` for each of the first five categories that was passed to the board.

   - If this were an array, we could use the `.map()` method on it directly, but since it's an object, we'll need to write some code to extract just the keys. The most common way to do this is with [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys). While you're at it, you may want to [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) just the first five keys so that you don't render too many categories - the result should be an array of five strings.
   - Now we can map over those strings and render a `<Category />` for each one. Make sure you pass both the category name and corresponding list of clues as props to each category.

3. **Display Category Names** - Before moving on, make sure each category is displaying the name you passed as a prop.

4. **Render the Cards** - Each `<Category />` should have at least two props - a category name and an array of clues. Since the clues should already be an array, mapping should be a bit more straightforward this time.

   - Be sure to pass the `question` and `value` as props so that you have something to display on the front and back of each card, and the `answer` so that you can check the user's input to the correct value.

5. **Inspect the Cards** - Make sure that each card is displaying the value on the front, and that when clicked, the back shows instead. This functionality should already be built out, but you'll want to make sure you give yourself time to process what's happening.

6. **Review the App Structure** - Now that the cards are rendered, it might help to back up and take a bird's eye view of the whole application. The component structure is set up like this:
   - App - since this is where we imported our sample data, we'll also be making our API calls from this level of the application. This is where you'll write your `useEffect` function.
     - Board - the Board component holds all columns and rows of the game board. it receives the full, cleaned data structure as a prop.
       - Category - the Category component holds a single column from the game board. It receives two props currently - the `name` of the category and an array of `cards` (each of which is an object containing information about a single clue).
         - Card - the Card component is a single square of the game board.
7. **API Calls** - For this step, make a call to the [JService API](https://jservice.io). The endpoint the data team built the cleaning function for is `'https://jservice.io/api/random?count=100'`, but you're welcome to explore other options if you like. You'll want to do all this in the `App.jsx` for now.

   - Create a state variable for our cleaned data with an initial value of the cleaned sample data. Then change the `categories` prop to render the board with your new state variable.
   - Add a `useEffect()` call above the return of our `App` component. Since we only want to make the call to the API on the initial rendering of our App, for now it will likely have no dependencies and look something like this: `useEffect(()=>{}, [])`
   - Inside your useEffect function, use the standard `fetch.then().then().catch()` flow or an [asynchronous function](https://designcode.io/react-hooks-handbook-fetch-data-from-an-api) to make a call to the API and store the response (once the promise has resolved) in your state variable.
   - Later, you can refactor your API call to the `callAPI` function in the `utils.js` file.

8. **Celebrate!** - You did it! You're using all the concepts from our work so far. Take a deep breath and move on to part 2 when you're ready.

### Part 2

9. **New Game Button** - Add a "new game" button that refreshes the tiles to a new set of clues (by making a new call to the API).
10. **Answer Box** - Add "answer" box and submit button. When a user submits an answer, check to see if it's right (using the answer property for that clue) and update the score appropriately.
    ![card back with answer](card-back-with-input.png)
11. **Answer on the Card Front** - Ensure that clues that have already been answered now display the answer on the front of the card, and cannot be clicked again.
    ![card front with answer](card-front-with-answer.png)

## Extensions

- **Styling** - Update the styling to be even closer to the actual jeopardy game - we leave this up to your creativity!
- **Responsiveness** - Update the styling to ensure the game is responsive on all standard screen sizes
- **Data Cleaning** - Some clues have images that are not included, rendering the clues useless. Others have `<i>` tags, and still others have parenthtical annotations. All of these make the questions difficult to answer in this format. Implement advanced data cleaning to handle these exceptions. We've given you a starter cleaning function called `cleanAnswer` in the `utils.js` file. Consider using:
  - Regex
  - Fuzzy string matching algorithms/libraries
- **One at a Time** - Currently, it is possible to open more than one clue at a time. Fix this bug so that only one clue can be open at any one time!
- **Turn-based** - Convert the game to a turn-based game so that multiple people can participate and answer questions. Keep score for each team/person.
