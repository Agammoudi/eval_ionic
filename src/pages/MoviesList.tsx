import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonSearchbar } from '@ionic/react';

interface Movie {
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

const MoviesList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
  useEffect(() => {
    axios.get('http://movies-api.julienpoirier-webdev.com/search/movies/:a')
      .then(response => {
        console.log("Réponse de l'API:", response.data.results);
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des films", error);
      });
  }, []);
  const handleSearch = (e: CustomEvent) => {
    const query = e.detail.value as string;
    setSearchTerm(query);
    if (query.trim() === '') {
      setFilteredMovies(movies);
    } else {
        axios.get('http://movies-api.julienpoirier-webdev.com/search/movies/:}'+query.toLowerCase())
        .then(response => {
          console.log("Réponse de l'API:", response.data.results);
          setMovies(response.data.results);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des films", error);
        });
      //setFilteredMovies(movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())));
    }
  };

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des Films</IonTitle>
          <IonSearchbar
            value={searchTerm}
            onIonInput={handleSearch}
            debounce={0}
            placeholder="Rechercher un film..."
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {movies.map(movie => (
              <IonCol size="6" key={movie.id}>
                <IonCard>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  <IonCardHeader>
                    <IonCardTitle>{movie.title}</IonCardTitle>
                    <IonCardSubtitle>{movie.overview.substring(0, 100)}...</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MoviesList;
