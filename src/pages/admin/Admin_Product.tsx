import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { postAdminProductData } from '../../components/admin/Admin_Type';
import { url } from 'inspector';

const registerInfo: postAdminProductData = {
  title: '그리스2',
  categoryIds: [1, 2, 3],
  subCategoryIds: [4, 7, 13, 15],
  thirdCategoryIds: [14],
  price: '1,000,000',
  summary:
    '9월 대한항공 전세기 직항 이용\n 산토리니 특급 2박, 특급호텔 총 7박\n 모든 것이 포함된 풀패키지 여행',
  requiredOptionName: '출발일',
  requiredOptionValues: '2022.12.02(금)출발~2022.12.29(목)도착',
  optionalName: '싱글차지',
  optionalValues: '1인 싱글룸 사용시 추가',
  flightInfo: '대한항공 전세기 직항',
  soldoutFlg: false,
  dispFlg: true,
  searchKeyword: ['여자끼리'],
};

export default function Admin_Product() {
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [price, setPrice] = useState<string>('0');
  const [mainImage, setMainImage] = useState<any>();
  const [detailImage, setDetailImage] = useState<any>();
  const [mainImageUrl, setMainImageUrl] = useState<any>('');
  const [detailImageUrl, setDetailImageUrl] = useState<any>('');

  const [inputMainImage, setInputMainImage] = useState<boolean>(false);
  const [inputDetailImage, setInputDetailImage] = useState<boolean>(false);

  const onChangeMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    e.preventDefault();

    if (e.target.files) {
      setMainImage(e.target.files[0]);
      setInputMainImage(true);
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setMainImageUrl(resultImage);
    };
  };
  const onChangeDetailImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    e.preventDefault();

    if (e.target.files) {
      setDetailImage(e.target.files[0]);
      setInputDetailImage(true);
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setDetailImageUrl(resultImage);
    };
  };
  // const onSubmit = (e: any) => {
  //   const formData = new FormData();

  //   e.preventDefault();

  //   formData.append('description', file1);
  //   formData.append('main', file2);
  //   formData.append('registerInfo', JSON.stringify(registerInfo));

  //   axios({
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //     url: 'http://13.125.151.45:8080/api/package/admin/register',
  //     method: 'post',
  //     data: formData,
  //   })
  //     .then((response) => {
  //       console.log({ response });
  //     })
  //     .catch((error) => {
  //       console.log({ error });
  //     });
  // };

  return (
    <Wrap>
      <Header>
        <img src={process.env.PUBLIC_URL + '/icons/logo-admin.png'} />
      </Header>
      <MainWrap>
        <Main_Header>
          <p>상세설명</p>
          <button>저장</button>
        </Main_Header>
        <Admin_Main>
          <Admin_Main_Preview>
            <img src={inputDetailImage ? detailImageUrl : null}></img>
          </Admin_Main_Preview>
          <Admin_Main_Option>
            <Admin_Main_Option_Text>상품설정</Admin_Main_Option_Text>
            <Admin_Main_Option_Wrap>
              <Admin_Main_Option_Name>
                <p>상품명</p>
                <input
                  placeholder="상품명을 적어주세요."
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Admin_Main_Option_Name>
              <Admin_Main_Option_Price>
                <p>판매가</p>
                <input
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Admin_Main_Option_Price>
              <Admin_Main_Option_Image>
                <p>이미지 추가</p>
                <Admin_Main_Option_Image_Wrap>
                  <Images_Wrap>
                    <input
                      type="file"
                      id="main-image"
                      hidden
                      onChange={onChangeMainImage}
                    />
                    <label htmlFor="main-image">
                      <img
                        src={
                          inputMainImage
                            ? mainImageUrl
                            : process.env.PUBLIC_URL + '/icons/add-img.png'
                        }
                      />
                    </label>
                    <p>대표이미지 추가</p>
                  </Images_Wrap>
                  <Images_Wrap>
                    <input
                      type="file"
                      id="detail-image"
                      hidden
                      onChange={onChangeDetailImage}
                    />
                    <label htmlFor="detail-image">
                      <img
                        src={
                          inputDetailImage
                            ? detailImageUrl
                            : process.env.PUBLIC_URL + '/icons/add-img.png'
                        }
                      />
                    </label>
                    <p>상세이미지 추가</p>
                  </Images_Wrap>
                </Admin_Main_Option_Image_Wrap>
              </Admin_Main_Option_Image>
              <Admin_Main_Option_Options>
                <p>옵션</p>
                <Admin_Main_Option_Options_Wrap></Admin_Main_Option_Options_Wrap>
              </Admin_Main_Option_Options>
              <Admin_Main_Option_Category>
                <p>카테고리</p>
              </Admin_Main_Option_Category>
              <Admin_Main_Option_Summary>
                <p>요약설명(상품상세)</p>
                <input
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="상품 상세 요약을 적어주세요."
                ></input>
              </Admin_Main_Option_Summary>
            </Admin_Main_Option_Wrap>
          </Admin_Main_Option>
        </Admin_Main>
      </MainWrap>
    </Wrap>
  );
}

