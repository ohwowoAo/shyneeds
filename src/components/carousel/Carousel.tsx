import React from "react";
import Slider from "react-slick";
import Styled from "styled-components";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      test
    </div>
  );
}

function Carousel() {
  const items:any = ['1','2','3','4','5'];
  return (
    <SliderContainer>
      <h2>test</h2>
      <StyledSlider {...settings}>
        {items.map((item:any, i:any) => {
          return <BorderBox>
            <img src={`https://placeimg.com/133/200/any?rand=${i}`} alt="" />
          </BorderBox>;
        })}
        {/* <BorderBox>
          <img src={`https://placeimg.com/133/200/any?rand=2`} alt="" />
        </BorderBox>
        <BorderBox>
          <img src={`https://placeimg.com/133/200/any?rand=3`} alt="" />
        </BorderBox>
        <BorderBox>
          <img src={`https://placeimg.com/133/200/any?rand=4`} alt="" />
        </BorderBox>
        <BorderBox>
          <h3>4</h3>
        </BorderBox>
        <BorderBox>
          <h3>5</h3>
        </BorderBox>
        <BorderBox>
          <h3>6</h3>
        </BorderBox> */}
      </StyledSlider>
    </SliderContainer>
  );
}

export default Carousel;

const SliderContainer = Styled.div`
  width: 1184px;
  height : 440px;
  margin: 0 auto;
`;

const BorderBox = Styled.div`
  border: 1px solid red;
  height : 440px;
  text-align : center;
`;
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

const StyledSlider = Styled(Slider)`
  .slick-next,
  .slick-prev {
    width: 30px;
    height: 30px;
    margin-left : 30px;
    margin-right : 50px;
    z-index: 99999;
    top: 45%;
  }
  .slick-next::before,
  .slick-prev::before {
  font-size: 50px;
  color: red;
  }
`;
