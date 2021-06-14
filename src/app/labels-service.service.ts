import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelsServiceService {
  //form label & Text
  email_address='Email Address';
  profile_image='Profile Image';
  first_name='First Name';
  last_name='Last Name';
  user_name='Username';
  password='Password';
  user_name_req_text='Username is required';
  password_req_text='Password is required';
  contact='Contact';
  contact_help_text=`Set the member phone number as his contact`;
  city='City';
  gender='Gender';
  activate_q='Activate ?';
  required_q='Required ?';
  required_particip_help_text='All members must participate';
  activate_q_help_text=`the user won't be completly activated if he doesn't set his password`;
  logout_confirm_text=`Select "Logout" below if you are ready to end your current session.`;
  gender_male='Male';
  gender_female='Female';
  new_member='New Member';
  new_task='New Task';
  register='Register';
  description='Description';
  price='Price';
  base_price='Base Price';
  regis_fees='Registration Fees';
  select_option='Select..';
  select_role='Select Role';
  company_name='Company Name'
  company_motto='Company Motto'
  pers_info='Personal Informations'
  company_info='Company Informations'
  keep_alive='Keep Alive'
  login_salutation='Hi  !'
  confirm_action='Confirm Action'
  title='Title'
  contrib_price='Contribution Price'
  opened_date_task='Opened On'
  opened_by_task='Opened By'
  type='Type'
  all='All'
  status='Status'
  note='Note'
  active_filter='Active'
  disable_filter='Disabled'
  attributes='Attributes';

  // buttons & actions label
  submit='Submit';
  cancel='Cancel';
  save='Save';
  save_new='Save & New';
  save_close='Save & Close';
  new='New';
  edit='Edit';
  activate='Activate';
  desactivate='Desactivate';
  dismiss='Dismiss';
  profile='Profile';
  logout='Logout';
  login='Login';
  participate='Participate';
  new_activity='New Activity';
  new_amendment='New Amendment';
  activities='Activities'
  amendments='Amendments'


  //plain text
  regis_success_text=`Your information has been send , you will recieved a mailto activate your account as soon as your account has been granted`
  constructor() { }
}
