import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  pokemon: any;

  constructor(private pokemonService: PokemonService) {}
  
  ionViewDidEnter(){
    this.pokemonService.pokemonResult$.subscribe((result) => this.pokemon = result)
  }

}
