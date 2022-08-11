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

### Part 1

1. **Discover the Categories** - Open the `App.jsx` and notice that there is an array of five sample category numbers ready to go. Each one corresponds to a different jeopardy category. Take a moment and explore the jservice.io documentation to determine what the five categories are that have been selected.

2. **Render categories on the Board** - Notice that the `defaultCategories` have been passed to the `Board` component as `categoryNumbers`. In `Board.jsx`, render one `<Category />` for each of the first five categories that was passed to the board.

   - Since this is an array, we can use the `.map()` method on it directly and render a `<Category />` for each one. Make sure you pass the category number as a prop to each `<Category />` component.

3. **Display Category Names** - Before moving on, make sure each category is displaying the of the category. We'll eventually use the API to do this, but you can reference the object included in `category.jsx` to look up category names locally for now.

4. **Get the Data** - Each `<Category />` should have at least one prop - a `categoryNumber` or similar. This is where you'll write your `useEffect` - a category component will make a call to the jservice API to gather its corresponding clues.

   - Add a `useEffect()` call above the return of our `App` component. Since we only want to make the call to the API on the initial rendering of our App, for now it will likely have no dependencies and look something like this: `useEffect(()=>{}, [])`
   - Inside your useEffect function, use the standard `fetch.then().then().catch()` flow or an [asynchronous function](https://designcode.io/react-hooks-handbook-fetch-data-from-an-api) to make a call to the API and store the response (once the promise has resolved) in your state variable.
   - This is a great opportunity to use the `getFiveClues()` helper function - this will narrow your API response down from 100 answers to a smaller list of 5 - one per relevant point value.
   - Be sure to store the clues you wish to render in the appropriate state variable.

5. **Render the Cards** - Now it's time to map over the clues you've stored in state to generate one `<Card />` for each clue.

   - You'll need to pass Be sure to pass the `question` and `value` as props so that you have something to display on the front and back of each card. You'll also want to pass the `answer` so that once you start getting user input, you can check that against correct value.

6. **Inspect the Cards** - Make sure that each card is displaying the value on the front, and that when clicked, the back shows instead. This functionality should already be built out, but you'll want to make sure you give yourself time to process what's happening.

7. **Review the App Structure** - Now that the cards are rendered, it might help to back up and take a bird's eye view of the whole application. The component structure is set up like this:

   - App - This is really the entry point to our application. Thinking ahead, this is probably where our `score` state variable will need to live. You'll also want to pass a `setScore` setter method to the child components.
     - Board - the Board component holds all columns and rows of the game board. Since it receives category numbers from the app, it should pass one category number to each child.
       - Category - the Category component holds a single column from the game board. It's where we made the call to our API - since the Board renders five categories, this will make five API calls.
         - Card - the Card component is a single square of the game board.

8. **Celebrate!** - You did it! You're using all the concepts from our work so far. Take a deep breath and move on to part 2 when you're ready.

### Part 2

9. **Answer Box** - Add "answer" box and submit button. When a user submits an answer, check to see if it's right (using the answer property for that clue) and update the score appropriately.
   ![card back with answer](card-back-with-input.png)
10. **Answer on the Card Front** - Ensure that clues that have already been answered now display the answer on the front of the card, and cannot be clicked again.
    ![card front with answer](card-front-with-answer.png)
11. **New Game Button** - Add a "new game" button that refreshes the tiles to a new set of clues (by making a new call to the API).

## Extensions

- **Styling** - Update the styling to be even closer to the actual jeopardy game - we leave this up to your creativity!
- **Responsiveness** - Update the styling to ensure the game is responsive on all standard screen sizes
- **Data Cleaning** - Some clues have images that are not included, rendering the clues useless. Others have `<i>` tags, and still others have parenthetical annotations. All of these make the questions difficult to answer in this format. Implement advanced data cleaning to handle these exceptions. We've given you a starter cleaning function called `cleanAnswer` in the `utils.js` file. Consider using:
  - Regex
  - Fuzzy string matching algorithms/libraries
- **One at a Time** - Currently, it is possible to open more than one clue at a time. Fix this bug so that only one clue can be open at any one time!
- **Turn-based** - Convert the game to a turn-based game so that multiple people can participate and answer questions. Keep score for each team/person.
