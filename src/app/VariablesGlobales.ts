import { human } from 'src/models/human';
import { Injectable } from '@angular/core';
@Injectable()
export class VariablesGlobales {
  parametre: string = 'toto';
  connectedUser: human = new human();
}
