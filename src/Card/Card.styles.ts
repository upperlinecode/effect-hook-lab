import styled from "styled-components";

export const CardRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  height: 12vh;
  /* min-height: 100px; */
  width: 100%;
  /* max-width: 20vw; */
  margin-bottom: 5px;
  background: --var(blue);
  /* background: #060ce9; */
`;

export const CardValue = styled.h4`
  font-size: 3em;
  color: #ffd700;
  text-shadow: 4px 4px black;
  margin: 0;
  padding: 0;
`;

export const CardQuestion = styled.div`
  text-transform: uppercase;
  color: white;
  font-size: 0.6em;
  padding: 2% 5%;
`;

export const CardFace = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Answer = styled.div`
  font-size: 0.6em;
  color: white;
`;

export const AnswerGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;
