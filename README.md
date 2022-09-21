# This is...JEOPARDY! (useEffect & APIs Lab)

![jeopardy board](Jeopardy.png)

## The Goal

## Getting Started

- Clone this repository using `git clone`
- `cd` into the lab
- `npm install`
- `npm start`

## The Lab

### Preamble

Before you begin the lab, know that the data cleaning team has already built some handy cleaning functions located in `utils.js`:

- `cleanAnswer()` - some of the questions have answers with extra apostrophes, extraneous html, etc. This function takes in that messy string and returns one with the most common weird punctuation stripped out, so `"'<i>The Great Gatsby</i>'"` would become `"Great Gatsby"` which is something the user is much more likely to type. For maximum value, use this on both the answer provided by the API and on the guess provided by the user.
- `getRandomItemFrom()` - some languages have built-in methods for getting a random item out of a list or array. JavaScript doesn't, so we put one together. This takes in an array and returns a single item from that array at random.
- `getFiveClues()` - this takes in an API response to the `/clues` endpoint (which by default is an array of 100 clues) and returns an array of just five clues, of values 100, 200, 300, 400, and 500 respectively. It will behave unexpectedly if the input array is missing clues for any of these values.

You don't need to master any of these right away, but know that they are there for your use later, so don't work too hard on recreating any of them from scratch.

Much of the styling has been built out already, but feel free to modify it if you wish.

### Part 1

1. **Examine the structure of the data** - Examine the `allCluesHardcoded` array, and at least one sample category within that array (eg `animals`) in `data.js`. This is a sampling of the format of the data we will be working with. At first, we will start with the hard-coded data. Later, we will be getting this data from an API. This is a common approach in front-end app building.

   - Whenever the format of the data starts to seem confusing, know that you can always fall back on the mental model of a real-life jeopardy board.
   - The chosen format is arguably the most straight-forward way to organize jeopardy clues (questions). It also matches the format we will be getting from the API.

#### Build the board

1. **Render the board columns by looping over the data** - in the `Board` render a `<Category />` component for each category in `allCluesHardcoded`. Be sure to pass the corresponding clues to each `<Category />` as a prop.

   - Since this is an array, common convention is to use the JavaScript `.map()` array method to do this in a loop.

1. **Display Category Names** - Before moving on, make sure each category is displaying the name of the category. You can access this information by looking at the first clue's category property.

1. **Render the Cards** - Now it's time to map over the clues that were passed as a prop to each `Category`. You'll want to render one `<Card />` for each clue.

1. **Get the Data via API** - Make the API calls in `useEffect` in the `App`. You'll ultimately replace the hardcoded clues with the results of this API response.

   - You'll probably be fetching a url that looks something like this: `"https://jservice.io/api/clues?category=" + 783`, where 783 is replaced by whatever category you happen to be using.
   - Find the `useEffect()` call in the `<App />` component. Since we only want to make the call to the API on the initial rendering of the App, for now it will likely have no dependencies and look something like this: `useEffect(()=>{}, [])`
   - Inside your `useEffect` function, use an [asynchronous function](https://designcode.io/react-hooks-handbook-fetch-data-from-an-api) to make a call to the API and store the response (once the promise has resolved) in your state variable.
   - Because this will require five API calls (one per category) you'll want to use use `Promise.all()` to await all five responses before triggering a re-render.
     - If this is your first time working with promises in JavaScript, don't try to guess this syntax - reference the example at the [bottom of this Readme](#code) as your boilerplate.
   - This is a great opportunity to use the `getFiveClues()` helper function - this will narrow your API response down from 100 answers to a smaller list of 5 - one per relevant point value.
   - Be sure to store the clues you wish to render in the appropriate state variable.

1. **Inspect the Cards** - Make sure that each card is displaying the value on the front, and that when clicked, the back shows instead. This functionality should already be built out, but you'll want to make sure you give yourself time to process what's happening.

1. **Review the App Structure** - Now that the cards are rendered, it might help to back up and take a bird's eye view of the whole application. The component structure is set up like this:

   - `App` - This is really the entry point to our application. Thinking ahead, this is probably where our `score` state variable will need to live. You'll also want to pass a `setScore` setter method to the child components so that each one can update this value when the player gets a question right... or wrong.
     - `Board` - the Board component holds all columns and rows of the game board. Since it receives category numbers from the app, it should pass one category number to each child.
       - `Category` - the Category component holds a single column from the game board. It's where we made the call to our API - since the Board renders five categories, this will make five API calls.
         - `Card` - the Card component is a single square of the game board.

1. **Celebrate!** - You did it! You're using all the concepts from our work so far. Take a deep breath and move on to part 2 when you're ready.

### Part 2

9. **Answer Box** - Add "answer" box and submit button. When a user submits an answer, check to see if it's right (using the answer property for that clue) and update the score appropriately.
   ![card back with answer](card-back-with-input.png)
10. **Answer on the Card Front** - Ensure that clues that have already been answered now display the answer on the front of the card, and cannot be clicked again.
    ![card front with answer](card-front-with-answer.png)
11. **New Game Button** - Add a "new game" button that refreshes the tiles to a new set of clues (by making a new call to the API).

## Extensions

- **Data Cleaning** - Some clues have images that are not included, rendering the clues useless. Others have `<i>` tags, and still others have parenthetical annotations. All of these make the questions difficult to answer in this format. Implement advanced data cleaning to handle these exceptions. We've given you a starter cleaning function called `cleanAnswer` in the `utils.js` file. Consider using:
  - Regex
  - Fuzzy string matching algorithms/libraries
- **One at a Time** - Currently, it is possible to open more than one clue at a time. Fix this bug so that only one clue can be open at any one time!
- **Turn-based** - Convert the game to a turn-based game so that multiple people can participate and answer questions. Keep score for each team/person.
- **Collect IDs** - Let's enhance the new game button. Use the API endpoint `https://jservice.io/api/categories?count=100`, where 100 is a changeable amount of random categories, to find ID's that contain clues equal to a positive multiple of 5 (ex. 5, 10, 15, etc). This will mean that the category contains at least one set of questions of each point value (i.e. 100-500). Once you collect a handful of adequate random category IDs, randomly select 5, and have the `useEffect` in your `App.jsx` pull from these categories instead.
- **Styling** - Update the styling to be even closer to the actual jeopardy game - we leave this up to your creativity!
- **Responsiveness** - Update the styling to ensure the game is responsive on all standard screen sizes

---

## Code

### Promise.all

```js
/*
  We should use Promise.all if we have to group a number of network request
  together and need to await for all of them to resolve before continuing
  processing.

  Promise.all keeps the passed in array order regardless of when each
  promise resolves.

  SO ref on Promise.all with fetch
  https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all

  MDN Promise.all
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
*/
const responses = categoryIds.map(async (catId) => {
  const response = await fetch(
    `https://jservice.io/api/clues?category=${catId}`
  );

  const newQuestions = await response.json();
  const topFiveQuestions = getFiveClues(newQuestions);
  return topFiveQuestions;
});

const cluesResult = await Promise.all(responses);
```
