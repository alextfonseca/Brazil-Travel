import styles from "./styles/listCity.module.scss";

import Logo from "../../public/icons/logo.svg";
import SearchIcon from "../../public/icons/searchIcon.svg";

import Image from "next/image";
import Link from "next/link";

import { CityCard } from "../components/CityCards/CityCard";
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

const listCity = ({ cities }: citiesProps) => {
  return (
    <div>
      <title>brazil travel | Lista das cidades</title>

      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/">
            <a>
              <Image src={Logo} alt="logo" />
            </a>
          </Link>
          <div className={styles.search}>
            <button type="submit">
              <Image src={SearchIcon} alt="Ícone de uma lupa para pesquisa" />
            </button>

            <input type="text" placeholder="Pesquise uma cidade" />
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <h1>Descubra tudo sobre cada cidade</h1>

        <section className={styles.containerCards}>
          {cities.map((city) => {
            return (
              <CityCard
                key={city.id}
                link={city.id}
                image={city.image}
                name={city.name}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default listCity;

interface cityProps {
  name: string;
  id: string;
  image: string;
}

interface dataProps {
  data: [];
}

export async function getStaticProps() {
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
}
