import { BiCart, BiLogIn, BiLogOut, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../../app/hooks';
import { userLogout } from '../../../features/kakaoLogin/kakaoLoginSlice';

export const LogInView = () => {
  return (
    <>
      <StyleLink to="/cart">
        <BiCart size="1.7rem" />
        <p>관심상품</p>
      </StyleLink>
      <StyleLink to="/login">
        <BiLogIn size="1.7rem" />
        <p>로그인</p>
      </StyleLink>
      <StyleLink to="/signup">
        <BiUser size="1.7rem" />
        <p>회원가입</p>
      </StyleLink>
    </>
  );
};

// 로그인 상태
export const LogOutView = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <StyleLink to="/cart">
        <BiCart size="1.7rem" />
        <p>관심상품</p>
      </StyleLink>
      <StyleLink onClick={() => dispatch(userLogout(false))} to="/">
        <BiLogOut size="1.7rem" />
        <p>로그아웃</p>
      </StyleLink>
      <StyleLink to="/mypage">
        <BiUser size="1.7rem" />
        <p>마이 페이지</p>
      </StyleLink>
    </>
  );
};

const StyleLink = styled(Link)`
  display: flex;
  align-items: center;

  &:hover {
    color: #429bf4;
  }
  > p {
    font-size: 20px;
  }
`;
