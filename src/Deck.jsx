import styled, { keyframes, css } from "styled-components";
import { useState } from "react";
import seta from "./assets/seta.svg";
import virar from "./assets/virar.svg";

export default function Deck({ concluidos, setConcluidos, setTotal }) {
	const cards = [
		{
			question: "O que é JSX?",
			answer: "Uma extensão da linguagem JavaScript",
		},
		{
			question: "O React é __",
			answer: "Uma biblioteca JavaScript para construção de interfaces",
		},
		{ question: "Componentes devem iniciar com __", answer: "Letra maiúscula" },
		{ question: "Podemos colocar __ dentro do JSX", answer: "expressões" },
		{
			question: "O ReactDOM nos ajuda __",
			answer: "Interagindo com a DOM para colocar componentes React na mesma",
		},
		{
			question: "Usamos o npm para __",
			answer: "Gerenciar os pacotes necessários e suas dependências",
		},
		{
			question: "Usamos props para __",
			answer: "Passar diferentes informações para componentes",
		},
		{
			question: "Usamos estado (state) para __",
			answer:
				"Dizer para o React quais informações quando atualizadas devem renderizar a tela novamente",
		},
	];
	setTotal(cards.length);

	return (
		<DeckDiv>
			{cards.map((i, index) => (
				<Card
					numero={index + 1}
					pergunta={i.question}
					resposta={i.answer}
					concluidos={concluidos}
					setConcluidos={setConcluidos}
				/>
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
	let [expandida, setExpandida] = useState(false);
	let [virada, setVirada] = useState(false);
	let [resultado, setResultado] = useState("pergunta");
	let [respondida, setRespondida] = useState(false);

	return (
		<CardDiv data-test="flashcard" expandida={expandida} virada={virada}>
			<CardFrente expandida={expandida} virada={virada}>
				{expandida ? (
					<>
						<p data-test="flashcard-text">{props.pergunta}</p>
						<GirarImg data-test="turn-btn" src={virar} onClick={() => setVirada(true)} />
					</>
				) : (
					<>
						<p data-test="flashcard-text" className={resultado}>
							{" "}
							Pergunta {props.numero}
						</p>
						{respondida ? (
							icone(resultado)
						) : (
							<SetaImg
								data-test="play-btn"
								src={seta}
								onClick={() => setExpandida(true)}
							/>
						)}
					</>
				)}
			</CardFrente>
			<CardTraseiro expandida={expandida} virada={virada}>
				<p data-test="flashcard-text">{props.resposta}</p>
				<DeckBotoes respondida={respondida}>
					<NaoLembrei
						data-test="no-btn"
						onClick={() => {
							setResultado("vermelho");
							setVirada(false);
							setExpandida(false);
							setRespondida(true);
							props.setConcluidos(props.concluidos + 1);
						}}
					>
						Não
						<br />
						lembrei
					</NaoLembrei>
					<QuaseLembrei
						data-test="partial-btn"
						onClick={() => {
							setResultado("laranja");
							setVirada(false);
							setExpandida(false);
							setRespondida(true);
						}}
					>
						Quase não lembrei
					</QuaseLembrei>
					<Zap
						data-test="zap-btn"
						onClick={() => {
							setResultado("verde");
							setVirada(false);
							setExpandida(false);
							setRespondida(true);
						}}
					>
						Zap!
					</Zap>
				</DeckBotoes>
			</CardTraseiro>
		</CardDiv>
	);
}

function icone(resultado) {
	if (resultado === "vermelho")
		return <Status data-test="no-icon" src={`/src/assets/vermelho.svg`} />;
	else if (resultado === "laranja")
		return <Status data-test="partial-icon" src={`/src/assets/laranja.svg`} />;
	else return <Status data-test="zap-icon" src={`/src/assets/verde.svg`} />;
}

const Status = styled.img`
	width: 23px;
`;

const DeckBotoes = styled.div`
	width: 270px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	visibility: ${({ respondida }) => (respondida ? `hidden` : `visible`)};
`;

const CardDiv = styled.div`
	width: 300px;
	height: 65px;
	position: relative;
	margin-bottom: 25px;

	animation: ${({ expandida }) => {
		return expandida ? expandirAnimacao : "none";
	}};
	animation-fill-mode: forwards;

	font-family: "Recursive";
	font-weight: 700;
	font-size: 16px;
	line-height: 19px;
	color: #333333;
`;

const CardFrente = styled.div`
	position: absolute;
	width: 300px;
	height: 100%;
	padding: 15px;
	box-sizing: border-box;

	display: flex;
	justify-content: space-between;

	border-radius: 5px;
	background-color: white;
	box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);

	backface-visibility: hidden;
	transform-style: preserve-3d;
	transform: ${({ virada }) => (virada ? "rotateY(180deg)" : "rotateY(0)")};
	transition: transform 0.7s;

	animation: ${({ expandida }) => {
		return expandida ? colorirAnimacao : "none";
	}};
	animation-fill-mode: forwards;

	.pergunta {
		padding-top: 9px;
	}

	.vermelho {
		padding-top: 9px;
		text-decoration: line-through;
		color: #ff3030;
	}

	.laranja {
		padding-top: 9px;
		text-decoration: line-through;
		color: #ff922e;
	}

	.verde {
		padding-top: 9px;
		text-decoration: line-through;
		color: #2fbe34;
	}
`;

const CardTraseiro = styled.div`
	box-sizing: border-box;
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 15px;

	background-color: #ffffd5;
	box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
	border-radius: 5px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	backface-visibility: hidden;
	transform-style: preserve-3d;
	transform: ${({ virada }) => (virada ? "rotateY(0)" : "rotateY(-180deg)")};
	transition: transform 0.7s;
`;

const GirarImg = styled.img`
	width: 30px;
	position: absolute;
	bottom: 5px;
	right: 10px;
	cursor: pointer;
`;

const SetaImg = styled.img`
	width: 20px;
	cursor: pointer;
`;

const Crescer = keyframes`
	from { height: 65px; }
	to{ height: 130px; }
`;

const expandirAnimacao = css`
	${Crescer} 0.7s ease-out;
`;

const Colorir = keyframes`
	from{
		background-color: white;
		color: rgba(51, 51, 51, 0);
	}
	to{
		background-color: #ffffd5;
		color: rgba(51, 51, 51, 1);
	}
`;

const colorirAnimacao = css`
	${Colorir} 0.7s ease-out;
`;

const NaoLembrei = styled.button`
	width: 85px;
	height: 38px;

	background: #ff3030;
	border-radius: 5px;
	border: none;

	font-family: "Recursive";
	font-size: 12px;
	line-height: 14px;

	color: #ffffff;

	&:active {
		transform: translateY(2px);
		filter: brightness(0.9);
	}
`;

const QuaseLembrei = styled.button`
	width: 85px;
	height: 38px;

	background: #ff922e;
	border-radius: 5px;
	border: none;

	font-family: "Recursive";
	font-size: 12px;
	line-height: 14px;

	color: #ffffff;

	&:active {
		transform: translateY(2px);
		filter: brightness(0.9);
	}
`;

const Zap = styled.button`
	width: 85px;
	height: 38px;

	background: #2fbe34;
	border-radius: 5px;
	border: none;

	font-family: "Recursive";
	font-size: 12px;
	line-height: 14px;

	color: #ffffff;

	&:active {
		transform: translateY(2px);
		filter: brightness(0.9);
	}
`;
