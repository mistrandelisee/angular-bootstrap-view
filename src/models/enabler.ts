export class isEnable {
  public home:boolean=false;
  public dashboard:boolean=false;
  public users:boolean=false;
  public userView:boolean=false;
  public profile:boolean=false;
  public notificationView:boolean=false;
  public addperson:boolean=false;
  /**
   * enableHone
   */
  public enableHome() {
    this.disableAll()
    this.home=true
  }
  public enableDashboard() {
    this.disableAll()
    this.dashboard=true
  }

  public enableUserView() {
    this.disableAll()
    this.userView=true
  }
  public enableNotificationView() {
    this.disableAll()
    this.notificationView=true
  }
  public enableUsers() {
    this.disableAll()
    this.users=true
  }
  public enableProfile() {
    this.disableAll()
    this.profile=true
  }
  public enableAddPerson() {
    this.disableAll()
    this.addperson=true
  }


  /**
   * disableAll
   */
  public disableAll() {
    this.home=false;
    this.dashboard=false;
    this.users=false;
    this.userView=false;
    this.profile=false;
    this.notificationView=false;
    this.addperson=false;
  }
  // public home:boolean=false;
  // public home:boolean=false;
  // public home:boolean=false;
  // public home:boolean=false;


}
