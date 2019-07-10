import React, { useEffect, useState, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import uuid from "uuid/v4";

import { FiDownloadCloud } from "react-icons/fi";
import { Body, SmallBody } from "./Typography";

import { neutrals } from "../utils/colors";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#9E9E9E";
};

const Container = styled.div`
  width: 100%;
  min-width: 300px;
  box-sizing: border-box;

  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;
  border-width: 2px;
  border-radius: ${(props) => props.theme.borderRadius};
  border-color: ${(props) => getColor(props)};
  border-style: dashed;

  background-color: ${neutrals[900]};
  color: ${neutrals[100]};

  outline: none;
  transition: border 0.24s ease-in-out;

  svg {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
  }

  > p:first-child {
    margin-bottom: 0.5rem;
  }

  > p:last-child {
    margin-top: 2rem;
  }
`;

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const StyledDropzone = (props) => {
  const [files, setFiles] = useState([]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: ["image/jpeg", "image/png"],
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        alert("ooops");
        return;
      }

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const media = event.target.result;
        const image = new Image();
        image.src = media;
        image.onload = () => {
          const ratio = image.width / image.height;
          // props.handleImage(media, file.name, uuid(), ratio);
          props.handleImage(media);
        };
      };
      reader.readAsDataURL(file);
    },
  });

  // const thumbs = files.map((file) => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <img src={file.preview} style={img} alt="Uploaded thumbnail" />
  //     </div>
  //   </div>
  // ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <FiDownloadCloud color={neutrals[500]} />
        <Body color="secondary">Drag & drop an image</Body>
        <Body color="secondary">
          or{" "}
          <span style={{ color: neutrals[100], fontWeight: "bold" }}>
            {" "}
            click the area
          </span>
        </Body>
        <SmallBody color="secondary">
          Accepted files are PNG, JPG and TIFF.
        </SmallBody>
      </Container>
      {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
    </div>
  );
};

export default StyledDropzone;
