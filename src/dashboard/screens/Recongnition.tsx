import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  Platform,
  LogBox,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Canvas from 'react-native-canvas';

const TensorCamera = cameraWithTensors(Camera);

const { width, height } = Dimensions.get('window');

LogBox.ignoreAllLogs(true);
export default function Recongnition() {
  const [model, setModel] = useState<cocoSsd.ObjectDetection>();
  let context = useRef<CanvasRenderingContext2D>();
  let canvas = useRef<Canvas>();

  let textureDims =
    Platform.OS == 'ios'
      ? { height: 1920, width: 1000 }
      : { height: 1200, width: 1600 };

  function handleCameraStream(images: any) {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (!model || !nextImageTensor)
        throw new Error('No model or image tensor');
      model
        .detect(nextImageTensor)
        .then((prediction) => {
          //We will draw the rectangles
          drawRectangle(prediction, nextImageTensor);
        })
        .catch((error) => {
          console.log(error);
        });

      requestAnimationFrame(loop);
    };
    loop();
  }

  function drawRectangle(
    predictions: cocoSsd.DetectedObject[],
    nextImageTensor: any
  ) {
    if (!context.current || !canvas.current) return;

    //to match the size of camera preview
    const scaleWidth = width / nextImageTensor.Shape[1];
    const scaleheight = height / nextImageTensor.Shape[0];

    const flipHorizontal = Platform.OS == 'ios' ? false : true;

    //we will clear the previous prediction
    context.current.clearRect(0, 0, width, height);

    //Draw the rectangle for each prediction
    for (const prediction of predictions) {
      const [x, y, width, height] = prediction.bbox;

      //scale the coordinates based on the ratocalculated
      const boundingBoxX = flipHorizontal
        ? canvas.current.width - x * scaleWidth - width * scaleWidth
        : x * scaleWidth;
      const boundingBoxY = y * scaleheight;

      //draw the rectangle
      context.current.strokeRect(
        boundingBoxX,
        boundingBoxY,
        width * scaleWidth,
        height * scaleheight
      );

      //draw the label
      context.current.strokeText(
        prediction.class,
        boundingBoxX - 5,
        boundingBoxY - 5
      );
    }
  }

  async function handleCanvas(can: Canvas) {
    if (can) {
      can.width = width;
      can.height = height;
      const ctx: CanvasRenderingContext2D = can.getContext('2d');
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'red';
      ctx.lineWidth = 3;

      context.current = ctx;
      canvas.current = can;
    }
  }

  useEffect(() => {
    async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await tf.ready();
      setModel(await cocoSsd.load());
    };
  }, []);

  return (
    <View style={styles.container}>
      <TensorCamera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        onReady={handleCameraStream}
        autorender={true}
        useCustomShadersToResize={false}
      />
      <Canvas style={styles.canvas} ref={handleCanvas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    width: '100%',
    heigth: '100%',
  },
  canvas: {
    position: 'absolute',
    zIndex: 10000000,
    width: '100%',
    height: '100%',
  },
});
