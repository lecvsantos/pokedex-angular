import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

  public pokemon: any;
  public pokemon_species: any;
  public pokemon_evolution: any;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getDetailPokemon(this.activatedRoute.snapshot.paramMap.get('name'));
  }

  getDetailPokemon(name: any) {
    this.pokemonService.getPokemonByName(name)
      .subscribe(detailPokemon => {
        console.log(detailPokemon);
        this.pokemon = detailPokemon;

        this.pokemonService.getPokemonByUrl(detailPokemon.species.url)
          .subscribe(speciesPokemon => {
            console.log(speciesPokemon);
            this.pokemon_species = speciesPokemon;

            this.pokemonService.getPokemonByUrl(speciesPokemon.evolution_chain.url)
              .subscribe(evolutionChain => {
                console.log(evolutionChain);
                this.pokemon_evolution = evolutionChain;
              });
          });
      });
  }
}
