import React, { useState } from 'react';
import { Grid, Button, Container, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { Typing, LogoBtn } from './index';

const GridCol = styled(Grid.Col)`
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const logos = [
  { name: 'appletvplus', id: 350 },
  { name: 'disneyplus', id: 337 },
  { name: 'netflix', id: 8 },
  { name: 'primevideo', id: 119 },
  { name: 'watcha', id: 97 },
  { name: 'wavve', id: 356 },
  { name: 'universeLogoWhite' },
  { name: 'universeLogoWhite' },
  { name: 'universeLogoWhite' },
];

const SignupOption = ({ userInput, setUserInput }) => {
  const [isLogo, setIsLogo] = useState(false);
  const [subscribedOtt, setSubscribedOtt] = useState([]);

  const handleClick = async () => {
    try {
      await axios.patch(`/api/users/${userInput}`, { subscribe_list: subscribedOtt });

      localStorage.removeItem('user');
      setUserInput(null);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  return (
    <>
      <Typing str="Congratulation!🥳🎉" isLast={0} />
      <Typing str="What OTT Services are you subscribing to?" isLast={1} />
      <Typing
        str="(Optional)"
        isLast={2}
        fontSize={'small'}
        onAnimationEnd={() => {
          setIsLogo(true);
        }}
      />
      {isLogo && (
        <Container>
          <Grid columns={3} m={25} justify="center">
            {logos.map((logo, idx) => (
              <GridCol span={1} key={idx} mih={120} display="flex">
                <LogoBtn logo={logo} idx={idx} subscribedOtt={subscribedOtt} setSubscribedOtt={setSubscribedOtt} />
              </GridCol>
            ))}
          </Grid>
          <Flex justify="flex-end">
            <Button component={Link} w={90} to="/signin" c="#FFF" fw={300} variant="outline" onClick={handleClick}>
              Skip
            </Button>
            <Button component={Link} w={90} to="/signin" c="#FFF" fw={300} variant="outline" onClick={handleClick}>
              Submit
            </Button>
          </Flex>
        </Container>
      )}
    </>
  );
};

export default SignupOption;
