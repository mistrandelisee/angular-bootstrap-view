
export class personne {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  active: boolean;
  userId: string;
  constructor(){
    this.nom='';
    this.prenom='';
    this.active=true;
  }
  setPK(){
    return `${this.nom}-${new Date().getMilliseconds()}`;
  }
}
