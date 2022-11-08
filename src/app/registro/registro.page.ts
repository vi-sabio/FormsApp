import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formLogin = this.formBuilder.group({
    nome: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]),
    ],
    cpf: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(11),Validators.minLength(11)]),
    ],
    senha: [
      '',
      Validators.compose([Validators.required,Validators.minLength(8)]),
    ],
    confirmaSenha: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}
}
