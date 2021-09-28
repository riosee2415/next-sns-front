import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input, Button, message } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_PREVIEW_IMAGE,
  FEED_CREATE_REQUEST,
  IMAGE_UPLOAD_REQUEST,
} from "../reducers/feed";

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

const PreivewImg = styled.img`
  width: 550px;
  height: auto;
  margin: 10px 0px;
`;

const FeedCreateForm = () => {
  const [content, setContent] = useState(``);
  const contentOnChange = (e) => {
    setContent(e.target.value);
  };

  const { previewImage, st_feedCreateDone } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    if (st_feedCreateDone) {
      message.success("새로운 피드가 등록되었습니다.");
      setContent(``);
      dispatch({
        type: CLEAR_PREVIEW_IMAGE,
      });
    }
  }, [st_feedCreateDone]);

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

  const feedWriteHandler = useCallback(() => {
    if (content === ``) {
      return message.error("피드내용을 입력해주세요.");
    }

    if (previewImage === null) {
      return message.error("이미지를 선택해주세요.");
    }

    dispatch({
      type: FEED_CREATE_REQUEST,
      data: {
        content,
        imagePath: previewImage,
      },
    });
  }, [previewImage, content]);

  return (
    <FeedCreateBox>
      <FeedContent
        value={content}
        onChange={contentOnChange}
        allowClear={true}
        placeholder="New Content..."
      />
      <input
        type="file"
        hidden
        ref={imageFile}
        accept=".png,.jpg"
        onChange={fileChange}
      />
      <Button type="dashed" onClick={fileButtonclick}>
        Upload
      </Button>
      <Button type="primary" onClick={feedWriteHandler}>
        게시글 작성
      </Button>

      {previewImage && (
        <PreivewImg
          src={`http://localhost:4000/${previewImage}`}
          alt="PREVIEW"
        />
      )}
    </FeedCreateBox>
  );
};

export default FeedCreateForm;
