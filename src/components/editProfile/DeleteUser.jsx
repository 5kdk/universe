import React, { useState } from 'react';
import { Title, Container, Flex, Button, Text, Checkbox } from '@mantine/core';
import { useUserQuery } from '../../hooks/queries';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atom';
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { modals } from '@mantine/modals';

const DeleteUser = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const [user, setUser] = useRecoilState(userState);

  const { userInfo: name } = useUserQuery({ select: userInfo => userInfo.name });

  const handleClick = async () => {
    try {
      const { data: alarm } = await axios.delete(`/api/auth/withdrawal/${user}`);
      setUser(null);
      localStorage.removeItem('user');

      notifications.show({
        withCloseButton: true,
        autoClose: 3000,
        title: 'Withdrawal Success',
        message: alarm,
        color: 'green',
        icon: <IconCheck />,
        loading: false,
      });

      modals.closeAll();
      navigate('/');
    } catch (error) {
      notifications.show({
        withCloseButton: true,
        autoClose: 3000,
        title: 'Withdrawal Failure',
        message: '알 수 없는 오류가 발생했습니다.',
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  };

  const openModal = () => {
    modals.open({
      title: '회원 탈퇴',
      centered: true,
      children: (
        <Flex direction={'column'} gap={20}>
          <Text> 회원 탈퇴시 {name}님의 유니버스가 삭제되며 복구 불가능합니다.</Text>
          <Checkbox onChange={e => setChecked(!e.currentTarget.checked)} label="이에 동의하십니까?" />
          <Flex gap={3}>
            <Button fullWidth variant="outline" onClick={modals.closeAll}>
              취소하기
            </Button>
            <Button onClick={handleClick} fullWidth variant="outline">
              탈퇴하기
            </Button>
          </Flex>
        </Flex>
      ),
    });
  };

  return (
    <Container p={0}>
      <Flex gap={50} align={'center'} justify={'space-between'}>
        <Title order={5}>회원탈퇴</Title>
        <Button onClick={openModal} variant="outline">
          탈퇴
        </Button>
      </Flex>
    </Container>
  );
};

export default DeleteUser;
