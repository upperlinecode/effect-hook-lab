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

Before you begin the lab, know that the data cleaning team has already built a handy cleaning function located in `utils.js`:

- `groupCluesByCategory()` - some languages have built-in methods for grouping items in a list or array. JavaScript doesn't, so we put one together. This takes in an array of clues and keys them to their category.

You don't need to master this right away, but know that they are there for your use later, so don't work too hard on recreating any of them from scratch.

Much of the styling has been built out already, but feel free to modify it if you wish.

### Part 1

0. **Examine the structure of the data** - Open the `data.js` and examine the `SAMPLE_JEOPARDY_GAME` object and at least one sample category within that array (eg `JAPAN`). This is a sampling of the format of the json data we will be working with. At first, we will start with this hard-coded data. Later, we will be getting this data from an API. This is a common approach in front-end app building.

   - Whenever the format of the data starts to seem confusing, know that you can always fall back on the mental model of a real-life jeopardy board.
   - The chosen format is arguably the most straight-forward way to organize jeopardy clues (questions). It also matches the format we will be getting from the API.

#### Build the board

1. **Render the board columns by looping over the data** - in the `Board` render a `<Category />` component for each category in `allCluesHardcoded` (aka `allClues`). Be sure to pass the corresponding clues and a key to each `<Category />` as props.

   - Since this is an object, use [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) (or [Obejct.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values)) to turn it into an array. Then, use the JavaScript `.map()` loop through it.

1. **Display Category Names** - Before moving on, make sure each category is displaying the name of the category. You can access this information by looking at the first clue's category property.

1. **Render the Cards** - Now it's time to map over the clues that were passed as a prop to each `Category`. You'll want to render one `<Card />` for each clue.

1. **Inspect the Cards** - Make sure that each card is displaying the value on the front, and that when clicked, the back shows instead. This functionality should already be built out, but you'll want to make sure you give yourself time to process what's happening.

1. **Review the App Structure** - Now that the cards are rendered, it might help to back up and take a bird's eye view of the whole application. The component structure is set up like this:

   - `App` - This is really the entry point to our application. Thinking ahead, this is probably where our `score` state variable will need to live. You'll also want to pass a `setScore` setter method to the child components so that each one can update this value when the player gets a question right... or wrong.
     - `Board` - the Board component holds all columns and rows of the game board. Since it receives category numbers from the app, it should pass one category number to each child.
       - `Category` - the Category component holds a single column from the game board. It's where we made the call to our API - since the Board renders five categories, this will make five API calls.
         - `Card` - the Card component is a single square of the game board.

1. **Get the Data via API** - Make the API calls in `useEffect` in the `App`. You'll ultimately replace the hardcoded clues with the results of this API response.

   - You'll be fetching this url: `https://jeopardy-api.vercel.app/api/random/game`.
   - Find the `useEffect()` call in the `<App />` component. Since we only want to make the call to the API on the initial rendering of the App, for now it will likely have no dependencies and look something like this: `useEffect(()=>{}, [])`
   - Inside your `useEffect` function, use an [asynchronous function](https://designcode.io/react-hooks-handbook-fetch-data-from-an-api) to make a call to the API and store the response (once the promise has resolved) in your state variable.
   - If this is your first time working with promises in JavaScript, don't try to guess this syntax - reference the example at the [bottom of this Readme](#code) as your boilerplate.
   - Be sure to store the clues you wish to render in the appropriate state variable.
   - Be sure to await this function call before using the helper function `groupCluesByCategory()` and setting the `allClues` state variable.

1. **Celebrate!** - You did it! You're using all the concepts from our work so far. Take a deep breath and move on to part 2 when you're ready.

### Part 2

1. **Answer Box** - Add "answer" box and submit button. When a user submits an answer, check to see if it's right (using the answer property for that clue) and update the score appropriately. Pass down state variables and add event listeners etc. as needed.
   ![card back with answer](card-back-with-input.png)
1. **Answer Box Timer** - On TV, contestants only have a limited time to answer the question. Create a new `useEffect` in the `Card` that prevents answers from being submitted after the timer has expired. Consider the following 3 things:
    - You'll need a `useEffect` that calls a [timeout](https://www.w3schools.com/jsref/met_win_settimeout.asp) function. (Don't use `clearTimeout` for now)
    - You'll need a function (something like `handleTurnComplete()` or `endTurn()`) to "disable" it when the time runs out or when an answer is submitted. (To disable, flip the card back around for now and keep it un-clickable)  _NOTE: you may have this from the previous challenge._ 
    - Consider when you want this `useEffect` to run. Set the **dependencies** to the variable that will trigger it.
1. **Answer on the Card Front** - Ensure that clues that have already been answered, or timed out, now display the answer on the front of the card, and cannot be clicked again. _BONUS: check out the css and set up the white font styles._
    ![card front with answer](card-front-with-answer.png)
1. **New Game Button** - Add a "new game" button that refreshes the tiles to a new set of clues (by making a new call to the API).
1. **[Spicy] - Old Game Persistence** - Sometimes you need to pause the game and come back at a later time. Create new `useEffect`s to save the clues, score, and answers to local storage whenever those values are updated. Then use those storage values as the initial data when reloading the page, that way you can pick up where you left off.
    <details>
    <summary>Click here for some hints and guidance for #5:</summary>

    - [How to save things in local storage.](https://www.w3schools.com/jsref/prop_win_localstorage.asp) (more verbose on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage))
    - You'll need 2 useEffects: 1 in `App` and 1 in `Card`
    - In `App` you'll save the **score** and in `Card` you'll only save the current state of the card if it has been clicked. (Think about your dependencies!)
    - You can't save an js object in local storage, but you could use [JSON.stringify](https://www.w3schools.com/js/js_json_stringify.asp) and [JSON.parse](https://www.w3schools.com/js/js_json_parse.asp).
    </details>

## Extensions

- **One at a Time** - Currently, it is possible to open more than one clue at a time. Fix this bug so that only one clue can be open at any one time!
- **Turn-based** - Convert the game to a turn-based game so that multiple people can participate and answer questions. Keep score for each team/person.
- **Styling** - Update the styling to be even closer to the actual jeopardy game - we leave this up to your creativity!
- **Responsiveness** - Update the styling to ensure the game is responsive on all standard screen sizes

---

## Code

### Fetch

```js
const fetchClues = async () => {
  const response = await fetch(`https://jeopardy-api.vercel.app/api/random/game`);
  const game = await response.json();

  return game;
};
```
