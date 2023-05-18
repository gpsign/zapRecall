import styled from "styled-components";

export default function Footer() {
	return <FooterDiv>0/4 CONCLUÍDOS</FooterDiv>;
}
const FooterDiv = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
	background: #ffffff;
	box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.05);

	font-family: "Recursive";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 22px;
    color: #333333;
`;
