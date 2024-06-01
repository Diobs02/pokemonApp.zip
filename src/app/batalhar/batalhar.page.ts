import { Component, OnDestroy, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Subscription } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-batalhar',
  templateUrl: 'batalhar.page.html',
  styleUrls: ['batalhar.page.scss']
})
export class BatalharPage{

  imagemUrl: any;
  pokemon: any = null;
  pokemonCaptured: any;
  
  constructor(private photoService: PhotoService, private pokemonService: PokemonService) { }

  ionViewDidEnter() {

    this.pokemonService.buscarPokemon().subscribe((result) => {
      this.pokemon = result
    })

    this.pokemonService.pokemonCaptured$.subscribe(result => this.pokemonCaptured = result)
  }

  batalhaResultado() {
    if (!this.pokemon || this.pokemonCaptured?.abilitiesCount === undefined) return { class: '', text: '' };

    const abilityCount = this.pokemon.abilities.length;
    const pokemonResult = { ...this.pokemonCaptured }; 


    if (abilityCount === this.pokemonCaptured?.abilitiesCount) {
      pokemonResult.draw += 1;
      this.pokemonService.setPokemonResult(pokemonResult);      
      return { class: 'name-yellow', text: 'Empate' };
    } else if (abilityCount > this.pokemonCaptured?.abilitiesCount) {
      pokemonResult.win += 1;
      this.pokemonService.setPokemonResult(pokemonResult);      
      return { class: 'name-red', text: 'Ganhou' };
    } else {
      pokemonResult.defeats += 1;
      this.pokemonService.setPokemonResult(pokemonResult);      
      return { class: 'name-green', text: 'Perdeu' };
    }
  }

  async captureAndStorePhoto() {
    try {
      const photo = await this.photoService.addNewToGallery();
      this.imagemUrl = photo.webPath;
      console.log(this.imagemUrl)
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  }

}
