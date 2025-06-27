"use client"
import { HomeModernIcon, UserGroupIcon, AcademicCapIcon } from "@heroicons/react/24/solid";
import { BenefitType, SelectedPage } from "../../shared/types";
import { motion } from "framer-motion";
import HText from "../../shared/HText";
import Benefit from "./Benefit";
import ActionButton from "../../shared/ActionButton";
import Image from "next/image";
import BenefitsPageGraphic from "../../assets/BenefitsPageGraphic.png";

const benefits: Array<BenefitType> = [
	{
		icon: <HomeModernIcon className="h-6 w-6" />,
		title: "Workouts and Exercises",
		description:
			"Neque adipiscing amet amet enim. Feugiat dolor enim fermentum in a in lectus pellentesque. Ullamcorper et.",
	},
	{
		icon: <UserGroupIcon className="h-6 w-6" />,
		title: "Detailed Nutritional Information ",
		description:
			"Eu ipsum id egestas risus tempus enim semper felis quis. Nec consectetur ac venenatis facilisi est. Eget ac turpis id.",
	},
	{
		icon: <AcademicCapIcon className="h-6 w-6" />,
		title: "Improve your own lifestyle",
		description:
			"Fusce vestibulum aliquam ut cras. Nisl lectus egestas sapien nisl. Lacus at mi sit pellentesque. Congue parturient.",
	}
];

const container = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.2 }
	}
}

type Props = {
	setSelectedPage: (value: SelectedPage) => void;
}

const Benefits = (props: Props) => {
	return (
		<section id="benefits" className="mx-auto min-h-full w-5/6 py-20">
			<motion.div onViewportEnter={() => props.setSelectedPage(SelectedPage.Benefits)}>
				{ /* HEADER */}
				<motion.div
					className="md:my-5 md:w-3/5"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5 }}
					variants={{
						hidden: { opacity: 0, x: -50 },
						visible: { opacity: 1, x: 0 },
					}}>
					<HText>
						More Than Just an App
					</HText>
					<p className="my-5 text-sm">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
						volutpat, enim, in sed id. Amet, sed facilisis in sed. Nunc
						ornare aenean nunc, in. Amet, sed facilisis in sed. Nunc ornare
						aenean nunc, in.
					</p>
				</motion.div>

			
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					className="md:flex items-center justify-between gap-8 mt-5"
					variants={container}>
					{benefits.map((benefit: BenefitType) => (
						<Benefit key={benefit.title} icon={benefit.icon} title={benefit.title} description={benefit.description} setSelectedPage={props.setSelectedPage} />
					))}
				</motion.div>

		
				<div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
				
					<Image
						className="mx-auto"
						src={BenefitsPageGraphic}
						alt="benefits-page-graphic"
					/>
			
					<div>
					
						<div className="relative">
							<div className="before:absolute before:-top-20 before:-left-20 before:z-[-1] before:content-abstractwaves">
								<motion.div
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, amount: 0.5 }}
									transition={{ duration: 0.5 }}
									variants={{
										hidden: { opacity: 0, x: 50 },
										visible: { opacity: 1, x: 0 },
									}}>
									<HText>
										Millions of Happy Members Getting{" "}
										<span className="text-primary-500">FIT</span>
									</HText>
								</motion.div>
							</div>
						</div>

			
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.5 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							variants={{
								hidden: { opacity: 0, x: 50 },
								visible: { opacity: 1, x: 0 },
							}}>
							<p className="my-5">
								Nascetur aenean massa auctor tincidunt. Iaculis potenti amet
								egestas ultrices consectetur adipiscing ultricies enim. Pulvinar
								fames vitae vitae quis. Quis amet vulputate tincidunt at in
								nulla nec. Consequat sed facilisis dui sit egestas ultrices
								tellus. Ullamcorper arcu id pretium sapien proin integer nisl.
								Felis orci diam odio.
							</p>
							<p className="mb-5">
								Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est
								tellus quam porttitor. Mauris velit euismod elementum arcu neque
								facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit
								enim mattis odio in risus nunc.
							</p>
						</motion.div>

						{ /* BUTTON */}
						<div className="relative mt-16">
							<div className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles">
								<ActionButton href="/signup/welcome">
									Join Now
								</ActionButton>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	)
}

export default Benefits