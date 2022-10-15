import styled from 'styled-components';
import { IoMdHeartEmpty } from 'react-icons/io';
import { productData } from './productData';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../constants/API_URL';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { responseTest, testData1 } from '../../../features/test/test';
import { useEffect } from 'react';

const settings = {
  slidesToShow: 4,
  slidesToScroll: 1,
};

export const ProductCarousel = () => {
  const dispatch = useAppDispatch();
  const testData = useAppSelector(testData1);
  const data:any = () => {
    axios
      .post(API_URL.POST.MAIN, {
        categoryList: ['지역별상품'],
      })
      .then((res) => {
        const mainData = res.data.data;
        const categoryData = mainData.mainCategoryPackageList;
        const regionData = categoryData.지역별상품;
        // console.log(regionData);
        // console.log(res.data);
        console.log("완료")
        dispatch(responseTest(regionData))
        return res
      })
      .catch(() => {
        console.log('error');
      });
  };
  useEffect(()=>{
    data()
  },[])
  
  return (
    <CarouselContainer {...settings}>
      {testData.map((data:any) => (
        <Link to={'detail/' + data.id} key={data.id}>
          <ProductWrap>
            <img src={data.imageUrl} alt="product_image" />
            <ProductText>
              <Title>{data.title}</Title>
              <Content>{data.summary}</Content>
              <Price>{data.price} 원</Price>
            </ProductText>
            <ProductTag>
              <TagTitle>{data.tag}</TagTitle>
            </ProductTag>
            <IoMdHeartEmpty size="20px" className="wish-icon" />
          </ProductWrap>
        </Link>
      ))}
    </CarouselContainer>
  );
};

const CarouselContainer = styled(Slider)`
  .slick-next,
  .slick-prev {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    margin-right: 10px;
    z-index: 99999;
    top: 52%;
  }
  .slick-next::before,
  .slick-prev::before {
    font-size: 0;
  }
  .slick-prev {
    background: url('/icons/ic-chevron-left-40x40-050.svg') no-repeat;
  }
  .slick-next {
    background: url('/icons/ic-chevron-right-40x40-050.svg') no-repeat;
  }
`;

const ProductWrap = styled.div`
  border-radius: 10px;
  border: 1px solid #cccccc;
  overflow: hidden;
  position: relative;

  .wish-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    index: 1;
  }

  > img {
    height: 13rem;
  }
`;

const ProductText = styled.div`
  height: 12rem;
  padding: 22px;
`;

const Title = styled.p`
  margin: 0 0 16px;
  font-size: 1.18rem;
  font-weight: bold;
`;

const Content = styled.p`
  color: #666666;
  height: 4rem;
  font-size: 1rem;
  line-height: 22px;
`;

const Price = styled.p`
  margin: 20px 0 0;
  font-size: 1.18rem;
  font-weight: bold;
`;

const ProductTag = styled.div`
  position: absolute;
  top: 10rem;
  right: 1.5rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  width: 8rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TagTitle = styled.p`
  font-size: 0.9rem;
`;
