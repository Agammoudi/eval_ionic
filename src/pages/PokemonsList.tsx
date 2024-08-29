import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonLabel } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const history = useHistory();
  useEffect(() => {
    axios.get('https://tyradex.vercel.app/api/v1/pokemon')
      .then(response => {
        
        setPokemons(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données", error);
      });
  }, []);
  const handlePokemonClick = (id: number) => {
    history.push(`/pokemon/${id}`);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des Pokémon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {pokemons.map(pokemon => (
              <IonCol size="6" key={pokemon.pokedex_id}>
                <IonCard button onClick={() => handlePokemonClick(pokemon.pokedex_id)}>
                  <img src={pokemon.sprites.regular} alt={pokemon.name.fr} />
                  <IonCardHeader>
                    <IonCardTitle>{pokemon.name.fr}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>Types:</p>
                    {pokemon.types?.map((type, index) => (
                      <IonChip key={index}>
                        <IonLabel>{type.name}</IonLabel>
                      </IonChip>
                    ))}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PokemonList;
