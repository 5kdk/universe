import axios from 'axios';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { IconX, IconCheck } from '@tabler/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';

import { signUpSchema } from '../../schema/schema';
import Typing from './Typing';

import SignupInput from './SignupInput';

const SignupForm = ({ setUserInput }) => {
  const [step, setStep] = useState(0);

  const {
    handleSubmit,
    control,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async data => {
    try {
      const { data: email } = await axios.post('/api/auth/signup', data);

      notifications.show({
        id: 'hello-there',
        withCloseButton: true,
        autoClose: 2000,
        title: 'Signup Failure',
        message: '회원가입에 성공했습니다.',
        color: 'green',
        icon: <IconCheck />,
        className: 'my-notification-class',
        loading: false,
      });
      setUserInput(email);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        notifications.show({
          id: 'hello-there',
          withCloseButton: true,
          autoClose: 2000,
          title: 'Signup Failure',
          message: '중복된 이메일이 존재합니다.',
          color: 'red',
          icon: <IconX />,
          className: 'my-notification-class',
          loading: false,
        });
      } else {
        notifications.show({
          id: 'hello-there',
          withCloseButton: true,
          autoClose: 2000,
          title: 'Signup Failure',
          message: '알 수 없는 오류가 발생했습니다.',
          color: 'red',
          icon: <IconX />,
          className: 'my-notification-class',
          loading: false,
        });
      }
    }
  };

  return (
    <>
      <Typing str="Welcome to Universe!" isLast={0} />
      <Typing
        str="Let's begin the adventure🚀👾"
        isLast={1}
        onAnimationEnd={() => {
          setStep(step + 1);
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {step > 0 && <SignupInput name="email" control={control} trigger={trigger} step={step} setStep={setStep} />}
        {step > 1 && <SignupInput name="password" control={control} trigger={trigger} step={step} setStep={setStep} />}
        {step > 2 && (
          <SignupInput name="confirmPassword" control={control} trigger={trigger} step={step} setStep={setStep} />
        )}
        {step > 3 && (
          <Button type="submit" disabled={!isValid} fullWidth>
            Sign Up
          </Button>
        )}
      </form>
    </>
  );
};

export default SignupForm;
