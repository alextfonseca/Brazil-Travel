import styles from "./styles.module.scss";

import Image from "next/image";
import Link from "next/link";

interface CityCardProps {
  link: string;
  image: string;
  name: string;
}

export const CityCard = ({ link, image, name }: CityCardProps) => {
  return (
    <Link href={`/city/${link}`}>
      <a className={styles.cityCard}>
        <Image src={image} alt={name} width="300" height="300" />
        <span>{name}</span>
      </a>
    </Link>
  );
};
