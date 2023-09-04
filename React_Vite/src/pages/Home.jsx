/* eslint-disable react/no-unescaped-entities */
import '../App.css';
import { ListProperties } from '../components/ListProperties';

export const Home = () => {



  return (
    <div className="">
      <article>
      <h1>Bienvenue sur ImmoCoin - Découvrez la meilleure façon d'acheter et de vendre des biens immobiliers !</h1>
      <p>ImmoCoin est votre destination incontournable pour acheter ou vendre des biens immobiliers en toute simplicité. Imaginez un marché immobilier en ligne dynamique, où vous pouvez parcourir une multitude d'annonces, du studio en ville à la villa en banlieue, avec la facilité d'utilisation du Bon Coin.</p>
      <p>Que vous soyez un acheteur passionné à la recherche de votre prochaine maison ou un vendeur déterminé à conclure une transaction réussie, ImmoCoin vous offre une expérience fluide. Notre interface conviviale vous permet de trouver rapidement ce que vous cherchez, et pour les vendeurs, nous offrons une visibilité maximale pour vos annonces.</p>
      <p>Chez ImmoCoin, nous pensons que l'immobilier doit être accessible et sans tracas. Rejoignez-nous dès aujourd'hui et découvrez un monde d'opportunités immobilières sans fin. Faites un pas vers la réalisation de vos rêves immobiliers sur ImmoCoin dès maintenant.</p>
      </article>
      <article>
        <ListProperties />
      </article>
    </div>
  );
};