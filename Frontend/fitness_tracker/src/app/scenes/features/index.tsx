import { ClassType, SelectedPage } from "../../shared/types";
import image1 from "../../assets/iamge1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import image6 from "../../assets/image6.jpg";
import { motion } from "framer-motion";
import HText from "../../shared/HText";
import Class from "./Class";

const classes: Array<ClassType> = [
	{
		name: "Workouts and Exercises",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		image: image1,
	},
	{
		name: "Nutrition and Diet",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		image: image6,
	},
	{
		name: "AI-enhanced Calorie Tracking",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		image: image4,
	},
];

type Props = {
	setSelectedPage: (value: SelectedPage) => void;
};

const Features = (props: Props) => {
	return (
		<section id="features" className="w-full bg-primary-100 py-40">
			<motion.div className="mx-auto w-5/6" onViewportEnter={() => props.setSelectedPage(SelectedPage.Features)}>
				<motion.div
					className="mx-auto w-5/6"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5 }}
					variants={{
						hidden: { opacity: 0, x: -50 },
						visible: { opacity: 1, x: 0 }
					}}>
					<div className="md:w-3/5">
						<HText> Our Features</HText>
						<p className="py-5">
							Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est
							tellus quam porttitor. Mauris velit euismod elementum arcu neque
							facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit
							enim mattis odio in risus nunc.
						</p>
					</div>
				</motion.div>
				<div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
					{classes.map((item: ClassType, index) => (
						<Class
							key={`${item.name}-${index}`}
							name={item.name}
							image={item.image}
							description={item.description}
						/>
					))}
				</div>
			</motion.div>
		</section>
	)
}

export default Features