const Wrap = styled.section`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;
const Header = styled.section`
  background: black;
  height: 8%;
  display: flex;
  align-items: center;
  img {
    margin: 10px 0px 10px 30px;
    width: 251px;
    height: 28px;
  }
`;
const MainWrap = styled.section`
  width: 100%;
  height: 92%;
`;
const Main_Header = styled.div`
  display: flex;
  align-items: center;

  position: relative;
  width: 100%;
  height: 7%;
  border-bottom: 1px solid rgba(33, 33, 33, 0.15);
  p {
    position: absolute;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    left: 30px;
  }
  button {
    width: 80px;
    height: 40px;
    position: absolute;
    background: #4286f4;
    border-radius: 8px;
    color: white;
    right: 30px;
  }
`;
const Admin_Main = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Admin_Main_Preview = styled.section`
  display: flex;
  justify-content: center;
  width: 80%;
  border-right: 1px solid #eeeeee;
  img {
    overflow-y: auto;
    width: 30%;
  }
`;
const Admin_Main_Option = styled.section`
  width: 20%;
  height: 900px;
  padding: 20px;
`;
const Admin_Main_Option_Text = styled.p`
  width: 100%;
  height: 5%;
`;
const Admin_Main_Option_Wrap = styled.section`
  width: 100%;
  height: 95%;
`;
const Admin_Main_Option_Name = styled.section`
  position: relative;
  width: 100%;
  height: 10%;
  padding: 10px;
  p {
    position: absolute;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #666666;
  }
  input {
    position: absolute;
    top: 30px;
    height: 40px;
    width: 300px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 10px;
  }
`;
const Admin_Main_Option_Price = styled.section`
  position: relative;
  width: 100%;
  height: 10%;
  padding: 10px;
  p {
    position: absolute;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #666666;
  }
  input {
    position: absolute;
    top: 30px;
    height: 40px;
    width: 300px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 10px;
  }
`;
const Admin_Main_Option_Image = styled.section`
  position: relative;
  width: 100%;
  height: 25%;
  padding: 10px;
  p {
    position: absolute;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #666666;
  }
`;
const Admin_Main_Option_Image_Wrap = styled.section`
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 30px;
  width: 300px;
  height: 75%;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 10px;
`;
const Images_Wrap = styled.section`
  position: relative;
  width: 100px;
  height: 100px;
  top: 20px;
  left: 20px;
  p {
    bottom: 10px;
  }
  input {
    width: 70%;
    height: 70%;
  }
  label {
    position: absolute;
    width: 70%;
    height: 70%;
    left: 10px;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
`;
const Admin_Main_Option_Options = styled.section`
  position: relative;
  width: 100%;
  height: 15%;
  padding: 10px;
  p {
    position: absolute;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #666666;
  }
`;
const Admin_Main_Option_Options_Wrap = styled.section`
  position: absolute;
  top: 30px;
  width: 300px;
  height: 60%;
  background: #eeeeee;
  border: 1px solid #eeeeee;
  border-radius: 10px;
`;
const Admin_Main_Option_Category = styled.section`
  width: 100%;
  height: 20%;
  padding: 10px;
  border: 1px solid rgba(33, 33, 33, 0.15);
`;
const Admin_Main_Option_Summary = styled.section`
  position: relative;
  width: 100%;
  height: 15%;
  padding: 10px;
  p {
    position: absolute;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #666666;
  }
  input {
    position: absolute;
    top: 30px;
    height: 100px;
    width: 300px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 10px;
  }
`;
