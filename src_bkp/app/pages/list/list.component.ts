import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {PokemonService} from '../../services/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  pokemons: Pokemon[]= [];
  gridColumns = 5;

  constructor(private pokemonService: PokemonService) {}
  
  ngOnInit() {
    this.getPokemons();
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 4 ? 5 : 4;
  }
  // Chama o metodo da service para listar os pokemons
  getPokemons() {
    this.pokemonService.getPokemons()
    .subscribe(dadosPokemon => {

      for (const d of (dadosPokemon.results as any)) {
        
        this.pokemonService.getPokemonByUrl(d.url)
          .subscribe(detalhesPokemon => {
            this.pokemons.push({
              name: d.name,
              sprite: detalhesPokemon.sprites.front_default,
              types: detalhesPokemon.types,
            });
        });
        
      }

    });
    console.log(this.pokemons);
  }
}
