import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToList,
  addShoe,
  selectCurrentShoe,
} from "../features/modelsListSlice";
import { loadFromLocalStorage } from "../localStorage";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { nanoid } from "nanoid";
import Navbar from "./navbar/Navbar";
import Model3d from "./canvas/Model3d";
import Panel from "./panel/Panel";
import Done from "./Done";
import Share from "./Share";

import { PerspectiveCamera } from "three";

const Experience = () => {
  const [baseModel, setBaseModel] = useState({});
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);

  const dispatch = useDispatch();
  const currentModel = useSelector(selectCurrentShoe);

  useEffect(() => {
    const bag = loadFromLocalStorage();
    if (bag) {
      bag.forEach((shoe) => {
        const newShoe = { ...shoe, editing: false };
        dispatch(addToList(newShoe));
      });
    }
  }, [dispatch]);

  const onFirstRender = () => {
    const gltfLoader = new GLTFLoader();

    const loadModel = {
      name: "super shoe",
      meshes: [],
    };

    const loadShoe = {
      name: "super shoe",
      price: 100,
      editing: false,
      size: 39,
      meshes: [],
      index: nanoid(),
    };

    gltfLoader.load("zapas/shoe.glb", (gltf) => {
      gltf.scene.children.forEach((elem, index) => {
        return (
          (loadModel.meshes = [
            ...loadModel.meshes,
            {
              name: elem.name,
              geometry: elem.geometry,
              material: elem.material,
            },
          ]),
          (loadShoe.meshes = [
            ...loadShoe.meshes,
            {
              name: elem.name,
              color: "#ffffff",
              index,
            },
          ])
        );
      });
      setBaseModel(loadModel);
      dispatch(addShoe(loadShoe));
    });
  };

  useEffect(onFirstRender, [dispatch]);

  const handleShare = () => {
    const link = document.createElement("a");
    document.body.appendChild(link); //Firefox requires the link to be in the body
    link.setAttribute("download", currentModel.name);
    renderer.render(scene, camera);
    link.setAttribute("href", renderer.domElement.toDataURL("image/png"));
    link.click();
    document.body.removeChild(link);
  };

  const handleDone = () => {
    const oldCamera = camera.clone();
    const camera1 = new PerspectiveCamera(45, 1, 2, 5);
    camera1.position.set(0, 0.15, 2.75);

    renderer.setSize(400, 400);

    renderer.render(scene, camera1);

    const image = renderer.domElement.toDataURL("image/webp");

    camera.position.y = 0;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, oldCamera);

    const newShoe = {
      ...currentModel,
      editing: false,
      index: nanoid(),
    };
    dispatch(addToList({ ...currentModel, editing: false, image }));
    dispatch(addShoe(newShoe));
  };

  return (
    <>
      {currentModel && (
        <Navbar currentModel={currentModel} handleDone={handleDone} />
      )}
      {currentModel && (
        <Model3d
          baseModel={baseModel}
          setRenderer={setRenderer}
          setScene={setScene}
          setCamera={setCamera}
        />
      )}
      {currentModel && <Panel />}
      {currentModel && (
        <Done currentModel={currentModel} handleDone={handleDone} />
      )}
      {currentModel && (
        <Share currentModel={currentModel} handleShare={handleShare} />
      )}
    </>
  );
};

export default Experience;
