import React from "react";
import styled from "styled-components";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles";
import Logo from "../../logo.png"

const Footer = () => {
return (
	<Box>
	<Container>
		<Row>
		<Column>
		<img src={Logo} width="130" alt="Anime Hashiraa"></img>
		
		<Heading>Anime Hashira</Heading>
		</Column>
		<Column>
			<Heading>  </Heading>
			<FooterLink href="/trending">Trending</FooterLink>
			<FooterLink href="/popular">Popular</FooterLink>
		</Column>
		<Column>
			<Heading>  </Heading>
			<FooterLink href="https://t.me/Hashira_Association">Telegram</FooterLink>
			<FooterLink href="http://instagram.com/Hashira_Association">Instagram</FooterLink>
		</Column>
		</Row>
	</Container>
	</Box>
);
};

export default Footer;
