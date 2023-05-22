import styled, { keyframes } from "styled-components";
import seta from "./assets/seta.svg";
import { useState } from "react";
import seta from "./assets/seta.svg";
import virar from "./assets/virar.svg";

export default function Deck() {
	let deck = [1, 2, 3, 4, 5, 6, 7, 8];
	return (
		<DeckDiv>
			{deck.map((i) => (
				<Card numero={i} />
			))}
		</DeckDiv>
	);
}
const DeckDiv = styled.div`
	height: 650px;
	overflow-y: auto;
	scrollbar-width: none;
`;

function Card(props) {
	return (
		<CardDiv>
			Pergunta {props.numero}
			<img src={seta} />
		</CardDiv>
	);
}
const Girar = keyframes`
	from{
		transform: rotateY(0deg);
	}
	to{
		transform: rotateY(180deg);
	}
`;

const CardDiv = styled.div`
	width: 300px;
	height: 35px;
	padding: 15px;
	margin-bottom: 25px;
	background: #ffffff;
	box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	animation: ${Girar} ease-out 0.5s infinite;

	font-family: "Recursive";
	font-weight: 700;
	font-size: 16px;
	line-height: 19px;
	color: #333333;

	img {
		width: 20px;
	}
`;

export default function Deck() {
	let deck = [1, 2, 3, 4];
	return (
		<DeckDiv>
			{deck.map((i) => (
				<Card numero={i} />
			))}
		</DeckDiv>
	);
}
const DeckDiv = styled.div`
	overflow-y: auto;
	overflow-x: visible;
`;
