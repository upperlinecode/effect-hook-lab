Steps to implement Redux.

1. Add the Provider.
2. Move all the components into a folder, and create a redux folder. These layers should live in different places. First file can just be configureStore for now - we'll add more later.
3. Configure the **store**.
4. Set up initial state - score: 1000 so we can just see whether it's working.
5. Set up the **reducer** - start with a switch & default case.
6. Create a type for your actions.
7. Display the score on the app. We'll need to access the score, so we'll need a **selector**.
8. If you get an answer right, the global state should update, not the local state.
9. If you get an answer wrong, global state should decrease.
10. Once the score is all global, we can remove the prop drilling.
11. Hard-coding each action object feels really bad. Let's make an action creator.
12. Reset button needs to work on the global state.
13. Reset button needs to trigger an API call to reset the board. This will require a new state property in our redux store.
14. Remove the reset function from the App level.
