import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ProductList } from './Admin_Main_ProductList';

export default function Admin_Main() {
  const [datas, setDatas] = useState([]);
  const [value, setValue] = useState(5);
  const [page, setPage] = useState(1);
  const pageNumber: number = Math.floor(datas.length / value) + 1;
  useEffect(() => {
    axios
      .get('http://13.125.151.45:8080/api/package/admin')
      .then((res) => setDatas(res.data.data));
  }, []);

  const addProduct = () => {
    console.log('test');
    console.log(datas.length);
    console.log(pageNumber);
  };
  return (
    <Wrap>
      <Header>
        <img src={process.env.PUBLIC_URL + '/icons/logo-admin.png'} />
      </Header>
      <Nav>
        <Nav_Bottom>사이트 바로가기</Nav_Bottom>
      </Nav>
      <Main>
        <Main_Wrap>
          <Main_Add_Btn onClick={addProduct}>
            <p>상품 추가하기</p>
          </Main_Add_Btn>
          <Main_List_Number onChange={(e) => setValue(Number(e.target.value))}>
            <option value="5">5개</option>
            <option value="10">10개</option>
          </Main_List_Number>
          <Main_Board>
            <Main_List>
              <Main_List_Category>
                <input type="checkbox"></input>
                <Title>상품명</Title>
                <Summary>요약</Summary>
                <Price>가격</Price>
                <SearchKeyword>카테고리</SearchKeyword>
                <UpdatedAt>등록일</UpdatedAt>
              </Main_List_Category>
              {datas
                .slice((page - 1) * value, page * value)
                .map((data: any) => (
                  <ProductList key={data.id} data={data} />
                ))}
            </Main_List>
            <Main_Page_Number>
              <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
              </button>
              {new Array(pageNumber).fill(null).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => {
                    setPage(i + 1);
                  }}
                  aria-current={page === i + 1 && 'page'}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pageNumber}
              >
                &gt;
              </button>
            </Main_Page_Number>
          </Main_Board>
        </Main_Wrap>
      </Main>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 80px auto;
  grid-template-areas:
    'header header'
    'side main';
`;
const Header = styled.div`
  grid-area: header;
  background: black;
  display: flex;
  align-items: center;
  img {
    margin: 10px 0px 10px 30px;
    width: 251px;
    height: 28px;
  }
`;
const Nav = styled.div`
  grid-area: side;
  background: #ffffff;
  display: flex;
`;
const Nav_Bottom = styled.div`
  width: 100%;
  height: 10%;
  align-self: flex-end;
  background: #666666;
`;
const Main = styled.div`
  grid-area: main;
  background: rgb(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Main_Wrap = styled.div`
  width: 97%;
  height: 95%;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  position: relative;
`;
const Main_Add_Btn = styled.button`
  position: absolute;
  width: 127px;
  height: 40px;
  background: #4286f4;

  margin: 0;
  padding: 0.5rem 1rem;

  -family: 'Noto Sans KR', sans-serif;
  -size: 1rem;
  -weight: 400;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 4px;

  display: inline-block;
  width: auto;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  cursor: pointer;

  transition: 0.5s;
  right: 30px;
  top: 20px;

  &:active {
    background: skyblue;
    outline: 0;
  }
  &:disabled {
    opacity: 0.5;
  }
  p {
    -family: 'Pretendard';
    -style: normal;
    -weight: 500;
    -size: 16px;
    line-height: 24px;
    color: #ffffff;
  }
`;
const Main_Board = styled.div`
  width: 100%;
`;
const Main_List = styled.div`
  width: 100%;
  padding: 110px 30px 0 30px;
`;
const Main_List_Category = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
  input {
    width: 3%;
  }
  p {
    font-size: 13px;
    text-align: center;
  }
`;
const Title = styled.p`
  width: 12%;
`;
const Summary = styled.p`
  width: 50%;
`;
const Price = styled.p`
  width: 10%;
`;
const SearchKeyword = styled.p`
  width: 10%;
`;
const UpdatedAt = styled.p`
  width: 15%;
`;
const Main_List_Number = styled.select`
  position: absolute;
  -family: 'Noto Sansf KR', sans-serif;
  -size: 13px;
  -weight: 400;
  line-height: 1.5;
  width: 80px;
  height: 35px;
  top: 60px;
  left: 30px;

  color: #444;
  background-color: #fff;

  padding: 0.3em 0.7em 0.2em 0.4em;

  border: 1px solid #aaa;
  border-radius: 0.5em;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: #888;
  }
  &:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 2px rgba(59, 153, 252, 0.7);
    color: #222;
    outline: none;
  }
  &:disabled {
    opacity: 0.5;
  }
`;
const Main_Page_Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  button {
    align-items: center;
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    display: inline-flex;
    font-family: system-ui, -apple-system, system-ui, 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    padding: 10px;
    position: relative;
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: auto;

    &[aria-current] {
      border-color: rgba(0, 0, 0, 0.15);
      box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
      background: orange;
      color: blue;
      font-size: 20px;
      cursor: revert;
      transform: revert;
    }
    &:hover,
    &:focus {
      border-color: rgba(0, 0, 0, 0.15);
      box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
      color: blue;
      font-size: 20px;
    }
    &:hover {
      transform: translateY(-1px);
    }
    &:active {
      background-color: #f0f0f1;
      border-color: rgba(0, 0, 0, 0.15);
      box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
      color: rgba(0, 0, 0, 0.65);
      transform: translateY(0);
    }
    &:disabled {
      display: none;
    }
  }
`;
