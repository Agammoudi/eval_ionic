import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';

interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`http://movies-api.julienpoirier-webdev.com/infos/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des détails du film", error);
        setError("Erreur lors de la récupération des détails du film.");
      });
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Chargement...</p>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style ={{color:'navy' , textAlign:'center',fontWeight:'bold'}}>Détails du Film</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
        <img 
  style={{
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '400px',         // Limite la largeur maximale de l'image
  }} 
  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
  alt={movie.title} 
/>
          <IonCardHeader>
          <IonCardTitle
  style={{
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
  }}
>
  {movie.title}
</IonCardTitle>



          </IonCardHeader>
          <IonCardContent >
            <p><strong style={{color: 'navy'}}>Date de sortie:</strong> {movie.release_date}</p>
            <p><strong style={{color: 'navy'}}>Synopsis:</strong> {movie.overview}</p>
            <p><strong style={{color: 'navy'}}>Durée:</strong> N/A</p>
            <p><strong style={{color: 'navy'}}>Genres:</strong> {movie.genre_ids}</p>
            <p><strong style={{color: 'navy'}}>Titre original:</strong> {movie.original_title}</p>
            <p><strong style={{color: 'navy'}}>Langue originale:</strong> {movie.original_language}</p>
            <p><strong style={{color: 'navy'}}>Popularité:</strong> {movie.popularity}</p>
            <p><strong style={{color: 'navy'}}>Note:</strong> {movie.vote_average} ({movie.vote_count} votes)</p>
            <p><strong style={{color: 'navy'}}>Vidéo:</strong> {movie.video ? 'Oui' : 'Non'}</p>
          </IonCardContent>
        </IonCard>
        <IonButton routerLink="/movies" expand="full">Retour à la liste des films</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MovieDetails;
