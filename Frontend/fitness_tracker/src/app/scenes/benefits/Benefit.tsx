"use client"
import { SelectedPage } from "../../shared/types";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";
import type { JSX } from 'react';

type Props = {
	icon: JSX.Element;
	title: string;
	description: string;
	setSelectedPage: (value: SelectedPage) => void;
};

const childVariant = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1 },
}

const Benefit = (props: Props) => {
	return (
		<motion.div variants={childVariant} className="mt-5 rounded-md border-2 border-gray-100 px-5 py-16 text-center min-h-[350px]">
			<div className="mb-4 flex justify-center">
				<div className="rounded-full border-2 border-gray-100 bg-primary-100 p-4">
					{props.icon}
				</div>
			</div>

			<h4 className="font-bold">{props.title}</h4>
			<p className="my-3">{props.description}</p>
			<AnchorLink
				className='text-sm font-bold text-primary-500 underline hover:text-secondary-500'
				onClick={() => props.setSelectedPage(SelectedPage.ContactUs)}
				href={`#${SelectedPage.ContactUs}`}>
				<p>Learn More</p>
			</AnchorLink>
		</motion.div>
	)
}

export default Benefit