import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';

export default function Index() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(board) || newBoard[index]) return;
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const NewGame = () => {
    setBoard(Array(9).fill(null)); // Resetting the board
    setXIsNext(true);
  }

  const renderSquare = (index) => {
    return (
      <TouchableOpacity style={styles.square} onPress={() => handleClick(index)}>
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(10)}
          {renderSquare(11)}
          {renderSquare(12)}
        </View>
        <View style={styles.row}>
          {renderSquare(20)}
          {renderSquare(21)}
          {renderSquare(22)}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={NewGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 40,
  },
  status: {
    marginBottom: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#36598a',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    color: '#ffffff',
    fontSize: 16,
  },
  buttonText: {
    color: '#ffffff', // Set text color here
    fontSize: 16,
  }
});
