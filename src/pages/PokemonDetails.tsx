import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons } from '@ionic/react';
import axios from 'axios';

interface Pokemon {
    pokedex_id: number;
	generation: number;
	category: string;
	name: {
		fr: string;
		en: string;
		jp: string;
	};
	sprites: {
		regular: string;
		shiny: string;
		gmax: string | null;
	};
	types: {
		name: string;
		image: string;
	}[];
	talents: {
		name: string;
		tc: boolean;
	}[];
	stats: {
		hp: number;
		atk: number;
		def: number;
		spe_atk: number;
		spe_def: number;
		vit: number;
	};
	resistances: {
		name: string;
		multiplier: number;
	}[];
	evolution: {
		pre:
			| {
					pokedex_id: number;
					name: string;
					condition: string;
			  }[]
			| null;
		next:
			| {
					pokedex_id: number;
					name: string;
					condition: string;
			  }[]
			| null;
		mega:
			| {
					orbe: string;
					sprites: {
						regular: string;
						shiny: string;
					};
			  }[]
			| null;
	};
	height: string;
	weight: string;
	egg_groups: string[];
	sexe: {
		male: number;
		female: number;
	};
	catch_rate: number;
	level_100: number;
	formes: any;
}
const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Get the Pokémon ID from the URL
  const history = useHistory();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    axios.get(`https://tyradex.vercel.app/api/v1/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des détails du Pokémon", error);
      });
  }, [id]);

  if (!pokemon) {
    return <p>Chargement...</p>;
  }

  const handleNext = () => {
    const nextId = Number(id) + 1;
    history.push(`/pokemon/${nextId}`);
  };

  const handlePrevious = () => {
    const previousId = Number(id) - 1;
    history.push(`/pokemon/${previousId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style ={{color:'pink' , textAlign:'center',fontWeight:'bold'}}>Détails de {pokemon.name.fr}</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>Retour à la liste</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <img style={{
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '300px',         // Limite la largeur maximale de l'image
  }}  src={pokemon.sprites.regular} alt={pokemon.name.fr} />
          <IonCardHeader>
            <IonCardTitle  style={{
    color: 'red',               // Couleur du texte
    fontSize: '1.5rem',         // Taille de la police
    fontWeight: 'bold',         // Poids de la police
    fontStyle: 'italic',        // Style de la police
    textAlign: 'center',        // Alignement du texte
    margin: '10px',             // Marge autour du titre
    padding: '5px',             // Espace entre le texte et la bordure
    border: '2px solid black',  // Cadre noir autour du titre
    borderRadius: '4px',        // Coins arrondis pour le titre
    backgroundColor: 'white'    // Couleur de fond du titre (contraste avec le cadre)
  }}>{pokemon.name.fr}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong style={{color: 'magenta'}}>Types:</strong> {pokemon.types?.map(type => type.name).join(', ')}</p>
            <p><strong style={{color: 'magenta'}}>Taille:</strong> {pokemon.height}</p>
            <p><strong style={{color: 'magenta'}}>Poids:</strong> {pokemon.weight}</p>
            {pokemon.evolution && (
              <div>
                <p><strong>Évolution précédente:</strong> {pokemon.evolution.pre?.map(evo => evo.name).join(', ') || 'Aucune'}</p>
                <p><strong>Évolution suivante:</strong> {pokemon.evolution.next?.map(evo => evo.name).join(', ') || 'Aucune'}</p>
              </div>
            )}
          </IonCardContent>
        </IonCard>
        <IonButtons>
          <IonButton onClick={handlePrevious} disabled={Number(id) <= 1}>Précédent</IonButton>
          <IonButton onClick={handleNext}>Suivant</IonButton>
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetails;
