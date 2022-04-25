import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Board from "../Board/Board";
import { callAPI, CategoryType, cleanData } from "../../utils";
import sampleData from "../../sample_data.json";
import NewGameButton from "../NewGameButton/NewGameButton";
import { getStatus, getScore } from "../../redux/selectors";

const App = () => {
  const [data, setData] = useState<CategoryType>(cleanData(sampleData));

  const dispatch = useDispatch();
  const gameStatus = useSelector(getStatus);
  const globalScore = useSelector(getScore);

  useEffect(() => {
    if (gameStatus === "loading") {
      callAPI()
        .then((data) => {
          const cleanedData = cleanData(data);
          setData(cleanedData);
        })
        .then(() =>
          dispatch({
            type: "DATA_LOADED",
          })
        );
    }
  }, [gameStatus]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Welcome to Jeopardy! </h1>
        <div className="score-box">
          <h2>Score: {globalScore}</h2>
          <NewGameButton />
        </div>
      </header>
      <Board categories={data} />
    </div>
  );
};

export default App;
