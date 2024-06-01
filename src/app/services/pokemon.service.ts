import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonCaptured = new BehaviorSubject<any>(null)
  pokemonCaptured$ = this.pokemonCaptured.asObservable();

  private pokemonResult = new BehaviorSubject<any>(null)
  pokemonResult$ = this.pokemonResult.asObservable();

  constructor(private http: HttpClient) { }

  buscarCep(cep: string): Observable<any>{
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  buscarPokemon(): Observable<any>{
    const id = Math.floor(Math.random() * 100);
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  setPokemonCaptured(data: any){
    const abilitiesCount = data.abilities.length;
    const name = data.name;
    const image = data.sprites.front_default;
    const modifiedData = {
      abilitiesCount,
      name,
      image,
      win: 0,
      draw: 0,
      defeats: 0
    };
    this.pokemonCaptured.next(modifiedData);
  }

  setPokemonResult(data: any){
    console.log(data)
    this.pokemonResult.next(data);
  }

}
