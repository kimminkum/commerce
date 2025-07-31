import Link from "next/link";
import styled from "styled-components";

export default function Logo() {
  return <LogoLink href="/">로고</LogoLink>;
}

const LogoLink = styled(Link)`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;
