export class config {
  private url_dev:string=`http://127.0.0.1:3000`;
  private url_prod:string=`https://learn-node-postgres.herokuapp.com`;;

  /**
   * getURL
   * return the server base endpoint
   */
  public getURL() :string{
    return this.url_dev;

  }

}
