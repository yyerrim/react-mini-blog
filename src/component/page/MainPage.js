import { Link, useLocation, useNavigate } from 'react-router-dom';
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

  // const [pageInfo, setPageInfo] = useState({});
  const [pageInfo, setPageInfo] = useState(
    {
      startPage: 0, endPage: 0, totalCount: 0, totalPage: 0
    }
  ); // 다른 개발자들을 위해서 이러한 정보 적어주는것도 좋음

  const [pagination, setPagination] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = params.get('page') || 1;

  useEffect(() => {
    async function get() {
      const url = `http://127.0.0.1:8080/post-list?page=${page}`;
      const res = await fetch(url);
      const data = await res.json();
      setData(data.list);
      setPageInfo(
        {
          startPage: data.startPage, endPage: data.endPage, totalCount: data.totalCount, totalPage: data.totalPage
        }
      );
      const p = [];
      for (let i = data.startPage; i <= data.endPage; i++) {
        p.push(<Link to={`/?page=${i}`}> {i}</Link >)
      }
      setPagination(p);
    }
    get();
  }, [page]);

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
        <div>{pagination}</div>
      </Container>
    </Wrapper>
  );
}

export default MainPage;