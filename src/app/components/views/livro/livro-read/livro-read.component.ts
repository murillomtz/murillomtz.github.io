import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { FormControl, Validators } from '@angular/forms';
import { Livro } from './../livro.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {


  id_cat: String = ""

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  //No HTML ja tem o MaxLength, então precisa por aqui
  titulo = new FormControl('', Validators.minLength(3))
  nome_autor = new FormControl('', Validators.minLength(3))
  texto = new FormControl('', Validators.minLength(10))


  constructor(private service: LivroService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')
    this.livro.id = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe(resposta => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro criado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Erro ao criar novo livro. Tente mais tarde!')
    });
  }


  cancel() {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  findById(): void {
    this.service.findByid(this.livro.id).subscribe((resposta) => {
      this.livro = resposta
    })
  }

}
