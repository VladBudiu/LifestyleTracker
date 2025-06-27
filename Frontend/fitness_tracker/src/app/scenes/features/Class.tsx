import Image, { StaticImageData } from "next/image";

type Props = {
  name: string;
  description?: string;
  image: string | StaticImageData;
};

const Class = (props: Props) => {
  const overlayStyles = `p-5 absolute z-30 flex 
    h-[338px] w-[450px] flex-col items-center justify-center whitespace-normal bg-primary-500 text-center text-white opacity-0 transition duration-500 hover:opacity-90`;

  return (
    <li className="relative mx-5 inline-block h-[338px] w-[450px]">
      <div className={overlayStyles}>
        <p className="text-2xl">{props.name}</p>
        <p className="mt-5">{props.description}</p>
      </div>
      <Image
        src={props.image}
        alt={props.name}
        fill
        className="object-cover"
        sizes="(max-width: 450px) 100vw, 450px"
      />
    </li>
  );
};

export default Class;
