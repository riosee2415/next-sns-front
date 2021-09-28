import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import styled, { keyframes } from "styled-components";
import {
  InfoCircleOutlined,
  SwapOutlined,
  BookOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useSelector } from "react-redux";

const hoverAnimation = keyframes`
    0% {
        opacity : 1;
    } 50% {
        opacity : 0.3;
    } 100% {
        opacity : 1;
    }

`;

const MenuRow = styled(Row)`
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;

  box-sizing: border-box;
  font-size: 17px;

  cursor: pointer;
`;

const IconCol = styled(Col)`
  margin-right: 5px;
  padding: 5px 10px;
  border-bottom: 0.5px solid #dedede;
`;

const ContentCol = styled(Col)`
  padding: 5px 10px;
  border-bottom: 0.5px solid #dedede;

  &:hover {
    animation: ${hoverAnimation} 0.4s forwards;
  }
`;

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const GuideTxt = styled.p`
  font-size: 14px;
  color: #999;
  margin-top: 10px;
`;

const MyMenu = () => {
  const { me } = useSelector((state) => state.user);

  return me ? (
    <MenuRow>
      <>
        <IconCol span={4}>
          <InfoCircleOutlined />
        </IconCol>
        <Link href="/me/profile">
          <ContentCol span={18}> 내 정보 </ContentCol>
        </Link>
      </>

      <>
        <IconCol span={4}>
          <SwapOutlined />
        </IconCol>
        <Link href="/me/follow">
          <ContentCol span={18}> 팔로우 &#38; 팔로잉 </ContentCol>
        </Link>
      </>

      <>
        <IconCol span={4}>
          <BookOutlined />
        </IconCol>
        <Link href="/me/collection">
          <ContentCol span={18}> 컬렉션 </ContentCol>
        </Link>
      </>
    </MenuRow>
  ) : (
    <LoginSection>
      <Link href="/login">
        <Button type="primary">GO TO LOGIN!</Button>
      </Link>
      <GuideTxt>서비스를 사용하기 위해 로그인을 해주세요.</GuideTxt>
    </LoginSection>
  );
};

export default MyMenu;
