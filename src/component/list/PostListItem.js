import styled from 'styled-components';

const Wrapper = styled.div`
  width: calc(100% - 35px); padding: px; display: flex;
  flex-direction: column; align-items: flex-start;
  justify-content: center;
  border: 1px solid grey; border-radius: 8px;
  cursor: pointer; background: white;
  :hover { background: lightgrey; }
`;

const TitleText = styled.p`
  font-size: 20px; font-weight: 500;
`;

function PostListItem(props) {
  const { post, onClick } = props;
  // console.dir(post); // 댓글 어떻게 불러오는지 확인하기 위해 콘솔에 찍어보기
  return (
    <Wrapper onClick={onClick}>
      <TitleText>{post.title} ({post.comments.length})</TitleText>
    </Wrapper>
  );
}

export default PostListItem;
