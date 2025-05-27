// GameScreen.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, Dimensions, Alert,
  PanResponder, GestureResponderEvent, PanResponderGestureState, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { levels as originalLevels } from '../data/levels';
import { Tile } from '../components/Tile';

const GRID_SIZE = 6;
const TILE_SIZE = Math.floor(Dimensions.get('window').width / GRID_SIZE) - 10;

export type TileType =
  | 'empty' | 'wall' | 'home' | 'sun' | 'snow'
  | 'player' | 'ice-melt-1' | 'ice-melt-2' | 'ice-melt-3' | 'ice-melt-4';

const meltStages: TileType[] = ['player', 'ice-melt-1', 'ice-melt-2', 'ice-melt-3', 'ice-melt-4'];

export default function GameScreen() {
  const navigation = useNavigation<any>();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [grid, setGrid] = useState<TileType[][]>([]); // ✅ fixed missing state
  const gridRef = useRef<TileType[][]>([]);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const [playerPos, setPlayerPos] = useState<[number, number]>(() =>
    findPlayer(originalLevels[currentLevel])
  );
  const [playerStage, setPlayerStage] = useState<TileType>('player');

  const playerPosRef = useRef(playerPos);
  useEffect(() => { playerPosRef.current = playerPos; }, [playerPos]);
  const playerStageRef = useRef(playerStage);
  useEffect(() => { playerStageRef.current = playerStage; }, [playerStage]);
  const currentLevelRef = useRef(currentLevel);
  useEffect(() => { currentLevelRef.current = currentLevel }, [currentLevel]);

  useEffect(() => {
    console.log(`[LOG] useEffect triggered — currentLevel: ${currentLevel}`);
    if (currentLevel === 0) {
      console.warn('[WARN] ⚠️ Level reset back to Level 1 unexpectedly!');
    }
    if (currentLevel < originalLevels.length) {
      let newGrid = JSON.parse(JSON.stringify(originalLevels[currentLevel]));
      newGrid = newGrid.map(row => row.map(cell => meltStages.includes(cell) ? 'empty' : cell));
      const newPlayerPos = findPlayer(originalLevels[currentLevel]);

      console.log(`[LOG] Grid set for level ${currentLevel + 1}`);
      console.log(`[LOG] PlayerPos: ${JSON.stringify(newPlayerPos)}`);

      setGrid(newGrid);
      setPlayerPos(newPlayerPos);
      setPlayerStage('player');
    } else {
      Alert.alert('🧃 Game Over', 'You finished all levels!');
      navigation.goBack();
    }
  }, [currentLevel]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (_: GestureResponderEvent, gesture: PanResponderGestureState) => {
        const { dx, dy } = gesture;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        const SWIPE_THRESHOLD = 30;
        console.log(`[LOG] Grid set for level in panResponder ${currentLevelRef.current + 1}`);
        if (absDx > absDy && absDx > SWIPE_THRESHOLD) {
          console.log('➡️ Swipe detected: RIGHT or LEFT');
          handleMove(0, dx > 0 ? 1 : -1);
        } else if (absDy > absDx && absDy > SWIPE_THRESHOLD) {
          console.log('⬆️⬇️ Swipe detected: UP or DOWN');
          handleMove(dy > 0 ? 1 : -1, 0);
        }
      },
    })
  ).current;

  function findPlayer(gridToSearch: TileType[][]): [number, number] {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (meltStages.includes(gridToSearch[r][c])) {
          return [r, c];
        }
      }
    }
    return [-1, -1];
  }

  const getMeltedStage = (current: TileType, direction: 'hot' | 'cold'): TileType => {
    const idx = meltStages.indexOf(current);
    if (direction === 'hot' && idx < meltStages.length - 1) return meltStages[idx + 1];
    if (direction === 'cold' && idx > 0) return meltStages[idx - 1];
    return current;
  };

  const isNear = (r: number, c: number, type: TileType) => {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    return dirs.some(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      return nr >= 0 && nc >= 0 && nr < GRID_SIZE && nc < GRID_SIZE && gridRef.current[nr][nc] === type;
    });
  };

  const handleMove = useCallback((dr: number, dc: number) => {
    const currentLevelSnapshot = currentLevelRef.current;
    const [r, c] = playerPosRef.current;
    const currentStage = playerStageRef.current;
    if (r === -1 || c === -1 || gridRef.current.length === 0) return;

    const newR = r + dr;
    const newC = c + dc;
    if (
      newR < 0 || newC < 0 ||
      newR >= gridRef.current.length ||
      newC >= gridRef.current[newR]?.length
    ) {
      console.warn(`[WARN] Invalid move: [${newR}, ${newC}] out of bounds`);
      return;
    }

    const currentGridCopy = gridRef.current.map(row => [...row]);
    const dest = currentGridCopy[newR][newC];
    if (!['empty', 'sun', 'snow', 'home'].includes(dest)) return;

    console.log(`Trying to move to [${newR}, ${newC}] - destination: ${dest}`);

    // clear previous position
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (meltStages.includes(currentGridCopy[i][j])) {
          currentGridCopy[i][j] = 'empty';
        }
      }
    }

    let tempNextPlayerStage = currentStage;
    if (dest === 'sun' || isNear(newR, newC, 'sun')) {
      tempNextPlayerStage = getMeltedStage(currentStage, 'hot');
      console.log('🔥 Player melted to:', tempNextPlayerStage);
    } else if (dest === 'snow' || isNear(newR, newC, 'snow')) {
      tempNextPlayerStage = getMeltedStage(currentStage, 'cold');
      console.log('❄️ Player frozen to:', tempNextPlayerStage);
    }

    if (tempNextPlayerStage === 'ice-melt-4') {
      Alert.alert('💧 You melted!', 'Try again.');
      console.log(`[LOG] Player melted — resetting level ${currentLevelSnapshot + 1}`);
      const newGrid = JSON.parse(JSON.stringify(originalLevels[currentLevelSnapshot]));
      setGrid(newGrid);
      setPlayerStage('player');
      setPlayerPos(findPlayer(originalLevels[currentLevelSnapshot]));
      return;
    }

    currentGridCopy[newR][newC] = tempNextPlayerStage;

    if (originalLevels[currentLevelSnapshot][newR][newC] === 'home') {
      Alert.alert('🎉 Level Complete!', 'You reached home!');
      console.log(`[LOG] Completed Level ${currentLevelSnapshot + 1}, advancing to Level ${currentLevelSnapshot + 2}`);
      setCurrentLevel(prev => {
        const next = prev + 1;
        console.log(`[LOG] Setting currentLevel to: ${next}`);
        return next;
      });
      return;
    }

    setGrid(currentGridCopy);
    setPlayerStage(tempNextPlayerStage);
    setPlayerPos([newR, newC]);

    console.log(`[MOVE] Starting move from (${r}, ${c}) to (${newR}, ${newC}) on level ${currentLevelSnapshot}`);
  }, []);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>🧊 Melt Me Not</Text>
      <View style={styles.grid}>
        {grid.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {row.map((cell, colIdx) => {
              const tileTypeToDisplay =
                rowIdx === playerPos[0] && colIdx === playerPos[1]
                  ? playerStage
                  : cell;
              return (
                <Tile
                  key={`${rowIdx}-${colIdx}`}
                  type={tileTypeToDisplay}
                  size={TILE_SIZE}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#FAD961',
    alignItems: 'center', justifyContent: 'center', paddingTop: 40,
  },
  title: {
    fontSize: 26, fontWeight: 'bold', marginBottom: 10,
  },
  grid: { marginVertical: 10 },
  row: { flexDirection: 'row' },
  backButton: {
    position: 'absolute', top: 20, left: 20, zIndex: 10,
  },
});
