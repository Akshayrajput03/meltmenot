// Tile.tsx
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';

export type TileType =
  | 'empty' | 'player' | 'sun' | 'snow' | 'wall' | 'home'
  | 'ice-melt-1' | 'ice-melt-2' | 'ice-melt-3' | 'ice-melt-4';

type TileProps = {
  type: TileType;
  size: number;
  onPress?: () => void;
};

const images = {
  sun: require('../assets/sun.png'),
  snow: require('../assets/snow.png'),
  home: require('../assets/home.png'),
  player: require('../assets/ice-cube-1.png'),
  'ice-melt-1': require('../assets/ice-cube-1.png'),
  'ice-melt-2': require('../assets/ice-cube-2.png'),
  'ice-melt-3': require('../assets/ice-cube-3.png'),
  'ice-melt-4': require('../assets/ice-cube-4.png'),
  wall: require('../assets/wall.png'),
};

export const Tile: React.FC<TileProps> = ({ type, size, onPress }) => {
  const isBlocked = type === 'wall';
  const style = {
    width: size,
    height: size,
    margin: 2,
    borderRadius: 6,
    backgroundColor: getBackgroundColor(type),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: isBlocked ? 2 : 0,
    borderColor: isBlocked ? '#555' : 'transparent',
  };

  const img = ['sun', 'snow'].includes(type) ? null : images[type as keyof typeof images];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={style}>
        {img && (
          <Image
            source={img}
            style={{ width: size * 0.8, height: size * 0.8, resizeMode: 'contain' }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const getBackgroundColor = (type: TileType) => {
  switch (type) {
    case 'wall': return '#b45309';
    case 'home': return '#ffffff';
    case 'empty':
    case 'snow':
    case 'sun':
      return '#fefefe'; // ✅ Match empty tile background
    default: return '#fefefe'; // fallback also to match
  }
};
