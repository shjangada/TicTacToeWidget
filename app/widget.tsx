import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function TicTacToeWidget() {
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
  };

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
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={NewGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const calculateWinner = (squares) => {
  for (let i = 0; i < 3; i++) {
    // Check horizontal rows
    if (squares[i * 3] === squares[i * 3 + 1] && squares[i * 3] === squares[i * 3 + 2]) {
      return squares[i * 3];
    }
    // Check vertical columns
    if (squares[i] !== null && squares[i] === squares[i + 3] && squares[i] === squares[i + 6]) {
      return squares[i];
    }
  }
  // Check diagonals
  if (squares[0] === squares[4] && squares[0] === squares[8]) {
    return squares[0];
  }
  if (squares[2] === squares[4] && squares[2] === squares[6]) {
    return squares[2];
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
  },
});
