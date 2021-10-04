import Image from "next/image";

import styles from "./styles/home.module.scss";

import Logo from "../../public/icons/logo.svg";
import RioDeJaneiroImage from "../../public/icons/rioDeJaneiroCity.jpg";
import { CityCard } from "../components/CityCards/CityCard";
import { GetStaticProps } from "next";
import { api } from "../services/api";

interface citiesProps {
  cities: [
    {
      name: string;
      id: string;
      image: string;
    },
  ];
}

const Home = ({ cities }: citiesProps) => {
  return (
    <div className={styles.container}>
      <title>brazil travel | Home</title>

      <header>
        <Image src={Logo} alt="Logo da empresa" />
      </header>

      <main>
        <div className={styles.containerText}>
          <h1>Descubra lugares e pessoas novas</h1>
          <p>
            Descubra locais incríveis para se visitar em cidades maravilhosas do
            Brasil
          </p>
          <a href="listCity">Descobrir todas as cidades</a>
        </div>
        <div className={styles.cityCards}>
          {cities.map((city) => {
            if (Number(city.id) < 5) {
              return (
                <CityCard
                  key={city.id}
                  name={city.name}
                  image={city.image}
                  link={city.id}
                />
              );
            }
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;

interface cityProps {
  name: string;
  id: string;
  image: string;
}

interface dataProps {
  data: [];
}

export const getStaticProps: GetStaticProps = async () => {
  const { data }: dataProps = await api.get("/?");

  const cities = data.map((city: cityProps) => {
    return {
      id: city.id,
      image: city.image,
      name: city.name,
    };
  });

  return {
    props: {
      cities,
    },
  };
};
