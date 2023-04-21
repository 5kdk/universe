import styled from '@emotion/styled';
import { Title } from '@mantine/core';
import { ListButton, MyList, ThemeButton } from '../components';

const Container = styled.div`
  margin: 0 auto;
  width: 77.5rem;
`;

const TopSection = styled.div`
  display: flex;
  gap: 1rem;
  div {
    width: 38.75rem;
  }
`;

const MyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ListButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MyListSection = styled.div`
  /* display: flex; */
`;

const MyPage = () => {
  console.log();
  return (
    <Container>
      <Title order={1}>000's Universe</Title>
      <TopSection>
        <div className="subscribe">
          <Title order={3}>예상 구독료</Title>
          <div className="badges"></div>
          <div>
            <div>
              <Title order={4}>현재 나의 구독료</Title>
              <span>₩29,800</span>
              <button></button>
            </div>
            <div>
              <h4>구독하고 있지만 보고 있지 않아요</h4>
              <div className="no-badges"></div>
            </div>
          </div>
        </div>
        <div className="static">static graph</div>
      </TopSection>
      <MyListContainer>
        <ListButtons className="mylist">
          <ListButton tooltip="이번달에 보고있거나 볼 컨텐츠">Watch</ListButton>
          <ListButton tooltip="좋아요한 컨텐츠">Like</ListButton>
          <ListButton tooltip="내가 본 컨텐츠">History</ListButton>
        </ListButtons>
        <MyListSection>
          <MyList />
          <div>img</div>
        </MyListSection>
      </MyListContainer>
      <ThemeButton />
    </Container>
  );
};

export default MyPage;
