import React from "react";
import styled from "styled-components";
import logo from "./assets/logo.svg";
import Footer from "./Footer";
import Deck from "./Deck";

export default function Corpo() {

	return (
		<Container>
			<Logo />
			<Deck />
			<Footer />
		</Container>
	);
}
const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #fb6b6b;
`;

function Logo() {
	return (
		<CaixaLogo>
			<img src={logo} />
			ZapRecall
		</CaixaLogo>
	);
}
const CaixaLogo = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 255px;
	height: 60px;
	margin-bottom: 60px;

	font-family: "Righteous";
	font-size: 36px;
	line-height: 45px;
	color: white;
`;
