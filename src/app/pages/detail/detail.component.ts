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
  public pokemon_evolution: any = new Array();
  public detail_pokemon_evolution: any;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getDetailPokemon(this.activatedRoute.snapshot.paramMap.get('name'));
  }

  getDetailPokemon(name: any) {
    // busca os dados principais do pokemon
    this.pokemonService.getPokemonByName(name)
      .subscribe(detailPokemon => {
        this.pokemon = detailPokemon;

        // busca os dados da especie do pokemon
        this.pokemonService.getPokemonByUrl(detailPokemon.species.url)
          .subscribe(speciesPokemon => {
            this.pokemon_species = speciesPokemon;

            // busca a cadeia de evolucao do pokemon
            this.pokemonService.getPokemonByUrl(speciesPokemon.evolution_chain.url)
              .subscribe(evolutionChain => {

                // monta um array com as evolucoes
                this.pokemonService.getPokemonByName(evolutionChain.chain.species.name)
                  .subscribe(detailPokemonEvolution => {
                    this.pokemon_evolution.push({
                      name: evolutionChain.chain.species.name,
                      min_level: 0,
                      sprite: detailPokemonEvolution.sprites.other['official-artwork'].front_default,
                    });
                  });

                // verifica se o pokemon tem mais uma evolucao
                // se tiver, inclui no array de evolucoes do pokemon
                this.pokemonService.getPokemonByName(evolutionChain.chain.evolves_to[0].species.name)
                  .subscribe(detailPokemonEvolution => {
                    this.pokemon_evolution.push({
                      name: evolutionChain.chain.evolves_to[0].species.name,
                      min_level: evolutionChain.chain.evolves_to[0].evolution_details[0].min_level,
                      sprite: detailPokemonEvolution.sprites.other['official-artwork'].front_default,
                    });
                  });

                  // verifica se o pokemon tem mais uma evolucao
                  // se tiver, inclui no array de evolucoes do pokemon
                  if (evolutionChain.chain.evolves_to[0].hasOwnProperty('evolves_to')) {
                    this.pokemonService.getPokemonByName(evolutionChain.chain.evolves_to[0].evolves_to[0].species.name)
                      .subscribe(detailPokemonEvolution => {
                        this.pokemon_evolution.push({
                          name: evolutionChain.chain.evolves_to[0].evolves_to[0].species.name,
                          min_level: evolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level,
                          sprite: detailPokemonEvolution.sprites.other['official-artwork'].front_default,
                        });
                      });
                  }
              });

              console.log(this.pokemon_evolution);
          });
      });
  }
}
