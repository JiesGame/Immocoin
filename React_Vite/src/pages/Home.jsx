/* eslint-disable react/no-unescaped-entities */
import '../App.css';
import { ListProperties } from '../components/ListProperties';

export const Home = () => {



  return (
    <div className="">
      <article>
      <h1 className='text-5xl text-center font-semibold mt-10'>Bienvenue sur ImmoCoin</h1>
      <h2 className='text-3xl text-center mt-4 pb-4'>Découvrez la meilleure façon d'acheter et de vendre des biens immobiliers !</h2>
      <ul className='border-2 border-black mx-5 px-2'>
        <li className='py-2'>
          ImmoCoin est votre destination incontournable pour acheter ou vendre des biens immobiliers en toute simplicité. Imaginez un marché immobilier en ligne dynamique, où vous pouvez parcourir une multitude d'annonces, du studio en ville à la villa en banlieue, avec la facilité d'utilisation du Bon Coin.
        </li>
        <li className='py-2'>
          Que vous soyez un acheteur passionné à la recherche de votre prochaine maison ou un vendeur déterminé à conclure une transaction réussie, ImmoCoin vous offre une expérience fluide. Notre interface conviviale vous permet de trouver rapidement ce que vous cherchez, et pour les vendeurs, nous offrons une visibilité maximale pour vos annonces.
        </li>
        <li className='py-2'>
          Chez ImmoCoin, nous pensons que l'immobilier doit être accessible et sans tracas. Rejoignez-nous dès aujourd'hui et découvrez un monde d'opportunités immobilières sans fin. Faites un pas vers la réalisation de vos rêves immobiliers sur ImmoCoin dès maintenant.
        </li>
      </ul>
      </article>
      <article>
        <ListProperties />
      </article>
    </div>
  );
};