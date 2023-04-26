import axios from 'axios';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { IconX } from '@tabler/icons-react';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSetRecoilState } from 'recoil';
import Typing from './Typing';

import { signUpSchema } from '../../schema/schema';
import userState from '../../recoil/atom/userState';

const EmailInput = styled(TextInput)`
  > label,
  span {
    font-weight: 300;
    color: #00cfc8;
  }
`;

const PasswordFormInput = styled(PasswordInput)`
  > label,
  span {
    font-weight: 300;
    color: #00cfc8;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 32px 0;
`;

const InputButton = styled(Button)`
  float: right;
  align-self: flex-end;
  font-weight: 300;
`;

const SignupForm = ({ setActive }) => {
  const setUser = useSetRecoilState(userState);
  const [isShow, setIsShow] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async data => {
    const user = await axios.post('/api/auth/signup', data);

    setUser(user);
    setActive('option');
  };

  return (
    <>
      <Typing str="Welcome to Universe!" isLast={0} />
      <Typing
        str="Let's begin the adventure🚀👾"
        isLast={1}
        onAnimationEnd={() => {
          setIsShow(isShow + 1);
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {isShow > 0 && (
          <InputWrapper>
            <EmailInput
              style={{ width: '600px' }}
              label="Enter your email"
              withAsterisk
              {...register('email')}
              error={errors?.email?.message}
              icon={errors?.email && <IconX size="1rem" strokeWidth={2} color={'#862d2d'} />}
            />
            {!errors?.email && (
              <InputButton
                type="button"
                onClick={() => {
                  setIsShow(isShow + 1);
                }}
                variant="outline"
                color="gray">
                Continue
              </InputButton>
            )}
          </InputWrapper>
        )}
        {isShow > 1 && (
          <InputWrapper>
            <PasswordFormInput
              style={{ width: '100%' }}
              label="Create a password"
              withAsterisk
              {...register('password')}
              error={errors?.password?.message}
              icon={errors?.password && <IconX size="1rem" strokeWidth={2} color={'#862d2d'} />}
            />
            {!errors?.password && (
              <InputButton
                type="button"
                onClick={() => {
                  setIsShow(isShow + 1);
                }}
                variant="outline"
                color="gray">
                Continue
              </InputButton>
            )}
          </InputWrapper>
        )}
        {isShow > 2 && (
          <InputWrapper>
            <PasswordFormInput
              style={{ width: '100%' }}
              label="Please enter your password again"
              withAsterisk
              {...register('confirmPassword')}
              error={errors?.confirmPassword?.message}
              icon={errors?.confirmPassword && <IconX size="1rem" strokeWidth={2} color={'#862d2d'} />}
            />
            {!errors?.confirmPassword && (
              <InputButton
                type="button"
                onClick={() => {
                  setIsShow(isShow + 1);
                }}
                variant="outline"
                color="gray">
                Continue
              </InputButton>
            )}
          </InputWrapper>
        )}
        {isShow > 3 && (
          <Button type="submit" fullWidth style={{ float: 'right' }}>
            Sign Up
          </Button>
        )}
      </form>
    </>
  );
};

export default SignupForm;