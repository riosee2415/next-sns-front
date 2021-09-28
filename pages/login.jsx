import React, { useCallback, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, SIGN_IN_REQUEST } from "../reducers/user";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { useRouter } from "next/router";

const LoginForm = styled(Form)`
  padding: 20px;
  width: 80%;
  margin-top: 30px;
`;

const Login = () => {
  const { st_signInLoading, me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = useCallback((values) => {
    dispatch({
      type: SIGN_IN_REQUEST,
      data: values,
    });
  });

  const accessPage = () => {
    if (me) {
      router.push("/");
    }
  };

  // 접근성 제어 -> 언제 이 페이지는 사용이 불가능하다고 정의!
  useEffect(() => {
    accessPage();
  }, []);

  useEffect(() => {
    accessPage();
  }, [me]);

  return (
    <AppLayout>
      <LoginForm
        name="loginForm"
        labelCol={{ xs: 24, sm: 8 }}
        wrapperCol={{ xs: 24, sm: 16 }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please Input Your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "You Must Write Password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={st_signInLoading}>
            LOG IN
          </Button>
        </Form.Item>
      </LoginForm>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Login;
