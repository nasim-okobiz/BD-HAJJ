import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import axios from "../Components/Axios";
import { useDispatch } from "react-redux";
import { activeUser } from "../Slices/userSlices";
import { loginCookies } from "../utils/Cookies/cookies.js";
import axios from 'axios';
import { API_BASE_URL } from "../Components/config.js";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    console.log("values", values);

    // Determine if contactInfo is an email or a phone number
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contactInfo);

    // Prepare the data object
    const data = isEmail
      ? { email: values.contactInfo, password: values.password }
      : { phone: values.contactInfo, password: values.password };
    console.log("data", data);

    // setLoading(true);
    try {
      // const response = await axios.post("/auth/singin", data);
      const response = await axios.post(`${API_BASE_URL}/auth/singin`, data, {
        // headers: {
        //   'Content-Type': 'application/json'
        // }
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      loginCookies(response?.data?.data?.accessToken)
      dispatch(activeUser(response?.data?.data));
      console.log(response);
      console.log(response?.data?.data);

      setTimeout(() => {
        if (response?.data?.data?.user?.role === "admin") {
          return navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 1000);

      message.success("Login successfully");
    } catch (error) {
      message.error("Auth Error");
    } finally {
      // setLoading(false);
    }
  };


  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <div className="md:w-[500px] mx-auto border p-10 mb-16 rounded-md">
        <h1 className="text-2xl my-2 mb-5">Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="contactInfo"
            rules={[
              {
                required: true,
                message: "Please input your email or phone number!",
              },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$|^\d{11}$/,
                message: "Please enter a valid email or 11-digit phone number!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email or Phone Number"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full bg-primary"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      <h1>
        Developed by{" "}
        <Link
          className="font-bold text-black mt-10"
          target="_blank"
          to={"https://okobiz.com"}
        >
          okobiz
        </Link>
      </h1>
    </div>
  );
};

export default Login;
