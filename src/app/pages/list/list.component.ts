import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  pokemons: any = new Array();
  searchName: any;
  gridColumns = 5;

  length = 0;
  pageIndex = 0;
  currentPage = 0;
  pageSize = 20;

  constructor(private pokemonService: PokemonService) {}
  
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.log(event);
    this.getPokemons();
  }

  ngOnInit() {
    this.getPokemons();
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 4 ? 5 : 4;
  }
  
  // Chama o metodo da service para listar os pokemons
  getPokemons() {
    var offset = this.pageIndex*this.pageSize;
    this.pokemonService.getPokemons(offset)
    .subscribe(dadosPokemon => {
      this.length = dadosPokemon.count;
      this.pokemons = [];
      for (const d of (dadosPokemon.results as any)) {
        this.pokemonService.getPokemonByUrl(d.url)
        .subscribe(detalhesPokemon => {
            this.pokemons.push({
              name: d.name.replace(/-/g, " "),
              sprite: detalhesPokemon.sprites.other['official-artwork'].front_default,
              types: detalhesPokemon.types,
            });
        });        
      }
      console.log(this.pokemons);
    });
  }
}
