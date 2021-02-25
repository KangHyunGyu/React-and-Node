import React, { useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import Timer from "./Timer";

let array = [];
for (let i = 1; i <= 16; i++) {
  array.push(i);
}

function OneToThirty() {
    console.log("OneToThirty");
  const [numbers, setNumbers] = useState(array);
  const [gameFlag, setGameFlag] = useState(false);
  const [current, setCurrent] = useState(1);

  const handleClick = num => {
    if (num === current && gameFlag) {
      if (num === 32) {
        endGame();
        //게임 끝 구현
      }
      const index = numbers.indexOf(num);
      setNumbers(numbers => [
        ...numbers.slice(0, index),
        num < 17 ? num + 16 : 0,
        ...numbers.slice(index + 1)
      ]);
      setCurrent(current => current + 1);
    }
  };
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const startGame = () => {
    setNumbers(shuffleArray(array));
    setCurrent(1);
    setGameFlag(true);
  };
  const endGame = () => {
    setGameFlag(false);
  };

  return (
    <Container>
      <Board numbers={numbers} handleClick={handleClick}></Board>
      {gameFlag ? (
        <Timer />
      ) : (
        <StartButton onClick={startGame}>start</StartButton>
      )}
    </Container>
  );

}
const Container = styled.div`
  width: 600px;
  height: 600px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StartButton = styled.button`
  margin-top: 450px;
  width: 100px;
  height: 50px;
`;

export default OneToThirty;