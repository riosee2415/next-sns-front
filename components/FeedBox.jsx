import React from "react";
import styled from "styled-components";
import { Card, Avatar, Image } from "antd";
import {
  EditOutlined,
  HeartOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const FeedCard = styled(Card)`
  width: 350px;
  margin-bottom: 100px;
  box-shadow: 2px 2px 6px #c0c0c0;

  @media only screen and (min-width: 576px) {
    width: 550px;
    margin-bottom: 140px;
  }
`;

const FeedImage = styled(Image)`
  width: 100%;
  height: 380px;
  object-fit: cover;

  @media only screen and (min-width: 576px) {
    height: 597px;
  }
`;

const FeedBox = ({ feedData }) => {
  return (
    <FeedCard
      cover={
        <FeedImage
          alt={feedData.title}
          src={`https://api.schoolhealing2.co.kr/${feedData.imagePath}`}
        />
      }
      actions={[
        <CommentOutlined key="comment" />,
        <HeartOutlined key="heart" />,
        <EditOutlined key="edit" />,
      ]}
    >
      <FeedCard.Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={feedData.title}
        description={feedData.content}
      />
    </FeedCard>
  );
};

export default FeedBox;
