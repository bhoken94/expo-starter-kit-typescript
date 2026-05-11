import { ViroAmbientLight, ViroARImageMarker, ViroARScene, ViroARTrackingTargets, ViroText, ViroVideo } from '@reactvision/react-viro';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

interface VideoSceneProps {
  sceneNavigator?: any;
}

const VideoScene = (props: VideoSceneProps = {}) => {
  const { sceneNavigator } = props;
  const [qrScanned, setQrScanned] = useState(false);

  useEffect(() => {
    ViroARTrackingTargets.createTargets({
      ['videoTarget']: {
        source: require('../../assets/ar_marker.jpg'),
        orientation: 'Up',
        physicalWidth: 0.27,
      },
    });
    return () => {
      ViroARTrackingTargets.deleteTarget('videoTarget');
      setQrScanned(false);
    };
  }, []);

  const onMarkerFound = () => {
    setQrScanned(true);
  };

  const goBack = () => {
    sceneNavigator.pop();
  };

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" intensity={200} />

      <ViroText text="Back" scale={[0.3, 0.3, 0.3]} position={[-0.2, 0.3, -0.7]} style={styles.textStyle} onClick={goBack} />

      {!qrScanned && <ViroText text="Scan the QR Code to view a video" scale={[0.4, 0.4, 0.4]} position={[0, 0, -2]} style={styles.textStyle} />}
      <ViroARImageMarker target={'videoTarget'} onAnchorFound={onMarkerFound}>
        <ViroVideo source={require('../../assets/video_test.mp4')} position={[0, 0, 0]} rotation={[-90, 0, 0]} width={0.27} height={0.27} volume={1.0} />
      </ViroARImageMarker>
    </ViroARScene>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default VideoScene;
