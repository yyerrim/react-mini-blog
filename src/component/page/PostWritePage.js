import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';

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

function PostWritePage(props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Wrapper>
      <Container>
        <TextInput
          height={20}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <TextInput
          height={480}
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />

        <Button
          title='글 작성하기'
          onClick={() => {
            async function send() {
              const url = 'http://127.0.0.1:8080/post-write';
              // Get 방식 : const res = await fetch(url);
              // Post 방식이 될려면 객체도 적어줘야함
              const res = await fetch(url, {
                method: 'post',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({ title: title, desc: content })
              });
              // headers : json으로 던지기 위해 사용 / body : @@@@@
              const data = await res.json();
              if (data.code === 200) {
                alert(data.msg);
                navigate('/');
              } else {
                alert('다시 입력해주세요.');
              }
            }
            send();
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default PostWritePage;
