import { StaticImageData } from "next/image";
import { JSX } from "react";

export enum SelectedPage {
	Home = "home",
	Benefits = "benefits",
	Features = "features",
	ContactUs = "contact-us",
}

export interface BenefitType {
	icon: JSX.Element;
	title: string;
	description: string;
}

export interface ClassType {
	name: string;
	description?: string;
	image: string | StaticImageData;
}