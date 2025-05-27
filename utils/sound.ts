import SoundPlayer from 'react-native-sound-player';

export const playSound = (name: string) => {
  try {
    SoundPlayer.playSoundFile(name, 'mp3'); // only the name, no extension
  } catch (e) {
    console.log('❌ Sound play error:', e);
  }
};
