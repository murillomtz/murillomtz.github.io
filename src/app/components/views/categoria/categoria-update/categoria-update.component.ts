import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from './../../categoria.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../categoria.model';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(
    private service: CategoriaService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoria.id = this.actRoute.snapshot.paramMap.get('id')
    this.findById()

  }


  findById(): void {
    this.service.findById(this.categoria.id).subscribe((resposta) => {
      this.categoria.nome = resposta.nome
      this.categoria.descricao = resposta.descricao
      // console.log(this.categoria)
    })
  }

  update(): void {
    this.service.update(this.categoria).subscribe((resposta) => {
      this.router.navigate(['categorias']);
      this.service.mensagem("Categoria atualizada com sucesso!");
    }, err  => {
      this.service.mensagem("Validar se todos os campos estão preechidos")
    })
  }

}
