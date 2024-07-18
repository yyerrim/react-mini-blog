import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostList from '../list/PostList';
import Button from '../ui/Button';
import { useEffect, useState } from 'react';
// import data from '../../data.json';

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 35px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;

  :not(:last-child) {
      margin-bottom: 16px;
  }
`;

function MainPage(props) {
  const navigate = useNavigate();
  // useNavigate : NavLink, Link와 같은 역할

  const [data, setData] = useState([]);
  useEffect(() => {
    async function get() {
      const url = 'http://127.0.0.1:8080/post-list';
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
    }
    get();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Button
          title='글 작성하기'
          onClick={() => {
            navigate('/post-write');
          }}
        />

        <PostList
          posts={data}
          onClickItem={(item) => {
            navigate(`/post/${item.id}`);
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default MainPage;