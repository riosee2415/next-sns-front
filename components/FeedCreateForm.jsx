import React, { useCallback, useRef } from "react";
import { Input, Button } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_UPLOAD_REQUEST } from "../reducers/feed";

const FeedCreateBox = styled.div`
  width: 550px;
  padding: 20px 0px;
  margin-bottom: 10px;
`;

const FeedContent = styled(Input.TextArea)`
  resize: none;
  width: 100%;
  height: 60px;
`;

const FeedCreateForm = () => {
  const { previewImage } = useSelector((state) => state.feed);

  const imageFile = useRef();
  const dispatch = useDispatch();

  const fileButtonclick = useCallback(() => {
    imageFile.current.click();
  });

  const fileChange = useCallback(
    (e) => {
      const sendFile = e.target.files[0];

      const formData = new FormData();

      formData.append("image", sendFile);

      dispatch({
        type: IMAGE_UPLOAD_REQUEST,
        data: formData,
      });
    },
    [imageFile.current]
  );

  return (
    <FeedCreateBox>
      <FeedContent allowClear={true} placeholder="New Content..." />
      <input
        type="file"
        hidden
        ref={imageFile}
        accept=".png,.jpg"
        onChange={fileChange}
      />
      <Button type="primary" onClick={fileButtonclick}>
        Upload
      </Button>
      {previewImage && (
        <img src={`http://localhost:4000/${previewImage}`} alt="PREVIEW" />
      )}
    </FeedCreateBox>
  );
};

export default FeedCreateForm;
