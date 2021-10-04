import { GetServerSideProps } from "next";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../../public/icons/logo.svg";
import ArrowBack from "../../../public/icons/backIcon.svg";

import CameraIcon from "../../../public/icons/cameraIcon.svg";
import CoffeeIcon from "../../../public/icons/coffeeIcon.svg";
import CalendarIcon from "../../../public/icons/calendarIcon.svg";

interface citProps {
  city: {
    image: string;
    name: string;
    id: string;
    about: string;
    events: string;
    points: string;
    restaurants: string;
  };
}

const City = ({ city }: citProps) => {
  return (
    <>
      <title>brazil travel | {city.name}</title>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.links}>
            <Link href="/">
              <a>
                <Image src={Logo} alt="logo" />
              </a>
            </Link>

            <Link href="/listCity">
              <a className={styles.arrowBackButton}>
                <Image src={ArrowBack} alt="Botão para voltar a página" />
              </a>
            </Link>
          </div>

          <p>{city.name}</p>
        </div>
      </header>

      <main>
        <div className={styles.banner}>
          <Image
            src={city.image}
            alt={`Imagem da cidade de ${city.name}`}
            width={500}
            height={130}
            layout="responsive"
          />
        </div>

        <section className={styles.container}>
          <div className={styles.aboutCityText}>
            <h1>{city.name}</h1>
            <p>{city.about}</p>
          </div>

          <div className={styles.aboutCityCard}>
            <div className={styles.card}>
              <Image src={CameraIcon} alt="Ícone de uma camera" />
              <p>{city.points}</p>
              <span>Pontos turisticos</span>
            </div>

            <div className={styles.card}>
              <Image src={CoffeeIcon} alt="Ícone de uma xicara de café" />
              <p>{city.restaurants}</p>
              <span>Comida e Bebida</span>
            </div>

            <div className={styles.card}>
              <Image src={CalendarIcon} alt="Ícone de um calendário" />
              <p>{city.events}</p>
              <span>Eventos organizados</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default City;

interface dataProps {
  data: {
    image: string;
    name: string;
    id: string;
    about: string;
    events: string;
    points: string;
    restaurants: string;
  };
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug }: any = params;

  const { data }: dataProps = await api.get(`/${slug}?`);

  const city = {
    image: data.image,
    name: data.name,
    id: data.id,
    about: data.about,
    events: data.events,
    points: data.points,
    restaurants: data.restaurants,
  };

  return {
    props: {
      city,
    },
  };
};
