# This is...JEOPARDY! (useEffect & APIs Lab)

![jeopardy board](Jeopardy.png)

## The Goal

## Getting Started

- Clone this repository using `git clone`
- `cd` into the lab
- `npm install`
- `npm start`

## The Lab

1. **Render the Board** - Get sample data to render using the pre-built components & cleaning methods. You can see the sample data in the `sample_data.json` file. Note that we have included some initial type aliases in `utils.tsx` that may come in handy. We have also already built a cleaning function for you called `cleanData`, which is located in `utils.tsx`. While you are welcome to modify this function, you do not have to in order to get the application working. Because the cleaning function re-organizes the data, be sure to log the cleaned data so you understand the structure you'll be working with. The component structure is set up like:
   - App - we'll be making our API calls from this level of the application
     - Board - the Board component holds all columns and rows of the game board. it receives the full, cleaned data structure as a prop.
       - Category - the Category component holds a single column from the game board. It receives two props currently - the `name` of the category and an array of `cards` (each of which is an object containing information about a single clue).
         - Card - the Card component is a single square of the game board. It receives a `data` prop, which is an object containing information about a single clue (one element from the `cards` array received by the Category component).
1. **API Calls** - For this step, make a call to the [JService API](https://jservice.io) with in the `callAPI` function in the `utils.tsx` file.
1. **Render API Data** - Get API data to render using useEffect hook. You'll know this is working when you get a different set of categories and clues every time you refresh the page!
1. **New Game Button** - Add a "new game" button that refreshes the tiles to a new set of clues (by making a new call to the API).
1. **Answer Box** - Add "answer" box and submit button. When a user submits an answer, check to see if it's right (using the answer property for that clue) and update the score appropriately.
   ![card back with answer](card-back-with-input.png)
1. **Answer on the Card Front** - Ensure that clues that have already been answered now display the answer on the front of the card, and cannot be clicked again.
   ![card front with answer](card-front-with-answer.png)

## Extensions

- **Styling** - Update the styling to be even closer to the actual jeopardy game - we leave this up to your creativity!
- **Responsiveness** - Update the styling to ensure the game is responsive on all standard screen sizes
- **Data Cleaning** - Some clues have images that are not included, rendering the clues useless. Others have `<i>` tags, and still others have parenthtical annotations. All of these make the questions difficult to answer in this format. Implement advanced data cleaning to handle these exceptions. We've given you a starter cleaning function called `cleanAnswer` in the `utils.tsx` file. Consider using:
  - Regex
  - Fuzzy string matching algorithms/libraries
- **One at a Time** - Currently, it is possible to open more than one clue at a time. Fix this bug so that only one clue can be open at any one time!
- **Turn-based** - Convert the game to a turn-based game so that multiple people can participate and answer questions. Keep score for each team/person.

## Redux Toolkit Steps

**Documentation:** https://redux-toolkit.js.org/introduction/getting-started

1. Install Redux Toolkit - `npm install @reduxjs/toolkit`
2. Update `./src/redux/configureStore.ts` to leverage the `configureStore` utility function from `@reduxjs/toolkit` instead of the deprecated `createStore` currently in use.
3. Create a `slice` utilizing the `createSlice` utility function from `@reduxjs/toolkit` - one solutions branch calls this slice "game" and another calls it "app", but the naming is up to you. You can and should replicate all the functionality of the existing reducer, but you'll need to refactor it as a reducer map (instead of a switch). Remember that inside `createSlice`, you can write code that would mutate state - the Immer library will handle immutability behind the scenes.
4. [Optional] - take all the logic related to our slice and put it in its own file, called `gameSlice.ts` or similar, so that your `configureStore.ts` is more accurately what it claims to be. Be sure to update whatever imports / exports need to be changed as a result.
5. Each reducer function you wrote will get its own action creator packaged in the slice's `.actions` property. Destructure them out and export them for use elsewhere.
6. Delete the `actions.ts` file. This will break your app temporarily, so you'll need to go find the components which were using our old action creators to leverage the new action creators exported from the slice.
7. Update selectors to pull correctly from the store. You'll have to update the type and you have two options for how to do that - you can use "any" as a temporary workaround, or you can take the safer approach and redefine the `stateType` according to the new state of our application.
8. Create a `useAppDispatch` and a `useAppSelector` to be "smarter" with TypeScript so that it knows what actions our store accepts and what selectors are valid based on our store. The [documentation](https://redux-toolkit.js.org/usage/usage-with-typescript) on how to implement both of these pieces is extremely helpful.
9. Replace existing `useDispatch` and `useSelector` instances with our `useAppDispatch` and `useAppSelector`.

## EXTENSIONS

- Make the game more forgiving - come up with some fuzzy matching to handle the edge cases where a user clearly knew the answer but didn't

#### HARDER EXTENSIONS:

- Fetch the real question data from the api. You can still do this with the useEffect pattern we established in the `solutions-typescript` branch of this repo, but the logic of this branch assumes API calls will be made at the top level and to a different endpoint, so this is a significant refactoring. You will almost certainly want to add in a new slice of state that governs the questions, and there may be some UI changes you'll need to make as a result.
  - Add in a [thunk](https://redux-toolkit.js.org/api/createAsyncThunk) to handle fetching data and add it to our slice setup as part of a new property called `extraReducers`.
- Give the player the option to choose categories. You'll probably want a new component to govern this process, and it will need to dispatch the user's choices to the store to make API calls.
- Take the category selection and put it into a modal. You'll likely want to look into react modal best practices, or even a [library for React modals](http://reactcommunity.org/react-modal/).
